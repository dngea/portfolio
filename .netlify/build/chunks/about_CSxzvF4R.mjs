import { c as createComponent } from './astro-component_QHW-LdW4.mjs';
import { r as renderComponent, b as renderTemplate, u as unescapeHTML, c as addAttribute, m as maybeRenderHead } from './ssr-function_0tbWWBgZ.mjs';
import { $ as $$Layout, a as $$MainLayout } from './Layout_DaGX44kn.mjs';
import { $ as $$Image } from './_astro_assets_imNEL9Uw.mjs';
import { c as cn, B as Badge } from './badge_BKYy5YK5.mjs';
import { B as Button, b as buttonVariants, $ as $$Linkedin } from './Linkedin_ChV_ytj6.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useId } from 'react';
import { ChevronDownIcon, Clipboard, ClipboardCheck, Inbox } from 'lucide-react';
import { Accordion as Accordion$1 } from 'radix-ui';

function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx(Accordion$1.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Accordion$1.Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(Accordion$1.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
    Accordion$1.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronDownIcon, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Accordion$1.Content,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}

const Feature = ({
  features = [
    {
      id: 1,
      title: "Web development",
      image: "/images/frontend/prev.webp",
      description: `Web development became my main passion almost by accident. As a teenager, I was deeply interested in <a href="/photography" class="hover:underline! font-medium transition">photography</a> and wanted to find new ways to share my work beyond physical exhibitions. That curiosity led me to explore websites as a creative medium. What started with a basic understanding of HTML quickly grew into a fascination with building digital experiences, combining creativity, problem-solving, and technology.`
    },
    {
      id: 2,
      title: "UX/UI Design",
      image: "/images/ux/prev.png",
      description: "My interest in UX/UI design emerged naturally through web development. As I built websites, I became increasingly curious about how people interact with digital products and what makes an experience intuitive and enjoyable. Learning about user research, usability testing, and design methodologies helped me understand that successful products are built around people, not just technology."
    },
    {
      id: 3,
      title: "Creative coding, sound and installations",
      image: "/images/multimedia/intermediartes/prev.jpg",
      description: "During my Master's in Multimedia at the University of Porto, I had the opportunity to explore technology beyond the browser. Through interactive installations, generative music, reactive visuals, Arduino projects, and digital storytelling, I discovered new ways of connecting creativity, art, and technology. These experiences continue to influence how I approach experimentation and innovation today."
    },
    {
      id: 4,
      title: "Why Vienna",
      image: "/images/about/vienna.jpg",
      description: `I've always imagined myself living abroad. The challenge of adapting to new environments, meeting people from different cultures, and learning new languages has always excited me, even if languages don't come naturally to me. Vienna first entered my life through <a href="https://www.uxcon.io/" target="_blank" class="hover:underline! font-medium transition">uxcon Vienna</a>, but what started as a professional opportunity soon became something more. I found a city that constantly encourages growth, curiosity, and new perspectives, making it the perfect place to continue both my personal and professional journey.`
    }
  ],
  className
}) => {
  const [activeTabId, setActiveTabId] = useState(1);
  const [activeImage, setActiveImage] = useState(features[0].image);
  return /* @__PURE__ */ jsx("section", { className: cn("py-16", className), children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto space-y-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Where it started" }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full items-stretch justify-between gap-12", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/2", children: /* @__PURE__ */ jsx(
        Accordion,
        {
          type: "single",
          collapsible: true,
          className: "w-full",
          defaultValue: "item-1",
          children: features.map((tab) => /* @__PURE__ */ jsxs(
            AccordionItem,
            {
              value: `item-${String(tab.id)}`,
              className: "transition-opacity",
              children: [
                /* @__PURE__ */ jsx(
                  AccordionTrigger,
                  {
                    onClick: () => {
                      setActiveImage(tab.image);
                      setActiveTabId(tab.id);
                    },
                    className: "group cursor-pointer py-5 !no-underline transition",
                    children: /* @__PURE__ */ jsx(
                      "h4",
                      {
                        className: `text-xl ${tab.id === activeTabId ? "text-dark" : "text-muted-foreground group-hover:text-dark transition"}`,
                        children: tab.title
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs(AccordionContent, { className: "pb-2", children: [
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "text-muted-foreground text-base",
                      dangerouslySetInnerHTML: { __html: tab.description }
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "mt-4 md:hidden", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: tab.image,
                      alt: tab.title,
                      className: "h-full max-h-80 w-full rounded-md object-cover"
                    }
                  ) })
                ] })
              ]
            },
            tab.id
          ))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "bg-muted relative hidden max-h-[450px] w-1/2 overflow-hidden rounded-2xl shadow-xl md:block", children: /* @__PURE__ */ jsx("div", { className: "relative h-full w-full", children: features.map((feature) => /* @__PURE__ */ jsx(
        "img",
        {
          src: feature.image,
          alt: feature.title,
          className: cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            activeImage === feature.image ? "opacity-100" : "opacity-0"
          )
        },
        feature.id
      )) }) })
    ] })
  ] }) });
};
function FeatureExample() {
  return /* @__PURE__ */ jsx(Feature, {});
}

function Form() {
  const [emailSuccess, setEmailSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData(e.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: payload
    });
    const data = await response.json();
    if (data.success) {
      setEmailSuccess(true);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-light @container overflow-hidden rounded-2xl p-8 shadow-2xl", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("fieldset", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 @xs:flex-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "text-dark text-sm font-semibold capitalize",
                htmlFor: "name",
                children: "name"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "border-clay mt-1.5 h-8 border-b-2 px-1",
                type: "text",
                name: "name",
                id: "name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "text-dark text-sm font-semibold capitalize",
                htmlFor: "surname",
                children: "surname"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "surname",
                id: "surname",
                className: "border-clay mt-1.5 h-8 border-b-2 px-1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              className: "text-dark text-sm font-semibold capitalize",
              htmlFor: "companyName",
              children: "Company Name"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              name: "companyName",
              id: "companyName",
              type: "text",
              className: "border-clay mt-1.5 h-8 border-b-2 px-1"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("fieldset", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "text-dark text-sm font-semibold capitalize",
            htmlFor: "email",
            children: "Email"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            name: "email",
            id: "email",
            className: "border-clay mt-1.5 h-8 border-b-2 px-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("fieldset", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "text-dark text-sm font-semibold capitalize",
            htmlFor: "message",
            children: "Message"
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            rows: 3,
            name: "message",
            id: "message",
            className: "border-clay mt-1.5 h-8 border-b-2 px-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", className: "ml-auto", children: "Send" })
    ] }),
    emailSuccess && /* @__PURE__ */ jsx("div", { children: "Email sent! Thanks for contacting." })
  ] });
}

function Email({ email }) {
  const [isCopied, setIsCopied] = useState(false);
  const [icon, setIcon] = useState(Clipboard);
  const tooltipId = useId();
  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(
      () => {
        setIsCopied(true);
        setIcon(ClipboardCheck);
        setTimeout(() => {
          setIsCopied(false);
          setIcon(Clipboard);
        }, 5e3);
      },
      () => {
      }
    );
  };
  const IconComponent = icon;
  const label = isCopied ? "Copied" : "Copy email";
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: copyEmail,
      onKeyDown: (e) => {
        if (e.key === "Enter" || " ") copyEmail();
      },
      className: "group relative cursor-pointer",
      "aria-describedby": tooltipId,
      children: [
        /* @__PURE__ */ jsx("span", { children: email }),
        "z",
        " ",
        /* @__PURE__ */ jsxs(
          "span",
          {
            id: tooltipId,
            role: "tooltip",
            className: "tooltip text-light absolute -top-10 left-1/2 z-10 flex w-fit -translate-x-1/2 items-center gap-1.5 rounded-md bg-gray-700 px-3 py-2 text-xs font-normal whitespace-nowrap opacity-0 shadow-xs transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
            children: [
              /* @__PURE__ */ jsx("span", { className: "absolute top-full left-1/2 -mt-1 size-2 -translate-x-1/2 rotate-45 bg-gray-700" }),
              /* @__PURE__ */ jsx(IconComponent, { className: "size-4 shrink-0", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { children: label })
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "sr-only", role: "status", "aria-live": "polite", children: isCopied ? "Email copied to clipboard" : "" })
      ]
    }
  );
}

const $$About = createComponent(($$result, $$props, $$slots) => {
  const presentation = "Originally from Granada, in southern Spain,  where I began my studies in Information Science.  After my bachelor's, I moved to Portugal to pursue a  master's in Human Computer Interaction (HCI) in the beautiful and rainy city of  Porto, where I spent two years. Having completed my  studies, I moved to Vienna, Austria, to kickstart my  career as a Front-end developer.";
  const languages = ["English", "German", "Spanish", "Portuguese"];
  const STUDIES = [
    {
      dates: "2022 - 2024",
      study: `<a href="https://fe.up.pt/estudar/mm/?lang=en" target="_blank" class="hover:underline">[Master’s Degree] <strong>Human Computer Interaction</strong> · Faculty of Engineering at University of Porto, Portugal</a>`,
      highlights: [
        "UX/UI design",
        "Frontend development",
        "Interactive installations",
        "Creative coding",
        "Game development"
      ],
      link: "https://fe.up.pt/estudar/mm/?lang=en"
    },
    {
      dates: "2018 - 2022",
      study: `<a href="https://www.ugr.es/en/study/undergraduate/bachelors-degree-information-sciences" target="_blank" class="hover:underline">[Bachellor’s Degree] <strong>Information Sciences (Web Specialization)</strong> · University of Granada, Spain</a>`,
      highlights: [
        "Databases",
        "CMS",
        "Information architecture",
        "Web architecture"
      ],
      link: "https://www.ugr.es/en/study/undergraduate/bachelors-degree-information-sciences"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainLayout", $$MainLayout, {}, { "background": ($$result3) => renderTemplate`${maybeRenderHead()}<div class="pointer-events-none fixed inset-0" style="background-image: radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px); background-size: 28px 28px;"></div>`, "default": ($$result3) => renderTemplate`   <section class="grid grid-cols-1 items-center gap-8 sm:grid-cols-2"> <figure class="max-w-[350px] justify-self-center overflow-hidden rounded-sm shadow-xl"> ${renderComponent($$result3, "Image", $$Image, { "src": "/images/about/profile.webp", "alt": "Profile picture of Daniel", "width": 350, "height": 500, "sizes": "350px", "class": "h-auto w-full rounded-sm object-cover" })} </figure> <div class="flex flex-col justify-center gap-6"> <header class="space-y-px"> <p class="text-base opacity-70">Hola</p> <h1 class="text-3xl font-semibold">I&apos;m Daniel</h1> </header> <div class="flex items-center gap-2 text-sm"> <span class="opacity-70">Location</span> ${renderComponent($$result3, "Badge", Badge, { "variant": "default", "className": "bg-clay text-light" }, { "default": ($$result4) => renderTemplate`
Vienna, Austria
` })} </div> <p class="leading-relaxed"> ${presentation} </p> <div class="flex flex-wrap items-center gap-2"> ${languages.map((lang) => renderTemplate`${renderComponent($$result3, "Badge", Badge, { "className": "capitalize", "key": lang }, { "default": ($$result4) => renderTemplate`${lang}` })}`)} </div> </div> </section> <section class="space-y-8"> <h2 class="text-3xl font-bold">Studies</h2> <div class="relative space-y-10 pl-8"> <!-- línea vertical conectora --> <div class="bg-clay/20 absolute top-[20px] bottom-1.5 left-[5px] w-px"></div> ${STUDIES.map((study) => renderTemplate`<div class="group relative"> <span class="bg-clay border-light absolute top-1 -left-[32px] size-3 rounded-full border-2 transition-transform group-hover:scale-135 group-hover:contrast-125"></span> <div class="flex flex-col gap-1 sm:flex-row sm:gap-4"> <span class="w-30 shrink-0 text-sm tracking-wide opacity-60 group-hover:opacity-80"> ${study.dates} </span> <div class="space-y-1"> <p class="leading-snug font-medium">${unescapeHTML(study.study)}</p> <p class="text-sm italic opacity-70"> ${study.highlights.join(" · ")} </p> </div> </div> </div>`)} </div> <div class="flex justify-end px-4 pt-2"> <a href="/downloads/daniel_gea_resume.pdf" download="Daniel_Gea_Resume"${addAttribute(buttonVariants(), "class")}>
Download Resume
</a> </div> </section> <section> ${renderComponent($$result3, "FeatureExample", FeatureExample, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/Feature", "client:component-export": "default" })} </section> <section class="grid w-full gap-8 md:grid-cols-2" id="contact"> <div class="mx-auto flex w-full flex-col justify-center gap-8 p-8 lg:w-[80%]"> <h2 class="text-3xl font-bold">Get in touch</h2> <div class="divide-y divide-gray-300"> <div class="flex items-center gap-3 py-4"> <div class="flex w-8 justify-center"> ${renderComponent($$result3, "Inbox", Inbox, { "className": "size-7" })} </div> ${renderComponent($$result3, "Email", Email, { "email": "dngeap@gmail.com", "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/atoms/Email", "client:component-export": "default" })} </div> <div class="flex items-center gap-3 py-4"> <div class="flex w-8 justify-center"> ${renderComponent($$result3, "Linkedin", $$Linkedin, { "class": "size-8" })} </div> <a href="https://www.linkedin.com/in/dngea/" class="hover:underline" target="_blank">
Daniel Gea Palenzuela
</a> </div> </div> </div> <div> ${renderComponent($$result3, "Form", Form, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Form", "client:component-export": "default" })} </div> </section> ` })} ` })}`;
}, "/Users/danielgea/dev/portfolio/src/pages/about.astro", void 0);

const $$file = "/Users/danielgea/dev/portfolio/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
