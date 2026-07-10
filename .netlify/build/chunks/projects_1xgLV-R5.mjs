import { c as createComponent } from './astro-component_QHW-LdW4.mjs';
import { m as maybeRenderHead, c as addAttribute, r as renderComponent, b as renderTemplate } from './ssr-function_0tbWWBgZ.mjs';
import { r as renderScript } from './script_BbWekEy5.mjs';
import { B as Badge } from './badge_BKYy5YK5.mjs';
import { $ as $$Layout, a as $$MainLayout } from './Layout_DaGX44kn.mjs';
import { f as formatMonthYear, g as getCollection } from './helper_DuBkooU8.mjs';
import { $ as $$Image } from './_astro_assets_imNEL9Uw.mjs';
import clsx from 'clsx';

const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { data, className } = Astro2.props;
  const item = data.data;
  const category = Object.values(CATEGORIES).find((category2) => {
    if (category2.id === item.collection) {
      return true;
    }
  })?.label;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(clsx("flex flex-col items-stretch gap-8 group rounded-2xl transition duration-500 sm:flex-row", className), "class")}> <div class="w-full sm:max-w-100"> <figure class="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-xl"> ${renderComponent($$result, "Image", $$Image, { "src": item.img, "alt": "", "class": "h-full w-full object-cover group-hover:scale-105 transition duration-250 ease-in-out", "width": 850, "height": 850, "aria-hidden": "true" })} </figure> </div> <div class="flex w-full flex-col justify-end space-y-4 p-1 sm:max-w-160"> <div> <div class="flex items-center gap-2 text-sm"> <time${addAttribute(item.date.toISOString(), "datetime")}>${formatMonthYear(item.date, true)}</time> ${category && renderTemplate`<span aria-hidden="true">·</span>
          <span class="capitalize">${category}</span>`} </div> <h3 class="py-1 text-2xl font-medium md:text-3xl">${item.title}</h3> </div> <p class="text-balance"> ${item.description} </p> <div class="flex flex-wrap gap-2"> ${item.technologies.map((i) => renderTemplate`${renderComponent($$result, "Badge", Badge, { "variant": "default" }, { "default": ($$result2) => renderTemplate`${i}` })}`)} </div> </div> </article>`;
}, "/Users/danielgea/dev/portfolio/src/components/atoms/ProjectCard.astro", void 0);

const CATEGORIES = [
  { label: "UX/UI", id: "ux" },
  { label: "frontend", id: "frontend" },
  { label: "creative coding", id: "creative-coding" }
];
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Projects;
  const projects = await getCollection("projects");
  projects.sort((a, b) => {
    const projectA = a.data.date.getTime();
    const projectB = b.data.date.getTime();
    return projectB - projectA;
  });
  const { pathname } = Astro2.url;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-aid3sr62": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "MainLayout", $$MainLayout, { "data-astro-cid-aid3sr62": true }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8 px-4" data-astro-cid-aid3sr62> <h1 class="text-4xl font-bold uppercase" data-astro-cid-aid3sr62>Projects</h1> <div class="flex flex-wrap gap-4" data-astro-cid-aid3sr62> ${CATEGORIES.map((category) => renderTemplate`<button class="cursor-pointer"${addAttribute(category.id, "data-category")} data-astro-cid-aid3sr62> ${renderComponent($$result3, "Badge", Badge, { "variant": "outline", "className": "px-3 py-1 capitalize", "data-astro-cid-aid3sr62": true }, { "default": async ($$result4) => renderTemplate`${category.label}` })} </button>`)} </div> </div> <div class="space-y-12" data-astro-cid-aid3sr62> ${projects.map((project) => {
    return renderTemplate`<a class="block"${addAttribute(`${pathname}/${project.id}`, "href")}${addAttribute(project.data.collection, "data-category")} data-astro-cid-aid3sr62> ${renderComponent($$result3, "Card", $$ProjectCard, { "data": project, "className": "hover:bg-dark/3 p-4", "data-astro-cid-aid3sr62": true })} </a>`;
  })} </div> ` })} ` })}  ${renderScript($$result, "/Users/danielgea/dev/portfolio/src/pages/projects.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/danielgea/dev/portfolio/src/pages/projects.astro", void 0);

const $$file = "/Users/danielgea/dev/portfolio/src/pages/projects.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  CATEGORIES,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ProjectCard as $, _page as _ };
