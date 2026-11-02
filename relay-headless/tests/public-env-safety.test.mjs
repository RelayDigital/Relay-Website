import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL(path, import.meta.url), "utf8");

test("next.config does not inject environment secrets into browser bundles", () => {
  const config = read("../next.config.mjs");
  assert.doesNotMatch(config, /\benv\s*:\s*\{/);
  assert.doesNotMatch(config, /NEXT_PUBLIC_(?:API_TOKEN|RESEND_API_KEY|EMAIL_PASSWORD|EMAIL_USERNAME)/);
});
test("client content loader never reads a bearer token", () => {
  const client = read("../src/components/ContentLoader.js");
  assert.doesNotMatch(client, /NEXT_PUBLIC_API_TOKEN|Authorization|Bearer/);
  assert.match(client, /\/api\/public-cms/);
});
test("CMS proxy has allowlist, timeout, byte cap, server-only token and no redirects", () => {
  const route = read("../src/app/api/public-cms/route.js");
  assert.match(route, /STRAPI_API_TOKEN/);
  assert.match(route, /new Set\(\[/);
  assert.match(route, /MAX_CMS_BYTES = 262144/);
  assert.match(route, /redirect: "error"/);
  assert.match(route, /AbortSignal\.timeout\(8000\)/);
});
