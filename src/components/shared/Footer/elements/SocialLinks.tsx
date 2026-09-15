import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube, Facebook, Globe, MessageCircle } from "lucide-react";
import { SocialLinkItem } from "@/types";

interface SocialLinksProps {
    items?: SocialLinkItem[];
}

/** Each network keeps its own tint so the row reads as brands, not as grey chips. */
const getSocial = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("linkedin")) return { icon: <Linkedin className="w-4 h-4" />, tone: "bg-[#0a66c2]/10 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white" };
    if (lower.includes("twitter") || lower.includes("x")) return { icon: <Twitter className="w-4 h-4" />, tone: "bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white" };
    if (lower.includes("instagram")) return { icon: <Instagram className="w-4 h-4" />, tone: "bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white" };
    if (lower.includes("youtube")) return { icon: <Youtube className="w-4 h-4" />, tone: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white" };
    if (lower.includes("facebook")) return { icon: <Facebook className="w-4 h-4" />, tone: "bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2] hover:text-white" };
    if (lower.includes("whatsapp")) return { icon: <MessageCircle className="w-4 h-4" />, tone: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white" };
    return { icon: <Globe className="w-4 h-4" />, tone: "bg-slate-100 text-brand-muted hover:bg-brand-primary hover:text-white" };
};

const SocialLinks = ({ items }: SocialLinksProps) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {items.map((item, index) => {
                if (!item?.link) return null;
                const { icon, tone } = getSocial(item.name || "");
                return (
                    <Link
                        key={`${item.name || "social"}-${index}`}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label={item.name || "Social link"}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 ${tone}`}
                    >
                        {icon}
                    </Link>
                );
            })}
        </div>
    );
};

export default SocialLinks;
