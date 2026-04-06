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

  // Load prayer times on mount (once only)
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (initialData) {
        const today = new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        if (initialData.salah.date === today) return;
      }
      if (!cancelled) {
        await loadPrayerTimes(!initialData);
      }
    };

    const timer = setTimeout(init, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh when the tab becomes visible again (e.g. next day)
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      const today = new Date().toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "short", day: "numeric",
      });
      if (prayerData && prayerData.salah.date !== today) {
        loadPrayerTimes(true);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [prayerData, loadPrayerTimes]);

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
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-900">Unable to load prayer times</h3>
            <p className="mt-1 text-sm text-red-600/80">{error || "An error occurred."}</p>
            <button
              onClick={() => loadPrayerTimes(true)}
              className="mt-3 text-sm font-semibold text-red-700 hover:text-red-800 transition-colors"
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

  // Parse the countdown into parts for styled display
  const countdownParts = timeUntilNext.match(/^(?:(\d+)h\s*)?(\d+)m$/);
  const countdownHours = countdownParts?.[1] || null;
  const countdownMins = countdownParts?.[2] || null;

  return (
    <div className="space-y-8">
      {/* Date & Refresh Row */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{salah.date}</p>
          <p className="text-sm text-slate-500 mt-1">{salah.hijri_date} {salah.hijri_month}</p>
        </div>
        <button
          onClick={() => loadPrayerTimes(true)}
          className="group flex items-center space-x-1.5 text-xs font-medium text-slate-400 hover:text-emerald-600 transition-colors"
          title="Refresh prayer times"
        >
          <svg className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Next Prayer Spotlight */}
      {nextPrayer && nextPrayer !== "Sunrise" && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-7 sm:p-8 shadow-lg">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative">
            <div className="flex items-center space-x-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-[0.2em]">Up Next</p>
            </div>
            
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{nextPrayer}</h3>
                <p className="text-lg text-white/40 font-arabic mt-1">{PRAYER_INFO[nextPrayer].arabic}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">
                  {salah[PRAYER_INFO[nextPrayer].salahKey]}
                </p>
                {PRAYER_INFO[nextPrayer].iqamahKey && (
                  <p className="text-sm text-white/50 font-medium mt-1.5">
                    Iqamah · {iqamah[PRAYER_INFO[nextPrayer].iqamahKey]}
                  </p>
                )}
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-center space-x-4">
                {countdownHours && (
                  <>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-extrabold text-white tabular-nums">{countdownHours}</span>
                      <span className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-[0.15em] mt-1">hours</span>
                    </div>
                    <span className="text-2xl font-light text-white/20 -mt-5">:</span>
                  </>
                )}
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-white tabular-nums">{countdownMins ?? "0"}</span>
                  <span className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-[0.15em] mt-1">min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prayer Times Cards */}
      <div className="grid gap-3">
        {prayers.map((prayer) => {
          const isNext = prayer.name === nextPrayer;
          const isSunrise = prayer.name === "Sunrise";

          return (
            <div
              key={prayer.name}
              className={`
                group relative rounded-xl px-5 py-5 transition-all
                ${isNext
                  ? "bg-emerald-50 ring-1 ring-emerald-200"
                  : "bg-white ring-1 ring-slate-100 hover:ring-slate-200"
                }
                ${isSunrise ? "opacity-50" : ""}
              `}
            >
              <div className="flex items-center justify-between">
                {/* Prayer name */}
                <div className="flex items-center space-x-3 min-w-0">
                  <div className={`w-1.5 h-8 rounded-full flex-shrink-0 ${
                    isNext ? "bg-emerald-500" : isSunrise ? "bg-amber-300" : "bg-slate-200"
                  }`} />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className={`font-semibold ${isNext ? "text-emerald-900" : "text-slate-900"}`}>
                        {prayer.name}
                      </p>
                      {isNext && (
                        <span className="inline-flex items-center text-[10px] font-bold tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded uppercase">
                          Next
                        </span>
                      )}
                    </div>
                    <p className={`text-xs font-arabic ${isSunrise ? "text-slate-400" : "text-slate-400"}`}>
                      {PRAYER_INFO[prayer.name].arabic}
                    </p>
                  </div>
                </div>

                {/* Times */}
                <div className="flex items-center space-x-6 sm:space-x-10 flex-shrink-0">
                  <div className="text-right w-20">
                    <p className={`text-base font-semibold tabular-nums ${
                      isNext ? "text-emerald-800" : "text-slate-800"
                    }`}>
                      {prayer.adhan}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Adhan</p>
                  </div>
                  <div className="text-right w-20">
                    {prayer.iqamah ? (
                      <>
                        <p className={`text-base font-semibold tabular-nums ${
                          isNext ? "text-emerald-800" : "text-slate-700"
                        }`}>
                          {prayer.iqamah}
                        </p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Iqamah</p>
                      </>
                    ) : (
                      <p className="text-sm text-slate-200">—</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Jumu'ah Notice */}
      <div className={`rounded-xl px-5 py-4 ${hasJummah ? "bg-emerald-50 ring-1 ring-emerald-100" : "bg-amber-50 ring-1 ring-amber-100"}`}>
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${hasJummah ? "bg-emerald-100" : "bg-amber-100"}`}>
            <span className="text-sm">{hasJummah ? "🕌" : "ℹ️"}</span>
          </div>
          <p className={`text-sm ${hasJummah ? "text-emerald-800" : "text-amber-800"}`}>
            {hasJummah ? (
              <>
                <span className="font-semibold">Jumu&apos;ah:</span>{" "}{iqamah.jummah1}
                {iqamah.jummah2 && iqamah.jummah2 !== "-" && <> · 2nd Khutbah: {iqamah.jummah2}</>}
              </>
            ) : (
              <>
                <span className="font-semibold">Jumu&apos;ah:</span>{" "}Not currently offered at this location.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Footer meta */}
      {lastUpdated && (
        <p className="text-[11px] text-slate-300 text-center pt-1">
          Last synced {lastUpdated.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </p>
      )}
    </div>
  );
}

function PrayerTimesSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-slate-200 rounded-lg w-44" />
          <div className="h-4 bg-slate-100 rounded-lg w-56" />
        </div>
        <div className="h-4 bg-slate-100 rounded-lg w-16" />
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 h-48" />
      <div className="grid gap-2.5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl bg-white ring-1 ring-slate-100 px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-8 bg-slate-200 rounded-full" />
                <div className="space-y-1.5">
                  <div className="h-4 bg-slate-200 rounded w-16" />
                  <div className="h-3 bg-slate-100 rounded w-10" />
                </div>
              </div>
              <div className="flex space-x-10">
                <div className="space-y-1.5 w-20">
                  <div className="h-4 bg-slate-200 rounded w-14 ml-auto" />
                  <div className="h-2 bg-slate-100 rounded w-10 ml-auto" />
                </div>
                <div className="space-y-1.5 w-20">
                  <div className="h-4 bg-slate-200 rounded w-14 ml-auto" />
                  <div className="h-2 bg-slate-100 rounded w-10 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
