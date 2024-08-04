import {useCallback, useEffect, useMemo, useState} from "react";
import {PaginatedPostDocument} from "@/services/getPaginatedPosts/interface";
import ApiResponse from "@/app/api/paginated-posts/interface";
import styles from "@/components/modal/common/modal.module.css";
import Pagination from "@/components/modal/common/Pagination";
import PaginationSearch from "@/components/modal/common/PaginationSearch";
import {Directories} from "@/types/directories.interface";
import CardBody from "@/components/modal/common/CardBody";
import {Slugs} from "@/components/sideBar/SideBar";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;


interface CardSectionProps {
    onClose: () => void
    userId: number
    slugs: Slugs
    title: string
    directories: Directories
    stack: number[]
    isModalOpen: boolean
}

export default function CardSection({onClose, userId, slugs, title, directories, stack, isModalOpen}: CardSectionProps) {
    const [pageNum, setPageNum] = useState(1);
    const [paginatedPosts, setPaginatedPosts] = useState<PaginatedPostDocument[]>([])
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
        const response = await fetch(`${uri}/api/paginated-posts?userId=${userId}&tagIds=${stack.join(',')}&pageNum=${pageNum}`);
        const result: ApiResponse = await response.json();
        if (response.status === 200) {
            const paginatedPostDocuments = result.data!.PaginatedPostDocuments ?? []
            const postCount = result.data!.postCount

            setPaginatedPosts(paginatedPostDocuments)
            setPostCount(postCount)
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
                isModalOpen={isModalOpen}
                isLoading={isLoading}
                loadingMessage={"불러오는 중..."}
                noPostsMessage={"해당 태그에 포스트가 없어요"}
                postCount={postCount}
                slugs={slugs}
                directories={directories}
                paginatedPosts={paginatedPosts}
                onClose={onClose}/>
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