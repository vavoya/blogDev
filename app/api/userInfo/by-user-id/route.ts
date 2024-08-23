import { NextRequest, NextResponse } from 'next/server';
import {getByUserId} from "@/services/userInfo/getByUserId";
import {UserInfoDocument} from "@/types/userInfo.interface";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = Number(searchParams.get("data"));

    if (!userId) {
        return NextResponse.json({ error: 'Invalid blogName parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    }

    try {
        const userInfo: UserInfoDocument | null = await getByUserId({userId});

        return NextResponse.json(
            { data: userInfo },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=60, s-maxage=120, stale-while-revalidate=30'
            }});
    } catch (error) {
        console.error('ErrorPage fetching userInfo by user-id:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}
