'use client'

import styles from "@/app/dashboard2/management/folder/component/FolderSection.module.css";
import FolderTree from "@/app/dashboard2/management/folder/component/FolderTree";
import FolderDetails from "@/app/dashboard2/management/folder/component/FolderDetails";
import {Directories} from "@/types/directories.interface";
import React, {useRef, useState} from "react";
import Alert from "@/app/dashboard2/management/common/Alert";
import LoadingSpinner from "@/app/dashboard2/management/common/LoadingSpinner";

interface asyncTask {

}

export default function FolderSection({data}: {data: Directories}) {
    const [directories, setDirectories] = useState<Directories>(JSON.parse(JSON.stringify(data)))
    const [selectedFolderId, setSelectedFolderId] = useState<number>(-1)

    const folderMaxId = useRef(Math.max(...Object.keys(data).map(Number)))

    const [asyncTasks, setAsyncTasks] = useState([])


//<Alert text={"ddd"} title={"dasd"} LButton={{text: "ddd", onClick: () => null}} RButton={{text: "ddd", onClick: () => null}}/>

    return (
        <div className={styles.section}>
            {
                asyncTasks.length > 0 && <LoadingSpinner />
            }
            <FolderTree
                state={{
                    directories,
                    selectedFolderId,
                    folderMaxId
                }}
                setState={{
                    directories: setDirectories,
                    selectedFolderId: setSelectedFolderId
                }}/>
            {
                selectedFolderId >= 1 ?
                    <FolderDetails
                        state={{
                            directories,
                            selectedFolderId
                        }}
                        setState={{
                            directories: setDirectories,
                            selectedFolderId: setSelectedFolderId
                        }}/> : null
            }
        </div>
    )
}