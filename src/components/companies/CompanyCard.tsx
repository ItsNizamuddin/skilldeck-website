import { Button } from "@/components/ui/Button";
import { Company } from "@/types";
import {
    ArrowUpRight,
    BadgeCheck,
    Building2,
    MapPin
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CompanyCardProps {
    company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
    if (!company) {
        return null;
    }

    // Helper: clean HTML tags from backend inputs
    const stripHtml = (htmlString?: string) => {
        if (!htmlString) return "";
        return htmlString.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
    };

    const cleanDescription = stripHtml(company.shortDescription);

    // Initial letters avatar if logo is absent
    const getCompanyInitials = (name: string) => {
        if (!name) return "CO";
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    // Calculate dynamic yet deterministic style theme mappings based on size and ID
    const size = Number(company.companySize) || 10;
    const hash = company.id
        .split("-")
        .join("")
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    let borderClass = "border-t-4 border-t-blue-500";
    let bgClass = "bg-[#f0f9ff]";

    if (size <= 12) {
        borderClass = "border-t-4 border-t-emerald-500";
        bgClass = "bg-[#f0fdf4]";
    } else if (size >= 50) {
        borderClass = "border-t-4 border-t-pink-500";
        bgClass = "bg-[#fdf2f8]";
    } else {
        const isAmber = hash % 2 !== 0;
        borderClass = isAmber ? "border-t-4 border-t-amber-500" : "border-t-4 border-t-blue-500";
        bgClass = isAmber ? "bg-[#fffbeb]" : "bg-[#f0f9ff]";
    }

    return (
        <div className={`bg-white rounded-2xl border border-slate-100 ${borderClass} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between relative group min-h-[320px]`}>
            <div>
                <div className={`w-full h-24 ${bgClass} flex items-center justify-center border-b border-slate-100/50 p-4 relative overflow-hidden`}>
                    <div className="w-40 h-12 relative flex items-center justify-center shrink-0">
                        {company.logo ? (
                            <Image
                                src={company.logo}
                                alt={`${company.name} logo`}
                                fill
                                sizes="160px"
                                className="object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-slate-300 gap-0.5">
                                <Building2 className="w-6 h-6 stroke-[1.2]" />
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                                    {getCompanyInitials(company.name)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Body Details Content */}
                <div className="p-5">
                    {/* Company name & Verified state */}
                    <h3 className="font-extrabold text-slate-800 text-base md:text-lg flex items-center gap-1.5 leading-tight truncate">
                        {company.name}
                        {company.isVerified && (
                            <BadgeCheck className="w-4.5 h-4.5 text-[#3b82f6] flex-shrink-0" />
                        )}
                    </h3>

                    {/* Location & Calendar */}
                    <div className="flex items-center gap-1 text-slate-400 text-xs mt-1.5 font-medium truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{company.location || "Global"}</span>
                        {company.foundedYear && (
                            <>
                                <span className="mx-1">·</span>
                                <span>Since {company.foundedYear}</span>
                            </>
                        )}
                    </div>

                    {/* Short Description */}
                    <p className="text-slate-500 text-xs mt-3 line-clamp-3 leading-relaxed min-h-[48px]">
                        {cleanDescription || "Professional training provider"}
                    </p>

                    {/* Meta info pills (only render if they exist in DB) */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {company.industry && (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/20 capitalize">
                                {company.industry}
                            </span>
                        )}
                        {company.companySize && (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/20">
                                {company.companySize} employees
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. Card Action Footer */}
            <div className="p-5 pt-0 mt-auto flex items-center gap-3">

                <Button
                    as={Link}
                    href={`/companies/${company.slug}?id=${company.id}`}
                    variant="primary"
                    className="flex-1 h-11 justify-center gap-1.5"
                >
                    View profile
                    <ArrowUpRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
            </div>
        </div>
    );
}
