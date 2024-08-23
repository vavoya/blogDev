import { NextRequest, NextResponse } from 'next/server';
import {SeriesWithoutId, getByUserId} from "@/services/series/getByUserId";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = Number(searchParams.get("userId"))

    // userId가 숫자로만 이루어져 있는지 확인
    const isNumeric = !isNaN(userId);

    if (!isNumeric) {
        return NextResponse.json({ error: 'Invalid userId parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    }
    try {
        const tags: SeriesWithoutId | null = await getByUserId({ userId });

        return NextResponse.json(
            { data: tags },
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
