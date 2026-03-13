"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Prayer Times", href: "/prayer-times" },
  { name: "Announcements", href: "/announcements" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md" 
          : "bg-emerald-800"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                scrolled ? "bg-emerald-100" : "bg-emerald-700"
              }`}>
                <span className="text-xl">🕌</span>
              </div>
              <div>
                <span className={`text-lg font-bold block leading-tight ${
                  scrolled ? "text-emerald-800" : "text-white"
                }`}>
                  Islamic Center
                </span>
                <span className={`text-xs ${
                  scrolled ? "text-gray-500" : "text-emerald-200"
                }`}>
                  Ankeny, Iowa
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  scrolled 
                    ? "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50" 
                    : "text-white hover:bg-emerald-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/donate"
              className={`ml-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                scrolled
                  ? "bg-emerald-700 text-white hover:bg-emerald-800"
                  : "bg-amber-500 text-white hover:bg-amber-600"
              }`}
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md p-2 ${
                scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-emerald-700"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-emerald-700/20">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    scrolled 
                      ? "text-gray-700 hover:bg-gray-100" 
                      : "text-white hover:bg-emerald-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/donate"
                className="block rounded-md px-3 py-2 text-base font-semibold bg-amber-500 text-white hover:bg-amber-600 mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
