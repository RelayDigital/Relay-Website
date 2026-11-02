import nodemailer from "nodemailer";
import { cleanFields, escapeHtml, readBoundedRequest, validEmail } from "./mailInput.mjs";

const fieldLabels = {
  name: "Name", phone: "Phone", project: "Subject", message: "Message",
  website: "Website", social: "Social", socialUsername: "Social username",
  monthly_visits: "Monthly visits", referral_source: "Referral source"
};
const sender = () => process.env.SMTP_FROM_EMAIL || process.env.SMTP_USERNAME;
export async function handleMailForm(request, spec) {
  const { SMTP_USERNAME: user, SMTP_PASSWORD: pass, CONTACT_INBOX_EMAIL: inbox } = process.env;
  if (!user || !pass || !inbox || !validEmail(inbox) || !validEmail(sender())) {
    return Response.json({ message: "Mail delivery unavailable" }, { status: 503 });
  }
  let data;
  try {
    data = cleanFields(await readBoundedRequest(request, spec.format), spec.fields);
  } catch {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }
  const lines = spec.fields.map(field =>
    `<p><strong>${escapeHtml(fieldLabels[field] || field)}:</strong> ${escapeHtml(data[field]).replace(/\n/g, "<br>")}</p>`
  ).join("");
  const transport = nodemailer.createTransport({
    service: "gmail", auth: { user, pass },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000
  });
  const from = `"Relay Digital" <${sender()}>`;
  const inboxMessage = {
    from, to: inbox, replyTo: data.email,
    subject: `${spec.title} from ${data.email}`,
    html: `<h1>${escapeHtml(spec.title)}</h1><p><strong>Email:</strong> ${escapeHtml(data.email)}</p>${lines}`
  };
  try {
    if (spec.ebook) {
      // This endpoint sends to a user-supplied address; deploy with abuse protection.
      await transport.sendMail({
        from, to: data.email, subject: "Your Free Ebook Download",
        html: '<p>Thank you for requesting our ebook.</p><p><a href="https://drive.google.com/uc?export=download&amp;id=1ejqyBmSynDZcevGNv3aiKaROETa2JAmV">Download your ebook</a></p>'
      });
    }
    await transport.sendMail(inboxMessage);
    return Response.json({ message: "Success: email was sent" });
  } catch {
    console.error("Relay mail delivery failed");
    return Response.json({ message: "Mail delivery failed" }, { status: 502 });
  } finally {
    transport.close();
  }
}
