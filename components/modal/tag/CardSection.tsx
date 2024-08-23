import {useCallback, useEffect, useMemo, useState} from "react";
import {PaginatedPost, PaginatedPostsWithCount} from "@/services/paginatedPosts/interface";
import styles from "@/components/modal/common/modal.module.css";
import Pagination from "@/components/modal/common/Pagination";
import PaginationSearch from "@/components/modal/common/PaginationSearch";
import {Directories} from "@/types/directories.interface";
import CardBody from "@/components/modal/common/CardBody";
import {Slugs} from "@/components/sideBar/SideBar";
import {fetchPaginatedPostsByTagIds} from "@/fetcher/client/GET/paginatedPostsFetcher";


interface CardSectionProps {
    userId: number
    slugs: Slugs
    title: string
    directories: Directories
    stack: number[]
}

export default function CardSection({userId, slugs, title, directories, stack}: CardSectionProps) {
    const [pageNum, setPageNum] = useState(1);
    const [paginatedPosts, setPaginatedPosts] = useState<PaginatedPost[]>([])
    const [postCount, setPostCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const maxPageNum = useMemo(() => Math.ceil(postCount / 12), [postCount])

    // 페이지네이션 요청 함수
    const getPaginatedPosts = useCallback(async (userId: number, stack: number[], pageNum: number) => {
        // 선택된 태그가 없으면
        if (!(stack.length > 0)) {
            setPaginatedPosts([])
            setPostCount(0)
            setIsLoading(false);
            return
        }

        setIsLoading(true);

        const paginatedPostsWithCount: PaginatedPostsWithCount | null = await fetchPaginatedPostsByTagIds(userId, stack, pageNum)
        if (paginatedPostsWithCount !== null) {
            setPaginatedPosts(paginatedPostsWithCount.paginatedPosts)
            setPostCount(paginatedPostsWithCount.postCount)
            setIsLoading(false);
        }
    }, [])


    // 디렉토리 경로 변경에 따라 페이지네이션 요청
    useEffect(() => {
        getPaginatedPosts(userId, stack, pageNum)
    }, [stack])



    return (
        <div className={styles.modalCardSection}>
            <div className={styles.modalCardHeader}>
                <span>
                    {title}
                </span>
                <span>
                    {postCount} 개의 글 | {maxPageNum} 페이지
                </span>
            </div>
            <CardBody
                isLoading={isLoading}
                loadingMessage={"불러오는 중..."}
                noPostsMessage={"해당 태그에 포스트가 없어요"}
                postCount={postCount}
                slugs={slugs}
                directories={directories}
                paginatedPosts={paginatedPosts}/>
            <div className={styles.modalCardFooter}>
                <Pagination
                    getPaginatedPosts={(pageNum) => getPaginatedPosts(userId, stack, pageNum)}
                    pageNum={pageNum}
                    maxPageNum={maxPageNum}/>
                <PaginationSearch
                    getPaginatedPosts={(pageNum) => getPaginatedPosts(userId, stack, pageNum)}
                    maxPageNum={maxPageNum}/>
            </div>
        </div>
    )
}