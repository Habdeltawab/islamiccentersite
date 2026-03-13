import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Islamic Center of Ankeny",
  description: "Learn about the Islamic Center of Ankeny, our mission, history, and services.",
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our community, mission, and the services we provide.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-emerald-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Islamic Center of Ankeny is dedicated to serving the Muslim community in 
              Ankeny, Iowa and surrounding areas. We strive to provide a welcoming space for 
              worship, education, and community building, fostering understanding and 
              cooperation among all people.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceItem
              title="Daily Prayers"
              description="We hold all five daily prayers (Fajr, Dhuhr, Asr, Maghrib, and Isha) at our center. Join us for congregational prayers and strengthen your connection with Allah."
            />
            <ServiceItem
              title="Jummah Prayer"
              description="Every Friday, we gather for the Jummah (Friday) prayer, featuring a sermon (khutbah) in English and Arabic followed by congregational prayer."
            />
            <ServiceItem
              title="Quran Classes"
              description="We offer Quran classes for children and adults, including tajweed (proper recitation), memorization, and understanding of the Holy Quran."
            />
            <ServiceItem
              title="Islamic Studies"
              description="Educational programs covering various aspects of Islam, including fiqh (jurisprudence), seerah (prophetic biography), and Islamic history."
            />
            <ServiceItem
              title="Youth Programs"
              description="Engaging activities and educational programs designed specifically for Muslim youth to help them grow in their faith and identity."
            />
            <ServiceItem
              title="Community Events"
              description="Regular community events including Eid celebrations, iftar dinners during Ramadan, family nights, and educational seminars."
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon="🤲"
              title="Faith"
              description="Commitment to Islamic principles and worship"
            />
            <ValueCard
              icon="📖"
              title="Knowledge"
              description="Pursuit of Islamic and worldly knowledge"
            />
            <ValueCard
              icon="🤝"
              title="Community"
              description="Unity and support among Muslims and neighbors"
            />
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-gray-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-gray-600 mb-6">
            We welcome all visitors to our center. Come and be part of our growing community.
          </p>
          <div className="text-gray-700">
            <p className="font-semibold">Islamic Center of Ankeny</p>
            <p>Ankeny, Iowa</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function ServiceItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold text-emerald-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
