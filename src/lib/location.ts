import { env } from "./env";

const SERVER_URL = env.SERVER_URL || 'http://localhost:4000';

// API endpoints don't seem to require auth based on original file analysis
// But good practice to use helper if needed.

export const fetchCountries = async (search?: string) => {
    try {
        const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
        const endpoint = `${SERVER_URL}/api/v1/admin/locations/countries?field=name,iso2,id,timezones${searchParam}`;

        const response = await fetch(endpoint, {
            next: { revalidate: 60 } // Cache for 1 hour
        });

        if (!response.ok) {
            console.error(`Failed to fetch countries: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return Array.isArray(data) ? data : (data.data || []);
    } catch (error: any) {
        if (error?.cause?.code === 'ECONNREFUSED') {
            console.warn('Warning: specific message related to data fetching from a source - countries'); // Suppressed for build
        } else {
            console.error('Error fetching countries:', error);
        }
        return [];
    }
};

export const fetchStates = async (countryId: string, search?: string) => {
    try {
        const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
        const endpoint = `${SERVER_URL}/api/v1/admin/locations/states?field=name,id,iso2&country_id=${countryId}${searchParam}`;

        const response = await fetch(endpoint, {
            next: { revalidate: 60 }
        });

        if (!response.ok) return [];

        const data = await response.json();
        return Array.isArray(data) ? data : (data.data || []);
    } catch (error: any) {
        if (error?.cause?.code === 'ECONNREFUSED') {
            console.warn('Warning: specific message related to data fetching from a source - states');
        } else {
            console.error('Error fetching states:', error);
        }
        return [];
    }
};

export const fetchCities = async (stateId: string, search?: string) => {
    try {
        const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
        const endpoint = `${SERVER_URL}/api/v1/admin/locations/cities?field=name,id&state_id=${stateId}${searchParam}`;

        const response = await fetch(endpoint, {
            next: { revalidate: 60 }
        });

        if (!response.ok) return [];

        const data = await response.json();
        return Array.isArray(data) ? data : (data.data || []);
    } catch (error: any) {
        if (error?.cause?.code === 'ECONNREFUSED') {
            console.warn('Warning: specific message related to data fetching from a source - cities');
        } else {
            console.error('Error fetching cities:', error);
        }
        return [];
    }
};
