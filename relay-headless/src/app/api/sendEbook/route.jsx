import { handleMailForm } from "../../../lib/mailForms";
export const runtime = "nodejs";
export async function POST(request) {
  return handleMailForm(request, {"format":"json","fields":[],"title":"Ebook request","ebook":true});
}
