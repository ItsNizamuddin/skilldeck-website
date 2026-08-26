import CourseAccordionSection from "@/components/category/courses/overview/CourseAccordionSection";
import CourseRelatedLinks from "@/components/category/courses/overview/CourseRelatedLinks";
import { DemoSectionHtml } from "./types";

interface DemoBottomContentProps {
    bottomSection?: DemoSectionHtml;
    internalSection?: DemoSectionHtml;
}

export default function DemoBottomContent({ bottomSection, internalSection }: DemoBottomContentProps) {
    const hasBottom = Boolean(bottomSection?.value);
    const hasInternal = Boolean(internalSection?.value);

    if (!hasBottom && !hasInternal) return null;

    return (
        <div className="container mx-auto px-2 lg:px-0 pb-16 space-y-6">
            {hasInternal && (
                <CourseRelatedLinks title={internalSection?.title || ""} value={internalSection?.value || ""} />
            )}
            {hasBottom && (
                <CourseAccordionSection title={bottomSection?.title || ""} value={bottomSection?.value || ""} />
            )}
        </div>
    );
}
