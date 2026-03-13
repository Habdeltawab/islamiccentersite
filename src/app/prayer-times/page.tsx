import type { Metadata } from "next";
import PrayerTimesDisplay from "./PrayerTimesDisplay";

export const metadata: Metadata = {
  title: "Prayer Times | Islamic Center of Ankeny",
  description: "Daily prayer times for Ankeny, Iowa. Fajr, Dhuhr, Asr, Maghrib, and Isha times.",
};

// Ankeny, Iowa coordinates
const ANKENY_LAT = 41.7318;
const ANKENY_LON = -93.6001;
const CALCULATION_METHOD = 2; // ISNA

async function getPrayerTimes() {
  const today = new Date();
  const date = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;
  
  const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${ANKENY_LAT}&longitude=${ANKENY_LON}&method=${CALCULATION_METHOD}`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch prayer times");
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
}

export default async function PrayerTimesPage() {
  const prayerData = await getPrayerTimes();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prayer Times</h1>
          <p className="text-xl text-gray-600">
            Daily prayer times for Ankeny, Iowa
          </p>
        </div>

        <PrayerTimesDisplay prayerData={prayerData} />

        {/* Additional Info */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About Our Prayer Times</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Calculation Method: Islamic Society of North America (ISNA)</li>
            <li>• Location: Ankeny, Iowa (41.7318°N, 93.6001°W)</li>
            <li>• Times are automatically updated daily</li>
            <li>• Jummah prayer is held every Friday</li>
          </ul>
        </div>

        {/* Jummah Info */}
        <div className="mt-8 bg-emerald-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-emerald-900 mb-4">🕌 Jummah Prayer (Friday)</h2>
          <div className="text-gray-700">
            <p><strong>Khutbah:</strong> 1:00 PM</p>
            <p><strong>Prayer:</strong> 1:30 PM</p>
            <p className="mt-2 text-sm text-gray-600">
              Please arrive early to secure parking and seating.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
