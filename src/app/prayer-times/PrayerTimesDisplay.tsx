"use client";

interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
}

interface PrayerData {
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  date: {
    readable: string;
    hijri: {
      date: string;
      month: {
        en: string;
        ar: string;
      };
      year: string;
    };
  };
}

function formatTime(time24: string): string {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
}

export default function PrayerTimesDisplay({ prayerData }: { prayerData: PrayerData | null }) {
  if (!prayerData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-700">
          Unable to load prayer times. Please try again later.
        </p>
      </div>
    );
  }

  const prayers: PrayerTime[] = [
    { name: "Fajr", time: prayerData.timings.Fajr, arabicName: "الفجر" },
    { name: "Sunrise", time: prayerData.timings.Sunrise, arabicName: "الشروق" },
    { name: "Dhuhr", time: prayerData.timings.Dhuhr, arabicName: "الظهر" },
    { name: "Asr", time: prayerData.timings.Asr, arabicName: "العصر" },
    { name: "Maghrib", time: prayerData.timings.Maghrib, arabicName: "المغرب" },
    { name: "Isha", time: prayerData.timings.Isha, arabicName: "العشاء" },
  ];

  return (
    <>
      {/* Date Display */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-700">{prayerData.date.readable}</p>
        <p className="text-emerald-700 font-arabic">
          {prayerData.date.hijri.date} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year} AH
        </p>
      </div>

      {/* Prayer Times Grid */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-emerald-800 text-white p-4 text-center">
          <h2 className="text-xl font-semibold">Today&apos;s Prayer Times</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                prayer.name === "Sunrise" ? "bg-amber-50" : ""
              }`}
            >
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-semibold text-gray-900">{prayer.name}</p>
                  <p className="text-sm text-gray-500 font-arabic">{prayer.arabicName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-emerald-800">
                  {formatTime(prayer.time.split(" ")[0])}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
