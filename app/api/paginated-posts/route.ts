import { NextRequest, NextResponse } from 'next/server';
import { getPaginatedPostsByUserIdDirectorysIdPageNum } from "@/services/getPaginatedPosts/byUserId_DirectoryIds_PageNum";
import { getPaginatedPostsByUserIdTagIdsPageNum } from "@/services/getPaginatedPosts/byUserId_TagIds_PageNum";
import { GetPaginatedPostDocument } from "@/services/getPaginatedPosts/interface";
import {getPaginatedPostsByUserIdSeriesIdPageNum} from "@/services/getPaginatedPosts/byUserId_SeriesIds_PageNum";

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

    const tagIdsParam = searchParams.get("tagIds");
    let tagIds: number[] | null = null;
    if (tagIdsParam !== null) {
        tagIds = tagIdsParam.includes(',')
            ? tagIdsParam.split(',').map(Number)
            : [Number(tagIdsParam)];
    }

    const seriesIdParam = searchParams.get("seriesId");
    const seriesId = Number(seriesIdParam);
    const isSeriesIdNumeric = !isNaN(seriesId);


    if (directoryIds) {
        let isDirectoryIdsNumeric = true;
        directoryIds.forEach((v: any) => {
            isDirectoryIdsNumeric = !isNaN(v);
        })

        if (!isUserIdNumeric || !isDirectoryIdsNumeric || !isPageNumNumeric) {
            return NextResponse.json({ error: 'Invalid userId | directoryIds | pageNum parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
        }


        // db쿼리 시작
        try {
            const paginatedPosts: GetPaginatedPostDocument | null = await getPaginatedPostsByUserIdDirectorysIdPageNum({ userId, directoryIds, pageNum });
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


    } else if (tagIds) {
        let isTagIdsNumeric = true;
        tagIds.forEach((v: any) => {
            isTagIdsNumeric = !isNaN(v);
        })

        if (!isUserIdNumeric || !isTagIdsNumeric || !isPageNumNumeric) {
            return NextResponse.json({ error: 'Invalid userId | tagIds | pageNum parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
        }

        // db쿼리 시작
        try {
            const paginatedPosts: GetPaginatedPostDocument | null = await getPaginatedPostsByUserIdTagIdsPageNum({ userId, tagIds, pageNum });
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
    } else if (isSeriesIdNumeric) {
        const isSeriesIdsNumeric = !isNaN(seriesId)

        if (!isUserIdNumeric || !isSeriesIdsNumeric || !isPageNumNumeric) {
            return NextResponse.json({ error: 'Invalid userId | seriesId | pageNum parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
        }

        // db쿼리 시작
        try {
            const paginatedPosts: GetPaginatedPostDocument | null = await getPaginatedPostsByUserIdSeriesIdPageNum({ userId, seriesId, pageNum });
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
    } else {
        return NextResponse.json({ error: 'Invalid directoryIds | tagIds | seriesId parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

}

