import { NextRequest, NextResponse } from 'next/server';
import {getBySlug} from "@/services/userInfo/getBySlug";
import {UserInfoDocument} from "@/types/userInfo.interface";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("data");

    if (!slug) {
        return NextResponse.json({ error: 'Invalid blogName parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    }

    try {
        const userInfo: UserInfoDocument | null = await getBySlug({slug});

        return NextResponse.json(
            { data: userInfo },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=60, s-maxage=120, stale-while-revalidate=30'
            }});
    } catch (error) {
        console.error('ErrorPage fetching userInfo by slug:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}
