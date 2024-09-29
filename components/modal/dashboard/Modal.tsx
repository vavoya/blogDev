import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from "react";

// interface
import {Directories} from "@/types/directories.interface";

// components
import ModalLayout from "@/components/modal/common/ModalLayout";
import NavHeader from "@/components/modal/dashboard/NavHeader";
import NavBody from "@/components/modal/dashboard/NavBody";
import CardSection from "@/components/modal/dashboard/CardSection";

// utils
import getDirectoryTree from "@/utils/directoryTree";
import {SeriesPostsObject} from "@/app/dashboard2/management/series/component/SeriesPosts";

// Modal 컴포넌트의 props 타입 정의
export interface ModalProps {
    state: {
        isModalOpen: boolean
        slug: string
        userId: number
        initPageNum: number
        initDirectoryId: number
        data: Directories
        directories: Directories
        seriesOrder: number
        seriesPosts: SeriesPostsObject
    }
    setState: {
        seriesPosts: Dispatch<SetStateAction<SeriesPostsObject>>
        onClose: () => void,
    }
}


export default function Modal({state, setState}: ModalProps) {
    const initStackProcess = useCallback(() => {
        return getDirectoryTree({directories: state.directories, directoryId: state.initDirectoryId}).tree
    }, [state.directories, state.initDirectoryId])

    const [ stack, setStack ] = useState<number[]>(initStackProcess())

    useEffect(() => {
        // 모달이 열리고 닫히면 리렌더링 시키기 위해 상태 재설정
        setStack([...stack])
    }, [state.isModalOpen]);

    return (
        <ModalLayout
            isModalOpen={state.isModalOpen}
            onClose={setState.onClose}
            NavHeader={<NavHeader stack={stack} setStack={setStack} />}
            NavBody={<NavBody stack={stack} setStack={setStack} directories={state.directories}/>}
            CardSection={<CardSection
                state={{
                    userId: state.userId,
                    slug: state.slug,
                    title: stack.map(v => state.data[v].name).join('/'),
                    postCount: state.data[stack[stack.length - 1]].postCount,
                    directories: state.directories,
                    stack,
                    initPageNum: state.initPageNum,
                    seriesOrder: state.seriesOrder,
                    seriesPosts: state.seriesPosts
                }}
                setState={{
                    seriesPosts: setState.seriesPosts,
                    onClose: setState.onClose
                }}/>}
        />
    )
}



