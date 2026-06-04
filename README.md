# Lidi za kódem

A simple static landing page for the **Lidi za kódem** podcast, built with [Astro](https://astro.build/) and prepared for deployment to Cloudflare Pages.

The web page is published at domain https://lidizakodem.cz/.

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

To replace assets, either overwrite the existing files or update their paths in `src/data/site.ts`.

## Deployment to Cloudflare Pages via GitHub Actions

The deployment workflow is defined in `.github/workflows/deploy.yml`. It runs on every push to the `main` branch, installs dependencies, builds the site, and deploys the `dist` directory to Cloudflare Pages using Wrangler.

Required GitHub Secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The Cloudflare Pages project name is set to `lidi-za-kodem` in the workflow. If you use a different project name, update the same value in `.github/workflows/deploy.yml`.

