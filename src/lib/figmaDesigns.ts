/**
 * Figma design files we sell alongside the live website templates.
 *
 * Same shape of catalogue as `websiteTemplates` in `./templates`, kept separate
 * because a design file is bought for different reasons than a running site:
 * there is no live URL, and the buyer gets frames and components rather than a
 * deployed front end.
 *
 * The LearnNThrive entry is a real prototype; the rest are PLACEHOLDERS. Swap
 * `name`, `tagline`, `figmaUrl` and the counts for the real files, and drop a
 * screenshot at `public/figma/<slug>.webp` (1440x900 works best) — the ones in
 * place now are Unsplash stock, to be replaced with real frame captures. An entry with
 * no `preview` renders a branded plate, and one with no `figmaUrl` hides the
 * "Open in Figma" link and sells through the enquiry form alone.
 */

export type FigmaStatus = "available" | "sold" | "concept";

export type FigmaCategory =
    | "Landing page"
    | "Website kit"
    | "Dashboard"
    | "Mobile app"
    | "Brand kit";

export interface FigmaDesign {
    slug: string;
    name: string;
    /** One line on who the design is built for. */
    tagline: string;
    category: FigmaCategory;
    /** Public Figma community / file link, when one can be shared. */
    figmaUrl?: string;
    /** `public/figma/<slug>.webp`, when a screenshot has been added. */
    preview?: string;
    status: FigmaStatus;
    /** Short badge on the card, e.g. "Sold". */
    statusLabel: string;
    /** Frame and component counts — the numbers a buyer actually asks for. */
    frames?: number;
    components?: number;
    highlights: string[];
    /** Gradient stops for the placeholder when `preview` is missing. */
    accent: string;
}

export const figmaDesigns: FigmaDesign[] = [
    {
        slug: "learn-n-thrive",
        name: "LearnNThrive",
        tagline:
            "Interactive prototype for a training company site — clickable flows from landing page through course pages.",
        category: "Website kit",
        figmaUrl:
            "https://www.figma.com/proto/BkRc6x4uQrS38QpCbmvokh/LearnNThrive?node-id=857-971&viewport=-5080%2C2158%2C0.6&t=GHsRFMYFPtv8rQed-1&scaling=min-zoom&content-scaling=fixed&page-id=233%3A100",
        preview: "/figma/learn-n-thrive.webp",
        status: "available",
        statusLabel: "Interactive prototype",
        highlights: [
            "Clickable prototype, not flat mockups",
            "Full page set for a training business",
            "Ready to hand to a developer or to us",
        ],
        accent: "from-[#5c3ffa] to-[#0ea5e9]",
    },
    {
        slug: "coaching-institute-kit",
        name: "Coaching Institute Kit",
        tagline:
            "Full website design for coaching centres — home, courses, batches, faculty and enquiry flows.",
        category: "Website kit",
        preview: "/figma/coaching-institute-kit.webp",
        status: "available",
        statusLabel: "Available now",
        frames: 24,
        components: 60,
        highlights: [
            "Desktop and mobile frames for every page",
            "Auto-layout components with variants",
            "Editable colour and type styles",
        ],
        accent: "from-[#5c3ffa] to-[#cb3b95]",
    },
    {
        slug: "course-landing-page",
        name: "Course Landing Page",
        tagline:
            "High-converting single page for launching one course or cohort, built for paid campaigns.",
        category: "Landing page",
        preview: "/figma/course-landing-page.webp",
        status: "available",
        statusLabel: "Available now",
        frames: 8,
        components: 28,
        highlights: [
            "Hero, curriculum, pricing and FAQ blocks",
            "Two colour themes, light and dark",
            "Mobile-first section variants",
        ],
        accent: "from-[#f97316] to-[#cb3b95]",
    },
    {
        slug: "admin-dashboard-ui",
        name: "Admin Dashboard UI",
        tagline:
            "Back-office screens for enrolments, batches, payments and reporting.",
        category: "Dashboard",
        preview: "/figma/admin-dashboard-ui.webp",
        status: "available",
        statusLabel: "Available now",
        frames: 18,
        components: 90,
        highlights: [
            "Tables, filters, modals and empty states",
            "Chart and stat-tile components",
            "Light and dark surfaces",
        ],
        accent: "from-[#0ea5e9] to-[#5c3ffa]",
    },
    {
        slug: "learner-mobile-app",
        name: "Learner Mobile App",
        tagline:
            "Student-facing app screens — course player, schedule, assignments and profile.",
        category: "Mobile app",
        preview: "/figma/learner-mobile-app.webp",
        status: "concept",
        statusLabel: "In design",
        frames: 20,
        components: 45,
        highlights: [
            "iOS and Android layouts",
            "Prototype flows wired between screens",
            "Component library with states",
        ],
        accent: "from-[#14b8a6] to-[#0ea5e9]",
    },
];

/**
 * Figma serves prototypes to third-party pages from `embed.figma.com`; the
 * normal share URL renders a login wall inside an iframe.
 */
export function figmaEmbedUrl(url: string): string {
    try {
        const parsed = new URL(url);
        parsed.hostname = "embed.figma.com";
        parsed.searchParams.set("embed-host", "skilldeck");
        return parsed.toString();
    } catch {
        return url;
    }
}

/** Filter chips, in display order, with "All" first. */
export const figmaCategories: Array<FigmaCategory | "All"> = [
    "All",
    ...Array.from(new Set(figmaDesigns.map((d) => d.category))),
];
