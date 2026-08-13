import { env } from './env';

export interface ICDNProvider {
    name: string;
    purge(urls: string[]): Promise<void>;
}

/**
 * Default provider (Next.js)
 * Acts purely on the Next.js internal Cache (ISR/On-demand revalidation)
 */
class NextJsProvider implements ICDNProvider {
    name = 'Next.js';

    async purge(urls: string[]): Promise<void> {
        let revalidatePath;
        try {
            // Dynamically import to avoid "Server Component only" error in client bundles
            const cacheModule = await import('next/cache');
            revalidatePath = cacheModule.revalidatePath;
        } catch {
            console.warn('[NextJsProvider] skipping purge, next/cache not available');
            return;
        }

        for (const url of urls) {
            try {
                let path = url;
                if (url.startsWith('http')) {
                    path = new URL(url).pathname;
                }
                if (path !== '/' && path.endsWith('/')) {
                    path = path.slice(0, -1);
                }
                revalidatePath(path);
            } catch (error) {
                console.error(`[Next.js] Failed to revalidate path: ${url}`, error);
            }
        }
    }
}

/**
 * Cloudflare Provider
 */
class CloudflareProvider implements ICDNProvider {
    name = 'Cloudflare';
    private recentPurges = new Map<string, number>();
    private PURGE_DEDUPE_TTL = 5000; // 5 seconds

    async purge(urls: string[]): Promise<void> {
        const apiToken = env.CLOUDFLARE_API_TOKEN;
        const zoneId = env.CLOUDFLARE_ZONE_ID;
        if (!apiToken || !zoneId) return;

        const now = Date.now();
        const urlsToPurge = urls.filter(url => {
            const lastPurge = this.recentPurges.get(url);
            return !(lastPurge && (now - lastPurge) < this.PURGE_DEDUPE_TTL);
        });
        if (urlsToPurge.length === 0) return;

        urlsToPurge.forEach(url => this.recentPurges.set(url, now));
        if (this.recentPurges.size > 1000) {
            for (const [url, time] of Array.from(this.recentPurges.entries())) {
                if (now - time > this.PURGE_DEDUPE_TTL * 2) this.recentPurges.delete(url);
            }
        }

        try {
            await fetch(
                `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiToken}` },
                    body: JSON.stringify({ files: urlsToPurge }),
                }
            );
        } catch (error) {
            console.error('[Cloudflare Purge] Error purging Cloudflare cache:', error);
        }
    }
}

export class CDNFactory {
    static getProvider(): ICDNProvider {
        if (env.CLOUDFLARE_API_TOKEN && env.CLOUDFLARE_ZONE_ID) {
            return new CloudflareProvider();
        }
        return new NextJsProvider();
    }
}
