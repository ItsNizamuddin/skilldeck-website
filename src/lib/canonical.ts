import { env } from "./env";

const SITE_ORIGIN = (env.NEXT_PUBLIC_SITE_URL || "https://skilldeck.net").replace(/\/+$/, "");

function tidyPath(path: string): string {
    let out = path.trim();
    if (!out.startsWith("/")) out = `/${out}`;
    out = out.replace(/\/{2,}/g, "/");
    if (out.length > 1) out = out.replace(/\/+$/, "");
    return out;
}

interface CanonicalInput {
    /** Whatever the CMS has in its canonicalUrl field — absolute, relative, or junk. */
    stored?: string | null;
    /** The page's own path, used whenever the stored value is unusable. */
    fallbackPath: string;
    /** Appended to the resolved path — the location slug on course pages. */
    extraSegment?: string;
}

/**
 * Build a page's canonical URL from the CMS value, falling back to the page's
 * own path.
 *
 * The CMS field is free text and its rows are not consistent, so two shapes are
 * rejected rather than concatenated blindly:
 *
 *  - an absolute URL, which used to be appended to the site origin and rendered
 *    `https://skilldeck.net/https://skilldeck.net/services/enterprise-lms`;
 *  - a bare token with no leading slash (`csm-training-cost`), which is an
 *    editor slip rather than a path — honouring it canonicalised 38 pattern
 *    pages to a root-level URL that 404s.
 *
 * A genuine off-site canonical keeps its own origin.
 */
export function buildCanonical({ stored, fallbackPath, extraSegment }: CanonicalInput): string {
    const raw = (stored ?? "").trim();
    let origin = SITE_ORIGIN;
    let path: string | null = null;

    if (raw) {
        if (/^https?:\/\//i.test(raw)) {
            try {
                const url = new URL(raw);
                origin = url.origin;
                path = url.pathname;
            } catch {
                path = null;
            }
        } else if (raw.startsWith("/")) {
            path = raw;
        }
    }

    let resolved = tidyPath(path || fallbackPath);
    if (extraSegment) {
        resolved = tidyPath(`${resolved}/${extraSegment}`);
    }

    return `${origin}${resolved}`;
}
