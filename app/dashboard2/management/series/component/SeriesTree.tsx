import {Dispatch, JSX, MutableRefObject, SetStateAction} from "react";
import SeriesItem from "@/app/dashboard2/management/series/component/SeriesItem";
import styles from "@/app/dashboard2/management/folder/component/FolderTree.module.css";
import {SeriesObject} from "@/types/series.interface";
import {AsyncTask} from "@/app/dashboard2/management/series/component/SeriesSection";
import {AsyncTaskManager} from "@/app/dashboard2/management/common/AsyncTaskManager";


interface SeriesTreeProps {
    state: {
        series: SeriesObject
        selectedSeriesId: number
        seriesMaxId: MutableRefObject<number>
    }
    setState: {
        series: Dispatch<SetStateAction<SeriesObject>>
        selectedSeriesId: Dispatch<SetStateAction<number>>
        addTask: ((task: AsyncTask) => void) | undefined;
    }
}

export default function SeriesTree({state, setState}: SeriesTreeProps) {

    const addHandler = () => {
        if (setState.addTask === undefined) return

        const newSeries: SeriesObject = {...state.series}

        // 새 시리즈 숫자 계산
        // "새 시리즈" 가 없으면 -1, 있으면 0~
        const maxNum = Object.keys(newSeries).reduce((max, id) => {
            const name = newSeries[id].name;
            if (name.startsWith("새 시리즈")) {
                const num = Number(name.slice(6));
                const validNum = Number.isNaN(num) ? 0 : num;
                return Math.max(max, validNum)
            }
            return max
        }, -1)


        // 새 시리즈 설정
        const newName = maxNum === -1 ? "새 시리즈" : "새 시리즈 " + (maxNum + 1)
        const newId = ++state.seriesMaxId.current


        newSeries[newId] = {
            name: newName,
            postCount: 0,
        }

        setState.series(newSeries)
        setState.selectedSeriesId(newId)


        // 서버 작업 추가
        const task: AsyncTask = {
            seriesId: newId,
            delete: false,
            updatedAt: new Date(),
            newUpdatedAt: new Date(),
            name: newName,
            postCount: 0,
            posts: []

        }
        setState.addTask(task)
    }

    const renderContent = () => {
        const components: JSX.Element[] = []
        const seriesKeys = Object.keys(state.series).sort((a,b) => state.series[a].name.localeCompare(state.series[b].name, undefined, { numeric: true }))

        seriesKeys.map(v => {
            const seriesId = +v
            components.push(
                <SeriesItem
                    key={seriesId}
                    state={{
                        series: state.series[seriesId],
                        seriesId: seriesId,
                        level: 0,
                        isSelected: seriesId === state.selectedSeriesId
                    }}
                    setState={{
                        selectedSeriesId: setState.selectedSeriesId
                    }} />)
        })

        return components
    }

    return (
        <div className={styles.folderTree}>
            <button className={styles.addNewFolder} onClick={addHandler}>
                시리즈 추가
            </button>
            {renderContent()}
        </div>
    )
}