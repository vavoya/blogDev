import { NextRequest, NextResponse } from 'next/server';
import {GetUserIdDocument, getUserIdByBlogName} from "@/services/getUserId/blogName";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const blogName = searchParams.get("blogName");

    if (!blogName) {
        return NextResponse.json({ error: 'Invalid blogName parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    }

    try {
        const tags: GetUserIdDocument | null = await getUserIdByBlogName({ blogName: blogName });

        return NextResponse.json(
            { data: tags },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=60, s-maxage=120, stale-while-revalidate=30'
            }});
    } catch (error) {
        console.error('Error fetching userId:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}
