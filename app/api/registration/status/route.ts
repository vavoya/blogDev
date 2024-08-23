import { NextRequest, NextResponse } from 'next/server';
import {UserInfoDocument} from "@/types/userInfo.interface";
import {getByGoogleId} from "@/services/userInfo/getByGoogleId";
import {getByAppleId} from "@/services/userInfo/getByAppleId";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const providerId = searchParams.get("providerId");
    const provider = searchParams.get("provider");

    if (!providerId || !(provider === 'google' || provider === 'apple')) {
        return NextResponse.json({ error: 'Invalid parameter' }, { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' }});
    }

    try {
        let userInfo: UserInfoDocument | null
        if (provider === 'google') {
            userInfo = await getByGoogleId({googleId: providerId});
        } else {
            userInfo = await getByAppleId({appleId: providerId});
        }

        return NextResponse.json(
            { data: userInfo?.userId ?? null  },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'max-age=60, s-maxage=120, stale-while-revalidate=30'
            }});
    } catch (error) {
        console.error('ErrorPage fetching registration status:', error);
        return NextResponse.json({ error: 'Internal Server ErrorPage' }, { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
}
