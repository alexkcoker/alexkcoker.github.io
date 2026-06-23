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
