import styles from "@/app/dashboard2/management/series/component/SeriesPosts.module.css"
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {fetchSeriesPosts} from "@/fetcher/client/GET/seriesPostsFetcher";
import {useSession} from "next-auth/react";
import {SeriesPost} from "@/services/seriesPosts/interface";
import {Directories} from "@/types/directories.interface";
import getDirectoryTree from "@/utils/directoryTree";
import Modal from "@/components/modal/dashboard/DynamicModal";
import {createPortal} from "react-dom";


interface SeriesPostsProps {
    state: {
        selectedSeriesId: number,
        directories: Directories
    }
    setState: {

    }
}

interface ModalState {
    slug: string
    seriesOrder: number,
}

export interface SeriesPostsObject {
    [key: string]: SeriesPost
}

export default function SeriesPosts({state, setState}: SeriesPostsProps) {
    // 포스트 목록 로딩 여부
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [seriesPosts, setSeriesPosts] = useState<SeriesPostsObject>({})
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalState, setModalState] = useState<ModalState>({
        slug: "",
        seriesOrder: 0
    })
    const session = useSession()

    useEffect(() => {
        const userId = session.data?.userId
        if (Number.isInteger(userId)) {
            fetchSeriesPosts(0 as number, state.selectedSeriesId).then(data => {
                setIsLoading(false)
                setIsError(false)
                if (data !== null) {
                    const newSeriesPosts:SeriesPostsObject = {}
                    data.forEach(v => {
                        newSeriesPosts[v.seriesOrder] = v
                    })
                    setSeriesPosts(newSeriesPosts)
                }
            }).catch(() => {
                setIsLoading(false)
                setIsError(true)
                setSeriesPosts({})
            })
        }
    }, [session.data?.userId, state.selectedSeriesId])

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const renderContent = () => {

        // 불러오는 중
        if (isLoading) {

            return "불러오는 중..."
        }

        // 에러 발생
        if (isError) {
            return "에러 발생"
        }

        // 불러왔고, 에러 없음
        return (
            Object.values(seriesPosts).map(seriesPost => {
                return (
                    <SeriesPost
                        key={seriesPost.slug}
                        state={{
                            title: seriesPost.title,
                            directoryId: seriesPost.directoryId,
                            seriesOrder: seriesPost.seriesOrder + 1, // 0부터 시작해서, 1로 변경
                            slug: seriesPost.slug,
                            directories: state.directories
                        }}
                        setState={{
                            isModalOpen: setIsModalOpen
                        }}/>
                )
            })
        )
    }

    return (
        <>
            {renderContent()}

            {isModalOpen && createPortal(
                <div style={{
                    position: "absolute",
                    display: isModalOpen ? "block" : "none",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}>
                    <Modal
                        state={{
                            isModalOpen,
                            slug: modalState.slug,
                            userId: session.data!.userId!, // 없으면 어차피 리다이렉트됨. 아마도? 하...
                            initPageNum: 1,
                            initDirectoryId: seriesPosts[modalState.seriesOrder].directoryId,
                            data: state.directories,
                            directories: state.directories,
                            seriesOrder: modalState.seriesOrder,
                            seriesPosts: seriesPosts
                        }}
                        setState={{
                            seriesPosts: setSeriesPosts,
                            onClose: () => setIsModalOpen(false)
                        }}/>
                </div>,
                document.body
            )}
        </>
    )
}


interface SeriesPostProps {
    state: {
        title: string
        directoryId: number,
        seriesOrder: number,
        slug: string
        directories: Directories
    }
    setState: {
        isModalOpen: Dispatch<SetStateAction<boolean>>
    }
}

function SeriesPost({state, setState}: SeriesPostProps) {
    const onClick = () => setState.isModalOpen(true)

    return (
        <div className={styles.seriesPost}>
            <input value={state.seriesOrder} />
            <button onClick={onClick}>
                <span className={styles.seriesPostPath}>
                    {getDirectoryTree({directories: state.directories, directoryId: state.directoryId}).path + '/'}
                </span>
                <span className={styles.seriesPostTitle}>
                    {state.title}
                </span>
            </button>
        </div>
    )
}