"use client";

import { useState, useCallback } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

// Validation rules (should match server-side)
const VALIDATION = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
  subjects: ["general", "prayer", "education", "events", "donation", "other"],
} as const;

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  
  // Name
  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < VALIDATION.name.min) {
    errors.name = `Name must be at least ${VALIDATION.name.min} characters`;
  } else if (data.name.trim().length > VALIDATION.name.max) {
    errors.name = `Name must be less than ${VALIDATION.name.max} characters`;
  }
  
  // Email
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (data.email.length > VALIDATION.email.max) {
    errors.email = "Email address is too long";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  // Subject
  if (!data.subject) {
    errors.subject = "Please select a subject";
  }
  
  // Message
  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < VALIDATION.message.min) {
    errors.message = `Message must be at least ${VALIDATION.message.min} characters`;
  } else if (data.message.trim().length > VALIDATION.message.max) {
    errors.message = `Message must be less than ${VALIDATION.message.max} characters`;
  }
  
  return errors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate single field on blur
    const fieldErrors = validateForm(formData);
    if (fieldErrors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }));
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: data.message || "Thank you for your message! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTouched({});
        setErrors({});
      } else if (response.status === 429) {
        setStatus({
          type: "error",
          message: data.error || "Too many submissions. Please try again later.",
        });
      } else if (data.errors) {
        // Server validation errors
        setErrors(data.errors);
        setStatus({
          type: "error",
          message: "Please fix the errors below.",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  const getFieldClassName = (fieldName: keyof FormErrors) => {
    const baseClass = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors";
    const hasError = touched[fieldName] && errors[fieldName];
    return `${baseClass} ${hasError ? "border-red-300 bg-red-50" : "border-gray-300"}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Status Messages */}
      {status.type === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{status.message}</span>
        </div>
      )}
      {status.type === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{status.message}</span>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          maxLength={VALIDATION.name.max}
          className={getFieldClassName("name")}
          placeholder="Your full name"
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={touched.name && !!errors.name}
        />
        {touched.name && errors.name && (
          <p id="name-error" className="mt-1.5 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          maxLength={VALIDATION.email.max}
          className={getFieldClassName("email")}
          placeholder="you@example.com"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={touched.email && !!errors.email}
        />
        {touched.email && errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={`${getFieldClassName("subject")} bg-white`}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          aria-invalid={touched.subject && !!errors.subject}
        >
          <option value="">Select a subject...</option>
          <option value="general">General Inquiry</option>
          <option value="prayer">Prayer Times / Schedule</option>
          <option value="education">Classes / Education</option>
          <option value="events">Events / Community</option>
          <option value="donation">Donations</option>
          <option value="other">Other</option>
        </select>
        {touched.subject && errors.subject && (
          <p id="subject-error" className="mt-1.5 text-sm text-red-600">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          rows={5}
          maxLength={VALIDATION.message.max}
          className={`${getFieldClassName("message")} resize-none`}
          placeholder="How can we help you? (minimum 10 characters)"
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          aria-invalid={touched.message && !!errors.message}
        />
        <div className="flex justify-between mt-1.5">
          {touched.message && errors.message ? (
            <p id="message-error" className="text-sm text-red-600">
              {errors.message}
            </p>
          ) : (
            <p id="message-hint" className="text-sm text-gray-500">
              Minimum 10 characters
            </p>
          )}
          <span className="text-sm text-gray-400">
            {formData.message.length}/{VALIDATION.message.max}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status.type === "loading"}
        className="w-full bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status.type === "loading" ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Message
          </>
        )}
      </button>
      
      <p className="text-xs text-gray-500 text-center">
        We typically respond within 1-2 business days.
      </p>
    </form>
  );
}
