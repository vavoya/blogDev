

import styles from "@/app/dashboard2/management/series/component/SeriesDatails.module.css"
import {Directories} from "@/types/directories.interface";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {SeriesObject} from "@/types/series.interface";
import SeriesPosts from "@/app/dashboard2/management/series/component/SeriesPosts";
import {AsyncTask} from "@/app/dashboard2/management/series/component/SeriesSection";
import SvgAdd from "@/components/svg/Add";

interface SeriesDetailsProps {
    state: {
        directories: Directories,
        series: SeriesObject
        selectedSeriesId: number
    }
    setState: {
        series: Dispatch<SetStateAction<SeriesObject>>,
        selectedSeriesId: Dispatch<SetStateAction<number>>,
        addTask: ((task: AsyncTask) => void) | undefined;
    }
}

export default function SeriesDetails({state, setState}: SeriesDetailsProps) {
    const ref = useRef<HTMLInputElement>(null)
    const [translateX, setTranslateX] = useState(100);
    //const folderPath = getDirectoryTree({directories: state.directories, directoryId: parentId}).path

    useEffect(() => {
        //requestAnimationFrame(() => setTranslateX(0))
        setTranslateX(0)

    }, [])

    const deleteHandler = () => {
        if (setState.addTask === undefined) return

        const newSeries: SeriesObject = {...state.series}
        delete newSeries[state.selectedSeriesId]
        setState.series(newSeries)
        setState.selectedSeriesId(-1)

        const task: AsyncTask = {
            seriesId: state.selectedSeriesId,
            delete: true,
            updatedAt: new Date(),
            newUpdatedAt: new Date(),
            name: "",
            postCount: 0,
            posts: []
        }
        setState.addTask(task)
    }


    // 시리즈 이름 또는 시리즈 목록
    const saveHandler = () => {
        if (setState.addTask === undefined) return

        const newSeries: SeriesObject = {...state.series}
        newSeries[state.selectedSeriesId] = {
            ... newSeries[state.selectedSeriesId],
            name: "d"
        }
        setState.series(newSeries)
        setState.selectedSeriesId(-1)

        const task: AsyncTask = {
            seriesId: state.selectedSeriesId,
            delete: true,
            updatedAt: new Date(),
            newUpdatedAt: new Date(),
            name: "",
            postCount: 0,
            posts: []
        }
        setState.addTask(task)

    }

    return (
        <div className={styles.folderDetails} style={{transform: `translateX(${translateX}%)`}}>
            <span className={styles.folderDetailsTitle}>
                시리즈 명
            </span>
            <input key={state.selectedSeriesId} className={styles.folderDetailsInput} defaultValue={state.series[state.selectedSeriesId].name} />
            <span className={styles.folderDetailsTitle}>
                포스트 목록
            </span>
            <div className={styles.folderDetailsInput}>
                <SeriesPosts
                    state={{
                        selectedSeriesId: state.selectedSeriesId,
                        directories: state.directories
                    }}
                    setState={{

                    }} />
                <Add />
            </div>
            <div className={styles.actionButtons}>
                <button onClick={deleteHandler}>
                    삭제
                </button>
                <button onClick={saveHandler}>
                    저장
                </button>
            </div>
        </div>
    )
}


function Add() {

    return (
        <button className={styles.addButton}>
            <SvgAdd />
        </button>
    )
}