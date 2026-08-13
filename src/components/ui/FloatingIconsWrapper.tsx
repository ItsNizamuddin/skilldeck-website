"use client";

import {
    Briefcase,
    Calendar,
    Database,
    Globe,
    GraduationCap,
    Mail,
    MessageSquare,
    Search,
    Share2,
    ShoppingCart,
    Upload,
    UserCog,
    Users,
    Video
} from "lucide-react";
import dynamic from "next/dynamic";

// Define the configurations array entirely inside the Client Component context
const heroIcons = [
    { id: 1, icon: Globe, className: "top-[18%]    left-[4%]", colorClass: "text-blue-500", label: "Website & CMS", alwaysShowLabel: true },
    { id: 2, icon: GraduationCap, className: "top-[18%]    right-[4%]", colorClass: "text-indigo-500", label: "LMS", alwaysShowLabel: true },
    { id: 3, icon: Users, className: "top-[25%]    left-[16%]", colorClass: "text-cyan-500", label: "CRM", alwaysShowLabel: true },
    // { id: 4, icon: Sparkles, className: "top-[23%]    right-[12%]", colorClass: "text-violet-500", label: "AI + Automation", alwaysShowLabel: true },
    { id: 5, icon: MessageSquare, className: "top-[40%]    left-[8%]", colorClass: "text-emerald-500", label: "Webchat", alwaysShowLabel: true },
    { id: 6, icon: Video, className: "top-[35%]    right-[6%]", colorClass: "text-sky-500", label: "Events & Webinars", alwaysShowLabel: true },
    { id: 7, icon: Calendar, className: "top-[50%] left-[14%]", colorClass: "text-orange-500", label: "Batch Management", alwaysShowLabel: true },
    { id: 8, icon: UserCog, className: "top-[46%] right-[14%]", colorClass: "text-purple-500", label: "Trainer Management", alwaysShowLabel: true },
    { id: 9, icon: ShoppingCart, className: "top-[56%] left-[4%]", colorClass: "text-teal-500", label: "E-commerce", alwaysShowLabel: true },
    { id: 10, icon: Mail, className: "top-[56%] right-[4%]", colorClass: "text-rose-500", label: "Marketing Automation", alwaysShowLabel: true },
    { id: 11, icon: Share2, className: "bottom-[10%] left-[16%]", colorClass: "text-pink-500", label: "Social Publishing", alwaysShowLabel: true },
    { id: 12, icon: Briefcase, className: "bottom-[10%] right-[10%]", colorClass: "text-slate-600", label: "Job Portal", alwaysShowLabel: true },
    { id: 13, icon: Search, className: "top-[23%]    right-[12%]", colorClass: "text-amber-500", label: "SEO Automation", alwaysShowLabel: true },
    { id: 14, icon: Upload, className: "top-[64%]    right-[18%]", colorClass: "text-lime-600", label: "Bulk Upload", alwaysShowLabel: true },
    { id: 15, icon: Database, className: "top-[64%]    left-[12%]", colorClass: "text-fuchsia-500", label: "Data Storage", alwaysShowLabel: true },
];

const FloatingIconsLayer = dynamic(() => import("./FloatingIconsLayer"), {
    ssr: false,
    loading: () => null,
});

export default function FloatingIconsWrapper() {
    return <FloatingIconsLayer icons={heroIcons} />;
}
