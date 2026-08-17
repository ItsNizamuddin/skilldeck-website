export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    facebook: string;
    linkedin: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MenuItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export * from "./course";
export * from "./company";
export * from "./category";
export * from "./footer"
