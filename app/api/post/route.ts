import { NextRequest, NextResponse } from 'next/server';
import {getByUserIdAndSlug} from "@/services/post/getByUserIdAndSlug";
import {PostDocument} from "@/types/posts.interface";

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
        const posts: PostDocument | null = await getByUserIdAndSlug({ userId, slug });
        return NextResponse.json(
            { data: posts },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=60, s-maxage=120, stale-while-revalidate=30'
                }});
    } catch (error) {
        console.error('ErrorPage fetching post:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}
