# Islamic Center of Ankeny Website

A modern, static website for the Islamic Center of Ankeny, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🕌 **Prayer Times** - Daily prayer times fetched from AlAdhan API for Ankeny, IA
- 📢 **Announcements** - Community announcements stored as in-repo content
- 📧 **Contact Form** - Working contact form with API route
- 💰 **Donations** - Integration-ready donate page with Givebutter link
- 📱 **Responsive** - Mobile-first design that works on all devices
- ⚡ **Fast** - Static generation for optimal performance

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Prayer Times API**: [AlAdhan API](https://aladhan.com/prayer-times-api)
- **Deployment**: Cloudflare Pages

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, services, and quick links |
| `/about` | About the Islamic center, mission, and services |
| `/prayer-times` | Daily prayer times for Ankeny, IA |
| `/announcements` | List of community announcements |
| `/announcements/[slug]` | Individual announcement page |
| `/contact` | Contact form and information |
| `/donate` | Donation page with Givebutter link |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/islamiccentersite.git
cd islamiccentersite

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Quality Checks

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Production build
npm run build
```

## Adding Announcements

Announcements are stored as Markdown files in `/content/announcements/`. Each file uses YAML frontmatter for metadata.

### Steps to Add an Announcement

1. Create a new `.md` file in `content/announcements/`
2. Use a kebab-case filename that matches your slug (e.g., `my-new-event.md`)
3. Add YAML frontmatter and Markdown content:

```markdown
---
title: "Your Announcement Title"
date: "2026-03-15"
slug: "my-new-event"
category: "Events"
excerpt: "A brief summary shown on the announcements list page."
---

Full content of your announcement in Markdown format.

## Schedule

| Time | Activity |
|------|----------|
| 9:00 AM | Start |
| 12:00 PM | Break |

## Details

- Bullet point 1
- Bullet point 2

For questions, contact us at [info@example.com](mailto:info@example.com).
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The announcement title |
| `date` | Yes | Publication date (YYYY-MM-DD format) |
| `slug` | Yes | URL slug (must match filename without `.md`) |
| `category` | No | Category: Prayer, Education, Events, Ramadan, etc. |
| `excerpt` | No | Short summary for list pages |

### Supported Markdown

- Headings (`## h2`, `### h3`)
- Lists (bullets with `-` or `*`, numbered with `1.`)
- Tables (pipe-separated with header row)
- Bold (`**text**`) and italic (`*text*` or `_text_`)
- Links (`[text](url)`)

### Example Files

See existing announcements for reference:
- `content/announcements/ramadan-2026-schedule.md`
- `content/announcements/friday-prayer-update.md`

## Deployment to Cloudflare Pages

### Option 1: Connect GitHub Repository

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
6. Deploy!

### Option 2: Direct Upload

```bash
# Build the project
npm run build

# Install Wrangler (Cloudflare CLI)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npx @cloudflare/next-on-pages
wrangler pages deploy .vercel/output/static
```

### Environment Variables

For production, you may want to set:

- `NODE_ENV=production`

## Contact Form

The contact form currently stores submissions locally during development in `/contact-submissions/`. 

For production, update `/src/app/api/contact/route.ts` to integrate with your preferred email service:

- [Resend](https://resend.com/)
- [SendGrid](https://sendgrid.com/)
- [Mailgun](https://www.mailgun.com/)

## Prayer Times Configuration

Prayer times are fetched from AlAdhan API with the following configuration:

- **Location**: Ankeny, Iowa (41.7318°N, 93.6001°W)
- **Calculation Method**: ISNA (Islamic Society of North America)
- **Revalidation**: Every hour

To change the location or method, edit `/src/app/prayer-times/page.tsx`.

## License

This project is private and intended for the Islamic Center of Ankeny.

## Contributing

Please contact the Islamic Center of Ankeny administration for contribution guidelines.
