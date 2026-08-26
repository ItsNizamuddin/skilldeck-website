import SectionTag from "@/components/ui/SectionTag";

interface DemoSectionHeaderProps {
    tagline?: string;
    title?: string;
    description?: string;
    align?: "left" | "center";
    size?: "md" | "lg";
    className?: string;
}

/**
 * Shared tagline + title + rich-text description header used across every
 * demo-ui section. Renders nothing for a missing title (sections should not
 * be mounted at all without one — this is just the header, not the guard).
 */
export default function DemoSectionHeader({
    tagline,
    title,
    description,
    align = "left",
    size = "md",
    className = "",
}: DemoSectionHeaderProps) {
    if (!title) return null;

    return (
        <div className={`space-y-3 ${align === "center" ? "text-center mx-auto" : ""} ${className}`}>
            {tagline && <SectionTag text={tagline} />}
            <h2 className={size === "lg" ? "heading-section" : "heading-section2"}>{title}</h2>
            {description && (
                <div
                    className={`body-medium max-w-3xl ${align === "center" ? "mx-auto" : ""}`}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            )}
        </div>
    );
}
