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
          <a
            href="https://maps.google.com/?q=110+SE+Grant+St+Ankeny+IA+50021"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-lg font-medium text-white underline underline-offset-4 decoration-emerald-400 hover:decoration-white transition-colors"
          >
            📍 110 SE Grant St, Ankeny, IA 50021 — Suite 104
          </a>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="mx-auto max-w-4xl px-6 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* WhatsApp Card */}
          <a 
            href="https://chat.whatsapp.com/JcHjRVFHE5NAOwL9wF1cTI"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">WhatsApp Community</h2>
            <p className="text-green-600 group-hover:text-green-700">
              Join our group
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
            <a
              href="https://maps.google.com/?q=110+SE+Grant+St+Ankeny+IA+50021"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 font-medium"
            >
              110 SE Grant St, Suite 104<br />
              Ankeny, IA 50021
            </a>
            <p className="text-sm text-slate-500 mt-6">
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
