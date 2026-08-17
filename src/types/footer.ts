export interface FooterLogo {
    alt?: string;
    url?: string;
    thumbnail?: string;
}

export interface FooterLink {
    label: string;
    url: string;
}

export interface FooterColumn {
    title: string;
    order?: number;
    links?: FooterLink[];
    content?: string;
    logo?: FooterLogo;
}

export interface PopularCategory {
    name: string;
    slug: string;
}

export interface PopularCourse {
    name: string;
    slug: string;
    categorySlug?: string;
}

export interface SocialLinkItem {
    name: string;
    link: string;
    icon?: string | null;
}

export interface FooterData {
    footer_columns?: FooterColumn[];
    popular?: string[];
    numbers?: string[];
    disclaimer?: string;
    bottom_ribbon?: string;
    popular_categories?: PopularCategory[];
    popular_courses?: PopularCourse[];
    social?: SocialLinkItem[];
    updatedAt?: string;
}
