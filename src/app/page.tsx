import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 to-emerald-900 text-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to the Islamic Center of Ankeny
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            A place of worship, learning, and community for Muslims in Ankeny, Iowa
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/prayer-times"
              className="bg-white text-emerald-800 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Prayer Times
            </Link>
            <Link
              href="/donate"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-500 transition-colors border border-emerald-500"
            >
              Support Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon="🕌"
              title="Daily Prayers"
              description="Join us for the five daily prayers and Jummah (Friday) prayer services."
            />
            <ServiceCard
              icon="📚"
              title="Islamic Education"
              description="Quran classes, Islamic studies, and youth programs for all ages."
            />
            <ServiceCard
              icon="🤝"
              title="Community Events"
              description="Iftar gatherings, Eid celebrations, and family-friendly activities."
            />
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                Latest Announcements
              </h3>
              <p className="text-gray-600 mb-4">
                Stay updated with the latest news and events from our community.
              </p>
              <Link
                href="/announcements"
                className="text-emerald-700 font-semibold hover:text-emerald-800 inline-flex items-center"
              >
                View Announcements →
              </Link>
            </div>
            <div className="bg-amber-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                Support Our Mission
              </h3>
              <p className="text-gray-600 mb-4">
                Your generous donations help us maintain our facilities and expand our programs.
              </p>
              <Link
                href="/donate"
                className="text-amber-700 font-semibold hover:text-amber-800 inline-flex items-center"
              >
                Donate Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out to us with any questions about our services or community.
          </p>
          <Link
            href="/contact"
            className="bg-white text-emerald-800 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
