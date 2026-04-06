import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Ankeny Muslim Community Center",
  description: "Get in touch with the Ankeny Muslim Community Center.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 relative overflow-hidden">
        {/* Subtle geometric texture */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-[0.2em] mb-5">
              Ankeny Muslim Community Center
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Get in Touch
            </h1>
            <p className="mt-5 text-base sm:text-lg text-emerald-100/60 leading-relaxed max-w-lg">
              Questions, feedback, or just want to connect — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* ── Primary Actions ── */}
      <section className="relative z-10 -mt-10 mx-auto max-w-5xl px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Email */}
          <a
            href="mailto:info@ankenymuslimcommunity.org"
            className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-200"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Email
            </p>
            <p className="text-sm font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">
              info@ankenymuslimcommunity.org
            </p>
            <svg className="absolute top-6 right-6 w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>

          {/* Phone */}
          <a
            href="tel:+15159920296"
            className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-200"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Phone
            </p>
            <p className="text-sm font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">
              (515) 992-0296
            </p>
            <svg className="absolute top-6 right-6 w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://chat.whatsapp.com/JcHjRVFHE5NAOwL9wF1cTI"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-green-200 transition-all duration-200"
          >
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
              <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              WhatsApp
            </p>
            <p className="text-sm font-medium text-slate-900 group-hover:text-green-700 transition-colors">
              Join our community group
            </p>
            <svg className="absolute top-6 right-6 w-4 h-4 text-slate-300 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Visit Us / Hours ── */}
      <section className="mx-auto max-w-5xl px-6 sm:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Location — wider column */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-6">
              Visit Us
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Ankeny Muslim Community Center
            </h3>
            <a
              href="https://maps.google.com/?q=110+SE+Grant+St+Suite+104+Ankeny+IA+50021"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2.5 text-slate-600 hover:text-emerald-700 transition-colors group mt-1"
            >
              <svg className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-base leading-relaxed font-medium group-hover:underline underline-offset-2">
                110 SE Grant St, Suite 104<br />Ankeny, IA 50021
              </span>
            </a>
            <p className="text-sm text-slate-500 mt-5 leading-relaxed max-w-md">
              Serving the Muslim community in Ankeny and the greater Des Moines area. All are welcome.
            </p>

            {/* Embedded map */}
            <div className="mt-8 rounded-xl overflow-hidden ring-1 ring-slate-200 aspect-[16/9] lg:aspect-[2/1]">
              <iframe
                title="Ankeny Muslim Community Center location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.8!2d-93.6048!3d41.7318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ee7112c0eb5b7d%3A0x0!2s110+SE+Grant+St%2C+Ankeny%2C+IA+50021!5e0!3m2!1sen!2sus!4v1"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Hours — narrower column */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-6">
              Hours
            </h2>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="space-y-0 divide-y divide-slate-200">
                <div className="flex justify-between items-center py-3.5 first:pt-0">
                  <span className="text-sm text-slate-600">Mon – Fri</span>
                  <span className="text-sm font-semibold text-slate-900">9:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3.5 last:pb-0">
                  <span className="text-sm text-slate-600">Sat – Sun</span>
                  <span className="text-sm font-semibold text-slate-900">10:00 AM – 2:00 PM</span>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Open for all 5 daily prayers</span>
                </div>
                <p className="text-sm text-slate-500">
                  View our{" "}
                  <Link
                    href="/prayer-times"
                    className="font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-2 decoration-emerald-300 hover:decoration-emerald-500 transition-colors"
                  >
                    prayer schedule
                  </Link>{" "}
                  for today&apos;s times.
                </p>
              </div>
            </div>

            {/* Quick contact sidebar */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">
                Quick Contact
              </h3>
              <div className="space-y-3">
                <a href="mailto:info@ankenymuslimcommunity.org" className="flex items-center gap-3 text-sm text-slate-600 hover:text-emerald-700 transition-colors">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  info@ankenymuslimcommunity.org
                </a>
                <a href="tel:+15159920296" className="flex items-center gap-3 text-sm text-slate-600 hover:text-emerald-700 transition-colors">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  (515) 992-0296
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 py-16 sm:py-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Support Our Community
              </h2>
              <p className="mt-1.5 text-slate-500 text-sm sm:text-base max-w-md">
                Your generosity helps us maintain our center and expand programs for the community.
              </p>
            </div>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all shrink-0"
            >
              Make a Donation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
