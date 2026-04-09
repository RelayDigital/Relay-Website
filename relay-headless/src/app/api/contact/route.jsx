import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

// Handles POST requests to /api
export async function POST(request) {
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const project = formData.get("project");
  const message = formData.get("message");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.relaydigital.agency",
    // port: 587,
    // secure: false,
    // tls: {
    //   // ciphers: "SSLv3",
    //   rejectUnauthorized: false,
    // },
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    // Send email to site owner
    await transporter.sendMail({
      from: `"Relay Digital" <hello@relaydigital.agency>`,
      to: myEmail,
      replyTo: email,
      subject: `Website activity from ${email}`,
      html: `
          <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
            <h1>Contact Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${project}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
        `,
    });

    // Send confirmation email to the submitter
    await transporter.sendMail({
      from: `"Relay Digital" <hello@relaydigital.agency>`,
      to: email,
      subject: `Confirmation of Your Contact Request`,
      html: `
          <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
            <h1>Thank You for Your Contact Request</h1>
            <p>Hello ${name},</p>
            <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible. Here is a copy of your submission:</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
            <p>Best regards,</p>
            <p>Relay Digital</p>
          </div>
        `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" });
  }
}
