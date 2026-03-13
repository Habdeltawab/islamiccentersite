import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate | Islamic Center of Ankeny",
  description: "Support the Islamic Center of Ankeny with your generous donations.",
};

export default function DonatePage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our Mission</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your generous donations help us maintain our facilities and serve the community.
          </p>
        </div>

        {/* Main Donation Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 md:p-12 text-center mb-12">
          <div className="text-6xl mb-6">🤲</div>
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">
            Donate via Givebutter
          </h2>
          <p className="text-gray-700 mb-8 max-w-xl mx-auto">
            We use Givebutter for secure and easy online donations. Your contribution 
            directly supports our programs, facilities, and community services.
          </p>
          <a
            href="https://givebutter.com/islamic-center-ankeny"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-800 transition-colors shadow-lg hover:shadow-xl"
          >
            Donate Now →
          </a>
          <p className="text-sm text-gray-600 mt-4">
            Secure payment powered by Givebutter
          </p>
        </div>

        {/* What Your Donation Supports */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What Your Donation Supports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SupportCard
              icon="🕌"
              title="Facility Maintenance"
              description="Keeping our center clean, safe, and welcoming for all visitors."
            />
            <SupportCard
              icon="📚"
              title="Educational Programs"
              description="Quran classes, Islamic studies, and youth programs."
            />
            <SupportCard
              icon="🤝"
              title="Community Services"
              description="Iftar meals, Eid celebrations, and support for those in need."
            />
          </div>
        </section>

        {/* Zakat Information */}
        <section className="bg-amber-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">💰 Zakat & Sadaqah</h2>
          <p className="text-gray-700 mb-4">
            We accept Zakat and Sadaqah donations. These funds are distributed according 
            to Islamic guidelines to help those in need in our community.
          </p>
          <p className="text-gray-700">
            When donating, you can specify whether your donation is:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li><strong>Zakat</strong> - Obligatory charity for eligible Muslims</li>
            <li><strong>Sadaqah</strong> - Voluntary charity</li>
            <li><strong>General Fund</strong> - For center operations and programs</li>
          </ul>
        </section>

        {/* Other Ways to Give */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Other Ways to Give
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📧 Check by Mail
              </h3>
              <p className="text-gray-600 text-sm">
                Make checks payable to &quot;Islamic Center of Ankeny&quot; and mail to our address.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🏠 In-Person
              </h3>
              <p className="text-gray-600 text-sm">
                Donate in person at the center during office hours or after prayers.
              </p>
            </div>
          </div>
        </section>

        {/* Tax Information */}
        <section className="text-center bg-gray-50 rounded-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tax-Deductible Donations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The Islamic Center of Ankeny is a registered 501(c)(3) non-profit organization. 
            All donations are tax-deductible to the extent allowed by law. 
            You will receive a receipt for your records.
          </p>
        </section>

        {/* Contact for Questions */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Questions about donations?{" "}
            <Link href="/contact" className="text-emerald-700 hover:text-emerald-800 font-medium">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
