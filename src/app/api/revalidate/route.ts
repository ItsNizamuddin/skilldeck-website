import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { env } from '@/lib/env';
import { CDNFactory } from '@/lib/cdn';

export const dynamic = 'force-dynamic';

const rawSiteUrl = env.NEXT_PUBLIC_SITE_URL;
const SITE_URL = (rawSiteUrl.includes('localhost') || rawSiteUrl.includes('127.0.0.1'))
    ? rawSiteUrl
    : rawSiteUrl.replace(/\/+$/, '');

export async function POST(request: NextRequest) {
    const secret = request.headers.get('x-revalidate-secret');

    // No hardcoded fallback secret. An unset REVALIDATE_SECRET must reject
    // every request, not silently authorize via a guessable shared value.
    if (!env.REVALIDATE_SECRET || secret !== env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json().catch(() => ({}));
    const type = payload.type;
    const slug = payload.slug || payload.courseSlug;
    const categorySlug = payload.categorySlug;

    const paths = Array.isArray(payload.paths) ? payload.paths : [];
    const tags = Array.isArray(payload.tags) ? payload.tags : [];
    const urls = Array.isArray(payload.urls) ? payload.urls : [];

    for (const p of paths) if (p) revalidatePath(p);
    for (const t of tags) if (t) revalidateTag(t, 'max');

    const purgeUrls: string[] = [...urls];

    // ── Adapt every branch below to this project's actual page routes ──
    if ((type === 'course' || type === 'schedule') && slug && categorySlug) {
        revalidatePath(`/${categorySlug}/${slug}`);
        purgeUrls.push(`${SITE_URL}/${categorySlug}/${slug}`);
        revalidatePath(`/schedules/${slug}`);
        purgeUrls.push(`${SITE_URL}/schedules/${slug}`);
    } else if (type === 'category' && slug) {
        revalidatePath(`/${slug}`);
        purgeUrls.push(`${SITE_URL}/${slug}`);
    } else if (type === 'service' && slug && categorySlug) {
        revalidatePath(`/services/${categorySlug}/${slug}`);
        purgeUrls.push(`${SITE_URL}/services/${categorySlug}/${slug}`);
    } else if (type === 'blog' && slug) {
        revalidatePath('/blog');
        revalidatePath(`/blog/${slug}`);
        purgeUrls.push(`${SITE_URL}/blog`, `${SITE_URL}/blog/${slug}`);
    } else if (type === 'footer') {
        revalidateTag('footer', 'max');
        revalidatePath('/', 'layout');
        purgeUrls.push(`${SITE_URL}/*`);
    } else if (type === 'all') {
        revalidatePath('/', 'layout');
        purgeUrls.push(`${SITE_URL}/*`);
    } else if (!type && (paths.length || tags.length || urls.length)) {
        // generic paths/tags/urls already handled above
    } else if (!type) {
        return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
    }

    if (purgeUrls.length > 0) {
        await CDNFactory.getProvider().purge(purgeUrls).catch((err) => {
            console.error('[Revalidate] Purge execution failed:', err);
        });
    }

    return NextResponse.json({ revalidated: true, type, slug, purged: purgeUrls });
}
