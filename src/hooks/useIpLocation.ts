import { COUNTRY_CURRENCY_MAP } from '@/lib/locationConstants';
import { useEffect, useState } from 'react';

export interface IpLocationData {
    status: string;
    country: string;
    currency: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
    query: string;
}

const CACHE_KEY = 'geoLocation';

let globalLocationPromise: Promise<IpLocationData | null> | null = null;

export const useIpLocation = (ip?: string | null) => {
    const [data, setData] = useState<IpLocationData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const sessionCurrency = sessionStorage.getItem("currency");
            const sessionTimezone = sessionStorage.getItem("timezone");
            if (sessionCurrency) {
                document.cookie = `geo_currency=${sessionCurrency}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
            }
            if (sessionTimezone) {
                document.cookie = `geo_timezone=${sessionTimezone}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
            }
        }
    }, []);

    useEffect(() => {
        const fetchFreshLocation = async (): Promise<IpLocationData | null> => {
            if (globalLocationPromise) {
                return globalLocationPromise;
            }

            globalLocationPromise = (async () => {
                try {
                    let internalParams = '';

                    if (ip) {
                        internalParams = `?ip=${ip}`;
                    } else {
                        // Try to fetch public IP first if not provided
                        try {
                            const ipRes = await fetch('https://api64.ipify.org?format=json');
                            if (ipRes.ok) {
                                const ipData = await ipRes.json();
                                if (ipData.ip) {
                                    internalParams = `?ip=${ipData.ip}`;
                                }
                            }
                        } catch (e) {
                            console.warn("Failed to fetch public IP from external service", e);
                        }
                    }

                    const url = `/api/location${internalParams}`;
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`Failed to fetch location data: ${response.statusText}`);
                    }
                    const result = await response.json();

                    if (result.status === 'success') {
                        // Inject currency based on countryCode
                        if (!result.currency && result.countryCode) {
                            result.currency = COUNTRY_CURRENCY_MAP[result.countryCode] || 'USD';
                        }
                        return result;
                    }
                    return null;
                } catch (err) {
                    globalLocationPromise = null; // Clear on error so we can retry on next mount
                    throw err;
                }
            })();

            return globalLocationPromise;
        };

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Remove duplicate keys if any
                if (typeof window !== 'undefined' && window.sessionStorage) {
                    // Check and remove duplicate lowercase keys
                    sessionStorage.removeItem('geolocation');
                }

                // 1. Serve cached data from localStorage/sessionStorage immediately for fast render
                let cachedData: string | null = null;
                if (typeof window !== 'undefined') {
                    cachedData = 
                        sessionStorage.getItem('geolocation') ||
                        sessionStorage.getItem(CACHE_KEY) ||
                        localStorage.getItem('geolocation') ||
                        localStorage.getItem(CACHE_KEY);
                }

                if (cachedData) {
                    try {
                        const parsed = JSON.parse(cachedData) as IpLocationData;
                        // Inject currency if missing in cache
                        if (!parsed.currency && parsed.countryCode) {
                            parsed.currency = COUNTRY_CURRENCY_MAP[parsed.countryCode] || 'USD';
                        }
                        setData(parsed);
                        setLoading(false);

                        // Ensure cookies are set even when serving from cache
                        if (typeof document !== 'undefined') {
                            document.cookie = `geo_currency=${parsed.currency || ''}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                            document.cookie = `geo_country=${parsed.countryCode || ''}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                            document.cookie = `geo_timezone=${parsed.timezone || ''}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                        }
                        return;
                    } catch (e) {
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem('geolocation');
                            localStorage.removeItem(CACHE_KEY);
                            sessionStorage.removeItem(CACHE_KEY);
                        }
                    }
                }

                // 2. Fetch fresh data if no cache exists
                const freshData = await fetchFreshLocation();

                if (freshData) {
                    const cachedStr = cachedData || '';
                    const freshStr = JSON.stringify(freshData);
                    if (freshStr !== cachedStr) {
                        setData(freshData);
                        if (typeof window !== 'undefined') {
                            sessionStorage.setItem(CACHE_KEY, freshStr);
                            localStorage.setItem(CACHE_KEY, freshStr);
                        }

                        // Set cookies so SSR can use them on subsequent requests
                        if (typeof document !== 'undefined') {
                            document.cookie = `geo_currency=${freshData.currency || ''}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                            document.cookie = `geo_country=${freshData.countryCode || ''}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                            document.cookie = `geo_timezone=${freshData.timezone || ''}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                        }
                    }
                }
            } catch (err: any) {
                setError(err.message || "An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ip]);

    return { data, loading, error };
};
