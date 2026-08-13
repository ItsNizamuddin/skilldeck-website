import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
    /** Display label */
    label: string;
    /** Navigation URL — if omitted, renders as plain text (current page) */
    href?: string;
    /** aria-label override for icon-only items (e.g. "Home") */
    ariaLabel?: string;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Reusable Breadcrumb navigation.
 *
 * Usage:
 * ```tsx
 * <Breadcrumb items={[
 *   { label: "Home", href: "/" },
 *   { label: "Courses", href: "/courses" },
 *   { label: "React Bootcamp" },
 * ]} />
 * ```
 *
 * - First item renders a house icon if `label === "Home"`
 * - Last item (no href) renders as non-clickable current-page text
 * - Semantic: `<nav aria-label="Breadcrumb">` with `aria-current="page"` on last item
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={`flex items-center flex-wrap gap-0.5 ${className}`}>
            <ol className="flex items-center flex-wrap gap-0.5 list-none m-0 p-0">
                {items.map((item, i) => {
                    const isFirst = i === 0;
                    const isLast = i === items.length - 1;
                    const isHomeIcon = isFirst && item.label === "Home";

                    return (
                        <li key={i} className="flex items-center gap-0.5">
                            {/* Separator — not shown before first item */}
                            {!isFirst && (
                                <span aria-hidden="true" className="mx-1">
                                    <ChevronIcon />
                                </span>
                            )}

                            {/* Current page (no href) — non-clickable */}
                            {isLast && !item.href ? (
                                <span
                                    aria-current="page"
                                    className="text-xs text-gray-700 font-medium truncate max-w-[200px]"
                                    title={item.label}
                                >
                                    {item.label}
                                </span>
                            ) : item.href ? (
                                isHomeIcon ? (
                                    /* Home icon link */
                                    <Link
                                        href={item.href}
                                        aria-label={item.ariaLabel || "Home"}
                                        className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                                    >
                                        <HomeIcon />
                                    </Link>
                                ) : (
                                    /* Regular link */
                                    <Link
                                        href={item.href}
                                        className="text-xs text-gray-500 hover:text-blue-600 transition-colors truncate max-w-[160px]"
                                        title={item.label}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            ) : (
                                /* Non-linkable non-last item (edge case) */
                                <span className="text-xs text-gray-500">{item.label}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

// ─── Icon helpers ─────────────────────────────────────────────────────────────

function ChevronIcon() {
    return (
        <svg
            className="w-3 h-3 text-gray-400 flex-shrink-0"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M4 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v6a1 1 0 0 0 1 1h4v-4h3v4h4a1 1 0 0 0 1-1v-6a.5.5 0 0 0-.146-.354L8.354 1.146z" />
        </svg>
    );
}

export default Breadcrumb;
