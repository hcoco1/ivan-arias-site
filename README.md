# Ivan Arias — personal site (Astro)

Static Astro build of the `design_handoff_astro_site` hi-fi prototype.

## Commands
```
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview
```
Requires Node ≥ 22.12.

## Structure
```
astro.config.mjs            site URL, sitemap, Shiki (github-light)
src/
  content.config.ts         posts collection schema
  content/posts/*.md        posts → /blog/<filename>
  data/projects.json        project list (featured: true → home page)
  data/resume.json          About page content
  data/site.ts              site title, email, nav items
  lib/posts.ts              sorting, date formats, reading time
  styles/classical.css      design-system tokens + classes (Google Fonts @import removed)
  styles/site.css           globals, shared patterns, breakpoint, print
  layouts/BaseLayout.astro  <html>, fonts, meta, Header, main, Footer
  layouts/PostLayout.astro  single post + markdown (.prose) styles
  components/               Header, Footer, SectionLabel, RowLink
  pages/                    index, projects, about, 404, blog/index, blog/[...slug], rss.xml.js
```

## Editing content
- New post: add `src/content/posts/YYYY-MM-DD-slug.md` with `title`, `description`, `pubDate`, `category`, `tags` (optional `draft: true`).
- Posts whose body is empty (only a comment) show "This post hasn't been moved over yet" with a link to hcoco1.com. Paste the full text in to replace it.
- Projects / resume: edit the JSON files.

## Deploying
Fully static output, so no adapter and no environment variables are needed. It works on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages and others).
```
Build command:     npm run build
Output directory:  dist
Node version:      22.12 or newer (.nvmrc pins 24)
```
- The production URL (`site` in `astro.config.mjs`) is `https://www.hcoco1.com`. Canonical URLs, the sitemap, RSS and `robots.txt` all use it, so serve the site on `www.hcoco1.com` and redirect the bare domain to it.
- Pages live at URLs ending in `/` (`/about/`). Hosts serve `dist/about/index.html` there, and `dist/404.html` for missing pages.
- The CV download is `public/Ivan-Arias-CV.pdf`. To update the CV, replace that file and keep the same name.

## Client JS
Only one small script: the mobile menu toggle (Header.astro).
