import type { Metadata } from "next";
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
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <p className="text-emerald-300 text-sm font-semibold uppercase tracking-widest mb-2">
            {MASJID_INFO.city}, {MASJID_INFO.state}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Prayer Times
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 p-6 sm:p-8">
          <PrayerTimesDisplay initialData={prayerData} />
        </div>

        {/* Footer */}
        <div className="mt-8 pb-10">
          <p className="text-xs text-slate-400 text-center">
            Prayer times provided by{" "}
            <a
              href="https://masjidal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-700 underline underline-offset-2 transition-colors"
            >
              MasjidAl
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
