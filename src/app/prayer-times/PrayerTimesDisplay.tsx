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
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* ════ LEFT COLUMN: Spotlight + Info ════ */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        {/* Date Card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{salah.date}</p>
              <p className="text-sm text-slate-600 mt-0.5">{salah.hijri_date} {salah.hijri_month}</p>
            </div>
            <button
              onClick={() => loadPrayerTimes(true)}
              className="group flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-emerald-600 transition-colors mt-1"
              title="Refresh prayer times"
            >
              <svg className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Next Prayer Spotlight */}
        {nextPrayer && nextPrayer !== "Sunrise" && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 to-emerald-800 p-5 sm:p-6 flex-1">
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-400/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Up Next</p>
              </div>

              <div className="flex items-end justify-between gap-4 flex-1">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{nextPrayer}</h3>
                  <p className="text-sm text-white/70 font-arabic mt-0.5">{PRAYER_INFO[nextPrayer].arabic}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
                    {salah[PRAYER_INFO[nextPrayer].salahKey]}
                  </p>
                  {PRAYER_INFO[nextPrayer].iqamahKey && (
                    <p className="text-xs text-white/70 font-medium mt-1">
                      Iqamah · {iqamah[PRAYER_INFO[nextPrayer].iqamahKey]}
                    </p>
                  )}
                </div>
              </div>

              {/* Countdown */}
              <div className="mt-5 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-center gap-3">
                  {countdownHours && (
                    <>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white tabular-nums">{countdownHours}</span>
                        <span className="text-[9px] font-bold text-emerald-300/60 uppercase tracking-[0.15em] mt-0.5">hours</span>
                      </div>
                      <span className="text-lg font-light text-white/15 -mt-4">:</span>
                    </>
                  )}
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-white tabular-nums">{countdownMins ?? "0"}</span>
                    <span className="text-[9px] font-bold text-emerald-300/60 uppercase tracking-[0.15em] mt-0.5">min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Jumu'ah + Meta */}
        <div className={`rounded-2xl px-5 py-4 ${hasJummah ? "bg-white ring-1 ring-emerald-200/60 shadow-sm" : "bg-white ring-1 ring-slate-200/60 shadow-sm"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${hasJummah ? "bg-emerald-100" : "bg-amber-100"}`}>
              <span className="text-sm">{hasJummah ? "🕌" : "ℹ️"}</span>
            </div>
            <p className={`text-sm ${hasJummah ? "text-emerald-800" : "text-amber-800"}`}>
              {hasJummah ? (
                <>
                  <span className="font-semibold">Jumu&apos;ah:</span>{" "}{iqamah.jummah1}
                  {iqamah.jummah2 && iqamah.jummah2 !== "-" && <> · 2nd: {iqamah.jummah2}</>}
                </>
              ) : (
                <>
                  <span className="font-semibold">Jumu&apos;ah:</span>{" "}Not currently offered at this location.
                </>
              )}
            </p>
          </div>
        </div>

        {lastUpdated && (
          <p className="text-[11px] text-slate-400 text-center lg:text-left">
            Last synced {lastUpdated.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
          </p>
        )}
      </div>

      {/* ════ RIGHT COLUMN: Full Schedule ════ */}
      <div className="lg:col-span-7">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
          {/* Table Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3 bg-slate-50 border-b border-slate-200/60">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">Prayer</p>
            <div className="flex items-center gap-6 sm:gap-10">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em] w-[72px] text-right">Adhan</p>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em] w-[72px] text-right">Iqamah</p>
            </div>
          </div>

          {/* Prayer Rows */}
          <div className="divide-y divide-slate-100">
            {prayers.map((prayer) => {
              const isNext = prayer.name === nextPrayer;
              const isSunrise = prayer.name === "Sunrise";

              return (
                <div
                  key={prayer.name}
                  className={`
                    flex items-center justify-between px-5 sm:px-6 py-3.5 transition-colors
                    ${isNext
                      ? "bg-emerald-50/80 border-l-[3px] border-l-emerald-500"
                      : "bg-white hover:bg-slate-50/50 border-l-[3px] border-l-transparent"
                    }
                    ${isSunrise ? "opacity-40" : ""}
                  `}
                >
                  {/* Prayer name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold ${isNext ? "text-emerald-900" : "text-slate-900"}`}>
                          {prayer.name}
                        </p>
                        {isNext && (
                          <span className="text-[9px] font-bold tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded uppercase">
                            Next
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-arabic">{PRAYER_INFO[prayer.name].arabic}</p>
                    </div>
                  </div>

                  {/* Times */}
                  <div className="flex items-center gap-6 sm:gap-10 shrink-0">
                    <div className="w-[72px] text-right">
                      <p className={`text-sm font-semibold tabular-nums ${
                        isNext ? "text-emerald-800" : "text-slate-800"
                      }`}>
                        {prayer.adhan}
                      </p>
                    </div>
                    <div className="w-[72px] text-right">
                      {prayer.iqamah ? (
                        <p className={`text-sm font-semibold tabular-nums ${
                          isNext ? "text-emerald-700" : "text-slate-600"
                        }`}>
                          {prayer.iqamah}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-200">—</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrayerTimesSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-pulse">
      {/* Left column skeleton */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 p-5 sm:p-6">
          <div className="h-5 bg-slate-200 rounded w-40" />
          <div className="h-4 bg-slate-100 rounded w-32 mt-2" />
        </div>
        <div className="rounded-2xl bg-emerald-900/10 h-56" />
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 p-4">
          <div className="h-4 bg-slate-100 rounded w-48" />
        </div>
      </div>
      {/* Right column skeleton */}
      <div className="lg:col-span-7">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/60">
            <div className="h-3 bg-slate-200 rounded w-20" />
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 last:border-0">
              <div className="space-y-1.5">
                <div className="h-4 bg-slate-200 rounded w-16" />
                <div className="h-3 bg-slate-100 rounded w-10" />
              </div>
              <div className="flex gap-10">
                <div className="w-[72px]"><div className="h-4 bg-slate-200 rounded w-14 ml-auto" /></div>
                <div className="w-[72px]"><div className="h-4 bg-slate-200 rounded w-14 ml-auto" /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
