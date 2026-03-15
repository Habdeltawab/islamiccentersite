import type { Metadata } from "next";
import PrayerTimesDisplay from "./PrayerTimesDisplay";
import {
  fetchPrayerTimes,
  ANKENY_COORDS,
} from "@/lib/prayer-times";

export const metadata: Metadata = {
  title: "Prayer Times | Ankeny Muslim Community Center",
  description: "Daily prayer times for Ankeny, Iowa. Fajr, Dhuhr, Asr, Maghrib, and Isha times using ISNA calculation method.",
};

// Revalidate every hour on the server
export const revalidate = 3600;

async function getPrayerTimes() {
  try {
    const data = await fetchPrayerTimes(new Date());
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
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-2">
            {ANKENY_COORDS.city}, {ANKENY_COORDS.state}
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Prayer Times
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <PrayerTimesDisplay initialData={prayerData} />

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center">
            Calculated using ISNA method via{" "}
            <a
              href="https://aladhan.com/prayer-times-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-900 underline underline-offset-2"
            >
              AlAdhan API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
