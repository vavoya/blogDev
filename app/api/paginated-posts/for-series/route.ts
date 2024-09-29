import { NextRequest, NextResponse } from 'next/server';
import {PaginatedPosts} from "@/services/paginatedPosts/forSeries/interface";
import {getByUserIdAndDirectoryIdAndPageNum} from "@/services/paginatedPosts/forSeries/getByUserIdAndDirectoryIdsAndPageNum";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const userId = Number(searchParams.get("userId"));
    const pageNum = Number(searchParams.get("pageNum"));
    const directoryId = Number(searchParams.get("directoryId"));
    const isUserIdNumeric = !isNaN(userId);
    const isPageNumNumeric = !isNaN(pageNum);
    const isDirectoryIdNumeric =  !isNaN(directoryId)


    if (!isUserIdNumeric || !isDirectoryIdNumeric || !isPageNumNumeric) {
        return NextResponse.json({ error: 'Invalid userId | directoryIds | pageNum parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }


    // db쿼리 시작
    try {
        const paginatedPosts: PaginatedPosts | null = await getByUserIdAndDirectoryIdAndPageNum({ userId, directoryId, pageNum });
        return NextResponse.json(
            { data: paginatedPosts },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=86400, s-maxage=120, stale-while-revalidate=30'
                }});
    } catch (error) {
        console.error('ErrorPage fetching paginated-posts by directory:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

}

