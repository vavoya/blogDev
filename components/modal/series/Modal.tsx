import {useEffect, useState} from "react";

// interface
import {SeriesObject} from "@/types/series.interface";
import {Directories} from "@/types/directories.interface";
import {Slugs} from "@/components/sideBar/SideBar";

// components
import ModalLayout from "@/components/modal/common/ModalLayout";
import NavHeader from "@/components/modal/series/NavHeader";
import NavBody from "@/components/modal/series/NavBody";
import CardSection from "@/components/modal/series/CardSection";

// Modal 컴포넌트의 props 타입 정의
export interface ModalProps {
    isModalOpen: boolean
    onClose: () => void;
    userId: number
    slugs: Slugs
    initPageNum: number
    initSeriesId: number | null
    data: SeriesObject
    directories: Directories
}


export default function Modal({isModalOpen, onClose, userId, slugs, initPageNum, initSeriesId, data, directories}: ModalProps) {
    const [ stack, setStack ] = useState<number[]>(initSeriesId === null ? [] : [initSeriesId])

    useEffect(() => {
        // 모달이 열리고 닫히면 리렌더링 시키기 위해 상태 재설정
        setStack([...stack])
    }, [isModalOpen]);

    return (
        <ModalLayout
            isModalOpen={isModalOpen}
            onClose={onClose}
            NavHeader={<NavHeader />}
            NavBody={<NavBody stack={stack} setStack={setStack} data={data}/>}
            CardSection={
            <CardSection
                userId={userId}
                slugs={slugs}
                title={stack.map(v => data[v].name).join('/')}
                postCount={stack.length > 0 ? data[stack[stack.length - 1]].postCount : 0}
                directories={directories}
                stack={stack}
                initPageNum={initPageNum}/>}
        />
    )
}



