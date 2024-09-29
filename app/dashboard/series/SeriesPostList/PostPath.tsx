import {Directories} from "@/types/directories.interface";
import {useCallback, useEffect, useRef} from "react";
import DropBox from "@/app/dashboard/common/DropBox";
import styles from "@/app/dashboard/series/SeriesPostList/SeriesPostList.module.css";
import getDirectoryTree from "@/utils/directoryTree";
import {SeriesPostWithKey} from "@/app/dashboard/series/Series";

interface PostPathProps {
    state: {
        directories: Directories,
        seriesPosts: SeriesPostWithKey[],
        isPathDropBoxVisible: boolean,
        seriesOrder: number
        index: number
    }
    setState: {
        isPathDropBoxVisible: (isDropBoxVisible: boolean) => void
        index: (index: number) => void
        seriesPosts: (seriesPosts: SeriesPostWithKey[]) => void
    }
}

export default function PostPath({state, setState}: PostPathProps) {
    // 드롭박스 아이템 정보 배열
    interface PathDropBoxItemData {
        directoryId: number
        text: string
    }
    const pathDropBoxItemData = useRef<PathDropBoxItemData[]>([])


    const enterHandler = useCallback((index?: number) => {
        const newSeriesPost: SeriesPostWithKey = {
            directoryId: pathDropBoxItemData.current[index ?? state.index].directoryId,
            title: "",
            slug: "",
            seriesOrder: state.seriesPosts[state.seriesOrder].seriesOrder,
            key: state.seriesPosts[state.seriesOrder].key
        }
        const newSeriesPosts = [...state.seriesPosts]
        newSeriesPosts.splice(state.seriesOrder, 1, newSeriesPost)
        setState.seriesPosts(newSeriesPosts)
        setState.index(0)
    }, [setState, state.index, state.seriesOrder, state.seriesPosts])

    const arrowUpHandler = useCallback(() => {
        // 이게 감소
        if (0 < state.index) {
            setState.index(state.index - 1)
        }
    }, [setState, state.index])

    const arrowDownHandler = useCallback(() => {
        // 이게 증가
        if (state.index < pathDropBoxItemData.current.length - 1) {
            setState.index(state.index + 1)
        }
    }, [setState, state.index])

    const renderContent = () => {
        console.log(state)
        if (!state.isPathDropBoxVisible) {
            return null
        }

        // 초기화
        pathDropBoxItemData.current = [];
        const directoryId = state.seriesPosts[state.seriesOrder].directoryId
        if (state.seriesPosts[state.seriesOrder].directoryId !== 0) {
            const parentDirectoryId = state.directories[directoryId].parentId
            pathDropBoxItemData.current.push({
                directoryId: parentDirectoryId,
                text: "../"
            })
        }
        state.directories[directoryId].children.map(v => {
            pathDropBoxItemData.current.push({
                directoryId: v,
                text: state.directories[v].name
            })
        })

        return (
            <DropBox
                setDropBox={setState.isPathDropBoxVisible}
                enterHandler={enterHandler}
                arrowUpHandler={arrowUpHandler}
                arrowDownHandler={arrowDownHandler}
                title={
                <input
                    className={styles.postPath}
                    placeholder={"폴더 탐색하기"}
                    value={getDirectoryTree({directories: state.directories, directoryId: state.seriesPosts[state.seriesOrder].directoryId}).path}
                    readOnly={true}/>}>
                {pathDropBoxItemData.current.map((v, i) =>
                    <PathDropBoxItem key={v.directoryId} text={v.text} isFocused={i === state.index}
                                     onClick={() => {
                                         enterHandler(i)
                                     }}/>
                )}
            </DropBox>
        )
    }


    return (
        <div className={styles.postPathBox}
             style={{zIndex: state.isPathDropBoxVisible ? "1" : "0"}}>
            <input className={styles.postPath}
                   readOnly={true}
                   placeholder={"폴더 탐색하기"}
                   value={getDirectoryTree({directories: state.directories, directoryId: state.seriesPosts[state.seriesOrder].directoryId}).path}
                   onClick={e => {
                       setState.isPathDropBoxVisible(true);
                       setState.index(0);
                   }}/>
            {renderContent()}
        </div>
    )
}


function PathDropBoxItem({text, isFocused, onClick}: { text: string, isFocused?: boolean, onClick: () => void}) {

    return (
        <button className={`${styles.dropBoxButton}${isFocused ? " " + styles.dropBoxButtonFocus : ""}`}
                onClick={onClick}>
                <span className={styles.postPath}>
                    {text}
                </span>
        </button>
    )
}