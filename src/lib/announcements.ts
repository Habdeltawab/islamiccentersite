export interface Announcement {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category?: string;
}

// In-repo announcements data (can be easily extended)
const announcements: Announcement[] = [
  {
    slug: "ramadan-2026-schedule",
    title: "Ramadan 2026 Schedule and Programs",
    date: "2026-02-15",
    excerpt: "Join us for daily Iftar, Tarawih prayers, and special programs throughout the blessed month of Ramadan.",
    content: `
# Ramadan 2026 Schedule and Programs

Assalamu Alaikum dear community members,

We are excited to announce our schedule for the blessed month of Ramadan 2026.

## Daily Programs

- **Iftar**: Provided daily at the center starting from Maghrib
- **Tarawih Prayers**: Every night after Isha prayer
- **Qiyam ul-Layl**: Last 10 nights of Ramadan

## Special Programs

- **Weekend Islamic Classes**: Saturday and Sunday mornings
- **Youth Quran Competition**: Registration open now
- **Sisters' Halaqa**: Every Wednesday after Asr

## Iftar Sponsorship

You can sponsor an Iftar for the community. Please contact the administration for details.

May Allah accept our fasting and prayers during this blessed month.

Jazakum Allahu Khairan,
Islamic Center of Ankeny
    `,
    category: "Ramadan",
  },
  {
    slug: "friday-prayer-update",
    title: "Friday Prayer Time Update",
    date: "2026-03-01",
    excerpt: "Starting March 2026, our Friday Jummah prayer time will be adjusted. Please note the new schedule.",
    content: `
# Friday Prayer Time Update

Dear Community Members,

Starting March 2026, we are adjusting our Friday Jummah prayer schedule to better serve our community.

## New Schedule

- **First Khutbah**: 12:30 PM
- **First Prayer**: 1:00 PM
- **Second Khutbah**: 1:30 PM
- **Second Prayer**: 2:00 PM

## Important Notes

- Please arrive at least 15 minutes early
- Parking is limited, consider carpooling
- Children's program available during prayer

We appreciate your understanding and cooperation.

Jazakum Allahu Khairan,
Islamic Center of Ankeny
    `,
    category: "Prayer",
  },
  {
    slug: "quran-classes-registration",
    title: "Quran Classes Registration Open",
    date: "2026-03-10",
    excerpt: "Registration is now open for our Spring 2026 Quran classes for children and adults.",
    content: `
# Quran Classes Registration Open

Assalamu Alaikum,

We are pleased to announce that registration for our Spring 2026 Quran classes is now open!

## Classes Offered

### Children's Program (Ages 5-15)
- **Saturdays**: 10:00 AM - 12:00 PM
- **Sundays**: 10:00 AM - 12:00 PM
- Curriculum includes: Quran reading, Tajweed, and Islamic Studies

### Adult Program
- **Weekday Evenings**: Tuesday and Thursday, 7:00 PM - 8:30 PM
- All levels welcome, from beginners to advanced

## Registration

Please visit our center or contact us to register. Space is limited!

**Registration Deadline**: March 25, 2026

Jazakum Allahu Khairan,
Islamic Center of Ankeny
    `,
    category: "Education",
  },
];

export function getAnnouncements(): Announcement[] {
  // Sort by date, newest first
  return [...announcements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAnnouncementBySlug(slug: string): Announcement | undefined {
  return announcements.find((a) => a.slug === slug);
}

export function getAllAnnouncementSlugs(): string[] {
  return announcements.map((a) => a.slug);
}
