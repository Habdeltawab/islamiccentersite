import { Hero, Section, Card, CardGrid, CTA } from "@/components/ui";
import Link from "next/link";

const services = [
  {
    icon: "🕌",
    title: "Daily Prayers",
    description: "Join us for the five daily prayers and Jummah (Friday) prayer services in congregation.",
  },
  {
    icon: "📚",
    title: "Islamic Education",
    description: "Quran classes, Islamic studies, and youth programs for learners of all ages.",
  },
  {
    icon: "🤝",
    title: "Community Events",
    description: "Iftar gatherings, Eid celebrations, family nights, and community outreach programs.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Youth Programs",
    description: "Engaging activities designed specifically for Muslim youth to grow in faith and identity.",
  },
  {
    icon: "📖",
    title: "Quran Memorization",
    description: "Structured hifz program with qualified teachers for children and adults.",
  },
  {
    icon: "💑",
    title: "Family Services",
    description: "Marriage services, family counseling, and support for new Muslims.",
  },
];

const features = [
  {
    icon: "🕐",
    title: "Prayer Times",
    description: "Accurate daily prayer times for Ankeny, IA updated automatically.",
    href: "/prayer-times",
  },
  {
    icon: "📢",
    title: "Announcements",
    description: "Stay updated with the latest news and events from our community.",
    href: "/announcements",
  },
  {
    icon: "💰",
    title: "Donate",
    description: "Support our mission with your generous Zakat, Sadaqah, or general donations.",
    href: "/donate",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        subtitle="Welcome to"
        title="Islamic Center of Ankeny"
        description="A place of worship, learning, and community for Muslims in Ankeny, Iowa. Join us in building a stronger, united community."
        primaryAction={{ label: "Prayer Times", href: "/prayer-times" }}
        secondaryAction={{ label: "Learn More", href: "/about" }}
        size="lg"
      />

      {/* Quick Access Cards */}
      <Section background="gray" padding="lg">
        <CardGrid columns={3}>
          {features.map((feature) => (
            <Card
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              variant="elevated"
              className="text-center"
            />
          ))}
        </CardGrid>
      </Section>

      {/* Services Section */}
      <Section
        title="Our Services"
        subtitle="What We Offer"
        description="We provide a wide range of services to support the spiritual, educational, and social needs of our community."
        padding="lg"
      >
        <CardGrid columns={3}>
          {services.map((service) => (
            <Card
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              variant="bordered"
              className="text-center"
            />
          ))}
        </CardGrid>
      </Section>

      {/* About Preview */}
      <Section background="emerald" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-emerald-700 font-semibold text-sm uppercase tracking-wide mb-2">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Building a Strong Muslim Community
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The Islamic Center of Ankeny is dedicated to serving the Muslim community 
              in Ankeny, Iowa and surrounding areas. We strive to provide a welcoming 
              space for worship, education, and community building.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Our center offers daily prayers, Jummah services, Quran classes, youth 
              programs, and various community events throughout the year.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
            >
              Learn more about us
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-emerald-700 mb-2">5</div>
              <div className="text-gray-600 text-sm">Daily Prayers</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-emerald-700 mb-2">100+</div>
              <div className="text-gray-600 text-sm">Families Served</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-emerald-700 mb-2">Weekly</div>
              <div className="text-gray-600 text-sm">Jummah Prayer</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-emerald-700 mb-2">Year</div>
              <div className="text-gray-600 text-sm">Round Programs</div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <CTA
        title="Support Our Mission"
        description="Your generous donations help us maintain our facilities, expand our programs, and serve our growing community."
        primaryAction={{ label: "Donate Now", href: "/donate" }}
        secondaryAction={{ label: "Contact Us", href: "/contact" }}
        variant="gradient"
      />
    </div>
  );
}
