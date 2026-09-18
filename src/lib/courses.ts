import { cache } from "react";
import { fetchFromBackend } from "./apiProxy";

export interface CourseSummary {
    slug: string;
    categorySlug: string;
    /** The course card thumbnail, when the CMS has one. */
    image?: string;
    imageAlt?: string;
}

const PAGE_SIZE = 100; // the listing endpoint caps out here

// Only what the callers read. The full course document carries syllabus,
// placements and trainers, none of which belong in a listing fetch.
const FIELDS = "slug,category_slug,category,courseCard";

async function fetchPage(page: number) {
    const queryParams = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE), select: FIELDS });
    const res = await fetchFromBackend("/courses", {
        queryParams,
        cache: "force-cache",
        next: { tags: ["courses"] },
    });

    if (!res.ok) {
        console.error(`[courses] listing page ${page} failed: ${res.status}`);
        return null;
    }
    return res.json();
}

/**
 * Every published course with the category it lives under.
 *
 * A course is served at /{category}/{course}; its own slug alone is not a URL.
 * Several feeds are handed a bare slug by the backend and have to resolve the
 * category themselves before they can print a link.
 */
export const getAllCourses = cache(async (): Promise<CourseSummary[]> => {
    try {
        const first = await fetchPage(1);
        if (!first) return [];

        const rows: any[] = [...(first.data || [])];
        const totalPages = first.meta?.pages || 1;

        if (totalPages > 1) {
            const rest = await Promise.all(
                Array.from({ length: totalPages - 1 }, (_, i) =>
                    fetchPage(i + 2).catch((err) => {
                        console.error(`[courses] error fetching page ${i + 2}:`, err);
                        return null;
                    })
                )
            );
            for (const page of rest) {
                if (page) rows.push(...(page.data || []));
            }
        }

        return rows
            .map((course: any): CourseSummary => {
                const thumb = course.courseCard?.courseThumbnail;
                return {
                    slug: course.slug,
                    categorySlug: course.category_slug || course.category?.slug,
                    image: thumb?.url || thumb?.thumbnail || undefined,
                    imageAlt: thumb?.alt || undefined,
                };
            })
            .filter((c) => Boolean(c.slug && c.categorySlug));
    } catch (error) {
        console.error("[courses] failed to build the course list:", error);
        return [];
    }
});

/** courseSlug -> categorySlug, for turning a bare course slug into a real path. */
export const getCourseCategoryMap = cache(async (): Promise<Map<string, string>> => {
    const courses = await getAllCourses();
    return new Map(courses.map((c) => [c.slug, c.categorySlug]));
});

/**
 * courseSlug -> card thumbnail.
 *
 * Schedules carry no artwork of their own: the schedules endpoint returns a
 * null `image` and a product stub of just _id, name and slug. A schedule card
 * with nothing to show falls back to its course's picture rather than a
 * "no preview" tile.
 */
export const getCourseImageMap = cache(async (): Promise<Map<string, { url: string; alt?: string }>> => {
    const courses = await getAllCourses();
    const map = new Map<string, { url: string; alt?: string }>();
    for (const c of courses) {
        if (c.image) map.set(c.slug, { url: c.image, alt: c.imageAlt });
    }
    return map;
});
