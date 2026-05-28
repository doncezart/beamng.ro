# BeamNG România — Presentation Website Design

**Date:** 2026-05-28  
**Project:** beamng.ro  
**Type:** Static/SSR presentation site (no accounts, no database)

---

## Overview

A modern, clean presentation website for **BeamNG România** — a Romanian community for the BeamNG.drive multiplayer game. The site serves as a landing hub for a project being built: it showcases what the community offers (servers, Discord, content creators), communicates the roadmap, and publishes news. No authentication, no user data.

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | SvelteKit 5 + Svelte 5 | Already scaffolded |
| Styling | Tailwind CSS 4 | Already installed |
| Components | shadcn-svelte (bits-ui, Svelte 5 compatible) | To be installed |
| Markdown/Blog | mdsvex | Already installed |
| Fonts | Inter via `@fontsource/inter` | Clean, modern |
| Adapter | `adapter-auto` | Keep as-is |
| Deployment | TBD (Vercel/Cloudflare Pages compatible) | |

---

## Site Structure

Single scrolling page with anchor-based navigation. Blog posts at a separate route.

```
/                         — Main page (all sections)
/noutati                  — Blog post list
/noutati/[slug]           — Individual blog post (mdsvex)
```

### Navigation (sticky top bar)
- Logo/brand left: "BeamNG România"
- Links right: Servere · Discord · Creatori · Roadmap · Noutăți
- Mobile: hamburger → Sheet (shadcn drawer)
- CTA button: "Alătură-te" (Discord invite link)

---

## Sections (in scroll order)

### 1. Hero (`#hero`)
- Full-width section, centered content
- Large heading: "Comunitatea românească BeamNG"
- Subheading: one sentence about the community mission (RO)
- Two CTA buttons: "Alătură-te pe Discord" (primary, orange) + "Explorează serverele" (secondary, outline)
- Background: subtle topographic/noise texture or a blurred screenshot of gameplay — static image, no video
- No dark overlay; light section with accent color

### 2. Despre noi (`#despre`)
- Two-column layout (stacks on mobile)
- Left: 3–4 sentences about community vision and values (Romanian)
- Right: 3 stat cards — "Servere active" (placeholder: 0, "în curând"), "Membri Discord" (placeholder: "−"), "Creatori" (count from config)
- Background: `zinc-50`

### 3. Servere BeamMP (`#servere`)
- **Data source:** `https://backend.beammp.com/servers-info` — JSON array fetched in `+page.ts` load function
- **Romanian servers** (country code `"RO"`) shown prominently at top with orange "🇷🇴 Server Românesc" badge
- **Empty state** for RO servers (expected initially): card with message "Niciun server românesc momentan — în curând!" with a roadmap teaser link
- **Global server grid** below: client-side pagination (20/page, `currentPage` state in component — no URL changes), each card shows:
  - Server name (truncated at 60 chars)
  - Map name
  - `players / maxplayers` badge (color: green if < 80% full, orange if ≥ 80%, red if full)
  - Country flag emoji derived from country code
  - Modded / Vanilla badge
  - Private badge if applicable
- CORS fallback: if SSR fetch fails, client-side `onMount` fetch as fallback
- Background: white

### 4. Comunitate Discord (`#discord`)
- Static section — no Discord widget (intentional)
- Left column: description of the Discord server, what to expect
- Right column: visual mock of channel list (hardcoded, styled as Discord-like sidebar preview):
  - `#general` · `#showcase` · `#evenimente` · `#muzica-in-joc` · `#offtopic`
- Big CTA: "Intră pe server →" button (Discord invite URL configured in `src/lib/config.ts`)
- Background: `zinc-50`

### 5. Creatori de conținut (`#creatori`)
- Data: hardcoded in `src/lib/data/creators.ts`
- Each entry: `{ videoId: string, title: string, creatorName: string, channelUrl: string }`
- Display: responsive grid of video cards
  - Thumbnail from `https://img.youtube.com/vi/{videoId}/hqdefault.jpg`
  - Video title
  - Creator name as link to their YouTube channel
  - Clicking the card opens `https://youtube.com/watch?v={videoId}` in new tab
- No iframes on the main page (performance)
- Background: white

### 6. Roadmap (`#roadmap`)
- Vertical timeline, built with plain divs (no external lib)
- Items (hardcoded in component or `src/lib/data/roadmap.ts`):
  1. "Server propriu BeamNG" — status: Planificat
  2. "Server Discord activ" — status: În lucru
  3. "Turneu inaugural" — status: Planificat
  4. "Parteneriate cu creatori" — status: Planificat
- Status badge colors: Planificat = `zinc`, În lucru = orange, Finalizat = green
- Background: `zinc-50`

### 7. Noutăți (`#noutati`)
- Shows 3 most recent blog posts as cards (title, date, excerpt, "Citește mai mult →" link)
- Posts are mdsvex `.md` files in `src/content/posts/`
- Post metadata via frontmatter: `title`, `date`, `excerpt`, `slug`
- "Toate noutățile →" link to `/noutati`
- Background: white

### 8. Footer
- Logo + tagline
- Nav links (same as header)
- Social icons: Discord, YouTube (links from `src/lib/config.ts`)
- Copyright: "© 2026 BeamNG România. Neafiliat cu BeamNG GmbH."
- Background: `zinc-900`, text: white

---

## Data Architecture

### `src/lib/config.ts`
Central config for URLs and community info:
```ts
export const config = {
  discordInvite: 'https://discord.gg/PLACEHOLDER',
  youtubeChannel: '',
  brandName: 'BeamNG România',
}
```

### `src/lib/data/creators.ts`
```ts
export interface Creator {
  videoId: string
  title: string
  creatorName: string
  channelUrl: string
}
export const creators: Creator[] = []
```

### `src/lib/data/roadmap.ts`
```ts
export type RoadmapStatus = 'Planificat' | 'În lucru' | 'Finalizat'
export interface RoadmapItem {
  title: string
  description: string
  status: RoadmapStatus
}
export const roadmapItems: RoadmapItem[] = [...]
```

### `src/content/posts/`
mdsvex markdown files with frontmatter. Loaded via `import.meta.glob` in `src/lib/posts.ts`.

---

## Server List Data Flow

```
SvelteKit +page.ts load()
  → fetch('https://backend.beammp.com/servers-info')
  → returns BeamMPServer[]  (typed interface in src/lib/types.ts)
  → data.servers passed to +page.svelte
  → RO servers = servers.filter(s => s.location === 'RO')
  → displayed at top of #servere section
  → all servers paginated in grid below
```

### `BeamMPServer` interface (to be confirmed against actual API response)
```ts
interface BeamMPServer {
  ip: string
  port: number
  name: string
  playercount: number  // or players
  maxplayers: number
  map: string
  desc?: string
  location: string     // country code e.g. "RO", "DE"
  private: boolean
  official?: boolean
  modded?: boolean     // or derived from field
}
```

---

## Language Policy
- **Primary:** Romanian — all UI labels, section titles, CTAs, body copy
- **Secondary:** English — server names from API are displayed as-is (they're community-submitted), creator names/video titles as-is
- No i18n library needed; content is single-language with natural code-switching

---

## Component Plan (shadcn-svelte)

Components to install: `card`, `badge`, `button`, `separator`, `sheet` (mobile nav)

Custom components to build:
- `ServerCard.svelte` — individual server display
- `VideoCard.svelte` — creator video thumbnail + info
- `RoadmapTimeline.svelte` — vertical timeline
- `DiscordPreview.svelte` — static channel list mock
- `PostCard.svelte` — blog post preview
- `SiteNav.svelte` — sticky navigation
- `SiteFooter.svelte` — footer

---

## Non-Goals (explicitly out of scope)
- User accounts or authentication
- Server favoriting, filtering, or search
- Discord bot integration
- YouTube video embeds (iframes) on main page
- Dark mode
- Internationalization (i18n)
- Admin panel or CMS
- Any backend beyond SvelteKit's load functions
