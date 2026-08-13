import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Strips HTML tags and collapses whitespace for plain-text use (e.g. metadata)
 */
export function stripHtml(html: string): string {
    if (!html) return "";
    return html
        .replace(/<[^>]*>?/gm, "") // Remove HTML tags
        .replace(/&nbsp;/g, " ")   // Replace &nbsp; with space
        .replace(/&amp;/g, "&")    // Replace &amp; with &
        .replace(/&lt;/g, "<")     // Replace &lt; with <
        .replace(/&gt;/g, ">")     // Replace &gt; with >
        .replace(/&quot;/g, '"')   // Replace &quot; with "
        .replace(/\s+/g, " ")      // Collapse multiple whitespaces/newlines
        .trim();
}
