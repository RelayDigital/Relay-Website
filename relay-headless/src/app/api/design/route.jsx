import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

// Handles POST requests to /api
export async function POST(request) {
  const username = process.env.SMTP_USERNAME;
  const password = process.env.SMTP_PASSWORD;
  const myEmail = process.env.CONTACT_INBOX_EMAIL;

  if (!username || !password || !myEmail) {
    return NextResponse.json({ message: "Mail delivery unavailable" }, { status: 503 });
  }

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  const escapeHtml = value => String(value ?? "").slice(0, 2000).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
  const { website, name, email, social, socialUsername, monthly_visits, referral_source } = body;
  if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    // Send email to site owner
    await transporter.sendMail({
      from: `"Relay Digital" <relaydigitalyyc@gmail.com>`, // Alias
      to: myEmail,
      replyTo: email,
      subject: `Free design request from ${email}`,
      html: `
          <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
            <h1>Website Design Request</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Website:</strong> ${website}</p>
            <p><strong>Social:</strong> ${social} @${socialUsername}</p>
            <p><strong>Monthly Visits:</strong> ${monthly_visits}</p>
            <p><strong>Referral Source:</strong> ${referral_source}</p>
          </div>
        `,
    });

    // Send confirmation email to the submitter
    await transporter.sendMail({
      from: `"Relay Digital" <relaydigitalyyc@gmail.com>`, // Alias
      to: email, // Note this change to send to the submitter
      subject: `Confirmation of Your Website Design Request`,
      html: `
          <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
            <h1>Thank You for Your Website Design Request</h1>
            <p>Hello ${name},</p>
            <p>Thank you for requesting a free design. We have received your request and will get back to you as soon as possible. Here is a copy of your submission:</p>
            <p><strong>Website:</strong> ${website}</p>
            <p><strong>Social:</strong> ${social} @${socialUsername}</p>
            <p><strong>Monthly Visits:</strong> ${monthly_visits}</p>
            <p><strong>Referral Source:</strong> ${referral_source}</p>
            <p>You can schedule your free design review using the following link:</p>
            <p><a href="https://calendly.com/relaydigitalyyc/free-design">Book your design review</a></p>
            <p>Best regards,</p>
            <p>Relay Digital</p>
          </div>
        `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.error("Relay design mail delivery failed");
    return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
  }
}
