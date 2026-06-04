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

Used assets:

- website logo: `public/logo.png`
- favicon: `public/favicon.png`
- sharing image: `public/og-image.png`
- platform icons: `public/icons/*.png`
- GitHub Pages custom domain file: `public/CNAME`

To replace assets, either overwrite the existing files or update their paths in `src/data/site.ts`.

## Deployment to GitHub Pages

The deployment workflow is defined in `.github/workflows/deploy.yml`. It runs on every push to the `main` branch, builds the Astro site, uploads the static artifact, and deploys it to GitHub Pages.

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

## Prepared for Later

The latest episode section is not displayed yet. `src/data/site.ts` contains a prepared `latestEpisode` value so the section can be added later without restructuring the rest of the page.
