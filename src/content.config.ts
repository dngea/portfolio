import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    collection: z.string(),
    technologies: z.array(z.string()),
    img: z.string(),
  }),
});

const publications = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/publications",
  }),

  schema: z.object({
    title: z.string(),
    publisher: z.string(),
    keywords: z.string(),
    date: z.coerce.date(),
    img: z.string(),
    link: z.string(),
  }),
});

const photography = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/photography" }),
  schema: z.object({
    title: z.string(),
    dates: z.string(),
    img: z.string(),
  }),
});

export const collections = { projects, publications, photography };
