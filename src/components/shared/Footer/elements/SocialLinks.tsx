import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube, Facebook, Globe, MessageCircle } from "lucide-react";
import { SocialLinkItem } from "@/types";

interface SocialLinksProps {
    items?: SocialLinkItem[];
}

const getSocialIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
    if (lower.includes("twitter") || lower.includes("x")) return <Twitter className="w-4 h-4" />;
    if (lower.includes("instagram")) return <Instagram className="w-4 h-4" />;
    if (lower.includes("youtube")) return <Youtube className="w-4 h-4" />;
    if (lower.includes("facebook")) return <Facebook className="w-4 h-4" />;
    if (lower.includes("whatsapp")) return <MessageCircle className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
};

const SocialLinks = ({ items }: SocialLinksProps) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {items.map((item, index) => {
                if (!item?.link) return null;
                return (
                    <Link
                        key={`${item.name || "social"}-${index}`}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label={item.name || "Social link"}
                        className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-all hover:scale-105"
                    >
                        {getSocialIcon(item.name || "")}
                    </Link>
                );
            })}
        </div>
    );
};

export default SocialLinks;
