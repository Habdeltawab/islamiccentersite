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

/**
 * Simple markdown-to-JSX renderer
 * Handles: headings, lists, bold, italic, links, tables, paragraphs
 */
function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let listItems: string[] = [];
  let tableRows: string[][] = [];
  let inTable = false;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 my-4 text-gray-700">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(2); // Skip header and separator
      elements.push(
        <div key={`table-${elements.length}`} className="my-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                {headerRow.map((cell, idx) => (
                  <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {bodyRows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-4 py-3 text-sm text-gray-700">
                      {renderInlineMarkdown(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushList();
      if (inTable) flushTable();
      i++;
      continue;
    }

    // Table row
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushList();
      const cells = trimmed.slice(1, -1).split("|");
      // Skip separator row (contains only dashes and pipes)
      if (!trimmed.match(/^\|[\s\-:|]+\|$/)) {
        tableRows.push(cells);
      } else if (tableRows.length === 1) {
        // This is the separator, mark that we have a valid table
        tableRows.push(cells);
      }
      inTable = true;
      i++;
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Heading 1
    if (trimmed.startsWith("# ")) {
      flushList();
      // Skip H1 as we show title separately
      i++;
      continue;
    }

    // Heading 2
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          {trimmed.replace("## ", "")}
        </h2>
      );
      i++;
      continue;
    }

    // Heading 3
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          {trimmed.replace("### ", "")}
        </h3>
      );
      i++;
      continue;
    }

    // List item
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      listItems.push(trimmed.slice(2));
      i++;
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      listItems.push(trimmed.replace(/^\d+\.\s/, ""));
      i++;
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="text-gray-700 my-4 leading-relaxed">
        {renderInlineMarkdown(trimmed)}
      </p>
    );
    i++;
  }

  flushList();
  if (inTable) flushTable();

  return elements;
}

/**
 * Render inline markdown (bold, italic, links)
 */
function renderInlineMarkdown(text: string): React.ReactNode {
  // Split by markdown patterns while preserving them
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // Check for bold (**text**)
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Check for italic (*text* or _text_)
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|_(.+?)_/);
    // Check for links [text](url)
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

    // Find the earliest match
    let earliestMatch: { type: string; match: RegExpMatchArray; index: number } | null = null;

    if (boldMatch && boldMatch.index !== undefined) {
      earliestMatch = { type: "bold", match: boldMatch, index: boldMatch.index };
    }
    if (italicMatch && italicMatch.index !== undefined) {
      if (!earliestMatch || italicMatch.index < earliestMatch.index) {
        earliestMatch = { type: "italic", match: italicMatch, index: italicMatch.index };
      }
    }
    if (linkMatch && linkMatch.index !== undefined) {
      if (!earliestMatch || linkMatch.index < earliestMatch.index) {
        earliestMatch = { type: "link", match: linkMatch, index: linkMatch.index };
      }
    }

    if (!earliestMatch) {
      parts.push(remaining);
      break;
    }

    // Add text before the match
    if (earliestMatch.index > 0) {
      parts.push(remaining.slice(0, earliestMatch.index));
    }

    // Add the matched element
    if (earliestMatch.type === "bold") {
      parts.push(
        <strong key={`bold-${keyIndex++}`} className="font-semibold">
          {earliestMatch.match[1]}
        </strong>
      );
    } else if (earliestMatch.type === "italic") {
      parts.push(
        <em key={`italic-${keyIndex++}`}>
          {earliestMatch.match[1] || earliestMatch.match[2]}
        </em>
      );
    } else if (earliestMatch.type === "link") {
      parts.push(
        <a
          key={`link-${keyIndex++}`}
          href={earliestMatch.match[2]}
          className="text-emerald-700 hover:text-emerald-800 underline"
          target={earliestMatch.match[2].startsWith("http") ? "_blank" : undefined}
          rel={earliestMatch.match[2].startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {earliestMatch.match[1]}
        </a>
      );
    }

    // Continue with the rest
    remaining = remaining.slice(earliestMatch.index + earliestMatch.match[0].length);
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}

export default async function AnnouncementPage({ params }: PageProps) {
  const { slug } = await params;
  const announcement = getAnnouncementBySlug(slug);

  if (!announcement) {
    notFound();
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/announcements"
          className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-8 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Announcements
        </Link>

        {/* Article Card */}
        <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <header className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              {announcement.category && (
                <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                  {announcement.category}
                </span>
              )}
              <time className="text-gray-500 text-sm">
                {new Date(announcement.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {announcement.title}
            </h1>
            {announcement.excerpt && (
              <p className="mt-4 text-lg text-gray-600">
                {announcement.excerpt}
              </p>
            )}
          </header>

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg prose-emerald max-w-none">
              {renderMarkdown(announcement.content)}
            </div>
          </div>
        </article>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/announcements"
            className="inline-flex items-center text-emerald-700 hover:text-emerald-800 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all announcements
          </Link>
          
          <div className="text-sm text-gray-500">
            Islamic Center of Ankeny
          </div>
        </div>
      </div>
    </div>
  );
}
