import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionTag from "@/components/ui/SectionTag";
import type { PatternSummary } from "@/lib/patterns";

interface ServicePatternLinksProps {
    patterns: PatternSummary[];
    serviceName?: string;
    id?: string;
}

/**
 * Links a service to the /info/<slug> pages built from it.
 *
 * Server-rendered and always expanded on purpose. Each of those pages used to
 * live at the site root or under /services/, and the move left them reachable
 * only from the XML sitemap and from each other — a closed island no link
 * equity could reach. This is the way back in, so it must be in the HTML rather
 * than behind a gesture or an accordion.
 */
export default function ServicePatternLinks({
    patterns,
    serviceName,
    id = "guides",
}: ServicePatternLinksProps) {
    if (patterns.length === 0) return null;

    return (
        <section id={id} className="container mx-auto px-4 lg:px-0 pb-12 md:pb-16 2xl:pb-20">
            <div className="border border-gray-200 rounded-3xl bg-white shadow-sm px-5 md:px-8 py-7">
                <SectionTag text="RELATED GUIDES" />
                <h2 className="heading-card text-brand-dark mt-3 mb-5">
                    {serviceName ? `More on ${serviceName}` : "More on this service"}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                    {patterns.map((pattern) => (
                        <li key={pattern.slug}>
                            <Link
                                href={`/info/${pattern.slug}`}
                                className="group flex items-start gap-1.5 body-small text-gray-600 hover:text-brand-primary transition-colors"
                            >
                                <span className="hover:underline decoration-1 underline-offset-4">
                                    {pattern.title || pattern.slug}
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
