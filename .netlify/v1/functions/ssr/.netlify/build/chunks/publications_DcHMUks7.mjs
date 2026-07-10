import { c as createComponent } from './astro-component_QHW-LdW4.mjs';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './ssr-function_0tbWWBgZ.mjs';
import { $ as $$Layout, a as $$MainLayout } from './Layout_DaGX44kn.mjs';
import { g as getCollection } from './helper_DuBkooU8.mjs';
import { $ as $$PublicationCard } from './PublicationCard_szQXExjR.mjs';

const $$Publications = createComponent(async ($$result, $$props, $$slots) => {
  const publications = await getCollection("publications");
  publications.sort((a, b) => {
    return b.data.date.getTime() - a.data.date.getTime();
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "MainLayout", $$MainLayout, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8"> <h1 class="text-4xl font-bold uppercase">Publications</h1> </div> <div class="space-y-12"> ${publications.map((publication) => renderTemplate`${renderComponent($$result3, "PublicationCard", $$PublicationCard, { "data": publication })}`)} </div> ` })} ` })}`;
}, "/Users/danielgea/dev/portfolio/src/pages/publications.astro", void 0);

const $$file = "/Users/danielgea/dev/portfolio/src/pages/publications.astro";
const $$url = "/publications";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Publications,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
