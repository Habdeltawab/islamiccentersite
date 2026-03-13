import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Create submission object
    const submission = {
      id: Date.now().toString(),
      ...body,
      submittedAt: new Date().toISOString(),
    };

    // In development, store submissions locally
    // In production, this would be replaced with email sending or database storage
    if (process.env.NODE_ENV === "development") {
      const submissionsDir = path.join(process.cwd(), "contact-submissions");
      
      try {
        await mkdir(submissionsDir, { recursive: true });
      } catch {
        // Directory might already exist, that's fine
      }

      const filename = `${submission.id}.json`;
      const filepath = path.join(submissionsDir, filename);
      
      await writeFile(filepath, JSON.stringify(submission, null, 2));
      
      console.log("Contact form submission saved:", submission);
    } else {
      // Production: Log the submission (replace with email service integration)
      // TODO: Integrate with email service (e.g., SendGrid, Resend, etc.)
      console.log("Contact form submission received:", submission);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We will get back to you soon!",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process your message. Please try again." },
      { status: 500 }
    );
  }
}
