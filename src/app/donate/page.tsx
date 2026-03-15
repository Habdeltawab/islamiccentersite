import type { Metadata } from "next";
import { Hero, Section, Card, CardGrid, Button } from "@/components/ui";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate | Ankeny Muslim Community Center",
  description: "Support the Ankeny Muslim Community Center with your generous donations.",
};

const supportAreas = [
  {
    icon: "🕌",
    title: "Facility Maintenance",
    description: "Keeping our center clean, safe, and welcoming for all visitors and worshippers.",
  },
  {
    icon: "📚",
    title: "Educational Programs",
    description: "Quran classes, Islamic studies, youth programs, and educational materials.",
  },
  {
    icon: "🤝",
    title: "Community Services",
    description: "Iftar meals, Eid celebrations, family support, and outreach programs.",
  },
  {
    icon: "🏗️",
    title: "Expansion Projects",
    description: "Future plans for expanding our facilities to serve our growing community.",
  },
];

const donationTypes = [
  {
    title: "Zakat",
    description: "Obligatory charity for eligible Muslims, distributed according to Islamic guidelines.",
    icon: "💎",
  },
  {
    title: "Sadaqah",
    description: "Voluntary charity given for the pleasure of Allah, with rewards multiplied.",
    icon: "💝",
  },
  {
    title: "General Fund",
    description: "Supports center operations, utilities, maintenance, and programs.",
    icon: "🏠",
  },
  {
    title: "Sadaqah Jariyah",
    description: "Ongoing charity that continues to benefit others, providing continuous rewards.",
    icon: "🌱",
  },
];

export default function DonatePage() {
  return (
    <div>
      {/* Hero */}
      <Hero
        subtitle="Support Our Mission"
        title="Your Generosity Makes a Difference"
        description="Your donations help us maintain our facilities, expand our programs, and serve the Muslim community in Ankeny."
        primaryAction={{ label: "Donate Now", href: "https://givebutter.com/general-fund-trkag5" }}
        size="md"
      />

      {/* Main Donation CTA */}
      <Section background="white" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 md:p-12 border border-emerald-200">
            <div className="text-6xl mb-6">🤲</div>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-4">
              Donate via Givebutter
            </h2>
            <p className="text-gray-700 mb-8 max-w-xl mx-auto leading-relaxed">
              We use Givebutter for secure and easy online donations. Your contribution 
              directly supports our programs, facilities, and community services.
            </p>
            <Button
              href="https://givebutter.com/general-fund-trkag5"
              variant="primary"
              size="lg"
              external
              className="shadow-lg"
            >
              Donate Now →
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Secure payment powered by Givebutter
            </p>
          </div>
        </div>
      </Section>

      {/* Donation Types */}
      <Section
        title="Types of Donations"
        subtitle="Ways to Give"
        description="Choose how you would like your donation to be used."
        background="gray"
        padding="lg"
      >
        <CardGrid columns={4}>
          {donationTypes.map((type) => (
            <Card
              key={type.title}
              icon={type.icon}
              title={type.title}
              description={type.description}
              variant="elevated"
              className="text-center"
            />
          ))}
        </CardGrid>
      </Section>

      {/* What Your Donation Supports */}
      <Section
        title="What Your Donation Supports"
        subtitle="Impact"
        description="See how your generous contributions make a difference in our community."
        padding="lg"
      >
        <CardGrid columns={4}>
          {supportAreas.map((area) => (
            <Card
              key={area.title}
              icon={area.icon}
              title={area.title}
              description={area.description}
              variant="bordered"
              className="text-center"
            />
          ))}
        </CardGrid>
      </Section>

      {/* Hadith Quote */}
      <Section background="emerald" padding="md">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl text-gray-800 italic mb-4">
            &ldquo;The believer&apos;s shade on the Day of Resurrection will be their charity.&rdquo;
          </blockquote>
          <cite className="text-emerald-700 font-semibold">— Prophet Muhammad ﷺ (Tirmidhi)</cite>
        </div>
      </Section>

      {/* Other Ways to Give */}
      <Section
        title="Other Ways to Give"
        subtitle="Alternative Options"
        padding="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card variant="bordered" className="text-center">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-semibold text-gray-900 mb-2">Check by Mail</h3>
            <p className="text-gray-600 text-sm">
              Make checks payable to &quot;Ankeny Muslim Community Center&quot; and mail to our address.
            </p>
          </Card>
          <Card variant="bordered" className="text-center">
            <div className="text-3xl mb-3">🏠</div>
            <h3 className="font-semibold text-gray-900 mb-2">In-Person</h3>
            <p className="text-gray-600 text-sm">
              Donate in person at the center during office hours or after prayers.
            </p>
          </Card>
          <Card variant="bordered" className="text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-semibold text-gray-900 mb-2">Recurring</h3>
            <p className="text-gray-600 text-sm">
              Set up automatic monthly donations through Givebutter.
            </p>
          </Card>
        </div>
      </Section>

      {/* Tax Information */}
      <Section background="gray" padding="md">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tax-Deductible Donations</h2>
          <p className="text-gray-600">
            The Ankeny Muslim Community Center is a registered 501(c)(3) non-profit organization. 
            All donations are tax-deductible to the extent allowed by law. 
            You will receive a receipt for your tax records.
          </p>
        </div>
      </Section>

      {/* Contact */}
      <div className="py-8 text-center">
        <p className="text-gray-600">
          Questions about donations?{" "}
          <Link href="/contact" className="text-emerald-700 hover:text-emerald-800 font-medium">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
