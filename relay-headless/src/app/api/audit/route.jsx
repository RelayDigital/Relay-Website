import { handleMailForm } from "../../../lib/mailForms";
export const runtime = "nodejs";
export async function POST(request) {
  return handleMailForm(request, {"format":"json","fields":["website","name","social","socialUsername","monthly_visits","referral_source"],"title":"Website audit request","ebook":false});
}
