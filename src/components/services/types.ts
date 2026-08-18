export interface ServiceMedia {
    url: string;
    alt?: string;
}

export interface ServiceStatItem {
    icon?: string;
    value: string;
    description: string;
    tagline?: string;
}

export interface ServiceBannerStat {
    icon?: string;
    value: string;
}

export interface ServiceBanner {
    h1?: string;
    tagline?: string;
    description?: string;
    media?: ServiceMedia;
    stats?: ServiceBannerStat[];
}

export interface ServiceWhyPoint {
    icon?: string;
    title: string;
    description: string;
}

export interface ServiceWhyChooseUsData {
    tagline?: string;
    title?: string;
    description?: string;
    points?: ServiceWhyPoint[];
}

export interface ServiceBenefitPoint {
    icon?: string;
    title: string;
    description: string;
}

export interface ServiceBenefitsData {
    tagline?: string;
    title?: string;
    points?: ServiceBenefitPoint[];
}

export interface ServiceApproachStep {
    icon?: string;
    title: string;
    description: string;
}

export interface ServiceKPIItem {
    icon?: string;
    value: string;
}

export interface ServiceKPICategory {
    name: string;
    content: ServiceKPIItem[];
}

export interface ServiceKPIs {
    badge?: string;
    kpiCategory?: ServiceKPICategory[];
}

export interface ServiceTool {
    icon?: string;
    tagline: string;
}

export interface ServiceTools {
    badge?: string;
    description?: string;
    content?: ServiceTool[];
    cta?: {
        title: string;
        descp?: string;
    };
}

export interface ServiceApproachData {
    tagline?: string;
    title?: string;
    description?: string;
    steps?: ServiceApproachStep[];
    kpis?: ServiceKPIs;
    tools?: ServiceTools;
}

export interface ServiceAddonCard {
    icon?: string;
    title: string;
    description: string;
}

export interface ServiceHighlightPoint {
    icon?: string;
    value: string;
    descp: string;
}

export interface ServiceHighlight {
    tagline?: string;
    title?: string;
    description?: string;
    points?: ServiceHighlightPoint[];
}

export interface ServiceAddonsData {
    tagline?: string;
    title?: string;
    description?: string;
    cards?: ServiceAddonCard[];
    highlight?: ServiceHighlight;
    cta?: {
        title: string;
        descp?: string;
    };
}

export interface ServiceFAQItem {
    title: string;
    description: string;
}

export interface ServiceFAQs {
    tagline?: string;
    title?: string;
    description?: string;
    accordions?: ServiceFAQItem[];
}

export interface ServiceSectionHTML {
    title?: string;
    value?: string;
}

export interface ServiceData {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    metaRobots?: any;
    ogTitle?: string;
    ogDescription?: string;
    servicecard?: {
        tagline?: string;
        title?: string;
        icon?: string;
        thumbnail?: string;
        clients?: string;
    };
    banner?: ServiceBanner;
    servicestats?: ServiceStatItem[];
    whyservice?: ServiceWhyChooseUsData;
    benefits?: ServiceBenefitsData;
    approach?: ServiceApproachData;
    addons?: ServiceAddonsData;
    faqs?: ServiceFAQs;
    bottomSection?: ServiceSectionHTML;
    internalSection?: ServiceSectionHTML;
    leadmagnet?: ServiceLeadMagnet[];
    strategy?: ServiceStrategy;
    whyopt?: ServiceStrategy;
    business?: ServiceStrategy;
}

export interface ServiceStrategyPoint {
    icon?: string;
    title: string;
    description: string;
}

export interface ServiceStrategyStat {
    icon?: string;
    value: string;
    description: string;
    tagline?: string;
}

export interface ServiceStrategy {
    tagline?: string;
    title?: string;
    description?: string;
    points?: ServiceStrategyPoint[];
    stats?: ServiceStrategyStat[];
    cta?: string;
    media?: any;
}

export interface ServiceLeadMagnet {
    _id: string;
    name: string;
    uid: string;
    broucher?: {
        _id: string;
        alt: string;
        url: string;
        thumbnail?: string;
    };
}
