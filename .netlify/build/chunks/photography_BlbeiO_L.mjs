import { c as createComponent } from './astro-component_QHW-LdW4.mjs';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, c as addAttribute } from './ssr-function_0tbWWBgZ.mjs';
import { B as Badge } from './badge_BKYy5YK5.mjs';
import { $ as $$Layout, a as $$MainLayout } from './Layout_DaGX44kn.mjs';
import { g as getCollection, f as formatMonthYear } from './helper_DuBkooU8.mjs';
import { $ as $$Image } from './_astro_assets_imNEL9Uw.mjs';

const $$Photography = createComponent(async ($$result, $$props, $$slots) => {
  const photographyProjects = await getCollection("photography");
  photographyProjects.sort((a, b) => {
    const projectA = a.data.date.getTime();
    const projectB = b.data.date.getTime();
    return projectB - projectA;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "MainLayout", $$MainLayout, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8"> <h1 class="text-4xl font-bold uppercase">Photography</h1> </div> <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"> ${photographyProjects.map((project) => renderTemplate`<a${addAttribute(`/photography/${project.id}`, "href")}> <article class="group relative aspect-3/4 overflow-hidden rounded-sm transition duration-200 hover:shadow-sm hover:contrast-105"> ${renderComponent($$result3, "Image", $$Image, { "src": project.data.img, "class": "absolute h-full w-full object-cover transition duration-250 group-hover:scale-104", "width": 500, "height": 500, "alt": "" })} <div class="absolute bottom-4 left-4 flex flex-col gap-1"> ${renderComponent($$result3, "Badge", Badge, { "variant": "secondary", "className": " bg-dark! text-light! border-none!  " }, { "default": async ($$result4) => renderTemplate`${formatMonthYear(project.data.date)}` })} ${renderComponent($$result3, "Badge", Badge, { "variant": "secondary", "className": " text-sm! bg-dark! text-light! border-none!  " }, { "default": async ($$result4) => renderTemplate`${project.data.title}` })} </div> </article> </a>`)} </div> ` })} ` })}`;
}, "/Users/danielgea/dev/portfolio/src/pages/photography.astro", void 0);

const $$file = "/Users/danielgea/dev/portfolio/src/pages/photography.astro";
const $$url = "/photography";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Photography,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
