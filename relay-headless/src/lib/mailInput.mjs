export const MAX_BODY_BYTES = 16 * 1024;
export const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[ch]);
export const validEmail = value => typeof value === "string" &&
  value.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
export function cleanFields(data, fields) {
  if (!data || typeof data !== "object" || Array.isArray(data) || !validEmail(data.email)) {
    throw new Error("Invalid email or body");
  }
  const out = { email: data.email.trim() };
  for (const field of fields) {
    const value = data[field];
    if (value !== undefined && value !== null && typeof value !== "string") throw new Error("Invalid field");
    const max = field === "message" ? 4000 : 250;
    if (String(value ?? "").length > max) throw new Error("Field too long");
    out[field] = String(value ?? "").trim();
  }
  return out;
}
export async function readBoundedRequest(request, format) {
  const type = (request.headers.get("content-type") || "").toLowerCase();
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) throw new Error("Body too large");
  if (format === "json" && !type.startsWith("application/json")) throw new Error("Unsupported type");
  if (format === "form" && !type.startsWith("multipart/form-data") && !type.startsWith("application/x-www-form-urlencoded")) throw new Error("Unsupported type");
  if (!request.body) throw new Error("Missing body");
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  if (format === "json") {
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid JSON body");
    return parsed;
  }
  const parsed = await new Request("http://localhost", {
    method: "POST",
    headers: { "content-type": type },
    body: bytes
  }).formData();
  const result = {};
  for (const [key, value] of parsed.entries()) {
    if (typeof value !== "string") throw new Error("Files not accepted");
    result[key] = value;
  }
  return result;
}
