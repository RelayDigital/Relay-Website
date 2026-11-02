import assert from "node:assert/strict";
import test from "node:test";
import { verifyEbookChallenge } from "../src/lib/turnstile.mjs";

const options = { secret: "test-secret", hostname: "relay.digital" };
const fakeResponse = (data, status = 200) => ({ ok: status === 200, json: async () => data });

test("valid ebook token with matching hostname and action is accepted", async () => {
  let calls = 0;
  const result = await verifyEbookChallenge("token-1", { ...options, fetchImpl: async (url, init) => {
    calls++;
    assert.equal(url, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
    assert.equal(init.method, "POST");
    assert.equal(init.body.get("secret"), options.secret);
    assert.equal(init.body.get("response"), "token-1");
    assert.equal(init.redirect, "error");
    return fakeResponse({ success: true, action: "ebook", hostname: "relay.digital" });
  }});
  assert.deepEqual(result, { ok: true, unavailable: false });
  assert.equal(calls, 1);
});
test("missing server configuration fails closed without network access", async () => {
  const fetchImpl = () => { throw new Error("unexpected network call"); };
  assert.deepEqual(await verifyEbookChallenge("abc", { ...options, secret: "", fetchImpl }), { ok: false, unavailable: true });
  assert.deepEqual(await verifyEbookChallenge("abc", { ...options, hostname: "", fetchImpl }), { ok: false, unavailable: true });
});
test("invalid and oversized tokens never call siteverify", async () => {
  const fetchImpl = () => { throw new Error("unexpected network call"); };
  for (const token of [undefined, "", "a b", "a".repeat(2049), 12]) {
    assert.deepEqual(await verifyEbookChallenge(token, { ...options, fetchImpl }), { ok: false, unavailable: false });
  }
});
test("successful response for another action or hostname is rejected", async () => {
  for (const verdict of [
    { success: true, action: "login", hostname: "relay.digital" },
    { success: true, action: "ebook", hostname: "attacker.example" },
    { success: true, action: "ebook" },
    { success: false, action: "ebook", hostname: "relay.digital" },
  ]) {
    assert.deepEqual(await verifyEbookChallenge("abc", { ...options, fetchImpl: async () => fakeResponse(verdict) }), { ok: false, unavailable: false });
  }
});
test("upstream errors fail closed as unavailable", async () => {
  assert.deepEqual(await verifyEbookChallenge("abc", { ...options, fetchImpl: async () => fakeResponse({}, 502) }), { ok: false, unavailable: true });
  assert.deepEqual(await verifyEbookChallenge("abc", { ...options, fetchImpl: async () => { throw new Error("offline"); } }), { ok: false, unavailable: true });
  assert.deepEqual(await verifyEbookChallenge("abc", { ...options, fetchImpl: async () => ({ ok: true, json: async () => { throw new Error("bad json"); } }) }), { ok: false, unavailable: true });
});
test("upstream timeout aborts the request", async () => {
  let aborted = false;
  const fetchImpl = (_url, init) => new Promise((_resolve, reject) => {
    init.signal.addEventListener("abort", () => { aborted = true; reject(new Error("aborted")); });
  });
  assert.deepEqual(await verifyEbookChallenge("abc", { ...options, fetchImpl, timeoutMs: 5 }), { ok: false, unavailable: true });
  assert.equal(aborted, true);
});
