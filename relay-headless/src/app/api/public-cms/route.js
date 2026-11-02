import { NextResponse } from "next/server";

export const runtime = "nodejs";
const ALLOWED = new Set(["why-content", "cta-banner", "hero-content", "marquee"]);
const MAX_CMS_BYTES = 262144;

export async function GET(request) {
  const collection = new URL(request.url).searchParams.get("collection");
  if (!ALLOWED.has(collection)) {
    return NextResponse.json({ error: "Unknown collection." }, { status: 400 });
  }

  const base = process.env.STRAPI_BASE_URL || process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const token = process.env.STRAPI_API_TOKEN;
  if (!base || !token) {
    return NextResponse.json({ error: "Content unavailable." }, { status: 503 });
  }

  let url;
  try {
    url = new URL(`/api/${collection}s?populate=*`, base);
    if (url.protocol !== "https:" && !(process.env.NODE_ENV === "development" && url.hostname === "localhost")) {
      throw new Error("Invalid CMS origin");
    }
  } catch {
    return NextResponse.json({ error: "Content unavailable." }, { status: 503 });
  }

  try {
    const upstream = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(8000)
    });
    if (!upstream.ok) throw new Error("Upstream failed");
    const declared = Number(upstream.headers.get("content-length") || "0");
    if (declared > MAX_CMS_BYTES) throw new Error("Upstream too large");
    if (!upstream.body) throw new Error("Upstream empty");

    const reader = upstream.body.getReader();
    const chunks = [];
    let length = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > MAX_CMS_BYTES) {
          await reader.cancel().catch(() => {});
          throw new Error("Upstream too large");
        }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }

    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const payload = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Content temporarily unavailable." }, { status: 502 });
  }
}
