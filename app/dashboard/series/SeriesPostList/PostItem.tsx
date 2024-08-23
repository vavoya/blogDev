import {Directories} from "@/types/directories.interface";
import {SeriesPost} from "@/services/seriesPosts/interface";
import {useEffect, useState} from "react";
import styles from "@/app/dashboard/series/SeriesPostList/SeriesPostList.module.css";
import PostPath from "@/app/dashboard/series/SeriesPostList/PostPath";
import PostTitle from "@/app/dashboard/series/SeriesPostList/PostTitle";
import {set} from "mobx";

interface PostItemProps {
    state: {
        directories: Directories,
        seriesPosts: SeriesPost[],
        seriesOrder: number
        userId: number
    },
    setState: {
        seriesPosts: (seriesPosts: SeriesPost[]) => void
    }
}

export default function PostItem({state, setState}: PostItemProps) {
    const [isPathDropBoxVisible, setIsPathDropBoxVisible] = useState<boolean>(false)
    const [isTitleDropBoxVisible, setIsTitleDropBoxVisible] = useState<boolean>(false)
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        console.log("마운트")
    },[])

    return (
        <div
            className={styles.postItem}
            style={{
                zIndex: isPathDropBoxVisible || isTitleDropBoxVisible ? "1" : "0"
            }}>
            <input
                type="text"
                title="정수만 입력 가능합니다."
                value={state.seriesOrder + 1}
                className={styles.postNumberInput}
            />
            <div className={styles.postDetails}>
                <PostPath
                    state={{
                        directories: state.directories,
                        seriesPosts: state.seriesPosts,
                        index,
                        isPathDropBoxVisible,
                        seriesOrder: state.seriesOrder
                }}
                    setState={{
                        index: setIndex,
                        seriesPosts: setState.seriesPosts,
                        isPathDropBoxVisible: setIsPathDropBoxVisible
                }}/>
                <PostTitle
                    state={{
                        directories: state.directories,
                        isTitleDropBoxVisible,
                        seriesPosts: state.seriesPosts,
                        seriesOrder: state.seriesOrder,
                        index,
                        userId: state.userId
                    }}
                    setState={{
                        isTitleDropBoxVisible: setIsTitleDropBoxVisible,
                        index: setIndex,
                        seriesPosts: setState.seriesPosts
                    }}/>
            </div>
        </div>
    )
}