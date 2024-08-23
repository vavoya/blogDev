import { NextRequest, NextResponse } from 'next/server';
import {auth} from "@/auth";
import {State} from "@/app/register/page";
import {postByGoogleId} from "@/services/register/postByGoogleId";
import {revalidateTag} from "next/cache";

export async function POST(request: NextRequest) {
    const session = await auth()
    const res: State = await request.json()


    // 세션이 없거나 이미 등록된 상태라면 접근 거부
    if (!session || session.registrationState) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    // 필수 파라미터가 하나라도 없으면 400 오류 반환
    if (!res.blogName || !res.name || !res.blogSlug || !res.email || !res.introduce) {
        return NextResponse.json({ error: 'Invalid parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    try {
        let status = 0;

        if (session.provider === 'google') {
            status = await postByGoogleId({
                googleId: session.providerId as string,
                blogName: res.blogName,
                email: res.email,
                introduce: res.introduce,
                name: res.name,
                slug: res.blogSlug
            })
            revalidateTag('google' + '/' + session.providerId)
        } else {
            // 애플
            revalidateTag('apple' + '/' + session.providerId)
        }

        return NextResponse.json(
            { data: status  },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=60, s-maxage=120, stale-while-revalidate=30'
            }});
    } catch (error) {
        console.error('ErrorPage during registration:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}
