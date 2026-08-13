"use client";

import SectionTag from "@/components/ui/SectionTag";

interface CourseRelatedLinksProps {
    title: string;
    value: string;
}

export default function CourseRelatedLinks({ title, value }: CourseRelatedLinksProps) {
    if (!value) return null;

    // Split HTML string by pipe characters (|) to isolate anchor links
    const linkItems = value.split("|").map(item => item.trim()).filter(Boolean);

    return (
        <div className="border border-gray-200 rounded-3xl bg-white p-5 md:p-6 space-y-4 shadow-sm">
            <SectionTag text={title || "RELATED LINKS"} />

            <div className="flex flex-wrap gap-2.5 pt-1 related-links-pills">
                {linkItems.map((htmlString, index) => (
                    <div
                        key={index}
                        className="px-4 py-2 bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-gray-200 rounded-full text-[11px] capitalize font-bold text-gray-700 hover:text-[#7C3AED] transition-all duration-200"
                        dangerouslySetInnerHTML={{ __html: htmlString }}
                    />
                ))}
            </div>

            <style jsx global>{`
                .related-links-pills a {
                    color: inherit !important;
                    text-decoration: none !important;
                    display: inline-block;
                }
            `}</style>
        </div>
    );
}
