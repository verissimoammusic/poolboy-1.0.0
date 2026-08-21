# PoolBoy — Pool Care Marketing Site

A trilingual (Portuguese / English / French) single-page marketing site for
**PoolBoy**, a pool cleaning & maintenance service serving the Carrasqueira /
Lagoa de Albufeira / Santana area in Portugal.

Built with **React 18 + Vite 5 + Tailwind CSS 3**, with route-based i18n
(`/` = Portuguese, `/en` = English, `/fr` = French) and SEO via
`react-helmet-async`.

---

## Prerequisites

- **Node.js** 18 or newer (tested with Node 18/20)
- **npm** 9+ (ships with Node 18)

> The project uses ESM (`"type": "module"` in [`package.json`](package.json)).

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production (outputs to ./dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

| Script            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Vite dev server with HMR                         |
| `npm run build`   | Production build to `dist/`                      |
| `npm run preview` | Serve the built `dist/` locally for a smoke test |

---

## Project Structure

```
poolboy-site/
├─ index.html               # Vite entry; static <title> + font <link>s (Helmet overrides at runtime)
├─ package.json
├─ postcss.config.js        # tailwindcss + autoprefixer
├─ tailwind.config.js       # design tokens (colors, fonts, radii, shadows, breakpoints)
├─ vite.config.js
├─ public/
│  └─ favicon.png
└─ src/
   ├─ main.jsx              # app bootstrap: StrictMode + HelmetProvider + BrowserRouter
   ├─ App.jsx               # routes: / (pt), /en (en), /fr (fr), * -> redirect to /
   ├─ index.css            # Tailwind layers + component classes (hero-card, btn-wa, …)
   ├─ assets/
   │  └─ logo.png          # brand logo, imported by Hero.jsx (bundled, not from /public)
   ├─ pages/
   │  └─ LandingPage.jsx   # shared page layout for all languages (keyed by lang)
   ├─ components/
   │  ├─ Header.jsx        # floating PT/EN/FR language dropdown pill
   │  ├─ Hero.jsx          # hero section (logo, headline, WhatsApp CTA, mobile note)
   │  ├─ Features.jsx      # services grid (8 cards)
   │  ├─ Footer.jsx        # closing CTA card + footer note
   │  ├─ Seo.jsx          # per-route <head> via Helmet (title, desc, canonical, hreflang, JSON-LD)
   │  └─ icons.jsx        # inline SVG icons (services, phone, WhatsApp)
   └─ i18n/
      ├─ content.js        # the content dictionary (PT + EN + FR) + CONTACT export
      └─ useContent.jsx    # hook: reads useLocation().pathname -> returns {lang, data}
```

---

## Routing & Internationalization (i18n)

The site uses **route-based i18n** — there is no locale state in memory; the URL
itself determines the active language.

| Route | Language                                            |
| ----- | --------------------------------------------------- |
| `/`   | Portuguese (default)                                |
| `/en` | English                                             |
| `/fr` | French                                              |
| `*`   | redirects to `/` (see [`src/App.jsx`](src/App.jsx)) |

### How the language is detected

Language is read from the current path inside
[`src/i18n/useContent.jsx`](src/i18n/useContent.jsx):

```jsx
export function useContent() {
  const { pathname } = useLocation();
  const firstSegment = pathname.replace(/^\/+/, "").split(/[/?#]/)[0];
  const key =
    firstSegment === "en" || firstSegment === "fr" ? firstSegment : "pt";
  const data = content[key] ?? content.pt;
  return { lang: key, data };
}
```

> **Important:** This uses `useLocation().pathname`, **not** `useParams()`.
> The routes are static (`/`, `/en`, `/fr`), so `useParams()` returns `{}` for
> all of them. Any future change to dynamic routes (`/:lang`) must switch back
> to `useParams`.

### Language switcher (dropdown)

The previous two-button PT/EN "language slider" is now a single pill in
[`src/components/Header.jsx`](src/components/Header.jsx) that opens a small
PT / EN / FR menu. The trigger has a **fixed width** (`w-[132px]`) so opening
or closing the menu never shifts any layout — it is also absolutely positioned
top-right of the Hero, so it sits outside the document flow entirely.

The dropdown is fully keyboard-accessible: the trigger is a `<button>` with
`aria-haspopup` / `aria-expanded`, the menu is a `role="menu"` with
`role="menuitemradio"` items, Arrow Up/Down/Home/End move between items, Enter
activates the focused item, and Escape closes (returning focus to the trigger).
Clicking an item uses `react-router` `<Link>`, so navigation stays route-based
and [`LandingPage`](src/pages/LandingPage.jsx) remounts on the new `lang`.

### Clean remount on language change

[`LandingPage.jsx`](src/pages/LandingPage.jsx) wraps the page tree in
`<div key={lang}>`. Because the `key` changes when the route changes, React
unmounts the old subtree and mounts the fresh one — guaranteeing every localized
string, the `<html lang>` attribute, and all SEO tags flip together with no
stale state.

---

## Editing Content

All user-facing copy lives in **one file**: [`src/i18n/content.js`](src/i18n/content.js).

It exports two things:

### `CONTACT` — site-wide contact details

```js
export const CONTACT = {
  phoneDisplay: "931 492 206",
  phoneHref: "tel:+351931492206",
  whatsappHref: "https://wa.me/351931492206",
  canonical: "https://poolboy.example.com/", // <-- TODO: set real domain before deploy
};
```

- `phoneDisplay` — shown in the closing card copy
- `phoneHref` — `tel:` link on the round phone button
- `whatsappHref` — `wa.me` link on the WhatsApp CTAs (hero + closing card)
- `canonical` — used by [`Seo.jsx`](src/components/Seo.jsx) for `<link rel="canonical">`,
  hreflang alternates, and Open Graph `og:url`

> ⚠️ **Before deploying**, replace `canonical: "https://poolboy.example.com/"`
> with the real production domain. The placeholder also feeds the `<link
rel="alternate" hrefLang="pt">`, `hrefLang="en"`, `hrefLang="fr"`, and
> `hrefLang="x-default"` tags in Seo.jsx.

### `content` — the trilingual dictionary

```js
export const content = {
  pt: {
    htmlLang: "pt",
    nav: { ptLabel, enLabel, frLabel, services, contact },
    seo: { title, description },
    brand: "PoolBoy",
    hero: { headline, cta, ctaNote, mobileNote },
    services: { kicker, title, copy, services: SERVICES, langKey: "pt" },
    contact: { title, copy, cta },
    footer: { note },
  },
  en: {
    /* same shape, English values */
  },
  fr: {
    /* same shape, French values */
  },
};
```

Each top-level key (`pt`, `en`, `fr`) must have **the same shape** so the
components can read `data.hero.headline`, `data.services.kicker`, etc. without
checking the language.

> **Note on the French copy:** the `fr` block is scaffolded with `[FR] ...`
> placeholder strings (mirroring the English copy). Replace every `[FR] ...`
> value with the final French translation before launch — search the repo for
> `[FR]` to find them all, including a `fr` field on each of the 8 `SERVICES`
> entries.

### Service cards

The 8 service cards are defined once in the `SERVICES` array (shared by all
three languages) and referenced from `content.pt.services.services`,
`content.en.services.services`, and `content.fr.services.services`:

```js
const SERVICES = [
  {
    id: "aspiracao",
    pt: { title, subtitle },
    en: { title, subtitle },
    fr: { title, subtitle },
  },
  { id: "filtros", pt: { ... }, en: { ... }, fr: { ... } },
  // …8 cards total
];
```

- `id` maps the card to its icon (see the table in
  [`src/components/icons.jsx`](src/components/icons.jsx)). **Do not rename an
  `id`** without also updating the `ICONS` map in icons.jsx, or the card will
  render with no icon.

### Adding a new service card

1. Add an entry to `SERVICES` in [`content.js`](src/i18n/content.js) with a new
   unique `id`, plus `pt`, `en`, and `fr` strings.
2. Add a matching icon component + register it in the `ICONS` map in
   [`icons.jsx`](src/components/icons.jsx).
3. The grid in [`Features.jsx`](src/components/Features.jsx) is generated from
   `SERVICES`, so no layout change is needed (CSS Grid reflows automatically).
   On mobile the grid becomes a single column (see [`index.css`](src/index.css)).

---

## Design Tokens

All visual tokens are centralized in [`tailwind.config.js`](tailwind.config.js)
under `theme.extend`.

### Colors

| Token           | Value       | Used for                       |
| --------------- | ----------- | ------------------------------ |
| `ink.900`       | `#061827`   | page background, dark glass    |
| `ink.800`       | `#0a2438`   | dark surface                   |
| `brand.DEFAULT` | `#1889C9`   | active PT slider, icon color   |
| `brand.50`      | `#eaf6fd`   | light brand tint               |
| `cyan.DEFAULT`  | `#7eebff`   | borders, water-line, pills     |
| `cyan.50`       | `#e8faff`   | service icon bubble background |
| `wa.DEFAULT`    | `#25d366`   | WhatsApp CTA buttons           |
| `paper.DEFAULT` | `#f7fbfc`   | services section background    |
| `mist.100`      | `#e2f6ff`   | soft cyan body text (dark bg)  |
| `mist.72/78/42` | `rgba(...)` | alpha variants of mist         |

### Typography

- **Body / UI:** `Inter` (400 / 500 / 700) — loaded via Google Fonts in
  [`index.html`](index.html)
- **Display / headings:** `Satoshi` (500 / 700) — loaded via Fontshare in
  [`index.html`](index.html)
- Both declare a `"Placeholder"` local fallback for the brief pre-load moment.

### Layout breakpoints

The design is a 2-state layout: **desktop ≥ 1200px** vs **mobile ≤ 1199.98px**.
The custom `xl: "1200px"` breakpoint matches this split. All responsive
overrides in [`index.css`](src/index.css) use `@media (max-width: 1199.98px)`.

### Max widths (`maxWidth`)

| Token      | Value  | Used by                       |
| ---------- | ------ | ----------------------------- |
| `content`  | 1180px | hero / services / soft ending |
| `services` | 1000px | services grid                 |
| `closing`  | 820px  | closing card                  |
| `card`     | 358px  | mobile hero card              |

### Radii & shadows

See the `borderRadius` and `boxShadow` blocks in
[`tailwind.config.js`](tailwind.config.js) (`hero`, `closing`, `card`, `bubble`,
`hero-card`, `wa-cta`, `lang-active`, `service-card`, `soft-glow`).

---

## SEO

[`src/components/Seo.jsx`](src/components/Seo.jsx) renders per-route `<head>`
tags via `react-helmet-async`:

- `<html lang>` — `pt` or `en`
- `<title>` and `<meta name="description">` — from `content.{lang}.seo`
- `<link rel="canonical">` — from `CONTACT.canonical`
- `<link rel="alternate" hrefLang="pt">` / `hrefLang="en"` — for the two routes
- Open Graph (`og:type`, `og:url`, `og:title`, `og:description`)
- Twitter card (`summary_large_image`)
- A `LocalBusiness` JSON-LD schema (name, url, description, areaServed, telephone)

[`index.html`](index.html) holds a **static fallback** `<title>` and
`<meta description>` so the page is sane before React hydrates; Helmet overrides
them once mounted.

---

## Deployment to GitHub Pages (poolboy.pt)

This project is configured for automatic deployment to **GitHub Pages** with a
custom apex domain (`poolboy.pt`). Every push to the `main` branch triggers a
GitHub Actions workflow that builds and deploys the site.

### Automated workflow

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) handles:

1. `npm ci` — install dependencies
2. `npm run build` — produce static assets in `dist/`
3. Upload `dist/` as a Pages artifact
4. Deploy to GitHub Pages via `actions/deploy-pages`

The custom domain is preserved on each deploy because `public/CNAME` (containing
`poolboy.pt`) is copied verbatim into `dist/` by Vite.

### One-time manual setup

#### 1. GitHub Repository Settings → Pages

- Go to **Settings → Pages** in your GitHub repository.
- Under **Source**, select **GitHub Actions** (already configured by the workflow).
- Under **Custom domain**, enter `poolboy.pt`.
- GitHub will show a **TXT verification record** — add this to your DNS.
- Click **Save**, then enable **Enforce HTTPS** once the domain is verified.

#### 2. DNS Configuration (at your domain registrar)

Because `poolboy.pt` is an **apex/root domain**, you must add **A records**
pointing to GitHub Pages' IP addresses:

| Type | Name                            | Value                         |
| ---- | ------------------------------- | ----------------------------- |
| A    | @                               | 185.199.108.153               |
| A    | @                               | 185.199.109.153               |
| A    | @                               | 185.199.110.153               |
| A    | @                               | 185.199.111.153               |
| TXT  | \_github-pages-challenge-<user> | (value from Settings → Pages) |

Replace `<user>` with your GitHub username/organization in the TXT record name.

> **Note:** DNS propagation can take up to 48 hours. The domain status in
> Settings → Pages will show as "verified" once the TXT and A records are in place.

### SPA fallback for deep links

The site uses client-side routing (`/en`, `/fr`). GitHub Pages serves
[`public/404.html`](public/404.html) for unknown paths, which redirects back to
`/` while preserving the URL. This allows refreshing `/en` or `/fr` to work
correctly without server-side rewrites.

### Manual deployment (optional)

To deploy manually without pushing to `main`:

```bash
# Build locally
npm run build

# Or trigger the workflow manually from GitHub:
# Actions tab → "Deploy to GitHub Pages" → "Run workflow"
```

### Canonical URL

The canonical domain is set in [`src/i18n/content.js`](src/i18n/content.js:28):

```js
CONTACT.canonical = "https://poolboy.pt/";
```

This value drives the `<link rel="canonical">`, `hreflang` alternates, and
`og:url` meta tags via the [`Seo`](src/components/Seo.jsx) component.

---

## Tech Stack

| Concern        | Choice                                    |
| -------------- | ----------------------------------------- |
| Framework      | React 18                                  |
| Build tool     | Vite 5                                    |
| Styling        | Tailwind CSS 3 (+ `autoprefixer`)         |
| Routing        | react-router-dom 6 (BrowserRouter)        |
| SEO / `<head>` | react-helmet-async                        |
| Fonts          | Inter (Google Fonts), Satoshi (Fontshare) |

---

## Notes

- The brand logo is bundled as an asset (`src/assets/logo.png`, imported in
  [`Hero.jsx`](src/components/Hero.jsx)), so it is hashed and served from the
  Vite bundle — it does **not** need to live in `public/`.
- All SVG icons are inline components in [`icons.jsx`](src/components/icons.jsx)
  using `currentColor`, so they inherit the Tailwind text color of their parent.
- The `SERVICES` array is shared by both languages to keep card order and `id`
  mapping in sync — edit titles/subtitles inside each `pt`/`en` block, not by
  reordering the array.
