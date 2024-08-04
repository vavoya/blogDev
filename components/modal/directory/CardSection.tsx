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
    isModalOpen: boolean
}

export default function CardSection({onClose, userId, slugs, title, postCount, directories, stack, initPageNum, isModalOpen}: CardSectionProps) {
    const [pageNum, setPageNum] = useState(initPageNum);
    const [paginatedPosts, setPaginatedPosts] = useState<PaginatedPostDocument[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const maxPageNum = useMemo(() => Math.ceil(postCount / 12), [postCount])

    // 페이지네이션 요청 함수 directoryIds
    const getPaginatedPosts = useCallback(async (stack: number[], pageNum: number) => {
        // 현재 디렉토리에 포스트가 없으면
        if (directories[stack.at(-1) as number].postCount === 0)  {
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
            if (directories[t].children) {
                directoryIds.push(...directories[t].children);
            }
        }

        setIsLoading(true);
        const response = await fetch(`${uri}/api/paginated-posts?userId=${userId}&directoryIds=${directoryIds.join(',')}&pageNum=${pageNum}`);
        const result: ApiResponse = await response.json();
        if (response.status === 200) {
            const paginatedPostDocuments = result.data!.PaginatedPostDocuments
            setPaginatedPosts(paginatedPostDocuments)
            setIsLoading(false);
        }

    }, [directories, userId])


    // 디렉토리 경로 변경에 따라 페이지네이션 요청
    useEffect(() => {
        getPaginatedPosts(stack, pageNum)
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
                noPostsMessage={"해당 폴더에 포스트가 없어요"}
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