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
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const data = await fetchPrayerTimes(controller.signal);
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

  useEffect(() => {
    let cancelled = false;

    if (loadingState === "idle") {
      const timer = setTimeout(() => {
        if (!cancelled) loadPrayerTimes();
      }, 0);
      return () => { cancelled = true; clearTimeout(timer); };
    }

    // If we have initial data, check if it's still for today
    if (initialData && loadingState === "success") {
      const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
      if (initialData.salah.date !== today) {
        const timer = setTimeout(() => {
          if (!cancelled) loadPrayerTimes(true);
        }, 0);
        return () => { cancelled = true; clearTimeout(timer); };
      }
    }

    return () => { cancelled = true; };
  }, [initialData, loadingState, loadPrayerTimes]);

  useEffect(() => {
    if (!prayerData) return;

    const updateNextPrayer = () => {
      const next = getNextPrayer(prayerData.salah);
      setNextPrayer(next);
      if (next) {
        const salahKey = PRAYER_INFO[next].salahKey;
        setTimeUntilNext(getTimeUntil(prayerData.salah[salahKey]));
      }
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 60000);

    return () => clearInterval(interval);
  }, [prayerData]);

  if (loadingState === "loading" || loadingState === "idle") {
    return <PrayerTimesSkeleton />;
  }

  if (loadingState === "error" || !prayerData) {
    return (
      <div className="bg-white border border-red-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-slate-900">Unable to load prayer times</h3>
            <p className="mt-1 text-sm text-slate-500">{error || "An error occurred."}</p>
            <button
              onClick={() => loadPrayerTimes(true)}
              className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Try again →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { salah, iqamah } = prayerData;

  const prayers: { name: PrayerName; adhan: string; iqamah: string | null }[] = [
    { name: "Fajr", adhan: salah.fajr, iqamah: iqamah.fajr },
    { name: "Sunrise", adhan: salah.sunrise, iqamah: null },
    { name: "Dhuhr", adhan: salah.zuhr, iqamah: iqamah.zuhr },
    { name: "Asr", adhan: salah.asr, iqamah: iqamah.asr },
    { name: "Maghrib", adhan: salah.maghrib, iqamah: iqamah.maghrib },
    { name: "Isha", adhan: salah.isha, iqamah: iqamah.isha },
  ];

  const hasJummah = iqamah.jummah1 && iqamah.jummah1 !== "-";

  return (
    <div className="space-y-6">
      {/* Date Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold text-slate-900">{salah.date}</p>
          <p className="text-sm text-slate-500 mt-0.5">
            {salah.hijri_date} {salah.hijri_month}
          </p>
        </div>
        <button
          onClick={() => loadPrayerTimes(true)}
          className="text-sm text-slate-500 hover:text-slate-700 flex items-center space-x-1.5 transition-colors"
          title="Refresh"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Next Prayer Card */}
      {nextPrayer && nextPrayer !== "Sunrise" && (
        <div className="bg-slate-900 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Next Prayer</p>
              <p className="text-xl font-semibold text-white mt-1">{nextPrayer}</p>
              <p className="text-sm text-slate-400 font-arabic mt-0.5">{PRAYER_INFO[nextPrayer].arabic}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-white tabular-nums">{salah[PRAYER_INFO[nextPrayer].salahKey]}</p>
              {PRAYER_INFO[nextPrayer].iqamahKey && (
                <p className="text-sm text-slate-400 mt-0.5">Iqamah: {iqamah[PRAYER_INFO[nextPrayer].iqamahKey]}</p>
              )}
              <p className="text-sm text-emerald-400 mt-1">in {timeUntilNext}</p>
            </div>
          </div>
        </div>
      )}

      {/* Prayer Times Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Prayer</th>
              <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Adhan</th>
              <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Iqamah</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {prayers.map((prayer) => {
              const isNext = prayer.name === nextPrayer;
              const isSunrise = prayer.name === "Sunrise";

              return (
                <tr
                  key={prayer.name}
                  className={`${isNext ? "bg-emerald-50" : ""} ${isSunrise ? "text-slate-400" : ""}`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        isNext ? "bg-emerald-500" : isSunrise ? "bg-amber-400" : "bg-slate-300"
                      }`} />
                      <div>
                        <p className={`font-medium ${isNext ? "text-emerald-900" : isSunrise ? "text-slate-400" : "text-slate-900"}`}>
                          {prayer.name}
                          {isNext && <span className="ml-2 text-xs font-medium text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">Next</span>}
                        </p>
                        <p className={`text-xs font-arabic mt-0.5 ${isSunrise ? "text-slate-300" : "text-slate-400"}`}>
                          {PRAYER_INFO[prayer.name].arabic}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <p className={`text-lg font-medium tabular-nums ${
                      isNext ? "text-emerald-700" : isSunrise ? "text-slate-400" : "text-slate-900"
                    }`}>
                      {prayer.adhan}
                    </p>
                    {isNext && (
                      <p className="text-xs text-emerald-600 mt-0.5">in {timeUntilNext}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {prayer.iqamah ? (
                      <p className={`text-lg font-medium tabular-nums ${
                        isNext ? "text-emerald-700" : "text-slate-700"
                      }`}>
                        {prayer.iqamah}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-300">—</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <p className="text-xs text-slate-400 text-center">
          Updated {lastUpdated.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
        </p>
      )}

      {/* Jumu'ah Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 text-center">
        <p className="text-sm text-amber-800">
          {hasJummah ? (
            <>
              <span className="font-medium">Jumu&apos;ah Prayer:</span> {iqamah.jummah1}
              {iqamah.jummah2 && iqamah.jummah2 !== "-" && ` • 2nd: ${iqamah.jummah2}`}
            </>
          ) : (
            <>
              <span className="font-medium">Note:</span> We currently do not offer Jumu&apos;ah (Friday) prayer at this location.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function PrayerTimesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 bg-slate-200 rounded w-40" />
          <div className="h-4 bg-slate-100 rounded w-56" />
        </div>
        <div className="h-5 bg-slate-100 rounded w-16" />
      </div>
      <div className="bg-slate-200 rounded-lg h-24" />
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
          <div className="flex justify-between">
            <div className="h-3 bg-slate-200 rounded w-12" />
            <div className="h-3 bg-slate-200 rounded w-8" />
            <div className="h-3 bg-slate-200 rounded w-8" />
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="px-5 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-slate-200 rounded-full" />
                <div className="space-y-1.5">
                  <div className="h-4 bg-slate-200 rounded w-16" />
                  <div className="h-3 bg-slate-100 rounded w-10" />
                </div>
              </div>
              <div className="h-5 bg-slate-200 rounded w-16" />
              <div className="h-5 bg-slate-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
