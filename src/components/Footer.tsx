import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Islamic Center of Ankeny</h3>
            <p className="text-emerald-200 text-sm">
              Serving the Muslim community in Ankeny, Iowa with prayer services, 
              educational programs, and community events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/prayer-times" className="text-emerald-200 hover:text-white transition-colors">
                  Prayer Times
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="text-emerald-200 hover:text-white transition-colors">
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-emerald-200 hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-emerald-200 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-sm text-emerald-200 space-y-2">
              <p>📍 Ankeny, Iowa</p>
              <p>📧 info@islamiccenterankeny.org</p>
              <p>📞 (515) 555-0123</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-emerald-700 text-center text-sm text-emerald-300">
          <p>&copy; {new Date().getFullYear()} Islamic Center of Ankeny. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
