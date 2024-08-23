import { NextRequest, NextResponse } from 'next/server';
import { getByUserIdAndDirectoryIdsAndPageNum } from "@/services/paginatedPosts/getByUserIdAndDirectoryIdsAndPageNum";
import { PaginatedPostsWithCount } from "@/services/paginatedPosts/interface";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const userId = Number(searchParams.get("userId"));
    const pageNum = Number(searchParams.get("pageNum"));
    const isUserIdNumeric = !isNaN(userId);
    const isPageNumNumeric = !isNaN(pageNum);

    const directoryIdsParam = searchParams.get("directoryIds");
    let directoryIds: number[] | null = null;
    if (directoryIdsParam !== null) {
        directoryIds = directoryIdsParam.includes(',')
            ? directoryIdsParam.split(',').map(Number)
            : [Number(directoryIdsParam)];
    }

    let isDirectoryIdsNumeric =  directoryIds?.every(v => !isNaN(v)) ?? false;


    if (!isUserIdNumeric || !isDirectoryIdsNumeric || directoryIds === null || !isPageNumNumeric) {
        return NextResponse.json({ error: 'Invalid userId | directoryIds | pageNum parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }


    // db쿼리 시작
    try {
        const paginatedPosts: PaginatedPostsWithCount | null = await getByUserIdAndDirectoryIdsAndPageNum({ userId, directoryIds, pageNum });
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

