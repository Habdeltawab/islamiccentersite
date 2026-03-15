import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Ankeny Muslim Community Center",
  description: "Get in touch with the Ankeny Muslim Community Center.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-900">
        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
          <p className="text-sm font-medium text-emerald-400 uppercase tracking-widest mb-4">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Contact Us
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl">
            We welcome your questions, feedback, and inquiries. Reach out to us through any of the channels below.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="mx-auto max-w-4xl px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <a 
            href="mailto:info@ankenymuslimcommunity.org"
            className="group bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Email</h2>
            <p className="text-emerald-600 group-hover:text-emerald-700">
              info@ankenymuslimcommunity.org
            </p>
          </a>

          {/* Phone Card */}
          <a 
            href="tel:+15159920296"
            className="group bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Phone</h2>
            <p className="text-emerald-600 group-hover:text-emerald-700">
              (515) 992-0296
            </p>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Location */}
          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
              Location
            </h2>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Ankeny Muslim Community Center
            </h3>
            <p className="text-slate-600 mb-6">
              Ankeny, Iowa 50021
            </p>
            <p className="text-sm text-slate-500">
              Our center serves the Muslim community in Ankeny and the greater Des Moines area.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
              Hours
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Monday – Friday</span>
                <span className="text-slate-900 font-medium">9:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Saturday – Sunday</span>
                <span className="text-slate-900 font-medium">10:00 AM – 2:00 PM</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              The center is open for all five daily prayers. View our{" "}
              <Link href="/prayer-times" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                prayer schedule
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Support Our Community
            </h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              Your generous donations help us maintain our facilities and expand our programs.
            </p>
            <Link 
              href="/donate"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              Make a Donation
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
