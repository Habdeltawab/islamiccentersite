"use client";

import { useState, useEffect, useCallback } from "react";
import {
  PrayerTimesData,
  PrayerName,
  PRAYER_INFO,
  fetchPrayerTimes,
  getCachedPrayerTimes,
  cachePrayerTimes,
  getDateKey,
  formatTime12Hour,
  getNextPrayer,
  getTimeUntil,
} from "@/lib/prayer-times";

type LoadingState = "idle" | "loading" | "success" | "error";

interface PrayerTimesDisplayProps {
  initialData?: PrayerTimesData | null;
}

export default function PrayerTimesDisplay({ initialData }: PrayerTimesDisplayProps) {
  const [prayerData, setPrayerData] = useState<PrayerTimesData | null>(initialData || null);
  const [loadingState, setLoadingState] = useState<LoadingState>(initialData ? "success" : "idle");
  const [error, setError] = useState<string | null>(null);
  const [nextPrayer, setNextPrayer] = useState<PrayerName | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadPrayerTimes = useCallback(async (forceRefresh = false) => {
    const today = new Date();
    const dateKey = getDateKey(today);

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = getCachedPrayerTimes(dateKey);
      if (cached) {
        setPrayerData(cached);
        setLoadingState("success");
        setLastUpdated(new Date());
        return;
      }
    }

    setLoadingState("loading");
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const data = await fetchPrayerTimes(today, controller.signal);
      clearTimeout(timeoutId);

      setPrayerData(data);
      cachePrayerTimes(data, dateKey);
      setLoadingState("success");
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch prayer times:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load prayer times. Please try again."
      );
      setLoadingState("error");
    }
  }, []);

  // Initial load - only if no server-side data provided
  useEffect(() => {
    if (!initialData && loadingState === "idle") {
      // Use a flag to avoid the lint warning about setState in effect
      let mounted = true;
      const load = async () => {
        if (mounted) {
          await loadPrayerTimes();
        }
      };
      load();
      return () => {
        mounted = false;
      };
    }
  }, [initialData, loadingState, loadPrayerTimes]);

  // Update next prayer indicator every minute
  useEffect(() => {
    if (!prayerData) return;

    const updateNextPrayer = () => {
      const next = getNextPrayer(prayerData.timings);
      setNextPrayer(next);
      if (next) {
        setTimeUntilNext(getTimeUntil(prayerData.timings[next]));
      }
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [prayerData]);

  // Loading skeleton
  if (loadingState === "loading" || loadingState === "idle") {
    return <PrayerTimesSkeleton />;
  }

  // Error state
  if (loadingState === "error" || !prayerData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1">
            <h3 className="font-semibold text-red-800 mb-1">
              Unable to Load Prayer Times
            </h3>
            <p className="text-red-700 text-sm mb-4">
              {error || "An error occurred while fetching prayer times."}
            </p>
            <button
              onClick={() => loadPrayerTimes(true)}
              className="px-4 py-2 bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const prayers: { name: PrayerName; time: string }[] = [
    { name: "Fajr", time: prayerData.timings.Fajr },
    { name: "Sunrise", time: prayerData.timings.Sunrise },
    { name: "Dhuhr", time: prayerData.timings.Dhuhr },
    { name: "Asr", time: prayerData.timings.Asr },
    { name: "Maghrib", time: prayerData.timings.Maghrib },
    { name: "Isha", time: prayerData.timings.Isha },
  ];

  return (
    <div className="space-y-6">
      {/* Date Display */}
      <div className="text-center">
        <p className="text-lg text-gray-700">{prayerData.date.readable}</p>
        <p className="text-emerald-700">
          <span className="font-arabic text-lg">
            {prayerData.date.hijri.day} {prayerData.date.hijri.month.ar}
          </span>
          <span className="mx-2">•</span>
          <span>
            {prayerData.date.hijri.day} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year} AH
          </span>
        </p>
      </div>

      {/* Next Prayer Banner */}
      {nextPrayer && nextPrayer !== "Sunrise" && (
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{PRAYER_INFO[nextPrayer].icon}</span>
              <div>
                <p className="text-emerald-100 text-sm">Next Prayer</p>
                <p className="text-xl font-bold">{nextPrayer}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-100 text-sm">Time Remaining</p>
              <p className="text-xl font-bold">{timeUntilNext}</p>
            </div>
          </div>
        </div>
      )}

      {/* Prayer Times Grid */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-emerald-800 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today&apos;s Prayer Times</h2>
            <button
              onClick={() => loadPrayerTimes(true)}
              className="text-emerald-200 hover:text-white transition-colors text-sm flex items-center space-x-1"
              title="Refresh prayer times"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {prayers.map((prayer) => {
            const isNext = prayer.name === nextPrayer;
            const isSunrise = prayer.name === "Sunrise";
            
            return (
              <div
                key={prayer.name}
                className={`flex items-center justify-between p-4 transition-colors ${
                  isNext
                    ? "bg-emerald-50 border-l-4 border-emerald-500"
                    : isSunrise
                    ? "bg-amber-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl w-8 text-center">
                    {PRAYER_INFO[prayer.name].icon}
                  </span>
                  <div>
                    <p className={`font-semibold ${isNext ? "text-emerald-800" : "text-gray-900"}`}>
                      {prayer.name}
                      {isNext && (
                        <span className="ml-2 text-xs bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">
                          NEXT
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500 font-arabic">
                      {PRAYER_INFO[prayer.name].arabic}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${isNext ? "text-emerald-700" : "text-gray-800"}`}>
                    {formatTime12Hour(prayer.time)}
                  </p>
                  {isNext && (
                    <p className="text-sm text-emerald-600">
                      in {timeUntilNext}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <p className="text-center text-sm text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}

function PrayerTimesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Date skeleton */}
      <div className="text-center space-y-2">
        <div className="h-6 bg-gray-200 rounded w-48 mx-auto" />
        <div className="h-5 bg-gray-200 rounded w-64 mx-auto" />
      </div>

      {/* Next prayer banner skeleton */}
      <div className="bg-gray-200 rounded-xl h-20" />

      {/* Prayer times skeleton */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gray-300 h-14" />
        <div className="divide-y divide-gray-100">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-20" />
                  <div className="h-4 bg-gray-200 rounded w-12" />
                </div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
