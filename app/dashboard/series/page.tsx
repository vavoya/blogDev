import {auth} from "@/auth";
import Series from "@/app/dashboard/series/Series";
import {fetchSeries} from "@/fetcher/server/GET/seriesFetcher";
import {FetchResult} from "@/fetcher/FetchResult";
import {SeriesObject} from "@/types/series.interface";
import AccessDeniedPage from "@/app/_error/AccessDeniedPage";
import React from "react";
import ServerErrorPage from "@/app/_error/ServerErrorPage";
import DefaultHeader from "@/components/header/DefaultHeader";
import DashboardSideBar from "@/components/sideBar/DashboardSideBar";
import {Directories} from "@/types/directories.interface";
import {fetchDirectories} from "@/fetcher/server/GET/directoryFetcher";


export default async function Page() {
    const session = await auth()

    // 로그인 되어 있으면(인증 세션 유지 시) 루트 이동
    if (!session || !session.registrationState) {
        return <AccessDeniedPage />
    }


    const userId = session.userId as number

    const data: FetchResult<SeriesObject> = await fetchSeries(0)
    const directories: FetchResult<Directories> = await fetchDirectories(0)

    if (data.status !== 200 || directories.status !== 200) {
        return <ServerErrorPage />
    } else if (data.data === null || directories.data === null) {
        return <AccessDeniedPage />
    }


    return (
        <>
            <DefaultHeader slug1={"dashboard"} slug2={"series"}/>
            <DashboardSideBar slug={"series"}/>
            <Series data={data.data} directories={directories.data} userId={0}/>
        </>
    )
}