# Lidi za kódem

A simple static landing page for the **Lidi za kódem** podcast, built with [Astro](https://astro.build/) and prepared for deployment to GitHub Pages.

The website is intended to be published at `https://lidizakodem.cz/`.

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

The static build output is generated in the `dist` directory. To preview the production build locally:

```bash
npm run preview
```

## Editing Content

The main configuration file is `src/data/site.ts`.

Use it to update:

- podcast platform links in `listenLinks`,
- the RSS feed URL in `rss.url`,
- the contact email in `email`,
- social links in `author.socialLinks`,
- the canonical URL in `canonicalUrl`,
- logo, favicon, and Open Graph image paths in `assets`.

Logo, favicon, Open Graph image, and platform icons are stored in `public/` and `public/icons/`.

The author portrait source is `src/assets/author.jpg`. Astro generates compressed WebP variants at 320px, 640px, and the original image width (currently 767px), without upscaling. The browser selects a variant for the displayed size and screen density; the full JPEG is not served to visitors. Replace this source file to update the portrait and regenerate the optimized files on the next build.

Used assets:

- website logo: `public/logo.png`
- favicon: `public/favicon.png`
- sharing image: `public/og-image.png`
- platform icons: `public/icons/*.png`
- GitHub Pages custom domain file: `public/CNAME`

To replace assets, either overwrite the existing files or update their paths in `src/data/site.ts`.

## Deployment to GitHub Pages

The deployment workflow is defined in `.github/workflows/deploy.yml`. It runs on every push to the `master` branch, builds the Astro site, uploads the static artifact, and deploys it to GitHub Pages.

No Cloudflare account or GitHub Secrets are required for this deployment path.

### GitHub Pages Settings

In the GitHub repository:

1. Open **Settings > Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Under **Custom domain**, set `lidizakodem.cz`.
4. After DNS validation succeeds, enable **Enforce HTTPS**.

The file `public/CNAME` contains `lidizakodem.cz`, so the built site artifact also includes the custom domain declaration.

### DNS Records

The domain is currently managed through Seznam Email Profi DNS. Keep the existing mail-related DNS records, especially MX, SPF, DKIM, and DMARC.

Add these records for the root domain:

```text
@  A  185.199.108.153
@  A  185.199.109.153
@  A  185.199.110.153
@  A  185.199.111.153
```

Optional IPv6 records:

```text
@  AAAA  2606:50c0:8000::153
@  AAAA  2606:50c0:8001::153
@  AAAA  2606:50c0:8002::153
@  AAAA  2606:50c0:8003::153
```

Add this record for the `www` subdomain:

```text
www  CNAME  pseckar.github.io
```

Do not change the domain nameservers when using GitHub Pages with these DNS records.

## Latest Episode and Audio

The browser fetches `site.rss.url` on each page load, revalidating its cached response, and shows the most recently published playable episode, preferring full episodes over trailers. The feed currently permits cross-origin browser requests. No backend, API key, RSS proxy, scheduled build, or new dependency is needed. All episode-specific content comes from RSS; the static card only contains generic loading/fallback copy, the show logo, and the show-level Spotify link. The podcast host's own feed/CDN propagation can still delay a new episode appearing. An already-open page updates on reload.

The episode card uses the RSS title, publication date, duration, artwork, a plain-text description excerpt, publisher link, and audio enclosure. Feed HTML is never injected into the page. Audio uses the browser's native controls (including seeking, volume and playback speed where supported), does not autoplay, and is not downloaded before interaction. Opening the intro and playing it pauses the latest episode, and vice versa.

If RSS is unavailable, malformed, empty, or blocked, the page shows a retry option and keeps every platform link usable. Without JavaScript, the platform links, copy, contact, and expandable native intro player remain available. The intro's permanent links are configured in `site.intro`.

## Appearance and Layout

The page defaults to the system's light/dark preference, including changes while it is open. The three header buttons select light, dark, or system. A choice is saved locally when browser storage is available and synchronized across tabs. CSS also follows the system without JavaScript.

The latest episode and platform links sit alongside one another on desktop. On smaller screens the platforms come first. Existing podcast and author copy remains in `src/data/site.ts`. The theme, responsive rules, and typography are in `src/styles/global.css`; browser behavior is in `src/scripts/page.ts`, and RSS parsing is in `src/scripts/feed.ts`.

DM Sans and Manrope are self-hosted in `public/fonts/`, including Czech glyphs and their SIL Open Font Licenses. Their font-face definitions are in `src/styles/fonts.css`, with system font fallbacks. The site has no analytics, Google Fonts requests, or embedded third-party player; the browser contacts the podcast host for the feed, artwork, and requested audio.
