import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Islamic Center of Ankeny",
  description: "Get in touch with the Islamic Center of Ankeny. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to get involved? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <ContactItem
                icon="📍"
                title="Address"
                content={
                  <>
                    <p>Islamic Center of Ankeny</p>
                    <p>Ankeny, Iowa 50021</p>
                  </>
                }
              />
              
              <ContactItem
                icon="📧"
                title="Email"
                content={
                  <a
                    href="mailto:info@islamiccenterankeny.org"
                    className="text-emerald-700 hover:text-emerald-800"
                  >
                    info@islamiccenterankeny.org
                  </a>
                }
              />
              
              <ContactItem
                icon="📞"
                title="Phone"
                content={
                  <a
                    href="tel:+15155550123"
                    className="text-emerald-700 hover:text-emerald-800"
                  >
                    (515) 555-0123
                  </a>
                }
              />
              
              <ContactItem
                icon="🕐"
                title="Office Hours"
                content={
                  <>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday - Sunday: 10:00 AM - 2:00 PM</p>
                  </>
                }
              />
            </div>

            {/* Prayer Times Note */}
            <div className="mt-8 bg-emerald-50 rounded-xl p-6">
              <h3 className="font-semibold text-emerald-900 mb-2">🕌 Prayer Times</h3>
              <p className="text-gray-700 text-sm">
                The center is open for all five daily prayers. Check our{" "}
                <a href="/prayer-times" className="text-emerald-700 hover:text-emerald-800 underline">
                  prayer times page
                </a>{" "}
                for the daily schedule.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  title,
  content,
}: {
  icon: string;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className="text-gray-600">{content}</div>
      </div>
    </div>
  );
}
