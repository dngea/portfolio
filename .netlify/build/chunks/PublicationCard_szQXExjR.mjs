import { c as createComponent } from './astro-component_QHW-LdW4.mjs';
import { m as maybeRenderHead, c as addAttribute, r as renderComponent, b as renderTemplate } from './ssr-function_0tbWWBgZ.mjs';
import { f as formatMonthYear } from './helper_DuBkooU8.mjs';
import { $ as $$Image } from './_astro_assets_imNEL9Uw.mjs';
import clsx from 'clsx';

const $$PublicationCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PublicationCard;
  const { data, dark = false, className } = Astro2.props;
  const publication = data.data;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/publications/${data.id}`, "href")} class="block"> <article${addAttribute(clsx(
    "group flex flex-col gap-6 sm:gap-8 rounded-2xl transition duration-300 ease-in-out sm:flex-row",
    className
  ), "class")}> <figure${addAttribute(`relative w-full shrink-0 rounded-xl overflow-hidden aspect-9/6 transition duration-300 ease-in-out sm:w-68 ${dark ? "border-light" : "border-dark"}`, "class")}> ${renderComponent($$result, "Image", $$Image, { "src": publication.img, "alt": "", "width": 500, "height": 500, "class": "h-full w-full object-cover transition duration-200 ease-in-out group-hover:scale-104" })} </figure> <div class="flex w-full flex-col items-start justify-start space-y-1"> <h3 class="text-xl font-normal md:text-2xl">${publication.title}</h3> <p class="">
Published by
<span${addAttribute(`${dark ? "text-cream" : "text-clay"} `, "class")}> ${publication.publisher} </span> </p> <p class="italic"> ${publication.keywords} </p> <time${addAttribute(publication.date, "datetime")} class="mt-auto"> ${formatMonthYear(publication.date)} </time> </div> </article> </a>`;
}, "/Users/danielgea/dev/portfolio/src/components/atoms/PublicationCard.astro", void 0);

export { $$PublicationCard as $ };
