// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { status: 400, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Here, you would typically:
    // 1. Send an email using a service like Nodemailer, SendGrid, etc.
    // 2. Save the message to a database
    // 3. Integrate with a CRM or ticketing system
    console.log("Contact form submission:", { name, email, message });

    // For demo purposes, return a success response
    return NextResponse.json({ status: 200, message: "Message sent successfully" });
  } catch (error: any) {
    console.error("Error processing contact form:", error.message);
    return NextResponse.json(
      { status: 500, error: "Failed to process message" },
      { status: 500 }
    );
  }
}