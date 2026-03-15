"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Prayer Times", href: "/prayer-times" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only do smooth scroll if we're not at the top
    if (window.scrollY > 50) {
      e.preventDefault();
      
      // Smooth scroll to top first
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      
      // Navigate after scroll animation
      setTimeout(() => {
        router.push(href);
      }, 300);
    }
    // If already at top, let Link handle navigation normally (no preventDefault)
  }, [router]);

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
        <div className="flex h-28 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center space-x-3"
            >
              <img 
                src="/amcc-icon.svg" 
                alt="AMCC Logo" 
                className="w-20 h-20"
              />
              <div>
                <span className={`text-xl font-bold block leading-tight ${
                  scrolled ? "text-emerald-800" : "text-white"
                }`}>
                  AMCC
                </span>
                <span className={`text-sm ${
                  scrolled ? "text-gray-500" : "text-emerald-200"
                }`}>
                  Ankeny, Iowa
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
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
              onClick={(e) => handleNavClick(e, "/donate")}
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
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, item.href);
                  }}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    scrolled 
                      ? "text-gray-700 hover:bg-gray-100" 
                      : "text-white hover:bg-emerald-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/donate"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, "/donate");
                }}
                className="block rounded-md px-3 py-2 text-base font-semibold bg-amber-500 text-white hover:bg-amber-600 mt-2"
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
