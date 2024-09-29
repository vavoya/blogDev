

import styles from "@/app/dashboard2/management/folder/page.module.css"
import {FetchResult} from "@/fetcher/FetchResult";
import SeriesSection from "@/app/dashboard2/management/series/component/SeriesSection";
import ServerErrorPage from "@/app/_error/ServerErrorPage";
import AccessDeniedPage from "@/app/_error/AccessDeniedPage";
import React from "react";
import {fetchSeries, SeriesWithUpdatedAt} from "@/fetcher/server/GET/seriesFetcher";
import {Directories} from "@/types/directories.interface";
import {fetchDirectories} from "@/fetcher/server/GET/directoryFetcher";


export default async function Page() {
    const series: FetchResult<SeriesWithUpdatedAt> = await fetchSeries(0)
    const directories: FetchResult<Directories> = await fetchDirectories(0)

    if (series.status !== 200 || directories.status !== 200) {
        return <ServerErrorPage />
    } else if (series.data === null || directories.data === null) {
        return <AccessDeniedPage />
    }


    return (
        <div className={styles.container}>
            <div className={styles.folderHeader}>
                <h1>
                    시리즈 편집
                </h1>
                <span>
                    시리즈의 이름 변경, 삭제, 추가, 시리즈의 포스트 수정
                </span>
            </div>
            <SeriesSection data={{series: series.data, directories: directories.data}}/>
        </div>
    )
}