import { c as createComponent } from './astro-component_QHW-LdW4.mjs';
import { m as maybeRenderHead, c as addAttribute, b as renderTemplate, r as renderComponent } from './ssr-function_0tbWWBgZ.mjs';
import { $ as $$Layout } from './Layout_DaGX44kn.mjs';
import { $ as $$Image } from './_astro_assets_imNEL9Uw.mjs';
import { b as buttonVariants, $ as $$Linkedin } from './Linkedin_ChV_ytj6.mjs';
import clsx from 'clsx';
import { $ as $$ProjectCard } from './projects_1xgLV-R5.mjs';
import { g as getCollection } from './helper_DuBkooU8.mjs';
import { $ as $$PublicationCard } from './PublicationCard_szQXExjR.mjs';
import { Mail } from 'lucide-react';

const $$ScrollHint = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ScrollHint;
  const { className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(clsx(
    "text-dark absolute  left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5",
    className
  ), "class")}> <div class="from-dark/70 h-9 w-px bg-gradient-to-b to-transparent"></div> <span class="text-[10px] tracking-widest uppercase opacity-70">scroll</span> </div>`;
}, "/Users/danielgea/dev/portfolio/src/components/atoms/ScrollHint.astro", void 0);

const $$Welcome = createComponent(($$result, $$props, $$slots) => {
  const name = "Daniel Gea";
  const rol = "Frontend Developer · UX Designer";
  const image = "/images/about/profile.webp";
  const description = "I build web applications with a focus on clean, scalable code and thoughtful organisation. Responsive design, accessibility, and UX principles are at the core of how I work.";
  return renderTemplate`${maybeRenderHead()}<section class="relative flex min-h-[92vh] items-center justify-center overflow-hidden p-6 sm:p-8"> <!-- Dot grid texture --> <!-- <div
    class="pointer-events-none absolute inset-0"
    style="background-image: radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px); background-size: 28px 28px;"
  >
  </div> --> <!-- Fade overlay --> <!-- <div
    class="pointer-events-none absolute inset-0"
    style="background: radial-gradient(ellipse 70% 70% at 30% 50%, transparent 40%, white 100%);"
  >
  </div> --> <div class="relative z-10 flex w-full max-w-5xl flex-col-reverse items-center gap-8 md:flex-row md:gap-12"> <!-- Text --> <div class="text-dark flex flex-1 flex-col gap-6 pb-2 text-center md:translate-y-8 md:gap-8 md:text-left"> <div> <h1 class="text-4xl leading-tight font-semibold sm:text-5xl"> ${name} </h1> <p class="mt-2.5 text-lg font-normal opacity-70">${rol}</p> </div> <p class="mx-auto max-w-[44ch] text-sm leading-relaxed opacity-80 md:mx-0"> ${description} </p> <div class="flex items-center justify-center gap-3 md:justify-start"> <a href="#work"${addAttribute(buttonVariants({ variant: "default", size: "default" }), "class")}>
View work
</a> <a href="/about#contact"${addAttribute(buttonVariants({ variant: "outline" }), "class")}>
Get in touch
</a> </div> </div> <!-- Image --> <div class="relative w-48 shrink-0 sm:w-64 md:w-80"> <figure class="aspect-3/4 w-full overflow-hidden rounded-2xl shadow-xl"> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": "Daniel Gea", "width": 480, "height": 640, "class": "h-full w-full object-cover" })} </figure> </div> </div> ${renderComponent($$result, "ScrollHint", $$ScrollHint, { "className": "bottom-8" })} </section>`;
}, "/Users/danielgea/dev/portfolio/src/components/Welcome.astro", void 0);

const $$Stack = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Stack;
  const stack = [
    "TypeScript / JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "REST / GraphQL",
    "Astro",
    "Vitest / Jest",
    "Sass",
    "Storybook",
    "Alpine.js",
    "Figma"
  ];
  return renderTemplate`<!-- todo: scroll top -margin -->${maybeRenderHead()}<section class="mx-auto max-w-5xl scroll-mt-50 space-y-8" id="stack"> <h2 class="text-light text-3xl font-bold">Stack</h2> <ul class="grid h-full w-full grid-flow-row grid-cols-2 gap-2 sm:grid-flow-col sm:grid-cols-none sm:grid-rows-4"> ${stack.map((i) => renderTemplate`<li class="text-light w-fit">${i}</li>`)} </ul> </section>`;
}, "/Users/danielgea/dev/portfolio/src/components/Stack.astro", void 0);

const $$Experience = createComponent(($$result, $$props, $$slots) => {
  const abss = {
    roleSummary: "Focus on building and maintaining web applications using Next.js in collaboration with backend and design teams.",
    highlights: [
      "Developed a drag-and-drop media library, integrated into a custom CMS for non-technical client use, integrated using intertia/react.",
      "Built a reusable React component library, packaged as a private npm module and consumed across multiple client projects.",
      "Designed headless frontend architecture on top of a Laravel backend, keeping the two decoupled.",
      "Implemented multi-language support (next-intl) with URL-driven filters and pagination that stay in sync across locales.",
      "Worked with authentication flows and REST API integrations for production apps.",
      "Added testing using Vitest for core utility, avoiding breaking features on refactors.",
      "Designed components and flows with an accessibility-first approach (semantics, contrasts, navigation, ARIA tags)."
    ]
  };
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-5xl space-y-8" data-astro-cid-xpq65ryk> <h2 class="text-light text-3xl font-bold" data-astro-cid-xpq65ryk>Experience</h2> <div class="row" data-astro-cid-xpq65ryk> <div class="col-6" data-astro-cid-xpq65ryk> <div class="card mt-5" data-astro-cid-xpq65ryk> <div class="card-body group space-y-4 px-5" data-astro-cid-xpq65ryk> <section class="vert-hr group space-y-4 px-1" data-astro-cid-xpq65ryk> <div class="bg-light group-hover:bg-cream absolute top-3.5 -left-[12px] z-1 size-[10px] -translate-1/2 rounded-full transition group-hover:scale-130" data-astro-cid-xpq65ryk></div> <h5 class="text-dark bg-cream mb-1 w-fit px-2 font-medium hover:contrast-110" data-astro-cid-xpq65ryk> <a href="https://www.abss.at/" target="_blank" data-astro-cid-xpq65ryk>
abss interactive
</a> </h5> <h6 class="font-weight-bolder text-light" data-astro-cid-xpq65ryk>
Frontend Developer
<span class="text-light" data-astro-cid-xpq65ryk>&nbsp;|&nbsp;April 2025 &ndash; Present
</span> </h6> <div class="space-y-2" data-astro-cid-xpq65ryk> <p class="text-light" data-astro-cid-xpq65ryk> ${abss.roleSummary} </p> <ul class="marker:text-light/80 text-light/95 list-disc space-y-1.5 pl-5" data-astro-cid-xpq65ryk> ${abss.highlights.map((line) => renderTemplate`<li class="text-[15px] leading-relaxed" data-astro-cid-xpq65ryk>${line}</li>`)} </ul> </div> </section> </div> </div> </div> </div> </section>`;
}, "/Users/danielgea/dev/portfolio/src/components/Experience.astro", void 0);

const $$ProjectsSection = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await getCollection("projects");
  projects.sort((a, b) => {
    const projectA = a.data.date.getTime();
    const projectB = b.data.date.getTime();
    return projectB - projectA;
  });
  const visibleProjects = projects.slice(0, 3);
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-5xl space-y-8"> <h2 class="text-light text-3xl font-bold">Projects</h2> <div class="flex w-full flex-col space-y-12"> ${visibleProjects.map((project) => renderTemplate`<a${addAttribute(`/projects/${project.id}`, "href")} class="block"> ${renderComponent($$result, "ProjectCard", $$ProjectCard, { "data": project })} </a>`)} <a href="/projects"${addAttribute(buttonVariants({ className: " mt-4 ml-auto" }), "class")}>
More projects
</a> </div> </section>`;
}, "/Users/danielgea/dev/portfolio/src/components/ProjectsSection.astro", void 0);

const $$PublicationsSection = createComponent(async ($$result, $$props, $$slots) => {
  const publications = await getCollection("publications");
  publications.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const visiblePublications = publications.slice(0, 2);
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-5xl space-y-8"> <h2 class="text-light text-3xl font-bold">Publications</h2> <div class="flex w-full flex-col space-y-12"> ${visiblePublications.map((publication) => renderTemplate`${renderComponent($$result, "PublicationCard", $$PublicationCard, { "data": publication, "dark": true })}`)} <a href="/publications"${addAttribute(buttonVariants({ className: "mt-4 ml-auto" }), "class")}>
More publications
</a> </div> </section>`;
}, "/Users/danielgea/dev/portfolio/src/components/PublicationsSection.astro", void 0);

const $$Cta = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative w-full px-6 py-20 sm:px-16 sm:py-32"> <!-- <div
    class="pointer-events-none absolute inset-0"
    style="background-image: radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px); background-size: 28px 28px;"
  >
  </div> --> <div class="mx-auto flex max-w-3xl flex-col items-center justify-center gap-8 text-center sm:flex-row sm:text-left"> <div class="w-full space-y-1"> <p class="text-dark text-xl font-bold"> <span> Hola! </span> <span class="text-dark/60"> Hello! </span> </p> <h3 class="text-dark text-4xl font-bold sm:text-5xl">Let's connect</h3> </div> <div class="grid shrink-0 grid-cols-2 gap-6"> <a href="https://www.linkedin.com/in/dngea/" target="_blank"${addAttribute(buttonVariants({
    className: "aspect-square! size-16! rounded-full!"
  }), "class")}> ${renderComponent($$result, "Linkedin", $$Linkedin, { "class": "size-8" })} </a> <a href="/about#contact"${addAttribute(buttonVariants({
    className: "aspect-square! size-16! rounded-full!"
  }), "class")}>${renderComponent($$result, "Mail", Mail, { "className": "size-8" })}</a> </div> </div> </section>`;
}, "/Users/danielgea/dev/portfolio/src/components/Cta.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-light relative"> <!-- Dot grid texture --> <div class="pointer-events-none fixed inset-0" style="background-image: radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px); background-size: 28px 28px;"></div> ${renderComponent($$result2, "Welcome", $$Welcome, {})} <div class="bg-dark space-y-32 px-4 py-32 sm:px-8" id="work"> ${renderComponent($$result2, "Experience", $$Experience, {})} ${renderComponent($$result2, "Stack", $$Stack, {})} ${renderComponent($$result2, "Projects", $$ProjectsSection, {})} ${renderComponent($$result2, "Publications", $$PublicationsSection, {})} </div> ${renderComponent($$result2, "Cta", $$Cta, {})} </div> ` })}`;
}, "/Users/danielgea/dev/portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/danielgea/dev/portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
