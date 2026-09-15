import { cache } from "react";
import { fetchFromBackend } from "./apiProxy";

export interface PatternSummary {
    slug: string;
    title?: string;
}

const PAGE_SIZE = 100; // the listing endpoint caps out here

async function fetchPage(page: number) {
    const queryParams = new URLSearchParams({
        select: "title,slug",
        page: String(page),
        limit: String(PAGE_SIZE),
    });

    const res = await fetchFromBackend("/patterns", {
        queryParams,
        cache: "force-cache",
        next: { tags: ["patterns"] },
    });

    if (!res.ok) {
        console.error(`[patterns] listing page ${page} failed: ${res.status}`);
        return null;
    }
    return res.json();
}

/**
 * Every published pattern, the pages served at /info/<slug>.
 *
 * Used both to prerender those routes and to list them in the sitemap — they
 * were in no sitemap at all, and each one is a legacy landing page that the
 * redirect table now points at, so they need to be crawlable on their own.
 */
export const getAllPatterns = cache(async (): Promise<PatternSummary[]> => {
    try {
        const first = await fetchPage(1);
        if (!first) return [];

        const patterns: PatternSummary[] = [...(first.data || [])];
        const totalPages = first.meta?.pages || 1;

        if (totalPages > 1) {
            const rest = await Promise.all(
                Array.from({ length: totalPages - 1 }, (_, i) =>
                    fetchPage(i + 2).catch((err) => {
                        console.error(`[patterns] error fetching page ${i + 2}:`, err);
                        return null;
                    })
                )
            );
            for (const page of rest) {
                if (page) patterns.push(...(page.data || []));
            }
        }

        return patterns.filter((p) => Boolean(p?.slug));
    } catch (error) {
        console.error("[patterns] failed to build the pattern list:", error);
        return [];
    }
});
