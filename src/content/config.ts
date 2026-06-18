import { defineCollection, z } from "astro:content";

const projects = defineCollection({
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
  schema: z.object({
    title: z.string(),
    dates: z.string(),
    img: z.string(),
  }),
});

export const collections = { projects, publications, photography };
