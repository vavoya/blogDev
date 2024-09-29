import { NextRequest, NextResponse } from 'next/server';
import {auth} from "@/auth";

// 타입 런타임 무결성 검사할떄, 타입 참조가 어떤걸 기준으로 하는지 확인용으로 남겨놓기
import {AsyncTask} from "@/app/dashboard2/management/series/component/SeriesSection";
import {updateSeries} from "@/services/series/updateSeries";
import {revalidateTag} from "next/cache";

function isValidAsyncTask(task: any): boolean {
    // 기본 필드 검사
    if (typeof task.seriesId !== 'number') return false;
    if (typeof task.delete !== 'boolean') return false;
    if (isNaN(task.updatedAt.getTime())) return false;
    if (isNaN(task.newUpdatedAt.getTime())) return false;
    if (typeof task.name !== 'string') return false;
    if (typeof task.postCount !== 'number') return false;

    // posts 배열의 타입 검사
    if (!Array.isArray(task.posts)) return false;
    for (const post of task.posts) {
        if (typeof post.slug !== 'string') return false;
        if (typeof post.seriesId !== 'number') return false;
        if (typeof post.seriesOrder !== 'number') return false;
    }

    return true;
}


export async function PATCH(request: NextRequest) {
    const session = await auth()


    // 세션 검증
    if (typeof session?.userId !== 'number') {
        return NextResponse.json(
            { error: 'Invalid userId parameter. Expected a number.' },
            {
                status: 400,
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }
        );
    }

    const task = await request.json() //AsyncTask
    task.updatedAt = new Date(task.updatedAt)
    task.newUpdatedAt = new Date(task.newUpdatedAt)
    console.log(isValidAsyncTask(task), task, !isNaN(task.updatedAt.getTime()), session?.userId)

    // 데이터 타입 검증
    if (!isValidAsyncTask(task)) {
        return NextResponse.json(
            { error: 'Invalid task data. Please check the provided fields.' }, // 구체적인 에러 메시지
            {
                status: 400,
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }
        );
    }

    // 타입 단언 (이 시점에서는 task가 AsyncTask임을 보장)
    const validTask = task as AsyncTask;


    try {
        const status: number = await updateSeries({ userId: session.userId, validTask });
        revalidateTag(`${session.userId}/series`);
        return NextResponse.json(
            { data: status },
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
