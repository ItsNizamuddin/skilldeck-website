/**
 * Website templates we sell to tenants.
 *
 * Static on purpose: the catalogue is small, changes rarely, and every entry is
 * a site we already shipped, so there is no backend resource behind it yet. When
 * the list outgrows this file, swap `websiteTemplates` for a `fetchFromBackend`
 * call — the page only depends on the `WebsiteTemplate` shape.
 *
 * Screenshots live at `public/templates/<slug>.webp` (1440x900 works best).
 * Leave `preview` unset and the card falls back to a branded placeholder, so a
 * template can be listed before its screenshot exists.
 */

export type TemplateStatus = "available" | "sold" | "default";

export interface WebsiteTemplate {
    slug: string;
    name: string;
    /** One line on who the template is built for. */
    tagline: string;
    category: TemplateCategory;
    /** Public site running this template. */
    demoUrl: string;
    /** Hostname shown in the card's fake address bar. */
    displayUrl: string;
    /** `public/templates/<slug>.webp`, when a screenshot has been added. */
    preview?: string;
    /**
     * False when the site refuses to render in an iframe (X-Frame-Options or a
     * frame-ancestors CSP). The preview modal then shows the screenshot and a
     * link out instead of a dead frame.
     */
    embeddable?: boolean;
    status: TemplateStatus;
    /** Short badge on the card, e.g. "Live client site". */
    statusLabel: string;
    /** What a buyer gets that the other templates do not. */
    highlights: string[];
    /** Tailwind gradient stops for the placeholder when `preview` is missing. */
    accent: string;
    featured?: boolean;
}

export type TemplateCategory =
    | "Dynamic"
    | "Education"
    | "Training"
    | "Agency"
    | "Commerce";

export const websiteTemplates: WebsiteTemplate[] = [
    {
        slug: "themepulse",
        name: "ThemePulse",
        tagline:
            "Dynamic theme engine — switch colours, sections and layouts from the dashboard, no redeploy.",
        category: "Dynamic",
        demoUrl: "https://themepulse.skilldeck.net/",
        displayUrl: "themepulse.skilldeck.net",
        preview: "/templates/themepulse.webp",
        status: "available",
        statusLabel: "Available now",
        highlights: [
            "Live theme switching from the tenant dashboard",
            "Section builder — reorder, hide or duplicate blocks",
            "Works with every SkillDeck module out of the box",
        ],
        accent: "from-[#5c3ffa] to-[#cb3b95]",
        featured: true,
    },
    {
        slug: "sure-success-academy",
        name: "Sure Success Academy",
        tagline:
            "The default SkillDeck template: courses, batches, enquiries and blog wired up on day one.",
        category: "Education",
        demoUrl: "https://suresuccessacademy.com/",
        displayUrl: "suresuccessacademy.com",
        preview: "/templates/sure-success-academy.webp",
        status: "default",
        statusLabel: "Default template",
        highlights: [
            "Ships with every new tenant account",
            "Course catalogue, batch schedules and lead capture",
            "Tuned for coaching and academy sites",
        ],
        accent: "from-[#0ea5e9] to-[#5c3ffa]",
    },
    {
        slug: "prepnxt",
        name: "PrepNxt",
        tagline:
            "Test-prep layout built around exam tracks, mock tests and cohort start dates.",
        category: "Education",
        demoUrl: "https://prepnxt.com/",
        displayUrl: "prepnxt.com",
        preview: "/templates/prepnxt.webp",
        status: "sold",
        statusLabel: "Live client site",
        highlights: [
            "Exam-track landing pages",
            "Batch calendar with enrolment CTAs",
            "Result and testimonial showcases",
        ],
        accent: "from-[#f97316] to-[#cb3b95]",
    },
    {
        slug: "vlsifirst",
        name: "VLSIFirst",
        tagline:
            "Technical training institute layout for deep course syllabi and placement proof.",
        category: "Training",
        demoUrl: "https://vlsifirst.com/",
        displayUrl: "vlsifirst.com",
        preview: "/templates/vlsifirst.webp",
        status: "sold",
        statusLabel: "Live client site",
        highlights: [
            "Long-form syllabus and curriculum pages",
            "Placement and hiring-partner sections",
            "Trainer profiles and lab highlights",
        ],
        accent: "from-[#14b8a6] to-[#0ea5e9]",
    },
    {
        slug: "kandra-digital",
        name: "Kandra Digital",
        tagline:
            "Agency and services layout — offerings, case studies and a conversion-first contact flow.",
        category: "Agency",
        demoUrl: "https://kandradigital.com/",
        displayUrl: "kandradigital.com",
        preview: "/templates/kandra-digital.webp",
        status: "sold",
        statusLabel: "Live client site",
        highlights: [
            "Service-grid home page",
            "Case study and portfolio blocks",
            "Multi-step enquiry form",
        ],
        accent: "from-[#5c3ffa] to-[#0ea5e9]",
    },
    {
        slug: "bristo-furniture",
        name: "Bristo Furniture",
        tagline:
            "Product-catalogue layout for retail brands — collections, detail pages and enquiry checkout.",
        category: "Commerce",
        demoUrl: "https://bristofurniture.com/",
        displayUrl: "bristofurniture.com",
        preview: "/templates/bristo-furniture.webp",
        // Sends `x-frame-options: SAMEORIGIN`.
        embeddable: false,
        status: "sold",
        statusLabel: "Live client site",
        highlights: [
            "Collection and product detail pages",
            "Gallery-led merchandising blocks",
            "Enquiry-based checkout",
        ],
        accent: "from-[#b45309] to-[#cb3b95]",
    },
];

/** Filter chips, in display order, with "All" first. */
export const templateCategories: Array<TemplateCategory | "All"> = [
    "All",
    ...Array.from(new Set(websiteTemplates.map((t) => t.category))),
];

export function getTemplate(slug: string): WebsiteTemplate | undefined {
    return websiteTemplates.find((t) => t.slug === slug);
}
