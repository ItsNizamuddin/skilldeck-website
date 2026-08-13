import { NextResponse } from 'next/server';
import { fetchPlans } from '@/lib/plans';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const currency = searchParams.get('currency') || undefined;
    
    const plans = await fetchPlans(currency);
    return NextResponse.json(plans);
}
