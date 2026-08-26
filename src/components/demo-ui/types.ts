// ─────────────────────────────────────────────────────────────────────────────
// Demo Service Page types — deliberately loose/optional on every field so the
// UI can gracefully render partial payloads. Mirrors the real API shape.
// ─────────────────────────────────────────────────────────────────────────────

export interface DemoMedia {
    _id?: string;
    alt?: string;
    url?: string;
    thumbnail?: string;
}

export interface DemoIconValue {
    icon?: string;
    value?: string;
    description?: string;
    tagline?: string;
}

export interface DemoServiceCard {
    tagline?: string;
    title?: string;
    slug?: string;
    icon?: string;
    content?: string;
    ratings?: string;
    clients?: string;
    points?: string[];
}

export interface DemoBannerStat {
    icon?: string;
    value?: string;
}

export interface DemoReview {
    count?: string;
    ratings?: string;
    icon?: string;
}

export interface DemoBanner {
    h1?: string;
    tagline?: string;
    description?: string;
    media?: DemoMedia;
    stats?: DemoBannerStat[];
    reviews?: DemoReview[];
}

export interface DemoApproachStep {
    title: string;
    description?: string;
    icon?: string;
}

export interface DemoKpiCategory {
    name: string;
    content?: DemoIconValue[];
}

export interface DemoKpis {
    badge?: string;
    kpiCategory?: DemoKpiCategory[];
}

export interface DemoToolItem {
    icon?: string; // image URL
    value?: string;
    description?: string;
    tagline?: string; // tool name
}

export interface DemoCta {
    title?: string;
    descp?: string;
}

export interface DemoTools {
    badge?: string;
    description?: string;
    content?: DemoToolItem[];
    cta?: DemoCta;
}

export interface DemoApproach {
    tagline?: string;
    title?: string;
    description?: string;
    steps?: DemoApproachStep[];
    kpis?: DemoKpis;
    tools?: DemoTools;
}

export interface DemoPoint {
    icon?: string;
    title: string;
    description?: string;
}

export interface DemoWhyService {
    tagline?: string;
    title?: string;
    description?: string;
    points?: DemoPoint[];
}

export interface DemoBenefits {
    tagline?: string;
    title?: string;
    description?: string;
    points?: DemoPoint[];
}

export interface DemoAddonCard {
    icon?: string;
    title: string;
    description?: string;
}

export interface DemoAddonContentPoint {
    icon?: string;
    point: string;
}

export interface DemoAddonContent {
    title?: string;
    tagline?: string;
    description?: string;
    points?: DemoAddonContentPoint[];
}

export interface DemoHighlightPoint {
    icon?: string;
    value: string;
    descp?: string;
}

export interface DemoHighlight {
    title?: string;
    tagline?: string;
    description?: string;
    points?: DemoHighlightPoint[];
    cta?: string;
}

export interface DemoAddons {
    tagline?: string;
    title?: string;
    description?: string;
    cards?: DemoAddonCard[];
    cta?: DemoCta;
    content?: DemoAddonContent;
    highlight?: DemoHighlight;
}

export interface DemoStrategy {
    tagline?: string;
    title?: string;
    description?: string;
    points?: DemoPoint[];
    stats?: DemoIconValue[];
    cta?: string;
    media?: DemoMedia;
}

export interface DemoWhyOpt {
    tagline?: string;
    title?: string;
    description?: string;
    points?: DemoPoint[];
    stats?: DemoIconValue[];
}

export interface DemoBusiness {
    tagline?: string;
    title?: string;
    description?: string;
    points?: DemoPoint[];
    stats?: DemoIconValue[];
}

export interface DemoFaqItem {
    title: string;
    description?: string;
}

export interface DemoFaqs {
    tagline?: string;
    title?: string;
    description?: string;
    accordions?: DemoFaqItem[];
}

export interface DemoSectionHtml {
    title?: string;
    value?: string;
}

export interface DemoServiceCategory {
    name?: string;
    slug?: string;
}

export interface DemoServiceData {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    serviceCategory?: DemoServiceCategory;
    servicecard?: DemoServiceCard;
    banner?: DemoBanner;
    servicestats?: DemoIconValue[];
    approach?: DemoApproach;
    whyservice?: DemoWhyService;
    benefits?: DemoBenefits;
    strategy?: DemoStrategy;
    whyopt?: DemoWhyOpt;
    business?: DemoBusiness;
    addons?: DemoAddons;
    faqs?: DemoFaqs;
    bottomSection?: DemoSectionHtml;
    internalSection?: DemoSectionHtml;
    metaTitle?: string;
    metaDescription?: string;
}
