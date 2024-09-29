import {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from "react";
import {PaginatedPost, PaginatedPostsWithCount} from "@/services/paginatedPosts/interface";
import styles from "@/components/modal/common/modal.module.css";
import {Directories} from "@/types/directories.interface";
import Pagination from "@/components/modal/common/Pagination";
import PaginationSearch from "@/components/modal/common/PaginationSearch";
import CardBody from "@/components/modal/dashboard/CardBody";
import {fetchPaginatedPostsByDirectoryIds} from "@/fetcher/client/GET/paginatedPostsFetcher";
import {SeriesPostsObject} from "@/app/dashboard2/management/series/component/SeriesPosts";

interface CardSectionProps {
    state: {
        userId: number
        slug: string
        title: string
        postCount: number
        directories: Directories
        stack: number[]
        initPageNum: number
        seriesOrder: number
        seriesPosts: SeriesPostsObject
    }
    setState: {
        seriesPosts: Dispatch<SetStateAction<SeriesPostsObject>>
        onClose: () => void
    }
}

export default function CardSection({state, setState}: CardSectionProps) {
    const [pageNum, setPageNum] = useState(state.initPageNum);
    const [paginatedPosts, setPaginatedPosts] = useState<PaginatedPost[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const maxPageNum = useMemo(() => Math.ceil(state.postCount / 12), [state.postCount])

    // 페이지네이션 요청 함수 directoryIds
    const getPaginatedPosts = useCallback(async (stack: number[], pageNum: number) => {
        // 현재 디렉토리에 포스트가 없으면
        if (state.directories[stack.at(-1) as number].postCount === 0)  {
            setPaginatedPosts([])
            setIsLoading(false);
            return
        }

        const lastStack = stack.at(-1)

        // 현재 디렉터리 포함 모든 하위 디렉토리 id를 수집
        const directoryIds = [lastStack ? lastStack : 0]
        let bfsStackNum = 0
        while (directoryIds[bfsStackNum] !== undefined) {
            const t = directoryIds[bfsStackNum++] as number
            if (state.directories[t].children) {
                directoryIds.push(...state.directories[t].children);
            }
        }

        setIsLoading(true);

        const paginatedPostsWithCount: PaginatedPostsWithCount | null = await fetchPaginatedPostsByDirectoryIds(0, directoryIds, pageNum)
        if (paginatedPostsWithCount !== null) {
            setPaginatedPosts(paginatedPostsWithCount.paginatedPosts)
            setIsLoading(false);
        }

    }, [state.directories, state.userId])


    // 디렉토리 경로 변경에 따라 페이지네이션 요청
    useEffect(() => {
        getPaginatedPosts(state.stack, pageNum)
    }, [getPaginatedPosts, state.stack])



    return (
        <div className={styles.modalCardSection}>
            <div className={styles.modalCardHeader}>
                <span>
                    {state.title}
                </span>
                <span>
                    {state.postCount} 개의 글 | {maxPageNum} 페이지
                </span>
            </div>
            <CardBody
                state={{
                    isLoading,
                    loadingMessage: "불러오는 중...",
                    noPostsMessage: "해당 폴더에 포스트가 없어요",
                    postCount: state.postCount,
                    slug: state.slug,
                    directories: state.directories,
                    paginatedPosts,
                    seriesOrder: state.seriesOrder,
                    seriesPosts: state.seriesPosts
                }}
                setState={{
                    seriesPosts: setState.seriesPosts,
                    onClose: setState.onClose
                }}/>
            <div className={styles.modalCardFooter}>
                <Pagination
                    getPaginatedPosts={(pageNum) => getPaginatedPosts(state.stack, pageNum)}
                    pageNum={pageNum}
                    maxPageNum={maxPageNum}/>
                <PaginationSearch
                    getPaginatedPosts={(pageNum) => getPaginatedPosts(state.stack, pageNum)}
                    maxPageNum={maxPageNum}/>
            </div>
        </div>
    )
}