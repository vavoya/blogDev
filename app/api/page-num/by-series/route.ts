import { NextRequest, NextResponse } from 'next/server';
import { getByUserIdAndSeriesIdAndSlug } from "@/services/postIndex/getByUserIdAndSeriesIdAndSlug";
import { PostIndex } from "@/services/postIndex/interface";
import {PageNum} from "@/app/api/page-num/interface";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const userId = Number(searchParams.get("userId"));
    const seriesId = Number(searchParams.get("seriesId"));
    const slug = searchParams.get("slug");
    const isUserIdNumeric = !isNaN(userId);
    const isSeriesIdNumeric = !isNaN(seriesId);

    if (!isUserIdNumeric || !isSeriesIdNumeric || !slug) {
        return NextResponse.json({ error: 'Invalid userId | seriesId | slug parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    // db쿼리 시작
    try {
        let data = null;
        const postIndex: PostIndex | null = await getByUserIdAndSeriesIdAndSlug({ userId, seriesId, slug });
        if (postIndex) {
            const pageNum: PageNum = {
                pageNum: Math.floor((postIndex.index - 1) / 12) + 1
            }
            data = pageNum;
        }

        return NextResponse.json(
            { data: data },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=86400, s-maxage=120, stale-while-revalidate=30'
                }});
    } catch (error) {
        console.error('ErrorPage fetching page-num by series:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}

