import {auth} from "@/auth";
import {fetchDirectories} from "@/fetcher/server/GET/directoryFetcher";
import Folder from "@/app/dashboard/folder/Folder";
import {Directories} from "@/types/directories.interface";
import {FetchResult} from "@/fetcher/FetchResult";
import AccessDeniedPage from "@/app/_error/AccessDeniedPage";
import DefaultHeader from "@/components/header/DefaultHeader";
import DashboardSideBar from "@/components/sideBar/DashboardSideBar";
import React from "react";
import ServerErrorPage from "@/app/_error/ServerErrorPage";


export default async function Page() {
    /*
    const session = await auth()

    // 로그인 되어 있으면(인증 세션 유지 시) 루트 이동
    if (!session || !session.registrationState) {
        return <AccessDeniedPage />
    }


    const userId = session.userId as number
    
     */

    const data: FetchResult<Directories> = await fetchDirectories(0)


    console.log(data)

    if (data.status !== 200) {
        return <ServerErrorPage />
    } else if (data.data === null) {
        return <AccessDeniedPage />
    }

    return (
        <>
            <DefaultHeader slug1={"dashboard"} slug2={"folder"}/>
            <DashboardSideBar slug={"folder"}/>
            <Folder data={data.data}/>
        </>
    )
}