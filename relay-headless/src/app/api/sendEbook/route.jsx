// pages/api/sendEbook.js

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const username = process.env.SMTP_USERNAME;
  const password = process.env.SMTP_PASSWORD;
  const myEmail = process.env.CONTACT_INBOX_EMAIL;
  if (!username || !password || !myEmail) {
    return NextResponse.json({ message: "Mail delivery unavailable" }, { status: 503 });
  }

  const { email } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    // Send confirmation email to the site owner
    await transporter.sendMail({
      from: `"Relay Digital" <relaydigitalyyc@gmail.com>`, // Alias
      to: myEmail,
      replyTo: email,
      subject: `Ebook request from ${email}`,
      html: `
        <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
          <h1>Ebook Request Notification</h1>
          <p>An ebook request was made by the following email:</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        </div>
      `,
    });

    // Send ebook email to the user
    await transporter.sendMail({
      from: `"Relay Digital" <relaydigitalyyc@gmail.com>`, // Alias
      to: email, // Note this change to send to the submitter
      subject: `Your Free Ebook Download`,
      html: `
        <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
          <h1>Thank you for requesting our ebook!</h1>
          <p>Please find the download link below:</p>
          <p><a href="https://drive.google.com/uc?export=download&id=1ejqyBmSynDZcevGNv3aiKaROETa2JAmV">Download your ebook</a></p>
          <p>Best regards,</p>
          <p>Relay Digital</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.error("Relay ebook mail delivery failed");
    return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
  }
}
