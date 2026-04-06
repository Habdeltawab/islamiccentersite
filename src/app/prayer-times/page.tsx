import type { Metadata } from "next";
import Link from "next/link";
import PrayerTimesDisplay from "./PrayerTimesDisplay";
import {
  fetchPrayerTimes,
  MASJID_INFO,
} from "@/lib/prayer-times";

export const metadata: Metadata = {
  title: "Prayer Times | Ankeny Muslim Community Center",
  description: "Daily prayer times for Ankeny, Iowa. Adhan and Iqamah times updated automatically.",
};

// Revalidate every hour on the server
export const revalidate = 3600;

async function getPrayerTimes() {
  try {
    const data = await fetchPrayerTimes();
    return data;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
}

export default async function PrayerTimesPage() {
  const prayerData = await getPrayerTimes();

  return (
    <div className="bg-slate-50">
      {/* ── Compact Hero ── */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 pt-12 sm:pt-16 pb-20 sm:pb-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-emerald-300 uppercase tracking-[0.2em] mb-3">
                {MASJID_INFO.city}, {MASJID_INFO.state}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Prayer Times
              </h1>
            </div>
            <p className="hidden sm:block text-sm text-emerald-200/50">
              Updated automatically via MasjidAl
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="relative z-10 -mt-12 mx-auto max-w-6xl px-6 sm:px-8 pb-16">
        <PrayerTimesDisplay initialData={prayerData} />
      </div>

      {/* ── CTA ── */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 py-12 sm:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Support Our Community
              </h2>
              <p className="mt-1 text-slate-500 text-sm max-w-md">
                Your generosity helps us maintain our center and expand programs.
              </p>
            </div>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all shrink-0"
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
