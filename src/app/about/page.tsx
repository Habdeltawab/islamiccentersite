import type { Metadata } from "next";
import { Hero, Section, Card, CardGrid, CTA } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us | Islamic Center of Ankeny",
  description: "Learn about the Islamic Center of Ankeny, our mission, history, and services.",
};

const services = [
  {
    icon: "🕌",
    title: "Daily Prayers",
    description: "We hold all five daily prayers (Fajr, Dhuhr, Asr, Maghrib, and Isha) at our center. Join us for congregational prayers and strengthen your connection with Allah.",
  },
  {
    icon: "🤲",
    title: "Jummah Prayer",
    description: "Every Friday, we gather for the Jummah prayer, featuring a sermon (khutbah) in English and Arabic followed by congregational prayer.",
  },
  {
    icon: "📖",
    title: "Quran Classes",
    description: "We offer Quran classes for children and adults, including tajweed (proper recitation), memorization, and understanding of the Holy Quran.",
  },
  {
    icon: "📚",
    title: "Islamic Studies",
    description: "Educational programs covering various aspects of Islam, including fiqh (jurisprudence), seerah (prophetic biography), and Islamic history.",
  },
  {
    icon: "👦",
    title: "Youth Programs",
    description: "Engaging activities and educational programs designed specifically for Muslim youth to help them grow in their faith and identity.",
  },
  {
    icon: "🎉",
    title: "Community Events",
    description: "Regular community events including Eid celebrations, iftar dinners during Ramadan, family nights, and educational seminars.",
  },
];

const values = [
  {
    icon: "🤲",
    title: "Faith (Iman)",
    description: "Steadfast commitment to Islamic principles, worship, and spiritual growth.",
  },
  {
    icon: "📖",
    title: "Knowledge (Ilm)",
    description: "Continuous pursuit of Islamic and worldly knowledge for personal and community benefit.",
  },
  {
    icon: "🤝",
    title: "Unity (Ummah)",
    description: "Fostering brotherhood, sisterhood, and solidarity among Muslims and our neighbors.",
  },
  {
    icon: "💝",
    title: "Service (Khidmah)",
    description: "Serving our community, neighbors, and those in need with compassion and generosity.",
  },
];

const team = [
  {
    role: "Imam",
    name: "To Be Announced",
    description: "Leading prayers and providing religious guidance",
  },
  {
    role: "Board President",
    name: "To Be Announced", 
    description: "Overseeing center operations and community initiatives",
  },
  {
    role: "Education Director",
    name: "To Be Announced",
    description: "Managing Islamic education programs and classes",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <Hero
        subtitle="About Us"
        title="Building a Strong Muslim Community"
        description="Learn about our mission, values, and the services we provide to the Muslim community in Ankeny, Iowa."
        size="md"
      />

      {/* Mission Section */}
      <Section background="white" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Islamic Center of Ankeny is dedicated to serving the Muslim community in 
              Ankeny, Iowa and surrounding areas. We strive to provide a welcoming space for 
              worship, education, and community building, fostering understanding and 
              cooperation among all people.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our center serves as a spiritual home where Muslims can practice their faith, 
              learn about Islam, and connect with fellow believers. We are committed to 
              preserving Islamic values while actively contributing to the broader Ankeny community.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We welcome Muslims of all backgrounds and invite our neighbors to learn about 
              Islam and engage with our community.
            </p>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-emerald-900 mb-6">Our Vision</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span className="text-gray-700">A thriving Muslim community rooted in faith and knowledge</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span className="text-gray-700">A welcoming center for worship, education, and fellowship</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span className="text-gray-700">Active engagement with the broader Ankeny community</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span className="text-gray-700">Youth programs that nurture the next generation</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span className="text-gray-700">A resource for Islamic knowledge and guidance</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section
        title="Our Values"
        subtitle="What We Stand For"
        description="Our community is built on these core Islamic values that guide everything we do."
        background="gray"
        padding="lg"
      >
        <CardGrid columns={4}>
          {values.map((value) => (
            <Card
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
              variant="elevated"
              className="text-center"
            />
          ))}
        </CardGrid>
      </Section>

      {/* Services Section */}
      <Section
        id="services"
        title="What We Offer"
        subtitle="Our Services"
        description="We provide comprehensive services to support the spiritual, educational, and social needs of our community."
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
            />
          ))}
        </CardGrid>
      </Section>

      {/* Leadership Section */}
      <Section
        title="Our Leadership"
        subtitle="Meet Our Team"
        background="emerald"
        padding="lg"
      >
        <CardGrid columns={3}>
          {team.map((member) => (
            <Card
              key={member.role}
              variant="elevated"
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{member.role}</h3>
              <p className="text-emerald-700 font-medium mb-2">{member.name}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* Visit Us CTA */}
      <CTA
        title="Visit Us"
        description="We welcome all visitors to our center. Come and be part of our growing community."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Prayer Times", href: "/prayer-times" }}
        variant="dark"
      />
    </div>
  );
}
