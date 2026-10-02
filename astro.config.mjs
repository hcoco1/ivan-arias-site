// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.hcoco1.com',
  integrations: [sitemap()],
  markdown: {
    // Light, low-contrast theme; the background is made transparent in PostLayout.
    shikiConfig: { theme: 'github-light' },
  },
});
