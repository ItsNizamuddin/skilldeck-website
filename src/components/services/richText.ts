/**
 * The CMS wraps plain-text rich fields in a `<pre class="bg-muted ...">` +
 * `<span style="white-space: pre-wrap">` shell. Rendered as-is that shows up as
 * a monospace code block, so unwrap the shell and keep the inner markup.
 */
export function normalizeRichText(html?: string): string {
    if (!html) return "";

    let out = html.trim();
    let previous = "";

    // Unwrap repeatedly — some fields nest pre > span.
    while (out !== previous) {
        previous = out;
        const preMatch = out.match(/^<pre[^>]*>([\s\S]*)<\/pre>$/i);
        if (preMatch) {
            out = preMatch[1].trim();
            continue;
        }
        const spanMatch = out.match(/^<span[^>]*>([\s\S]*)<\/span>$/i);
        if (spanMatch) {
            out = spanMatch[1].trim();
        }
    }

    return out;
}

/** Media fields arrive either as a bare URL string or as a `{ url, alt }` object. */
export function resolveMediaUrl(media?: unknown): string | undefined {
    if (!media) return undefined;
    if (typeof media === "string") return media.trim() || undefined;
    if (typeof media === "object" && media !== null) {
        const url = (media as { url?: unknown }).url;
        return typeof url === "string" && url.trim() ? url.trim() : undefined;
    }
    return undefined;
}

export function resolveMediaAlt(media?: unknown): string | undefined {
    if (media && typeof media === "object") {
        const alt = (media as { alt?: unknown }).alt;
        if (typeof alt === "string" && alt.trim()) return alt.trim();
    }
    return undefined;
}

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".m4v"];

export function isVideoUrl(url?: string): boolean {
    if (!url) return false;
    const path = url.split("?")[0].toLowerCase();
    return VIDEO_EXTENSIONS.some((ext) => path.endsWith(ext));
}
