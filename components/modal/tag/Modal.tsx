import {useEffect, useState} from "react";

// interface
import {Tags} from "@/types/tags.interface";
import {Directories} from "@/types/directories.interface";
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
    data: Tags
    directories: Directories
}


export default function Modal({isModalOpen, onClose, userId, slugs, data, directories}: ModalProps) {
    const [ stack, setStack ] = useState<number[]>([])

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
                title={stack.map(v => data[v].name).join(', ')}
                directories={directories}
                stack={stack}/>}
        />
    )
}



