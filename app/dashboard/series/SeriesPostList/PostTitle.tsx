import styles from "@/app/dashboard/series/SeriesPostList/SeriesPostList.module.css";
import DropBox from "@/app/dashboard/common/DropBox";
import {SeriesPost} from "@/services/seriesPosts/interface";
import {useCallback, useEffect, useRef, useState} from "react";
import {fetchPaginatedPostsForSeries} from "@/fetcher/client/GET/paginatedPostsFetcher";
import {PaginatedPost} from "@/services/paginatedPosts/forSeries/interface";
import {Directories} from "@/types/directories.interface";

interface PostTitleProps {
    state: {
        directories: Directories
        isTitleDropBoxVisible: boolean
        seriesPosts: SeriesPost[]
        seriesOrder: number
        index: number
        userId: number
    },
    setState: {
        isTitleDropBoxVisible: (isDropBoxVisible: boolean) => void
        index: (index: number) => void
        seriesPosts: (seriesPosts: SeriesPost[]) => void
    }
}

export default function PostTitle({state, setState}: PostTitleProps) {
    // 0: 불러오기 끝, 1: 불러오기 가능, 2: 불러오는 중, 3: 에러
    const [loadingState, setLoadingState] = useState<number>(2)
    // 불러온 데이터 넣기
    const [titleDropBoxItemDatas, setTitleDropBoxItemDatas] = useState<PaginatedPost[]>([])
    const [pageNum, setPageNum] = useState(1)

    const getPaginatedPostsForSeries = async () => {
        setLoadingState(2)

        const directoryId = state.seriesPosts[state.seriesOrder].directoryId
        const data = await fetchPaginatedPostsForSeries(state.userId, directoryId, pageNum)
        console.log(data)

        if (data === undefined) {
            setLoadingState(3)
        } else if (data === null) {
            setLoadingState(0)
        } else {
            const newTitleDropBoxItemDatas = [...titleDropBoxItemDatas]
            newTitleDropBoxItemDatas.concat(data.paginatedPosts)
            setTitleDropBoxItemDatas(newTitleDropBoxItemDatas)
            setPageNum(pageNum + 1)
            setLoadingState(1)
        }
    }

    const arrowUpHandler = useCallback(() => {
        // 이게 감소
        if (0 < state.index) {
            setState.index(state.index - 1)
        }
    }, [setState, state.index])

    const arrowDownHandler = useCallback(() => {
        // 이게 증가
        if (state.index < titleDropBoxItemDatas.length) {
            setState.index(state.index + 1)
        }
    }, [setState, state.index])



    const renderContent = () => {
        if (!state.isTitleDropBoxVisible) {
            return null
        }

        let text = ""
        if (loadingState === 0) {
            text = "마지막 포스트"
        } else if (loadingState === 1) {
            text = "더 보기"
        } else if (loadingState === 2) {
            text = "불러오는 중..."
        } else {
            text = "서버 에러!"
        }



        return (
            <DropBox setDropBox={setState.isTitleDropBoxVisible}
                     enterHandler={() => null}
                     arrowUpHandler={arrowUpHandler}
                     arrowDownHandler={arrowDownHandler}
                     title={<span className={styles.postTitle}>{state.seriesPosts[state.seriesOrder].title}</span>}>
                {titleDropBoxItemDatas.map((v,i) => <TitleDropBoxItem key={v.slug} text={v.title} isFocused={i === state.index}/>)}
                <TitleDropBoxItem text={text} isFocused={titleDropBoxItemDatas.length === state.index}/>
            </DropBox>
        )
    }

    return (
        <div className={styles.postTitleBox}
             style={{zIndex: state.isTitleDropBoxVisible ? "1" : "0"}}>
            <input
                className={styles.postTitle}
                placeholder={"포스트 탐색하기"}
                value={state.seriesPosts[state.seriesOrder].title}
                onClick={e => {
                    setState.isTitleDropBoxVisible(true)
                    setState.index(0)
                    getPaginatedPostsForSeries()
                }}/>
            {renderContent()}
        </div>
    )
}


function TitleDropBoxItem({text, isFocused}: {text: string, isFocused: boolean}) {
    return (
        <button className={`${styles.dropBoxButton}${isFocused ? " " + styles.dropBoxButtonFocus : ""}`}>
            <span className={styles.postTitle}>
                {text}
            </span>
        </button>
    )
}