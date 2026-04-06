import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Prayer Times", href: "/prayer-times" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Daily Prayers", href: "/prayer-times" },
  { name: "Quran Classes", href: "/about#services" },
  { name: "Donate", href: "/donate" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/amcc-icon.svg" 
                alt="AMCC Logo" 
                className="w-12 h-12"
              />
              <div>
                <span className="text-lg font-bold block">AMCC</span>
                <span className="text-sm text-gray-400">Ankeny, Iowa</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Serving the Muslim community in Ankeny, Iowa with prayer services, 
              educational programs, and community events since establishment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-6">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <a href="https://maps.google.com/?q=110+SE+Grant+St+Ankeny+IA+50021" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3 group">
                <span className="text-emerald-400 mt-0.5">📍</span>
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  <p>110 SE Grant St, Suite 104</p>
                  <p>Ankeny, IA 50021</p>
                </div>
              </a>
              <div className="flex items-center space-x-3">
                <span className="text-emerald-400">📧</span>
                <a 
                  href="mailto:info@ankenymuslimcommunity.org" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@ankenymuslimcommunity.org
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-emerald-400">📞</span>
                <a 
                  href="tel:+15159920296" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  (515) 992-0296
                </a>
              </div>
              <a href="https://chat.whatsapp.com/JcHjRVFHE5NAOwL9wF1cTI" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
                <span className="text-emerald-400">💬</span>
                <span className="text-gray-400 group-hover:text-white transition-colors">
                  Join our WhatsApp Group
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Ankeny Muslim Community Center. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
