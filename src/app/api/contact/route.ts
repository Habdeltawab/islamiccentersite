import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

// =============================================================================
// Types
// =============================================================================

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactSubmission extends ContactFormData {
  id: string;
  submittedAt: string;
  ipHash?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

// =============================================================================
// Validation
// =============================================================================

const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[\p{L}\p{M}\s\-'.]+$/u, // Unicode letters, spaces, hyphens, apostrophes, periods
  },
  email: {
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subject: {
    allowedValues: ["general", "prayer", "education", "events", "donation", "other"],
  },
  message: {
    minLength: 10,
    maxLength: 5000,
  },
} as const;

function validateContactForm(data: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Type check
  if (!data || typeof data !== "object") {
    return { valid: false, errors: { _form: "Invalid form data" } };
  }
  
  const formData = data as Record<string, unknown>;
  
  // Name validation
  const name = String(formData.name || "").trim();
  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < VALIDATION_RULES.name.minLength) {
    errors.name = `Name must be at least ${VALIDATION_RULES.name.minLength} characters`;
  } else if (name.length > VALIDATION_RULES.name.maxLength) {
    errors.name = `Name must be less than ${VALIDATION_RULES.name.maxLength} characters`;
  } else if (!VALIDATION_RULES.name.pattern.test(name)) {
    errors.name = "Name contains invalid characters";
  }
  
  // Email validation
  const email = String(formData.email || "").trim().toLowerCase();
  if (!email) {
    errors.email = "Email is required";
  } else if (email.length > VALIDATION_RULES.email.maxLength) {
    errors.email = "Email address is too long";
  } else if (!VALIDATION_RULES.email.pattern.test(email)) {
    errors.email = "Please enter a valid email address";
  }
  
  // Subject validation
  const subject = String(formData.subject || "").trim();
  if (!subject) {
    errors.subject = "Please select a subject";
  } else if (!VALIDATION_RULES.subject.allowedValues.includes(subject as typeof VALIDATION_RULES.subject.allowedValues[number])) {
    errors.subject = "Invalid subject selected";
  }
  
  // Message validation
  const message = String(formData.message || "").trim();
  if (!message) {
    errors.message = "Message is required";
  } else if (message.length < VALIDATION_RULES.message.minLength) {
    errors.message = `Message must be at least ${VALIDATION_RULES.message.minLength} characters`;
  } else if (message.length > VALIDATION_RULES.message.maxLength) {
    errors.message = `Message must be less than ${VALIDATION_RULES.message.maxLength} characters`;
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function sanitizeInput(str: string): string {
  return str
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// =============================================================================
// Rate Limiting (In-Memory for Development)
// =============================================================================

/**
 * Simple in-memory rate limiter for development.
 * 
 * FOR PRODUCTION: Replace with a distributed solution:
 * - Redis-based rate limiting (recommended)
 * - Cloudflare Rate Limiting rules
 * - Upstash Redis (serverless-friendly)
 * 
 * Example production implementation:
 * ```typescript
 * import { Ratelimit } from "@upstash/ratelimit";
 * import { Redis } from "@upstash/redis";
 * 
 * const ratelimit = new Ratelimit({
 *   redis: Redis.fromEnv(),
 *   limiter: Ratelimit.slidingWindow(5, "1 h"),
 *   analytics: true,
 * });
 * 
 * const { success, limit, remaining, reset } = await ratelimit.limit(identifier);
 * ```
 */

interface RateLimitEntry {
  count: number;
  firstRequest: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT = {
  maxRequests: 5,          // Max submissions per window
  windowMs: 60 * 60 * 1000, // 1 hour window
} as const;

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  // Clean up expired entries periodically (simple cleanup)
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now - value.firstRequest > RATE_LIMIT.windowMs) {
        rateLimitStore.delete(key);
      }
    }
  }
  
  if (!entry || now - entry.firstRequest > RATE_LIMIT.windowMs) {
    // New window
    rateLimitStore.set(identifier, { count: 1, firstRequest: now });
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1, resetIn: RATE_LIMIT.windowMs };
  }
  
  if (entry.count >= RATE_LIMIT.maxRequests) {
    const resetIn = RATE_LIMIT.windowMs - (now - entry.firstRequest);
    return { allowed: false, remaining: 0, resetIn };
  }
  
  entry.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT.maxRequests - entry.count,
    resetIn: RATE_LIMIT.windowMs - (now - entry.firstRequest),
  };
}

function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (works behind proxies)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfIp = request.headers.get("cf-connecting-ip"); // Cloudflare
  
  const ip = cfIp || realIp || forwarded?.split(",")[0]?.trim() || "unknown";
  
  // Hash the IP for privacy (simple hash for development)
  // FOR PRODUCTION: Use crypto.subtle.digest for proper hashing
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `ip_${Math.abs(hash).toString(16)}`;
}

// =============================================================================
// Contact Service Abstraction
// =============================================================================

/**
 * Contact submission handler abstraction.
 * Swap implementations based on environment or configuration.
 * 
 * FOR PRODUCTION: Implement email delivery:
 * 
 * SendGrid example:
 * ```typescript
 * import sgMail from "@sendgrid/mail";
 * 
 * sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
 * 
 * async function sendContactEmail(submission: ContactSubmission): Promise<void> {
 *   await sgMail.send({
 *     to: "contact@islamiccenterankeny.org",
 *     from: "noreply@islamiccenterankeny.org",
 *     replyTo: submission.email,
 *     subject: `[Contact Form] ${submission.subject} from ${submission.name}`,
 *     text: `Name: ${submission.name}\nEmail: ${submission.email}\n\n${submission.message}`,
 *     html: `<p><strong>From:</strong> ${submission.name} (${submission.email})</p>
 *            <p><strong>Subject:</strong> ${submission.subject}</p>
 *            <hr/>
 *            <p>${submission.message.replace(/\n/g, "<br/>")}</p>`,
 *   });
 * }
 * ```
 * 
 * Resend example:
 * ```typescript
 * import { Resend } from "resend";
 * 
 * const resend = new Resend(process.env.RESEND_API_KEY);
 * 
 * async function sendContactEmail(submission: ContactSubmission): Promise<void> {
 *   await resend.emails.send({
 *     from: "Islamic Center <noreply@islamiccenterankeny.org>",
 *     to: ["contact@islamiccenterankeny.org"],
 *     reply_to: submission.email,
 *     subject: `[Contact Form] ${submission.subject}`,
 *     text: `From: ${submission.name}\n\n${submission.message}`,
 *   });
 * }
 * ```
 */

interface ContactServiceResult {
  success: boolean;
  message: string;
  submissionId?: string;
}

async function handleContactSubmission(
  submission: ContactSubmission
): Promise<ContactServiceResult> {
  const isProduction = process.env.NODE_ENV === "production";
  
  if (isProduction) {
    // ==========================================================================
    // PRODUCTION: Email delivery
    // ==========================================================================
    // TODO: Uncomment and configure your email service:
    // 
    // try {
    //   await sendContactEmail(submission);
    //   return { success: true, message: "Message sent successfully", submissionId: submission.id };
    // } catch (error) {
    //   console.error("Failed to send email:", error);
    //   throw new Error("Failed to send your message. Please try again.");
    // }
    
    // For now, just log in production
    console.log("[PRODUCTION] Contact form submission:", {
      id: submission.id,
      name: submission.name,
      email: submission.email,
      subject: submission.subject,
      messageLength: submission.message.length,
      submittedAt: submission.submittedAt,
    });
    
    return {
      success: true,
      message: "Thank you for your message. We will get back to you soon!",
      submissionId: submission.id,
    };
  } else {
    // ==========================================================================
    // DEVELOPMENT: Store to local JSON file
    // ==========================================================================
    const submissionsDir = path.join(process.cwd(), "contact-submissions");
    const submissionsFile = path.join(submissionsDir, "submissions.json");
    
    try {
      await mkdir(submissionsDir, { recursive: true });
    } catch {
      // Directory exists
    }
    
    // Read existing submissions
    let submissions: ContactSubmission[] = [];
    try {
      const existing = await readFile(submissionsFile, "utf-8");
      submissions = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }
    
    // Append new submission
    submissions.push(submission);
    
    // Write back
    await writeFile(submissionsFile, JSON.stringify(submissions, null, 2));
    
    // Also log to console for visibility
    console.log("\n📧 New contact form submission:");
    console.log("─".repeat(50));
    console.log(`ID:      ${submission.id}`);
    console.log(`Name:    ${submission.name}`);
    console.log(`Email:   ${submission.email}`);
    console.log(`Subject: ${submission.subject}`);
    console.log(`Time:    ${submission.submittedAt}`);
    console.log("─".repeat(50));
    console.log(`Message:\n${submission.message}`);
    console.log("─".repeat(50));
    console.log(`📁 Saved to: ${submissionsFile}\n`);
    
    return {
      success: true,
      message: "Thank you for your message. We will get back to you soon!",
      submissionId: submission.id,
    };
  }
}

// =============================================================================
// API Route Handler
// =============================================================================

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = checkRateLimit(clientId);
    
    if (!rateLimit.allowed) {
      const resetMinutes = Math.ceil(rateLimit.resetIn / 60000);
      return NextResponse.json(
        { 
          error: `Too many submissions. Please try again in ${resetMinutes} minutes.`,
          retryAfter: Math.ceil(rateLimit.resetIn / 1000),
        },
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
    
    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
    
    // Validate input
    const validation = validateContactForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }
    
    const formData = body as ContactFormData;
    
    // Create sanitized submission
    const submission: ContactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: sanitizeInput(formData.name),
      email: formData.email.trim().toLowerCase(),
      subject: formData.subject.trim(),
      message: sanitizeInput(formData.message),
      submittedAt: new Date().toISOString(),
      ipHash: clientId,
    };
    
    // Handle submission
    const result = await handleContactSubmission(submission);
    
    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
      },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process your message. Please try again." },
      { status: 500 }
    );
  }
}
