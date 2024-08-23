import { NextRequest, NextResponse } from 'next/server';
import {getByUserId} from "@/services/featuredPost/getByUserId";
import {FeaturedPostDocument} from "@/types/featuredPosts.interface";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = Number(searchParams.get("userId"));
    const isUserIdNumeric = !isNaN(userId);


    if (!isUserIdNumeric) {
        return NextResponse.json({ error: 'Invalid userId parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    }

    try {
        const featuredPost: FeaturedPostDocument | null = await getByUserId({ userId });

        return NextResponse.json(
            { data: featuredPost },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=60, s-maxage=120, stale-while-revalidate=30'
            }});
    } catch (error) {
        console.error('ErrorPage fetching featured-post:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}
