import { NextRequest } from "next/server";
import { fetchFromBackend } from "@/lib/apiProxy";
import { env } from "@/lib/env";
import { getCourseCategoryMap } from "@/lib/courses";

export const dynamic = "force-dynamic";

const FALLBACK_LLMS_TXT = `# Skilldeck

Skilldeck is a premier SaaS platform providing comprehensive professional courses, training schedules, and resources.

## Main Navigation

- [Home](https://skilldeck.net)
- [Pricing](https://skilldeck.net/pricing)
- [About Us](https://skilldeck.net/about-us)
- [Contact Us](https://skilldeck.net/contact-us)
- [Careers](https://skilldeck.net/careers)
- [FAQ](https://skilldeck.net/faq)
`;

const getBaseUrl = (request: NextRequest) => {
    const host = request.headers.get("host");
    if (!host) return env.NEXT_PUBLIC_SITE_URL || "https://skilldeck.net";
    const protocol = host.includes("localhost") ? "http" : "https";
    return `${protocol}://${host}`;
};

/**
 * Where each section's slugs actually live.
 *
 * The backend hands every section a bare { title, slug } and says nothing about
 * routing, so the slug used to be pasted straight onto the origin. Only
 * categories sit at the root; everything else is nested, and every other
 * section pointed at URLs that do not exist.
 *
 * A section missing from this map is dropped rather than guessed at — "trainers"
 * has no page on the site at all, so every link it produced was a 404.
 */
const SECTION_PREFIX: Record<string, string> = {
    categories: "",
    blog: "/blog",
    coursePatterns: "/info",
    services: "/services",
    // "courses" is deliberately absent: a course is served at /{category}/{slug},
    // and the category has to be resolved per course — see below.
};

/** Render a structured llms.txt markdown string from backend data */
function renderLlmsTxtMarkdown(
    data: any,
    baseUrl: string,
    courseCategories: Map<string, string>
): string {
    const lines: string[] = [];

    lines.push(`# ${data.title || "Skilldeck"}`);
    if (data.summary) lines.push(`\n> ${data.summary}`);
    if (data.description) lines.push(`\n${data.description}`);

    const content = data.content || {};
    for (const [section, items] of Object.entries(content)) {
        if (!Array.isArray(items) || items.length === 0) continue;

        const isCourses = section === "courses";
        if (!isCourses && SECTION_PREFIX[section] === undefined) {
            console.warn(`[llms.txt] skipping section "${section}" — no known URL shape`);
            continue;
        }

        const entries: string[] = [];
        for (const item of items as Array<{ title: string; slug: string }>) {
            if (!item?.slug) continue;

            let path: string;
            if (isCourses) {
                const category = courseCategories.get(item.slug);
                // No category means no reachable URL, so the course is left out
                // rather than advertised at a path that 404s.
                if (!category) continue;
                path = `/${category}/${item.slug}`;
            } else {
                path = `${SECTION_PREFIX[section]}/${item.slug}`;
            }

            entries.push(`- [${item.title}](${baseUrl}${path})`);
        }

        // A section that lost every entry gets no heading either.
        if (entries.length === 0) continue;
        lines.push(`\n## ${section}`);
        lines.push(...entries);
    }

    const blocks = data.blocks || [];
    for (const block of blocks) {
        if (block.heading) lines.push(`\n## ${block.heading}`);
        if (block.content) lines.push(block.content);
        if (Array.isArray(block.links)) {
            for (const link of block.links) {
                lines.push(`- [${link.title}](${link.url})`);
            }
        }
    }

    return lines.join('\n');
}

export async function GET(request: NextRequest): Promise<Response> {
    try {
        const res = await fetchFromBackend("/llms-txt", { request });
        if (!res.ok) {
            return new Response(FALLBACK_LLMS_TXT, {
                status: 200,
                headers: {
                    "Content-Type": "text/markdown; charset=utf-8",
                },
            });
        }

        const data = await res.json();
        if (!data?.enabled) {
            return new Response(FALLBACK_LLMS_TXT, {
                status: 200,
                headers: {
                    "Content-Type": "text/markdown; charset=utf-8",
                },
            });
        }

        const baseUrl = getBaseUrl(request);
        // Courses arrive as bare slugs; the category is what makes them a URL.
        const courseCategories = await getCourseCategoryMap().catch(
            () => new Map<string, string>()
        );
        const markdown = renderLlmsTxtMarkdown(data, baseUrl, courseCategories);

        return new Response(markdown, {
            status: 200,
            headers: {
                "Content-Type": "text/markdown; charset=utf-8",
                "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (e) {
        console.error("Error generating llms.txt", e);
        return new Response(FALLBACK_LLMS_TXT, {
            status: 200,
            headers: {
                "Content-Type": "text/markdown; charset=utf-8",
            },
        });
    }
}
