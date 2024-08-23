import { NextRequest, NextResponse } from 'next/server';
import {getByUserIdAndSeriesId} from "@/services/seriesPosts/getByUserIdAndSeriesId";
import {SeriesPost} from "@/services/seriesPosts/interface";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = Number(searchParams.get("userId"))
    const seriesId = Number(searchParams.get("seriesId"))

    // userId가 숫자로만 이루어져 있는지 확인
    const isNumericUserId = !isNaN(userId);

    const isNumericSeriesId = !isNaN(seriesId);

    if (!isNumericSeriesId || !isNumericUserId) {
        return NextResponse.json({ error: 'Invalid userId | seriesId parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    }
    try {
        const seriesPosts: SeriesPost[] | null = await getByUserIdAndSeriesId({ userId, seriesId });

        return NextResponse.json(
            { data: seriesPosts },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=60, s-maxage=120, stale-while-revalidate=30'
            }});
    } catch (error) {
        console.error('ErrorPage fetching series:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}
