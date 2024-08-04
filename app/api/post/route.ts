import { NextRequest, NextResponse } from 'next/server';
import {getPostAndAdjacentPostsByUserId_Slug} from "@/services/getPostAndAdjacentPosts/byUserId_Slug";
import {PostAndAdjacentPostsDocument} from "@/services/getPostAndAdjacentPosts/interface";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = Number(searchParams.get("userId"))
    const slug = searchParams.get("slug");

    const isNumeric = !isNaN(userId);

    if (!isNumeric || !slug) {
        return NextResponse.json({ error: 'Invalid blogName | slug parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    // db쿼리 시작
    try {
        const posts: PostAndAdjacentPostsDocument | null = await getPostAndAdjacentPostsByUserId_Slug({ userId, slug });
        return NextResponse.json(
            { data: posts },
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
