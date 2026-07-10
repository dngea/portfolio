import { c as createComponent } from './astro-component_QHW-LdW4.mjs';
import { m as maybeRenderHead, c as addAttribute, l as renderSlot, b as renderTemplate, r as renderComponent, F as Fragment, n as renderHead } from './ssr-function_0tbWWBgZ.mjs';
import clsx from 'clsx';
import { r as renderScript } from './script_BbWekEy5.mjs';

const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$MainLayout;
  const { className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(clsx(
    "bg-light main-layout relative text-dark min-h-screen p-4",
    className
  ), "class")}> <div id="dark-overlay" class="bg-dark pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200 ease-linear"></div> ${renderSlot($$result, $$slots["background"])} <div class="relative z-1 mx-auto mt-32 mb-16 max-w-5xl space-y-24 sm:mt-60 sm:mb-30"> ${renderSlot($$result, $$slots["default"])} </div> </section>`;
}, "/Users/danielgea/dev/portfolio/src/layouts/MainLayout.astro", void 0);

const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Nav;
  const menu = [
    {
      id: "portfolio",
      label: "Portfolio",
      path: "/"
    },
    {
      id: "projects",
      label: "Projects",
      path: "/projects"
    },
    {
      id: "photography",
      label: "Photography",
      path: "/photography"
    },
    {
      id: "publications",
      label: "Publications",
      path: "/publications"
    },
    {
      id: "about",
      label: "About",
      path: "/about"
    }
  ];
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="bg-light/95 fixed top-4 left-1/2 z-20 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 rounded-full px-2 py-2 shadow-xl sm:top-8 sm:px-4" data-astro-cid-dmqpwcec> <nav id="nav" class="overflow-x-auto" data-astro-cid-dmqpwcec> <ul class="relative flex gap-1 sm:gap-2" data-astro-cid-dmqpwcec> ${menu.map((item) => {
    const isActive = currentPath === item.path || currentPath.startsWith(item.path + "/");
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-dmqpwcec": true }, { "default": ($$result2) => renderTemplate` <li${addAttribute(clsx("text-dark relative", isActive ? "active" : ""), "class")} data-astro-cid-dmqpwcec> <a${addAttribute(item.path, "href")}${addAttribute(`relative z-10 block px-2.5 py-1.5 text-sm font-medium whitespace-nowrap sm:px-4 sm:py-2 sm:text-base`, "class")} data-astro-cid-dmqpwcec> ${item.label} </a> ${isActive && renderTemplate`<span id="initial-active" class="bg-clay absolute top-1/2 right-0 left-0 h-8 -translate-y-1/2 rounded-full sm:h-10 sm:min-w-16" data-astro-cid-dmqpwcec></span>`} </li> ` })}`;
  })} <span class="hover-pill bg-clay pointer-events-none absolute rounded-full" data-astro-cid-dmqpwcec></span> </ul> </nav> </header>  ${renderScript($$result, "/Users/danielgea/dev/portfolio/src/components/Nav.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/danielgea/dev/portfolio/src/components/Nav.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Footer;
  const links = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dngea/",
      external: true
    },
    {
      label: "GitHub",
      href: "https://github.com/dngea",
      external: true
    },
    {
      label: "Contact",
      href: "#",
      id: "contactButton2"
    },
    {
      label: "Resume",
      href: "img/home/Daniel_Gea_Resume.pdf",
      download: "Daniel_Gea_Resume.pdf"
    },
    {
      label: "ResearchGate",
      href: "https://www.researchgate.net/publication/388475957_Semantic_and_Spatial_Sound-Object_Recognition_for_Assistive_Navigation",
      external: true
    }
  ];
  const sitemap = [
    { label: "Portfolio", href: "/" },
    { label: "Stack", href: "/#stack" },
    { label: "Projects", href: "/projects" },
    { label: "Photography", href: "/photography" },
    { label: "Publications", href: "/publications" },
    { label: "About", href: "/about" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="w-full p-4 sm:p-8"> <div class="mx-auto w-full max-w-6xl space-y-8 sm:space-y-0"> <div class="flex flex-col gap-12 sm:flex-row sm:justify-between"> <section class="space-y-8"> <h3 class="text-2xl underline sm:text-4xl">dngeap@gmail.com</h3> <p class="text-balance">
Designed in Figma and built using Astro with TypeScript, React and
          Tailwind CSS. The code is available on <a href="https://github.com/dngea/portfolio" class="hover:text-dark hover:bg-cream w-fit transition-all" target="_blank">github.com/dngea</a>.
</p> </section> <section class="flex gap-8"> <!-- links --> <div class="flex flex-col gap-2"> <p class="text-light px-0.5 font-medium uppercase">LINKS</p> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="hover:text-dark hover:bg-cream w-fit px-0.5 transition-all"${addAttribute(link.external ? "_blank" : "_self", "target")}> ${link.label} </a>`)} </div> <!-- sitemap --> <div class="flex flex-col gap-2"> <p class="text-light px-0.5 font-medium uppercase">SITEMAP</p> ${sitemap.map((link) => renderTemplate`<a class="hover:text-dark hover:bg-cream w-fit px-0.5 transition-all"${addAttribute(link.href, "href")}> ${link.label} </a>`)} </div> </section> </div> <!-- Daniel Gea -- 2025 --> <section class="flex flex-wrap items-end justify-between gap-2"> <span class="text-4xl font-semibold sm:text-5xl md:text-7xl">Daniel Gea</span> <time>2025</time> </section> </div> </footer>`;
}, "/Users/danielgea/dev/portfolio/src/components/Footer.astro", void 0);

const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/danielgea/dev/portfolio/node_modules/.pnpm/astro@6.4.8_@netlify+blobs@10.7.9_@types+node@26.1.1_jiti@2.7.0_lightningcss@1.32.0_rollup@4.62.2_yaml@2.9.0/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/danielgea/dev/portfolio/node_modules/.pnpm/astro@6.4.8_@netlify+blobs@10.7.9_@types+node@26.1.1_jiti@2.7.0_lightningcss@1.32.0_rollup@4.62.2_yaml@2.9.0/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Daniel Gea | Portfolio</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body class="bg-dark min-w-xs space-y-32"> ${renderComponent($$result, "Nav", $$Nav, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/danielgea/dev/portfolio/src/layouts/Layout.astro", void 0);

export { $$Layout as $, $$MainLayout as a };
