import { Phone } from "lucide-react";
import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";
import Image from "next/image";
import Link from "next/link";
import FooterCTA from "./elements/FooterCTA";
import FooterLinks from "./elements/FooterLinks";
import ScrollToTop from "./elements/ScrollToTop";
import SocialLinks from "./elements/SocialLinks";
import { getFooterData } from "@/lib/footer";
import React from "react";

async function Footer() {
    const data = await getFooterData();

    if (!data) {
        return null;
    }

    // Find the primary brand / About Us column (usually order 1 or title matching "About")
    const brandColumn = data.footer_columns?.find(
        (col) => col.order === 1 || col.title?.toLowerCase().includes("about")
    );

    const brandContent = brandColumn?.content;
    const brandLogoUrl = brandColumn?.logo?.url;
    const brandLogoAlt = brandColumn?.logo?.alt || "Logo";

    const hasPopularContent =
        (data.popular_categories && data.popular_categories.length > 0) ||
        (data.popular_courses && data.popular_courses.length > 0) ||
        (data.popular && data.popular.length > 0);

    return (
        <footer className="bg-slate-900 relative overflow-hidden" id="footer">
            {/* Interactive Dot Grid Background */}
            <InteractiveDotBackground />

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

            <FooterCTA />

            {/* Main Footer Columns */}
            <div className="relative z-10 border-t border-slate-800 py-8 md:py-10">
                <div className="container mx-auto px-4 sm:px-2 xl:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Brand / About Column */}
                        {(brandLogoUrl || brandContent || (data.social && data.social.length > 0)) && (
                            <div className="lg:col-span-4 space-y-3">
                                {brandLogoUrl && (
                                    <div className="flex items-center gap-2 w-fit">
                                        <Image
                                            alt={brandLogoAlt}
                                            src={brandLogoUrl}
                                            width={180}
                                            height={40}
                                            className="h-8 md:h-9 w-auto object-contain"
                                            priority
                                        />
                                    </div>
                                )}

                                {brandContent && (
                                    <p className="text-slate-400 text-sm w-full md:max-w-xs leading-relaxed">
                                        {brandContent}
                                    </p>
                                )}

                                <SocialLinks items={data.social} />

                                {data.numbers && data.numbers.length > 0 && (
                                    <div className="flex items-center gap-2 text-xs text-slate-300 mt-4 flex-wrap">
                                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        {data.numbers.map((phone, pIdx) => (
                                            <span key={`phone-item-${pIdx}`} className="inline-flex items-center">
                                                <Link
                                                    href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                                                    rel="nofollow"
                                                    className="text-slate-300 hover:text-white transition-colors"
                                                >
                                                    {phone}
                                                </Link>
                                                {pIdx < data.numbers!.length - 1 && (
                                                    <span className="text-slate-600 mx-2 select-none">|</span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation Columns */}
                        <FooterLinks columns={data.footer_columns} />
                    </div>
                </div>
            </div>

            {/* Directory Section: Top Categories / Top Courses / Popular */}
            {hasPopularContent && (
                <div className="relative z-10 border-t border-slate-800/80 py-8 md:py-10">
                    <div className="container mx-auto px-4 sm:px-2 xl:px-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-left">
                            {/* TOP CATEGORIES */}
                            {data.popular_categories && data.popular_categories.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-200">
                                        Top Categories
                                    </h4>
                                    <div className="text-xs leading-loose text-slate-400">
                                        {data.popular_categories.map((cat, idx) => (
                                            <React.Fragment key={`${cat.slug}-${idx}`}>
                                                <Link
                                                    href={`/${cat.slug}`}
                                                    className="text-slate-400 hover:text-white transition-colors inline-block"
                                                >
                                                    {cat.name}
                                                </Link>
                                                {idx < data.popular_categories!.length - 1 && (
                                                    <span className="text-slate-600 mx-2 select-none">|</span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TOP COURSES */}
                            {data.popular_courses && data.popular_courses.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-200">
                                        Top Courses
                                    </h4>
                                    <div className="text-xs leading-loose text-slate-400">
                                        {data.popular_courses.map((course, idx) => {
                                            const href = course.categorySlug
                                                ? `/${course.categorySlug}/${course.slug}`
                                                : `/${course.slug}`;
                                            return (
                                                <React.Fragment key={`${course.slug}-${idx}`}>
                                                    <Link
                                                        href={href}
                                                        className="text-slate-400 hover:text-white transition-colors inline-block"
                                                    >
                                                        {course.name}
                                                    </Link>
                                                    {idx < data.popular_courses!.length - 1 && (
                                                        <span className="text-slate-600 mx-2 select-none">|</span>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            )}

            {/* Disclaimer (if available) */}
            {data.disclaimer && (
                <div className="relative z-10 border-t border-slate-800/60 py-4 bg-slate-950/40">
                    <div className="container mx-auto px-4">
                        <p className="text-[11px] text-slate-500 leading-relaxed text-center md:text-left">
                            {data.disclaimer}
                        </p>
                    </div>
                </div>
            )}

            {/* Bottom Ribbon */}
            {data.bottom_ribbon && (
                <div className="relative z-10 border-t border-slate-800 py-4 bg-slate-950/60">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-row items-center justify-between gap-4">
                            <p className="text-slate-400 text-xs md:text-sm text-center md:text-left">
                                {data.bottom_ribbon}
                            </p>

                            <ScrollToTop />
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}

export default Footer;
