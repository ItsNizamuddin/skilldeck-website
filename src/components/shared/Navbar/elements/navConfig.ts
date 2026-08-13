import { BookOpen, Briefcase, Calendar, Layout, Mail, MessageCircle, Search, Share2, ShoppingCart, Upload, UserCog, Users, Video } from "lucide-react";

export const services = [
    { name: "LMS Platform", href: "/services/lms", icon: BookOpen, description: "Learning Management System" },
    { name: "CMS", href: "/services/cms", icon: Layout, description: "Content Management System" },
    { name: "CRM", href: "/services/crm", icon: Users, description: "Customer Relationship Management" },
    { name: "Web Chat", href: "/services/webchat", icon: MessageCircle, description: "Live Chat Solution" },
    { name: "Events & Webinars", href: "/services/events", icon: Video, description: "Event Management" },
    { name: "Training Management", href: "/services/training", icon: Calendar, description: "Batch & Class Management" },
    { name: "Trainer Management", href: "/services/trainers", icon: UserCog, description: "Manage Training Team" },
    { name: "E-commerce", href: "/services/ecommerce", icon: ShoppingCart, description: "Sell Products & Courses" },
    { name: "Marketing Automation", href: "/services/marketing-automation", icon: Mail, description: "Email & Campaigns" },
    { name: "Social Media", href: "/services/social", icon: Share2, description: "Multi-Platform Management" },
    { name: "Job Portal", href: "/services/jobs", icon: Briefcase, description: "Career Opportunities" },
    { name: "SEO Automation", href: "/services/seo", icon: Search, description: "Scale Your SEO" },
    { name: "Bulk Upload Tools", href: "/services/bulk-tools", icon: Upload, description: "CSV Imports & More" },
];

export const mobileNavLinks = [
    { name: "Companies", href: "/companies", sectionId: "companies" },
    { name: "Features", href: "/#features", sectionId: "features" },
    { name: "Plans", href: "/#plans", sectionId: "plans" },
    { name: "Platform", href: "/#platform", sectionId: "platform" },
];

export const aboutLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
];
