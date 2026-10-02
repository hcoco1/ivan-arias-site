import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Dates like "Apr 6 2026" (old-site frontmatter) would otherwise parse in the build machine's
 *  local time zone and show a day early; read them as UTC like ISO dates (2026-04-06). */
const utcDate = z.preprocess(
  (v) => (typeof v === 'string' && !/^\d{4}-\d{2}-\d{2}/.test(v) ? new Date(`${v} UTC`) : v),
  z.coerce.date(),
);

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      pubDate: utcDate,
      // Posts copied from the old site use `badge` instead of `category`; either is accepted.
      category: z.string().trim().optional(),
      badge: z.string().trim().optional(),
      tags: z.array(z.string()),
      draft: z.boolean().optional(),
    })
    .refine((d) => d.category || d.badge, { message: 'Add a `category` (or `badge`)', path: ['category'] })
    .transform(({ badge, category, ...rest }) => ({ ...rest, category: (category || badge)! })),
});

export const collections = { posts };
