import { fetchBlogs, fetchCategories } from '@/lib/blogs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    const headers = {
        'Cache-Control': 'public, s-maxage=60, max-age=60, stale-while-revalidate=300',
    };

    if (type === 'categories') {
        const categories = await fetchCategories();
        return NextResponse.json(categories, { headers });
    }

    const category = searchParams.get('category') || 'All';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    let order = searchParams.get('order') || 'desc';

    if (order !== 'asc' && order !== 'desc') {
        order = 'desc';
    }

    const result = await fetchBlogs(category, { page, limit, sortBy, order });

    return NextResponse.json(result, { headers });
}
