import {useCallback, useEffect, useMemo, useState} from "react";
import {PaginatedPostDocument} from "@/services/getPaginatedPosts/interface";
import ApiResponse from "@/app/api/paginated-posts/interface";
import styles from "@/components/modal/common/modal.module.css";
import {Directories} from "@/types/directories.interface";
import Pagination from "@/components/modal/common/Pagination";
import PaginationSearch from "@/components/modal/common/PaginationSearch";
import CardBody from "@/components/modal/common/CardBody";
import {Slugs} from "@/components/sideBar/SideBar";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;

interface CardSectionProps {
    onClose: () => void
    userId: number
    slugs: Slugs
    title: string
    postCount: number
    directories: Directories
    stack: number[]
    initPageNum: number
}

export default function CardSection({onClose, userId, slugs, title, postCount, directories, stack, initPageNum}: CardSectionProps) {
    const [pageNum, setPageNum] = useState(initPageNum);
    const [paginatedPosts, setPaginatedPosts] = useState<PaginatedPostDocument[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const maxPageNum = useMemo(() => Math.ceil(postCount / 12), [postCount])

    // 페이지네이션 요청 함수 directoryIds
    const getPaginatedPosts = useCallback(async (stack: number[], pageNum: number) => {

        // 선택된 시리즈가 없으면
        if (!(stack.length > 0)) {
            setPaginatedPosts([])
            setIsLoading(false);
            return
        }

        // 현재 시리즈 포스트가 없으면
        if (directories[stack.at(-1) as number].postCount === 0)  {
            setPaginatedPosts([])
            setIsLoading(false);
            return
        }

        setIsLoading(true)
        const response = await fetch(`${uri}/api/paginated-posts?userId=${userId}&seriesId=${stack[0]}&pageNum=${pageNum}`);
        const result: ApiResponse = await response.json();
        if (response.status === 200) {
            const paginatedPostDocuments = result.data!.PaginatedPostDocuments
            setPaginatedPosts(paginatedPostDocuments)
            setIsLoading(false);
        }
    }, [directories, userId])


    // 디렉토리 경로 변경에 따라 페이지네이션 요청
    useEffect(() => {
        getPaginatedPosts(stack,  pageNum)
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
                noPostsMessage={"해당 시리즈에 포스트가 없어요"}
                postCount={postCount}
                slugs={slugs}
                directories={directories}
                paginatedPosts={paginatedPosts}
                onClose={onClose}/>
            <div className={styles.modalCardFooter}>
                <Pagination
                    getPaginatedPosts={(pageNum) => getPaginatedPosts(stack, pageNum)}
                    pageNum={pageNum}
                    maxPageNum={maxPageNum}/>
                <PaginationSearch
                    getPaginatedPosts={(pageNum) => getPaginatedPosts(stack, pageNum)}
                    maxPageNum={maxPageNum}/>
            </div>
        </div>
    )
}