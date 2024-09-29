'use client'

import styles from "@/app/dashboard2/management/series/component/SeriesSection.module.css";
import SeriesTree from "@/app/dashboard2/management/series/component/SeriesTree";
import SeriesDetails from "@/app/dashboard2/management/series/component/SeriesDetails";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {SeriesObject} from "@/types/series.interface";
import {Directories} from "@/types/directories.interface";
import LoadingSpinner from "@/app/dashboard2/management/common/LoadingSpinner";
import {SeriesWithUpdatedAt} from "@/fetcher/server/GET/seriesFetcher";
import seriesFetcher from "@/fetcher/client/PATCH/seriesFetcher";
import {AsyncTaskManager} from "@/app/dashboard2/management/common/AsyncTaskManager";

interface SeriesSectionProps {
    data: {
        series: SeriesWithUpdatedAt,
        directories: Directories
    }
}

export interface AsyncTask {
    seriesId: number
    delete: boolean
    updatedAt: Date
    newUpdatedAt: Date
    name: string
    postCount: number
    posts: {
        slug: string
        seriesId: number
        seriesOrder: number
    }[]
}


export default function SeriesSection({data}: SeriesSectionProps) {
    const [series, setSeries] = useState<SeriesObject>(data.series.series)
    const [directories, setDirectories] = useState<Directories>(data.directories)
    const [selectedSeriesId, setSelectedSeriesId] = useState<number>(-1)

    const seriesMaxId = useRef(Math.max(...Object.keys(series).map(Number)));

    const updatedAt = useRef<Date>(data.series.updatedAt)

    const [updatedState, setUpdatedState] = useState<number>(0)
    const [asyncTaskManager, setAsyncTaskManager] = useState<AsyncTaskManager<AsyncTask>>()



    useEffect(() => {
        const newAsyncTaskManager = new AsyncTaskManager<AsyncTask>(data.series.updatedAt, seriesFetcher, setUpdatedState);
        setAsyncTaskManager(newAsyncTaskManager)

        return () => {
            newAsyncTaskManager.stop();
        };
    }, [])


    return (
        <div className={styles.section}>
            {
                // 0아 아니면 전부 작업 중. 에러 또한, 그것은 사용자 응답을 기다리기에
                updatedState !== 0 && <LoadingSpinner />
            }
            ㅁ
            {
                selectedSeriesId >= 0 ?
                    <SeriesDetails
                        state={{
                            directories,
                            series,
                            selectedSeriesId
                        }}
                        setState={{
                            series: setSeries,
                            selectedSeriesId: setSelectedSeriesId,
                            addTask: asyncTaskManager?.add.bind(asyncTaskManager)
                        }}/> : null
            }
        </div>
    )
}

