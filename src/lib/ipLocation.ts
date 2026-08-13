export interface IpLocationData {
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    currency?: string;
    isp: string;
    org: string;
    as: string;
    query: string;
}

export async function getIpLocation(ip: string): Promise<IpLocationData | null> {
    if (!ip) return null;

    try {
        let queryIp = ip;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

        if (!queryIp || queryIp === "127.0.0.1" || queryIp === "::1" || queryIp === "::ffff:127.0.0.1") {
            try {
                const ipRes = await fetch("https://api64.ipify.org?format=json", { 
                   signal: controller.signal
                });
                if (ipRes.ok) {
                    const ipData = await ipRes.json();
                    queryIp = ipData.ip;
                }
            } catch (e) {
                console.warn("Failed to fetch public IP from external service in lib/ipLocation");
                if (!queryIp) return null;
            }
        }

        const endpoint = `http://ip-api.com/json/${queryIp}?fields=status,country,countryCode,region,regionName,city,timezone,currency,query`;
        const response = await fetch(endpoint, {
            next: { revalidate: 60 },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.warn(`IP location fetch failed: ${response.status}`);
            return null;
        }

        const data = await response.json();
        if (data.status !== "success") {
            return null;
        }

        return data as IpLocationData;
    } catch (error) {
        console.error("Error fetching IP location, returning null to prevent blocking:", error);
        return null;
    }
}

export function getCountryCurrency(countryCode: string | null): string {
    if (!countryCode) return "USD";

    const mapping: Record<string, string> = {
        "IN": "INR",
        "US": "USD",
        "GB": "GBP",
        "EU": "EUR",
        "AE": "AED",
        "SG": "SGD",
        "AU": "AUD",
        "CA": "CAD",
        "DE": "EUR",
        "FR": "EUR",
        "IT": "EUR",
        "ES": "EUR",
        "NL": "EUR",
        "IE": "EUR",
        "SA": "SAR",
        "QA": "QAR",
        "KW": "KWD",
        "BH": "BHD",
        "OM": "OMR",
        "MY": "MYR",
        "ID": "IDR",
        "PH": "PHP",
        "TH": "THB",
        "VN": "VND"
    };

    return mapping[countryCode.toUpperCase()] || "USD";
}
