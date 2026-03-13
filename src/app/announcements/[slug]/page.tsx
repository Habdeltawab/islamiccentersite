import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAnnouncementBySlug, getAllAnnouncementSlugs } from "@/lib/announcements";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllAnnouncementSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const announcement = getAnnouncementBySlug(slug);
  
  if (!announcement) {
    return {
      title: "Announcement Not Found | Islamic Center of Ankeny",
    };
  }

  return {
    title: `${announcement.title} | Islamic Center of Ankeny`,
    description: announcement.excerpt,
  };
}

export default async function AnnouncementPage({ params }: PageProps) {
  const { slug } = await params;
  const announcement = getAnnouncementBySlug(slug);

  if (!announcement) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/announcements"
          className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-8"
        >
          ← Back to Announcements
        </Link>

        {/* Article */}
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {announcement.category && (
                <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded">
                  {announcement.category}
                </span>
              )}
              <time className="text-gray-500">
                {new Date(announcement.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {announcement.title}
            </h1>
          </header>

          {/* Content */}
          <div className="prose prose-lg prose-emerald max-w-none">
            {announcement.content.split("\n").map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;
              
              if (trimmed.startsWith("# ")) {
                return null; // Skip h1 as we already have the title
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("- **")) {
                const match = trimmed.match(/- \*\*(.+?)\*\*:?\s*(.*)$/);
                if (match) {
                  return (
                    <p key={index} className="text-gray-700 ml-4 my-1">
                      • <strong>{match[1]}</strong>{match[2] ? `: ${match[2]}` : ""}
                    </p>
                  );
                }
              }
              if (trimmed.startsWith("- ")) {
                return (
                  <p key={index} className="text-gray-700 ml-4 my-1">
                    • {trimmed.replace("- ", "")}
                  </p>
                );
              }
              return (
                <p key={index} className="text-gray-700 my-4">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </article>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/announcements"
            className="inline-flex items-center text-emerald-700 hover:text-emerald-800"
          >
            ← Back to all announcements
          </Link>
        </div>
      </div>
    </div>
  );
}
