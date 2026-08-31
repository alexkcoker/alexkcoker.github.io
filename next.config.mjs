/**
 * Next.js configuration tuned for static export to GitHub Pages.
 *
 * GitHub Pages serves static files only, so we use `output: 'export'`.
 *
 * basePath / assetPrefix:
 *   - For a *user* page repo named `<user>.github.io` the site is served from
 *     the domain root, so BASE_PATH should be empty (the default).
 *   - For a *project* page repo (e.g. `portfolio`) the site is served from
 *     `/<repo>`, so set BASE_PATH=/portfolio at build time.
 *
 * Override with the BASE_PATH env var (see the GitHub Actions workflow / README).
 *
 * NEXT_PUBLIC_LAST_UPDATED (the footer's "Last updated" date) is NOT set
 * here — see scripts/write-last-updated.mjs, run as an npm `prebuild` step.
 * A next.config.js `env` entry only reliably reaches Server Components
 * under Turbopack when the var also exists in the real process env before
 * the build starts; computing it here and only declaring it via `env` was
 * silently dropped in testing, so it's written to `.env.local` instead,
 * which Next's built-in env loading picks up for both server and client code.
 */
const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  // Emit /about/index.html instead of /about.html so routes work on GH Pages.
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimization server; serve images as-is.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
