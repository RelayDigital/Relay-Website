const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Fail-closed, single-use challenge verification for the ebook email endpoint. */
export async function verifyEbookChallenge(token, {
  secret,
  hostname,
  fetchImpl = fetch,
  timeoutMs = 4000,
} = {}) {
  if (typeof secret !== "string" || !secret || typeof hostname !== "string" || !hostname) {
    return { ok: false, unavailable: true };
  }
  if (typeof token !== "string" || token.length < 1 || token.length > 2048 || /\s/.test(token)) {
    return { ok: false, unavailable: false };
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: controller.signal,
      redirect: "error",
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, unavailable: true };
    const verdict = await response.json();
    return {
      ok: verdict?.success === true && verdict.action === "ebook" && verdict.hostname === hostname,
      unavailable: false,
    };
  } catch {
    return { ok: false, unavailable: true };
  } finally {
    clearTimeout(timeout);
  }
}
