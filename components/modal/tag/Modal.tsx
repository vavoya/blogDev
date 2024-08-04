import {useState} from "react";

// interface
import {Tags} from "@/types/tags.interface";
import {Directories} from "@/types/directories.interface";
import {GetInitPageNum} from "@/services/getInitPageNum/interface";
import {Slugs} from "@/components/sideBar/SideBar";

// components
import ModalLayout from "@/components/modal/common/ModalLayout";
import NavHeader from "@/components/modal/tag/NavHeader";
import NavBody from "@/components/modal/tag/NavBody";
import CardSection from "@/components/modal/tag/CardSection";

// Modal 컴포넌트의 props 타입 정의
export interface ModalProps {
    isModalOpen: boolean
    onClose: () => void;
    userId: number
    slugs: Slugs
    initPageNum: GetInitPageNum
    data: Tags
    directories: Directories
}


export default function Modal({isModalOpen, onClose, userId, slugs, initPageNum, data, directories}: ModalProps) {
    const [ stack, setStack ] = useState<number[]>([])

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
                title={stack.map(v => data[v].name).join(', ')}
                directories={directories}
                stack={stack}
                isModalOpen={isModalOpen}/>}
        />
    )
}



