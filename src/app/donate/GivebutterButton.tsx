"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


export default function GivebutterButton({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Only load the Givebutter SDK once globally
    if (document.querySelector('script[data-givebutter]')) return;

    // Bootstrap the Givebutter command queue
    const win = window as any;
    if (!win.Givebutter) {
      win.Givebutter = function (...args: any[]) {
        (win.Givebutter.q = win.Givebutter.q || []).push(args);
      };
      win.Givebutter.l = +new Date();
    }

    // Load the widget script
    const script = document.createElement("script");
    script.setAttribute("data-givebutter", "true");
    script.src =
      "https://widgets.givebutter.com/latest.umd.cjs?acct=YWiejPIi97pFKPet&p=other";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full text-left rounded-2xl mb-6 overflow-hidden shadow-lg hover:shadow-2xl transition-all group relative cursor-pointer"
      >
        {children}
      </button>

      {open && createPortal(
        <div
          style={{ position: "fixed", inset: 0, zIndex: 99999 }}
          className="flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-2 -right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-700 transition-all hover:scale-110"
              aria-label="Close"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Card */}
            <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 max-h-[85vh] overflow-y-auto">
              <div className="px-2 pb-2 pt-1">
                <givebutter-widget id="jb22PY"></givebutter-widget>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
