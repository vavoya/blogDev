import {useState} from "react";

// interface
import {SeriesObject} from "@/types/series.interface";
import {Directories} from "@/types/directories.interface";
import {GetInitPageNum} from "@/services/getInitPageNum/interface";
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
    initPageNum: GetInitPageNum
    data: SeriesObject
    directories: Directories
}


export default function Modal({isModalOpen, onClose, userId, slugs, initPageNum, data, directories}: ModalProps) {
    const [ stack, setStack ] = useState<number[]>([initPageNum.seriesId ?? 0])

    return (
        <ModalLayout
            isModalOpen={isModalOpen}
            onClose={onClose}
            NavHeader={<NavHeader />}
            NavBody={<NavBody stack={stack} setStack={setStack} data={data} isModalOpen={isModalOpen}/>}
            CardSection={
            <CardSection
                onClose={onClose}
                userId={userId}
                slugs={slugs}
                title={stack.map(v => data[v].name).join('/')}
                postCount={stack.length > 0 ? data[stack[stack.length - 1]].postCount : 0}
                directories={directories}
                stack={stack}
                initPageNum={initPageNum.pageNum}
                isModalOpen={isModalOpen}/>}
        />
    )
}



