import { NextRequest, NextResponse } from 'next/server';
import { getInitPageNumByUserIdSlugSeriesId } from "@/services/getInitPageNum/byUserId_Slug_SeriesId";
import {GetInitPageNum} from "@/services/getInitPageNum/interface";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const userId = Number(searchParams.get("userId"));
    const slug = searchParams.get("slug");
    const isUserIdNumeric = !isNaN(userId);

    if (!isUserIdNumeric || !slug) {
        return NextResponse.json({ error: 'Invalid userId | slug parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    // db쿼리 시작
    try {
        const paginatedPosts: GetInitPageNum | null = await getInitPageNumByUserIdSlugSeriesId({ userId, slug });
        return NextResponse.json(
            { data: paginatedPosts },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=86400, s-maxage=120, stale-while-revalidate=30'
                }});
    } catch (error) {
        console.error('Error fetching directories:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}

