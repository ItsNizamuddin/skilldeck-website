import { NextRequest } from "next/server";
import { fetchFromBackend } from "@/lib/apiProxy";
import { env } from "@/lib/env";

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

/** Render a structured llms.txt markdown string from backend data */
function renderLlmsTxtMarkdown(data: any, baseUrl: string): string {
    const lines: string[] = [];

    lines.push(`# ${data.title || "Skilldeck"}`);
    if (data.summary) lines.push(`\n> ${data.summary}`);
    if (data.description) lines.push(`\n${data.description}`);

    const content = data.content || {};
    for (const [section, items] of Object.entries(content)) {
        if (!Array.isArray(items) || items.length === 0) continue;
        lines.push(`\n## ${section}`);
        for (const item of items as Array<{ title: string; slug: string }>) {
            lines.push(`- [${item.title}](${baseUrl}/${item.slug})`);
        }
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
        const markdown = renderLlmsTxtMarkdown(data, baseUrl);

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
