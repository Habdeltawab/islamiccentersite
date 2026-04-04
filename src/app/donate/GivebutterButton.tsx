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
          className="flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6">
              <givebutter-widget id="jb22PY"></givebutter-widget>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
