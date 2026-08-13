import { useState, useCallback } from 'react';
import { ICountry } from '@/types/interface-lib';

export const useLocationData = (initialCountries: ICountry[] = []) => {
    const [countries, setCountries] = useState<ICountry[]>(initialCountries);
    const [allCountries] = useState<ICountry[]>(initialCountries);
    const [loadingCountries, setLoadingCountries] = useState(false);

    const fetchCountries = async (search: string = '') => {
        try {
            const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
            const res = await fetch(`/api/location?type=countries${searchParam}`);
            if (res.ok) {
                const data = await res.json();
                return Array.isArray(data) ? data : (data.data || []);
            }
            return [];
        } catch (error) {
            console.error('Failed to fetch countries', error);
            return [];
        }
    };

    const searchCountries = useCallback(async (query: string) => {
        if (!query && allCountries.length > 0) {
            setCountries(allCountries);
            return;
        }
        setLoadingCountries(true);
        const results = await fetchCountries(query);
        setCountries(results);
        setLoadingCountries(false);
    }, [allCountries]);

    return {
        countries,
        loadingCountries,
        searchCountries
    };
};
