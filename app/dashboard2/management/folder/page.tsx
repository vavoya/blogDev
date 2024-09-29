

import styles from "@/app/dashboard2/management/folder/page.module.css"
import {FetchResult} from "@/fetcher/FetchResult";
import {Directories} from "@/types/directories.interface";
import {fetchDirectories} from "@/fetcher/server/GET/directoryFetcher";
import FolderSection from "@/app/dashboard2/management/folder/component/FolderSection";
import ServerErrorPage from "@/app/_error/ServerErrorPage";
import AccessDeniedPage from "@/app/_error/AccessDeniedPage";
import React from "react";
import Alert from "@/app/dashboard2/management/common/Alert";


export default async function Page() {
    const data: FetchResult<Directories> = await fetchDirectories(0)

    if (data.status !== 200) {
        return <ServerErrorPage />
    } else if (data.data === null) {
        return <AccessDeniedPage />
    }

    return (
        <div className={styles.container}>
            <div className={styles.folderHeader}>
                <h1>
                    폴더 편집
                </h1>
                <span>
                    폴더의 이름 변경, 위치 이동, 삭제, 추가
                </span>
            </div>
            <FolderSection data={data.data}/>
        </div>
    )
}