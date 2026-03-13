import type { Metadata } from "next";
import Link from "next/link";
import { getAnnouncements } from "@/lib/announcements";

export const metadata: Metadata = {
  title: "Announcements | Islamic Center of Ankeny",
  description: "Latest news and announcements from the Islamic Center of Ankeny.",
};

export default function AnnouncementsPage() {
  const announcements = getAnnouncements();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Announcements</h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest news from our community
          </p>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {announcements.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600">No announcements at this time.</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <article
                key={announcement.slug}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {announcement.category && (
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {announcement.category}
                        </span>
                      )}
                      <time className="text-sm text-gray-500">
                        {new Date(announcement.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <Link href={`/announcements/${announcement.slug}`}>
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-emerald-700 transition-colors mb-2">
                        {announcement.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 line-clamp-2">{announcement.excerpt}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/announcements/${announcement.slug}`}
                    className="text-emerald-700 font-medium hover:text-emerald-800 inline-flex items-center"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
