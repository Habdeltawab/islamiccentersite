// AlAdhan API types and utilities
// Docs: https://aladhan.com/prayer-times-api

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface HijriDate {
  date: string;
  format: string;
  day: string;
  weekday: { en: string; ar: string };
  month: { number: number; en: string; ar: string };
  year: string;
  designation: { abbreviated: string; expanded: string };
  holidays: string[];
}

export interface GregorianDate {
  date: string;
  format: string;
  day: string;
  weekday: { en: string };
  month: { number: number; en: string };
  year: string;
  designation: { abbreviated: string; expanded: string };
}

export interface PrayerTimesData {
  timings: PrayerTimings;
  date: {
    readable: string;
    timestamp: string;
    hijri: HijriDate;
    gregorian: GregorianDate;
  };
  meta: {
    latitude: number;
    longitude: number;
    timezone: string;
    method: {
      id: number;
      name: string;
      params: { Fajr: number; Isha: number };
      location: { latitude: number; longitude: number };
    };
    latitudeAdjustmentMethod: string;
    midnightMode: string;
    school: string;
    offset: Record<string, number>;
  };
}

export interface AlAdhanResponse {
  code: number;
  status: string;
  data: PrayerTimesData;
}

// Ankeny, Iowa coordinates
export const ANKENY_COORDS = {
  latitude: 41.7318,
  longitude: -93.6001,
  timezone: "America/Chicago",
  city: "Ankeny",
  state: "Iowa",
};

// Calculation methods from AlAdhan API
export const CALCULATION_METHODS = {
  SHIA_ITHNA_ASHARI: 0,
  UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI: 1,
  ISNA: 2, // Islamic Society of North America
  MWL: 3, // Muslim World League
  UMM_AL_QURA: 4,
  EGYPTIAN: 5,
  INSTITUTE_OF_GEOPHYSICS_TEHRAN: 7,
  GULF_REGION: 8,
  KUWAIT: 9,
  QATAR: 10,
  MAJLIS_UGAMA_ISLAM_SINGAPURA: 11,
  UNION_DES_ORGANISATIONS_ISLAMIQUES_DE_FRANCE: 12,
  DIYANET_ISLERI_BASKANLIGI: 13,
  SPIRITUAL_ADMINISTRATION_OF_MUSLIMS_RUSSIA: 14,
  MOONSIGHTING_COMMITTEE_WORLDWIDE: 15,
} as const;

// Use ISNA method (common in North America)
export const DEFAULT_METHOD = CALCULATION_METHODS.ISNA;

// Cache key for session storage
const CACHE_KEY = "prayer_times_cache";
const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

interface CachedData {
  data: PrayerTimesData;
  timestamp: number;
  dateKey: string;
}

/**
 * Get cached prayer times from session storage
 */
export function getCachedPrayerTimes(dateKey: string): PrayerTimesData | null {
  if (typeof window === "undefined") return null;
  
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const parsed: CachedData = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is for today and not expired
    if (parsed.dateKey === dateKey && now - parsed.timestamp < CACHE_EXPIRY_MS) {
      return parsed.data;
    }
    
    // Clear expired cache
    sessionStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
}

/**
 * Save prayer times to session storage cache
 */
export function cachePrayerTimes(data: PrayerTimesData, dateKey: string): void {
  if (typeof window === "undefined") return;
  
  try {
    const cacheData: CachedData = {
      data,
      timestamp: Date.now(),
      dateKey,
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Format date for API request (DD-MM-YYYY)
 */
export function formatDateForApi(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Get date key for caching (YYYY-MM-DD)
 */
export function getDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Fetch prayer times from AlAdhan API
 */
export async function fetchPrayerTimes(
  date: Date = new Date(),
  signal?: AbortSignal
): Promise<PrayerTimesData> {
  const dateStr = formatDateForApi(date);
  const url = new URL(`https://api.aladhan.com/v1/timings/${dateStr}`);
  
  url.searchParams.set("latitude", String(ANKENY_COORDS.latitude));
  url.searchParams.set("longitude", String(ANKENY_COORDS.longitude));
  url.searchParams.set("method", String(DEFAULT_METHOD));
  url.searchParams.set("timezone", ANKENY_COORDS.timezone);
  
  const response = await fetch(url.toString(), {
    signal,
    headers: {
      "Accept": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`AlAdhan API error: ${response.status} ${response.statusText}`);
  }
  
  const json: AlAdhanResponse = await response.json();
  
  if (json.code !== 200 || json.status !== "OK") {
    throw new Error(`AlAdhan API returned error: ${json.status}`);
  }
  
  return json.data;
}

/**
 * Convert 24-hour time string to 12-hour format
 */
export function formatTime12Hour(time24: string): string {
  const timePart = time24.split(" ")[0]; // Remove timezone if present
  const [hours, minutes] = timePart.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
}

/**
 * Parse time string to minutes since midnight
 */
export function timeToMinutes(time24: string): number {
  const timePart = time24.split(" ")[0];
  const [hours, minutes] = timePart.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Get current time in minutes since midnight
 */
export function getCurrentMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/**
 * Prayer info with Arabic names
 */
export const PRAYER_INFO = {
  Fajr: { arabic: "الفجر", icon: "🌙" },
  Sunrise: { arabic: "الشروق", icon: "🌅" },
  Dhuhr: { arabic: "الظهر", icon: "☀️" },
  Asr: { arabic: "العصر", icon: "🌤️" },
  Maghrib: { arabic: "المغرب", icon: "🌇" },
  Isha: { arabic: "العشاء", icon: "🌃" },
} as const;

export type PrayerName = keyof typeof PRAYER_INFO;

/**
 * Get the next prayer based on current time
 */
export function getNextPrayer(timings: PrayerTimings): PrayerName | null {
  const currentMinutes = getCurrentMinutes();
  const prayers: PrayerName[] = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
  for (const prayer of prayers) {
    const prayerMinutes = timeToMinutes(timings[prayer]);
    if (prayerMinutes > currentMinutes) {
      return prayer;
    }
  }
  
  // After Isha, next prayer is Fajr (tomorrow)
  return "Fajr";
}

/**
 * Get time remaining until a prayer
 */
export function getTimeUntil(time24: string): string {
  const prayerMinutes = timeToMinutes(time24);
  const currentMinutes = getCurrentMinutes();
  
  let diff = prayerMinutes - currentMinutes;
  if (diff < 0) {
    diff += 24 * 60; // Add a day if prayer has passed
  }
  
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
}
