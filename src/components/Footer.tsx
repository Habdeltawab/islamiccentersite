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
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-gray-400 group-hover:text-green-400 underline underline-offset-2 decoration-gray-600 group-hover:decoration-green-400 transition-colors">
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
