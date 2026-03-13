import type { Metadata } from "next";
import PrayerTimesDisplay from "./PrayerTimesDisplay";
import {
  fetchPrayerTimes,
  ANKENY_COORDS,
} from "@/lib/prayer-times";

export const metadata: Metadata = {
  title: "Prayer Times | Islamic Center of Ankeny",
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
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prayer Times</h1>
          <p className="text-xl text-gray-600">
            Daily prayer times for {ANKENY_COORDS.city}, {ANKENY_COORDS.state}
          </p>
        </div>

        {/* Prayer Times Component */}
        <PrayerTimesDisplay initialData={prayerData} />

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calculation Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">⚙️</span>
              Calculation Details
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>
                  <strong>Method:</strong> Islamic Society of North America (ISNA)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>
                  <strong>Location:</strong> {ANKENY_COORDS.city}, {ANKENY_COORDS.state}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>
                  <strong>Coordinates:</strong> {ANKENY_COORDS.latitude}°N, {Math.abs(ANKENY_COORDS.longitude)}°W
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>
                  <strong>Timezone:</strong> {ANKENY_COORDS.timezone}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>
                  <strong>Fajr Angle:</strong> 15° | <strong>Isha Angle:</strong> 15°
                </span>
              </li>
            </ul>
          </div>

          {/* Jummah Info */}
          <div className="bg-emerald-50 rounded-xl p-6 shadow-sm border border-emerald-100">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
              <span className="mr-2">🕌</span>
              Jummah Prayer (Friday)
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                <span className="font-medium">First Khutbah</span>
                <span className="text-emerald-700 font-bold">1:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                <span className="font-medium">First Prayer</span>
                <span className="text-emerald-700 font-bold">1:30 PM</span>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Please arrive early to secure parking and seating. Sisters&apos; section available.
              </p>
            </div>
          </div>
        </div>

        {/* Prayer Time Meanings */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📖</span>
            Understanding Prayer Times
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Fajr (الفجر)</p>
                <p className="text-gray-600">Dawn prayer, before sunrise</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Dhuhr (الظهر)</p>
                <p className="text-gray-600">Midday prayer, after the sun passes its zenith</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Asr (العصر)</p>
                <p className="text-gray-600">Afternoon prayer</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Maghrib (المغرب)</p>
                <p className="text-gray-600">Sunset prayer, immediately after sunset</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Isha (العشاء)</p>
                <p className="text-gray-600">Night prayer, after twilight disappears</p>
              </div>
              <div>
                <p className="font-semibold text-amber-700">Sunrise (الشروق)</p>
                <p className="text-gray-600">Not a prayer time; shown for reference</p>
              </div>
            </div>
          </div>
        </div>

        {/* API Attribution */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Prayer times provided by{" "}
            <a
              href="https://aladhan.com/prayer-times-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              AlAdhan Prayer Times API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
