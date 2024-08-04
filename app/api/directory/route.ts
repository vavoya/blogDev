import { NextRequest, NextResponse } from 'next/server';
import {GetDirectoriesDocument, getDirectoriesByUserId} from "@/services/getDirectories/byUserId";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = Number(searchParams.get("userId"))

    // userId가 숫자로만 이루어져 있는지 확인
    const isNumeric = !isNaN(userId);

    // 정상적인 userId가 아니면
    if (!isNumeric) {
        return NextResponse.json({ error: 'Invalid userId parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    // db쿼리 시작
    try {
        const directories: GetDirectoriesDocument | null = await getDirectoriesByUserId({ userId });
        return NextResponse.json(
            { data: directories },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=60, s-maxage=120, stale-while-revalidate=30'
                }});
    } catch (error) {
        console.error('Error fetching directories:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}
