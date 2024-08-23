import { NextRequest, NextResponse } from 'next/server';
import {PostIndex} from "@/services/postIndex/interface";
import {getByUserIdAndDirectoryIdAndSlug} from "@/services/postIndex/getByUserIdAndDirectoryIdAndSlug";
import {PageNum} from "@/app/api/page-num/interface";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const userId = Number(searchParams.get("userId"));
    const directoryId = Number(searchParams.get("directoryId"));
    const slug = searchParams.get("slug");
    const isUserIdNumeric = !isNaN(userId);
    const isDirectoryIdNumeric = !isNaN(directoryId);

    if (!isUserIdNumeric || !isDirectoryIdNumeric || !slug) {
        return NextResponse.json({ error: 'Invalid userId | directoryId | slug parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    // db쿼리 시작
    try {
        let data = null;
        const postIndex: PostIndex | null = await getByUserIdAndDirectoryIdAndSlug({ userId, directoryId, slug });
        if (postIndex) {
            const pageNum: PageNum = {
                pageNum: Math.floor((postIndex.index - 1) / 12) + 1
            }
            data = pageNum
        }

        return NextResponse.json(
            { data: data },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=86400, s-maxage=120, stale-while-revalidate=30'
                }});
    } catch (error) {
        console.error('ErrorPage fetching page-num by directory:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}

