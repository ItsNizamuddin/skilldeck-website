import { cn } from "@/lib/utils";

/**
 * Brand gradient text.
 *
 * NOTE: the gradient MUST come from the Tailwind arbitrary `bg-[linear-gradient(...)]`
 * class, never from an inline `style={{ background: ... }}`. The CSS `background`
 * shorthand resets `background-clip` to `border-box`, and because inline styles beat
 * class styles, that silently kills `bg-clip-text` — the text goes transparent and the
 * gradient paints the whole box as a solid block. This is the same class string used
 * across the rest of the site.
 */
export default function HdGradientText({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent",
                className
            )}
        >
            {children}
        </span>
    );
}
