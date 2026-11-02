import { handleMailForm } from "../../../lib/mailForms";
export const runtime = "nodejs";
export async function POST(request) {
  return handleMailForm(request, {"format":"form","fields":["name","phone","project","message"],"title":"Contact form request","ebook":false});
}
