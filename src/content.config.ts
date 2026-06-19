import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
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
    date: z.string(),
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
