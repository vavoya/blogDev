import { NextRequest, NextResponse } from 'next/server';
import { getByUserIdAndSeriesIdAndPageNum } from "@/services/paginatedPosts/getByUserIdAndSeriesIdAndPageNum";
import { PaginatedPostsWithCount } from "@/services/paginatedPosts/interface";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const userId = Number(searchParams.get("userId"));
    const pageNum = Number(searchParams.get("pageNum"));
    const seriesId = Number(searchParams.get("seriesId"));
    const isUserIdNumeric = !isNaN(userId);
    const isPageNumNumeric = !isNaN(pageNum);
    const isSeriesIdNumeric = !isNaN(seriesId);



    if (!isUserIdNumeric || !isSeriesIdNumeric || !isPageNumNumeric) {
        return NextResponse.json({ error: 'Invalid userId | seriesId | pageNum parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }


    // db쿼리 시작
    try {
        const paginatedPosts: PaginatedPostsWithCount | null = await getByUserIdAndSeriesIdAndPageNum({ userId, seriesId, pageNum });
        return NextResponse.json(
            { data: paginatedPosts },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=86400, s-maxage=120, stale-while-revalidate=30'
                }});
    } catch (error) {
        console.error('ErrorPage fetching paginated-posts by series:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

}

