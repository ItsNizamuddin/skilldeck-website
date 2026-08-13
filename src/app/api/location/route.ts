import { fetchCountries, fetchStates, fetchCities } from '@/lib/location';
import { NextRequest, NextResponse } from 'next/server';
import { getIpLocation, getCountryCurrency } from '@/lib/ipLocation';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const search = searchParams.get('search') || undefined;
    const country_id = searchParams.get('country_id');
    const state_id = searchParams.get('state_id');

    // If 'type' is provided, handle country/state/city logic
    if (type) {
        try {
            let data = [];

            switch (type) {
                case 'countries':
                    data = await fetchCountries(search);
                    break;
                case 'states':
                    if (!country_id) {
                        return NextResponse.json({ message: 'Country ID is required' }, { status: 400 });
                    }
                    data = await fetchStates(country_id, search);
                    break;
                case 'cities':
                    if (!state_id) {
                        return NextResponse.json({ message: 'State ID is required' }, { status: 400 });
                    }
                    data = await fetchCities(state_id, search);
                    break;
                default:
                    return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
            }

            return NextResponse.json(data);
        } catch (error) {
            console.error('API Error:', error);
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }

    // IP Location Logic (Default if no 'type' provided)
    try {
        // 1. Check Cloudflare / Vercel edge country headers first (Rate-limit free)
        const cfCountry = request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country');
        if (cfCountry && cfCountry !== 'XX') {
            const currency = getCountryCurrency(cfCountry);
            return NextResponse.json({
                status: 'success',
                country: cfCountry,
                countryCode: cfCountry.toUpperCase(),
                currency: currency,
                timezone: request.headers.get('x-vercel-ip-timezone') || 'Asia/Kolkata',
                query: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1'
            });
        }

        let ip = searchParams.get('ip');

        if (!ip) {
            const cfConnectingIp = request.headers.get('cf-connecting-ip');
            const forwardedFor = request.headers.get('x-forwarded-for');
            ip = cfConnectingIp || '';
            
            if (!ip && forwardedFor) {
                ip = forwardedFor.split(',')[0].trim();
            }
        }

        if (!ip) {
            return NextResponse.json(
                { error: 'IP address is required and could not be detected' },
                { status: 400 }
            );
        }

        const data = await getIpLocation(ip);
        if (!data) {
            return NextResponse.json(
                { error: 'Failed to fetch location data' },
                { status: 500 }
            );
        }

        if (!data.currency && data.countryCode) {
            data.currency = getCountryCurrency(data.countryCode);
        }

        return NextResponse.json(data);

    } catch (error: any) {
        console.error('API Proxy Error (IP Location):', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
