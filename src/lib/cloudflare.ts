import { env } from "./env";

const recentPurges = new Map<string, number>();
const PURGE_DEDUPE_TTL = 5000; // 5 seconds

export async function purgeCloudflareCache(urls: string[]) {
    const apiToken = env.CLOUDFLARE_API_TOKEN;
    const zoneId = env.CLOUDFLARE_ZONE_ID;

    if (!apiToken || !zoneId || apiToken === 'your_api_token_here' || zoneId === 'your_zone_id_here' || apiToken.includes('your_')) {
        console.warn('[Cloudflare Purge] Missing or placeholder API Token/Zone ID. Purge skipped.');
        return;
    }

    const now = Date.now();

    const urlsToPurge = urls.map(url => {
        if (url.includes('localhost') || url.includes('127.0.0.1')) {
            const siteUrl = (env.NEXT_PUBLIC_SITE_URL && !env.NEXT_PUBLIC_SITE_URL.includes('localhost')) 
                ? env.NEXT_PUBLIC_SITE_URL 
                : 'https://skilldeck.net';
            try {
                const urlObj = new URL(url);
                return `${siteUrl.replace(/\/$/, '')}${urlObj.pathname}${urlObj.search}`;
            } catch (e) {
                return url.replace(/http:\/\/localhost:\d+/, siteUrl);
            }
        }

        if (!url.startsWith('http')) {
            const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://skilldeck.net';
            const protocol = siteUrl.startsWith('https') ? 'https://' : 'http://';
            
            if (url.startsWith('//')) {
                return `${protocol.replace('://', '')}:${url}`;
            }
            return `${protocol}${url}`;
        }

        return url;
    }).filter(url => {
        try {
            new URL(url);
        } catch (e) {
            console.warn(`[Cloudflare Purge] Skipping invalid URL: ${url}`);
            return false;
        }

        const lastPurge = recentPurges.get(url);
        if (lastPurge && (now - lastPurge) < PURGE_DEDUPE_TTL) {
            return false;
        }
        return true;
    });

    if (urlsToPurge.length === 0) {
        return;
    }

    urlsToPurge.forEach(url => recentPurges.set(url, now));

    if (recentPurges.size > 1000) {
        for (const [url, time] of Array.from(recentPurges.entries())) {
            if (now - time > PURGE_DEDUPE_TTL * 2) {
                recentPurges.delete(url);
            }
        }
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    headers['Authorization'] = `Bearer ${apiToken}`;

    try {
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
            {
                method: 'POST',
                headers,
                body: JSON.stringify({ files: urlsToPurge }),
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            console.error('[Cloudflare Purge Error]', result.errors || result);
        }
        return result;
    } catch (error) {
        console.error('[Cloudflare Purge Exception]', error);
        return { success: false, errors: [error] };
    }
}
