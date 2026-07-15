export const PRESENTATION =
  "Originally from Granada, in southern Spain,  where I began my studies in Information Science.  After my bachelor's, I moved to Portugal to pursue a  master's in Human Computer Interaction (HCI) in the beautiful and rainy city of  Porto, where I spent two years. Having completed my  studies, I moved to Vienna, Austria, to kickstart my  career as a Front-end developer.";

export const LANGUAGES = ["English", "German", "Spanish", "Portuguese"];

export const STUDIES = [
  {
    dates: "2022 - 2024",
    study: `<a href="https://fe.up.pt/estudar/mm/?lang=en" target="_blank" class="hover:underline">[Master’s Degree] <strong>Human Computer Interaction</strong> · Faculty of Engineering at University of Porto, Portugal</a>`,
    highlights: [
      "UX/UI design",
      "Frontend development",
      "Interactive installations",
      "Creative coding",
      "Game development",
    ],
    link: "https://fe.up.pt/estudar/mm/?lang=en",
  },
  {
    dates: "2018 - 2022",
    study: `<a href="https://www.ugr.es/en/study/undergraduate/bachelors-degree-information-sciences" target="_blank" class="hover:underline">[Bachellor’s Degree] <strong>Information Sciences (Web Specialization)</strong> · University of Granada, Spain</a>`,
    highlights: [
      "Databases",
      "CMS",
      "Information architecture",
      "Web architecture",
    ],
    link: "https://www.ugr.es/en/study/undergraduate/bachelors-degree-information-sciences",
  },
];

export const ABSS = {
  roleSummary:
    "Focus on building and maintaining web applications using Next.js in collaboration with backend and design teams.",

  highlights: [
    "Developed a drag-and-drop media library, integrated into a custom CMS for non-technical client use, integrated using intertia/react.",
    "Built a reusable React component library, packaged as a private npm module and consumed across multiple client projects.",
    "Designed headless frontend architecture on top of a Laravel backend, keeping the two decoupled.",
    "Implemented multi-language support (next-intl) with URL-driven filters and pagination that stay in sync across locales.",
    "Worked with authentication flows and REST API integrations for production apps.",
    "Added testing using Vitest for core utility, avoiding breaking features on refactors.",
    "Designed components and flows with an accessibility-first approach (semantics, contrasts, navigation, ARIA tags).",
  ],
};
