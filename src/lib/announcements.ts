import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Announcement {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category?: string;
}

// Path to announcements content directory
const ANNOUNCEMENTS_DIR = path.join(process.cwd(), "content/announcements");

/**
 * Get all announcement files from the content directory
 */
function getAnnouncementFiles(): string[] {
  try {
    return fs
      .readdirSync(ANNOUNCEMENTS_DIR)
      .filter((file) => file.endsWith(".md"));
  } catch {
    console.error("Could not read announcements directory");
    return [];
  }
}

/**
 * Parse a markdown file and extract frontmatter and content
 */
function parseAnnouncementFile(filename: string): Announcement | null {
  try {
    const filePath = path.join(ANNOUNCEMENTS_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Validate required fields
    if (!data.title || !data.date || !data.slug) {
      console.warn(`Announcement ${filename} missing required frontmatter`);
      return null;
    }

    return {
      slug: data.slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || "",
      content: content.trim(),
      category: data.category,
    };
  } catch (error) {
    console.error(`Error parsing announcement ${filename}:`, error);
    return null;
  }
}

/**
 * Get all announcements, sorted by date (newest first)
 */
export function getAnnouncements(): Announcement[] {
  const files = getAnnouncementFiles();
  const announcements = files
    .map(parseAnnouncementFile)
    .filter((a): a is Announcement => a !== null);

  // Sort by date, newest first
  return announcements.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single announcement by its slug
 */
export function getAnnouncementBySlug(slug: string): Announcement | undefined {
  const files = getAnnouncementFiles();
  
  for (const file of files) {
    const announcement = parseAnnouncementFile(file);
    if (announcement && announcement.slug === slug) {
      return announcement;
    }
  }
  
  return undefined;
}

/**
 * Get all announcement slugs (for static generation)
 */
export function getAllAnnouncementSlugs(): string[] {
  const announcements = getAnnouncements();
  return announcements.map((a) => a.slug);
}

/**
 * Get announcements by category
 */
export function getAnnouncementsByCategory(category: string): Announcement[] {
  return getAnnouncements().filter(
    (a) => a.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const announcements = getAnnouncements();
  const categories = new Set<string>();
  
  announcements.forEach((a) => {
    if (a.category) {
      categories.add(a.category);
    }
  });
  
  return Array.from(categories).sort();
}
