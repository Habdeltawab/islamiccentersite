// MasjidAl API types and utilities

export const MASJID_ID = "0LbnoaLo";

export const MASJID_INFO = {
  city: "Ankeny",
  state: "Iowa",
};

// --- Types ---

export interface MasjidAlSalah {
  date: string;
  hijri_date: string;
  hijri_month: string;
  day: string;
  fajr: string;
  sunrise: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface MasjidAlIqamah {
  date: string;
  fajr: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  jummah1: string;
  jummah2: string;
}

export interface MasjidAlResponse {
  status: string;
  data: {
    salah: MasjidAlSalah[];
    iqamah: MasjidAlIqamah[];
  };
  message: string[];
}

export interface PrayerTimesData {
  salah: MasjidAlSalah;
  iqamah: MasjidAlIqamah;
}

// --- Prayer metadata ---

export const PRAYER_INFO = {
  Fajr: { arabic: "الفجر", salahKey: "fajr" as const, iqamahKey: "fajr" as const },
  Sunrise: { arabic: "الشروق", salahKey: "sunrise" as const, iqamahKey: null },
  Dhuhr: { arabic: "الظهر", salahKey: "zuhr" as const, iqamahKey: "zuhr" as const },
  Asr: { arabic: "العصر", salahKey: "asr" as const, iqamahKey: "asr" as const },
  Maghrib: { arabic: "المغرب", salahKey: "maghrib" as const, iqamahKey: "maghrib" as const },
  Isha: { arabic: "العشاء", salahKey: "isha" as const, iqamahKey: "isha" as const },
} as const;

export type PrayerName = keyof typeof PRAYER_INFO;

// --- Cache ---

const CACHE_KEY = "prayer_times_masjidal";
const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

interface CachedData {
  data: PrayerTimesData;
  timestamp: number;
  dateKey: string;
}

export function getDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function getCachedPrayerTimes(dateKey: string): PrayerTimesData | null {
  if (typeof window === "undefined") return null;

  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsed: CachedData = JSON.parse(cached);
    const now = Date.now();

    if (parsed.dateKey === dateKey && now - parsed.timestamp < CACHE_EXPIRY_MS) {
      return parsed.data;
    }

    sessionStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
}

export function cachePrayerTimes(data: PrayerTimesData, dateKey: string): void {
  if (typeof window === "undefined") return;

  try {
    const cacheData: CachedData = { data, timestamp: Date.now(), dateKey };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch {
    // Ignore storage errors
  }
}

// --- API ---

export async function fetchPrayerTimes(
  signal?: AbortSignal
): Promise<PrayerTimesData> {
  const url = `https://masjidal.com/api/v1/time/range?masjid_id=${encodeURIComponent(MASJID_ID)}`;

  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`MasjidAl API error: ${response.status} ${response.statusText}`);
  }

  const json: MasjidAlResponse = await response.json();

  if (json.status !== "success" || !json.data.salah.length || !json.data.iqamah.length) {
    throw new Error("MasjidAl API returned no data");
  }

  return {
    salah: json.data.salah[0],
    iqamah: json.data.iqamah[0],
  };
}

// --- Time utilities ---

/**
 * Parse MasjidAl time string like "5:33AM" into minutes since midnight
 */
export function timeToMinutes(timeStr: string): number {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;

  return hours * 60 + minutes;
}

export function getCurrentMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function getNextPrayer(salah: MasjidAlSalah): PrayerName | null {
  const currentMinutes = getCurrentMinutes();
  const prayers: { name: PrayerName; key: keyof MasjidAlSalah }[] = [
    { name: "Fajr", key: "fajr" },
    { name: "Sunrise", key: "sunrise" },
    { name: "Dhuhr", key: "zuhr" },
    { name: "Asr", key: "asr" },
    { name: "Maghrib", key: "maghrib" },
    { name: "Isha", key: "isha" },
  ];

  for (const prayer of prayers) {
    const prayerMinutes = timeToMinutes(salah[prayer.key]);
    if (prayerMinutes > currentMinutes) {
      return prayer.name;
    }
  }

  return "Fajr";
}

export function getTimeUntil(timeStr: string): string {
  const prayerMinutes = timeToMinutes(timeStr);
  const currentMinutes = getCurrentMinutes();

  let diff = prayerMinutes - currentMinutes;
  if (diff < 0) diff += 24 * 60;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}
