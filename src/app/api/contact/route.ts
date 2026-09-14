import { NextResponse } from "next/server";
import Brevo from "@sendinblue/client";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, ...rest } = body;
    function formatRestAsHtml(
      rest: Record<string, string | number | boolean>
    ): string {
      return Object.entries(rest)
        .map(([key, value]) => {
          const label = key.charAt(0).toUpperCase() + key.slice(1);
          return `<p><strong>${label} :</strong> ${value}</p>`;
        })
        .join("");
    }
    const supplementaryHtml = formatRestAsHtml(rest);
    // Ensure required fields are provided
    // if (!name || !email || !message) {
    //   return NextResponse.json(
    //     { message: "Name, email, and message are required." },
    //     { status: 400 }
    //   );
    // }
    const apiInstance = new Brevo.TransactionalEmailsApi();

    const apiKey = process.env.SENDINBLUE_API_KEY;

if (!apiKey) {
  throw new Error("SENDINBLUE_API_KEY is not configured");
}

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  apiKey
);
    // Prepare the email parameters
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.subject = `New contact form submission from ${name}`;
    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h1>You have a new contact form submission:</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
           ${supplementaryHtml}
        </body>
      </html>
    `;
    sendSmtpEmail.sender = {
      name: "Arora Group Website",
      email: "Aroragroupwebsite@gmail.com",
    };
    sendSmtpEmail.to = [
      { email: "Shivamarora@gmail.com", name: "Shivam Arora" },
    ];

    // Send the email using Brevo API
    // await apiInstance.sendTransacEmail(sendSmtpEmail);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { message: "Error sending message", error: error },
      { status: 500 }
    );
  }
}
