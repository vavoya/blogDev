import {fetchTag} from "@/fetcher/server/GET/tagFetcher";
import {auth} from "@/auth";
import {Session} from "next-auth";
import Tag from "@/app/dashboard/tag/Tag";
import {FetchResult} from "@/fetcher/FetchResult";
import {Tags} from "@/types/tags.interface";
import ServerErrorPage from "@/app/_error/ServerErrorPage";
import AccessDeniedPage from "@/app/_error/AccessDeniedPage";
import React from "react";
import Header from "@/components/header/Header";
import DashboardSideBar from "@/components/sideBar/DashboardSideBar";
import Series from "@/app/dashboard/series/Series";


export default async function Page() {
    const session = await auth()

    // 로그인 되어 있으면(인증 세션 유지 시) 루트 이동
    if (!session || !session.registrationState) {
        return <AccessDeniedPage />
    }


    const userId = session.userId as number

    const data: FetchResult<Tags> = await fetchTag(0)

    console.log(data)

    if (data.status !== 200) {
        return <ServerErrorPage />
    } else if (data.data === null) {
        return <AccessDeniedPage />
    }

    return (
        <>
            <Header slug1={"dashboard"} slug2={"tag"}/>
            <DashboardSideBar slug={"tag"}/>
            <Tag data={data.data}/>
        </>
    )
}