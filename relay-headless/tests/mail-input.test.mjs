import assert from "node:assert/strict";
import test from "node:test";
import { cleanFields, escapeHtml, readBoundedRequest, validEmail, MAX_BODY_BYTES } from "../src/lib/mailInput.mjs";
test("HTML input is escaped", () => assert.equal(escapeHtml('<img src="x">&'), '&lt;img src=&quot;x&quot;&gt;&amp;'));
test("email validation rejects injection", () => { assert.equal(validEmail("ok@example.com"), true); for (const bad of ["x\r\nbcc@evil.com", "bad", "", "a".repeat(260)+"@x.com"]) assert.equal(validEmail(bad), false); });
test("fields are bounded and reject nonstrings", () => {
 assert.throws(()=>cleanFields({email:"ok@example.com",name:"a".repeat(251)},["name"]));
 assert.throws(()=>cleanFields({email:"ok@example.com",name:{a:1}},["name"]));
 assert.equal(cleanFields({email:"ok@example.com",name:" A "},["name"]).name,"A");
});
test("JSON payload accepted and parsed", async()=> {
 const req=new Request("http://localhost",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:"ok@example.com"})});
 assert.equal((await readBoundedRequest(req,"json")).email,"ok@example.com");
});
test("form payload accepted and parsed", async()=> {
 const fd=new FormData();fd.append("email","ok@example.com");fd.append("message","Hi");
 const req=new Request("http://localhost",{method:"POST",body:fd});
 assert.equal((await readBoundedRequest(req,"form")).message,"Hi");
});
test("oversized payload rejected even without content-length", async()=> {
 const req=new Request("http://localhost",{method:"POST",headers:{"content-type":"application/json"},body:"x".repeat(MAX_BODY_BYTES+1)});
 await assert.rejects(()=>readBoundedRequest(req,"json"),/Body too large/);
});
test("unsupported types rejected", async()=> {
 const req=new Request("http://localhost",{method:"POST",headers:{"content-type":"text/plain"},body:"x"});
 await assert.rejects(()=>readBoundedRequest(req,"json"),/Unsupported type/);
});
test("arrays and invalid email rejected",()=>{
 assert.throws(()=>cleanFields([],[]));
 assert.throws(()=>cleanFields({email:"bad"},[]));
});
