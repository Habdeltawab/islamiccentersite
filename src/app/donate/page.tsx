import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate | Ankeny Muslim Community Center",
  description: "Support the Ankeny Muslim Community Center with your generous donations.",
};

/* ── Inline SVG logos ── */

function GivebutterLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none">
      <path d="M13.2613 0.446335H4.60925C2.30892 0.446335 0.446335 2.30892 0.446335 4.60925V13.2613C0.446335 15.5616 2.30892 17.4242 4.60925 17.4242H13.2613C15.5616 17.4242 17.4242 15.5616 17.4242 13.2613V4.60925C17.4242 2.30892 15.5616 0.446335 13.2613 0.446335Z" fill="#FFBF00"/>
      <path d="M12.7119 16.4714H12.7377C14.1539 16.4714 15.3041 15.0208 15.3041 13.2355V4.62642C15.3041 2.84109 14.1539 1.39051 12.7377 1.39051H12.7119L13.0209 0.29184H13.0467C14.9436 0.29184 16.48 2.23167 16.48 4.62642V13.2441C16.48 15.6388 14.9436 17.5787 13.0467 17.5787H13.0209L12.7119 16.4714Z" fill="#D89500"/>
      <path d="M4.841 16.4714H5.12425C3.708 16.4714 2.55783 15.0208 2.55783 13.2355V4.62642C2.55783 2.84109 3.708 1.39051 5.12425 1.39051H4.841V0.29184H4.81525C2.91833 0.29184 1.38191 2.23167 1.38191 4.62642V13.2441C1.38191 15.6388 2.91833 17.5787 4.81525 17.5787H4.841V16.4714Z" fill="#D89500"/>
      <path d="M8.91808 14.6603C7.39025 14.6603 6.04266 13.493 5.7165 11.8879C5.69933 11.8021 5.70791 11.7162 5.73366 11.6304C5.75941 11.5446 5.81091 11.4759 5.871 11.4158C5.93108 11.3557 6.01691 11.3214 6.09416 11.2957C6.18 11.2785 6.26583 11.2785 6.35166 11.3042C7.06408 11.5274 8.11125 11.8192 8.92666 11.8192C9.80216 11.8192 10.4545 11.5446 11.1412 11.2527C11.2442 11.2098 11.3557 11.1669 11.4587 11.124C11.536 11.0897 11.6304 11.0811 11.7162 11.0897C11.8021 11.0982 11.8879 11.1326 11.9566 11.1927C12.0252 11.2442 12.0767 11.3214 12.1111 11.3987C12.1454 11.4759 12.154 11.5703 12.1454 11.6562C11.9137 13.3728 10.5232 14.6603 8.91808 14.6603Z" fill="#222222"/>
      <path d="M10.2142 13.0638C10.3601 13.0638 10.4545 13.2355 10.3687 13.3471C10.2399 13.5273 10.0768 13.6818 9.88801 13.802C9.60476 13.9823 9.27859 14.0767 8.94384 14.0767C8.60909 14.0767 8.28293 13.9823 7.99968 13.802C7.81084 13.6818 7.64776 13.5273 7.51901 13.3471C7.43318 13.2269 7.51901 13.0638 7.67351 13.0638H10.2142Z" fill="white"/>
      <path d="M13.3213 0H4.54917C2.04283 0 0 2.04283 0 4.54917V13.3213C0 15.8277 2.04283 17.8705 4.54917 17.8705H13.3213C15.8277 17.8705 17.8705 15.8277 17.8705 13.3213V4.54917C17.8619 2.04283 15.8277 0 13.3213 0ZM16.48 13.3213C16.48 15.0637 15.0637 16.4886 13.3127 16.4886H4.54917C2.80675 16.4886 1.38192 15.0723 1.38192 13.3213V4.54917C1.38192 2.80675 2.79817 1.38192 4.54917 1.38192H5.54483C6.00833 1.38192 6.39458 1.75958 6.39458 2.23167V2.97842C6.39458 3.4505 6.77225 3.82817 7.24433 3.82817C7.71642 3.82817 8.09408 3.4505 8.09408 2.97842V2.23167C8.09408 1.75958 8.47175 1.38192 8.94383 1.38192C9.40733 1.38192 9.79358 1.75958 9.79358 2.23167V4.23158C9.79358 4.70367 10.1712 5.08133 10.6433 5.08133C11.1154 5.08133 11.4931 4.70367 11.4931 4.23158V2.23167C11.4931 1.75958 11.8707 1.38192 12.3428 1.38192H13.3385C15.0809 1.38192 16.5057 2.79817 16.5057 4.54917V13.3213H16.48Z" fill="#222222"/>
      <path d="M12.3257 5.91393C12.2913 5.91393 12.2484 5.91393 12.2141 5.92251H12.2055C12.1969 5.92251 12.1883 5.93109 12.1798 5.93109C12.1626 5.93967 12.154 5.95684 12.154 5.97401C12.154 5.99117 12.1626 6.00834 12.1712 6.01692C12.1712 6.01692 12.1712 6.01692 12.1798 6.02551C12.4115 6.17142 12.5488 6.45467 12.4802 6.75509C12.4201 7.02976 12.1883 7.24434 11.9137 7.28726C11.6304 7.33018 11.3901 7.22718 11.2528 7.02118C11.2528 7.02118 11.2356 6.99542 11.2098 6.99542C11.1669 6.99542 11.1583 7.03834 11.1583 7.03834C11.124 7.16709 11.1154 7.27868 11.1154 7.41601C11.1154 8.24859 11.6562 8.92667 12.3257 8.92667C12.9952 8.92667 13.5359 8.24859 13.5359 7.41601C13.5359 6.59201 12.9952 5.91393 12.3257 5.91393Z" fill="#222222"/>
      <path d="M5.53625 5.91393C5.50192 5.91393 5.459 5.91393 5.42467 5.92251H5.41609C5.4075 5.92251 5.39892 5.93109 5.39034 5.93109C5.37317 5.93967 5.36459 5.95684 5.36459 5.97401C5.36459 5.99117 5.37317 6.00834 5.38175 6.01692C5.38175 6.01692 5.38175 6.01692 5.39034 6.02551C5.62209 6.17142 5.75942 6.45467 5.69075 6.75509C5.63067 7.02976 5.39892 7.24434 5.12425 7.28726C4.841 7.33018 4.60067 7.22718 4.46334 7.02118C4.46334 7.02118 4.44617 6.99542 4.42042 6.99542C4.3775 6.99542 4.36892 7.03834 4.36892 7.03834C4.33459 7.16709 4.326 7.27868 4.326 7.41601C4.326 8.24859 4.86675 8.92667 5.53625 8.92667C6.20575 8.92667 6.7465 8.24859 6.7465 7.41601C6.7465 6.59201 6.20575 5.91393 5.53625 5.91393Z" fill="#222222"/>
    </svg>
  );
}

function ZelleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="6 6 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#a0f" d="M35,42H13c-3.866,0-7-3.134-7-7V13c0-3.866,3.134-7,7-7h22c3.866,0,7,3.134,7,7v22C42,38.866,38.866,42,35,42z"/>
      <path fill="#fff" d="M17.5,18.5h14c0.552,0,1-0.448,1-1V15c0-0.552-0.448-1-1-1h-14c-0.552,0-1,0.448-1,1v2.5C16.5,18.052,16.948,18.5,17.5,18.5z"/>
      <path fill="#fff" d="M17,34.5h14.5c0.552,0,1-0.448,1-1V31c0-0.552-0.448-1-1-1H17c-0.552,0-1,0.448-1,1v2.5C16,34.052,16.448,34.5,17,34.5z"/>
      <path fill="#fff" d="M22.25,11v6c0,0.276,0.224,0.5,0.5,0.5h3.5c0.276,0,0.5-0.224,0.5-0.5v-6c0-0.276-0.224-0.5-0.5-0.5h-3.5C22.474,10.5,22.25,10.724,22.25,11z"/>
      <path fill="#fff" d="M22.25,32v6c0,0.276,0.224,0.5,0.5,0.5h3.5c0.276,0,0.5-0.224,0.5-0.5v-6c0-0.276-0.224-0.5-0.5-0.5h-3.5C22.474,31.5,22.25,31.724,22.25,32z"/>
      <path fill="#fff" d="M16.578,30.938H22l10.294-12.839c0.178-0.222,0.019-0.552-0.266-0.552H26.5L16.275,30.298C16.065,30.553,16.247,30.938,16.578,30.938z"/>
    </svg>
  );
}

function VenmoLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none">
      <rect width="512" height="512" rx="100" fill="#3D95CE" />
      <path d="M382.4 96c13.6 22.4 19.2 45.6 19.2 75.2 0 93.6-80 215.2-144.8 300.8H148.8L108 118.4l100-9.6 23.2 185.6c21.6-35.2 48-90.4 48-128 0-28-4.8-47.2-12.8-62.4L382.4 96z" fill="#fff"/>
    </svg>
  );
}

function CashAppLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none">
      <rect width="512" height="512" rx="100" fill="#00D632" />
      <path d="M302.7 175.5c12.4 10.8 18.5 25.3 18.5 43.5h-52.8c-1.2-14-9.7-21-25.5-21-10.3 0-17.4 4.3-21.3 12.8-2.6 5.6-2.6 12.8 1.6 18.3 4.3 5.6 14.7 10.5 31.3 14.8 27.3 7 46.2 17.3 56.7 30.8 10.5 13.5 13.5 28.6 9 45.3-4.5 16.7-15 29.7-31.3 39-16.4 9.3-35 14-55.9 14-25 0-45.5-7-61.5-21-16-14-24-33.3-24-57.8h55.2c0 11 3.5 19.4 10.5 25.3 7 5.8 15.7 8.8 26.2 8.8 11.5 0 20-3.5 25.5-10.5 4.5-5.6 5.3-12.5 2.5-20.8-2.8-8.2-13.2-14.8-31.3-19.8-28-7.7-47.3-18-58-30.8-10.7-12.8-13.4-28.4-8-46.8 5.4-18.4 16.4-31.6 33-39.8 16.5-8 34.2-12 53-12 22.3 0 40.5 7.3 54.6 19z" fill="#fff"/>
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 14h6" />
      <path d="M6 17h4" />
    </svg>
  );
}

/* ── Payment methods data ── */

const paymentMethods = [
  {
    name: "Givebutter",
    description: "Secure online donations with credit/debit card",
    detail: "Tip: Turn off both \"Tip Givebutter\" and \"Cover processing fees\" to keep 100% of your donation.",
    href: "https://givebutter.com/Amcc-general",
    color: "amber",
    Logo: GivebutterLogo,
  },
  {
    name: "Zelle",
    description: "Send directly from your bank app",
    detail: "515-708-7127",
    href: null,
    color: "purple",
    Logo: ZelleLogo,
  },
  {
    name: "Venmo",
    description: "Quick and easy mobile payments",
    detail: "@Ankeny-mcc",
    href: "https://venmo.com/Ankeny-mcc",
    color: "blue",
    Logo: VenmoLogo,
  },
  {
    name: "Cash App",
    description: "Fast mobile transfers",
    detail: "$AnkenyMcc",
    href: "https://cash.app/$AnkenyMcc",
    color: "green",
    Logo: CashAppLogo,
  },
];

const colorMap: Record<string, { bg: string; border: string; badge: string; hover: string }> = {
  amber:  { bg: "bg-amber-50",  border: "border-amber-200",  badge: "bg-amber-100 text-amber-800",   hover: "hover:border-amber-300 hover:shadow-md" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-100 text-purple-800", hover: "hover:border-purple-300 hover:shadow-md" },
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   badge: "bg-blue-100 text-blue-800",     hover: "hover:border-blue-300 hover:shadow-md" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  badge: "bg-green-100 text-green-800",   hover: "hover:border-green-300 hover:shadow-md" },
};

const donationTypes = [
  { title: "Zakat", description: "Obligatory charity distributed according to Islamic guidelines.", icon: "💎" },
  { title: "Sadaqah", description: "Voluntary charity given for the pleasure of Allah.", icon: "💝" },
  { title: "General Fund", description: "Supports center operations, utilities, and programs.", icon: "🏠" },
  { title: "Sadaqah Jariyah", description: "Ongoing charity providing continuous rewards.", icon: "🌱" },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28 text-center">
          <p className="text-emerald-200 text-lg font-medium mb-4 tracking-wide uppercase">Support Our Mission</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Your Generosity Makes a Difference
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Your donations help us maintain our facilities, expand our programs, and serve the Muslim community in Ankeny.
          </p>
        </div>
      </div>

      {/* Donation Options */}
      <div className="mx-auto max-w-5xl px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Donation Options</h2>
            <p className="text-slate-500 mt-2">Choose your preferred method to donate</p>
          </div>

          {/* Primary CTA — Givebutter */}
          <a
            href="https://givebutter.com/Amcc-general"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl mb-6 overflow-hidden shadow-lg hover:shadow-2xl transition-all group relative"
          >
            {/* Background */}
            <div className="bg-gradient-to-br from-[#FFBF00] via-[#FFD54F] to-[#FFBF00] p-7 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
                    <GivebutterLogo className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900 tracking-tight">Donate via Givebutter</p>
                    <p className="text-gray-800 text-base font-medium mt-1">Secure online donation — credit &amp; debit card accepted</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center group-hover:translate-x-1 transition-transform flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Tip banner */}
            <div className="bg-gray-900 px-7 py-4">
              <div className="flex items-center space-x-3">
                <span className="bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex-shrink-0">Important</span>
                <p className="text-white text-sm font-medium leading-snug">
                  Turn off <span className="underline underline-offset-2 decoration-amber-400">&quot;Tip Givebutter&quot;</span> and <span className="underline underline-offset-2 decoration-amber-400">&quot;Cover processing fees&quot;</span> to keep <span className="text-amber-400 font-bold">100%</span> of your donation.
                </p>
              </div>
            </div>
          </a>

          {/* Other Methods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Zelle */}
            <div className={`rounded-xl border ${colorMap.purple.border} ${colorMap.purple.bg} p-5 ${colorMap.purple.hover} transition-all`}>
              <div className="flex items-center justify-between">
                <ZelleLogo className="w-10 h-10 rounded-lg" />
              </div>
              <h3 className="font-semibold text-slate-900 mt-3">Zelle</h3>
              <p className="text-xs text-slate-500 mt-0.5">Send from your bank</p>
              <div className={`mt-3 inline-block text-sm font-mono font-medium px-2.5 py-1 rounded-md ${colorMap.purple.badge}`}>
                515-708-7127
              </div>
            </div>

            {/* Venmo */}
            <a
              href="https://venmo.com/Ankeny-mcc"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl border ${colorMap.blue.border} ${colorMap.blue.bg} p-5 ${colorMap.blue.hover} transition-all group block`}
            >
              <div className="flex items-center justify-between">
                <VenmoLogo className="w-10 h-10 rounded-lg" />
                <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mt-3">Venmo</h3>
              <p className="text-xs text-slate-500 mt-0.5">Mobile payment</p>
              <div className={`mt-3 inline-block text-sm font-mono font-medium px-2.5 py-1 rounded-md ${colorMap.blue.badge}`}>
                @Ankeny-mcc
              </div>
            </a>

            {/* Cash App */}
            <a
              href="https://cash.app/$AnkenyMcc"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl border ${colorMap.green.border} ${colorMap.green.bg} p-5 ${colorMap.green.hover} transition-all group block`}
            >
              <div className="flex items-center justify-between">
                <CashAppLogo className="w-10 h-10 rounded-lg" />
                <svg className="w-4 h-4 text-slate-400 group-hover:text-green-600 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mt-3">Cash App</h3>
              <p className="text-xs text-slate-500 mt-0.5">Mobile transfer</p>
              <div className={`mt-3 inline-block text-sm font-mono font-medium px-2.5 py-1 rounded-md ${colorMap.green.badge}`}>
                $AnkenyMcc
              </div>
            </a>

            {/* Check */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-600">
                <CheckIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 mt-3">Check</h3>
              <p className="text-xs text-slate-500 mt-0.5">Mail to our address</p>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                Payable to<br />
                <span className="font-medium text-slate-800">Ankeny Muslim Community Center</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Types of Donations */}
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-2">Ways to Give</p>
          <h2 className="text-3xl font-bold text-slate-900">Types of Donations</h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto">Choose how you would like your donation to be used.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationTypes.map((type) => (
            <div key={type.title} className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-md hover:border-slate-300 transition-all">
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{type.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hadith Quote */}
      <div className="bg-emerald-50 border-y border-emerald-100">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <blockquote className="text-xl md:text-2xl text-slate-800 italic mb-4">
            &ldquo;The believer&apos;s shade on the Day of Resurrection will be their charity.&rdquo;
          </blockquote>
          <cite className="text-emerald-700 font-semibold">— Prophet Muhammad ﷺ (Tirmidhi)</cite>
        </div>
      </div>

      {/* Tax Info + Contact */}
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Tax-Deductible Donations</h2>
        <p className="text-slate-600 leading-relaxed mb-8">
          The Ankeny Muslim Community Center is a registered 501(c)(3) non-profit organization.
          All donations are tax-deductible to the extent allowed by law.
          You will receive a receipt for your tax records.
        </p>
        <p className="text-slate-500">
          Questions about donations?{" "}
          <Link href="/contact" className="text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
