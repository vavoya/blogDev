import {useCallback, useState} from "react";

// interface
import {Directories} from "@/types/directories.interface";
import {GetInitPageNum} from "@/services/getInitPageNum/interface";
import {Slugs} from "@/components/sideBar/SideBar";

// components
import ModalLayout from "@/components/modal/common/ModalLayout";
import NavHeader from "@/components/modal/directory/NavHeader";
import NavBody from "@/components/modal/directory/NavBody";
import CardSection from "@/components/modal/directory/CardSection";

// utils
import getDirectoryTree from "@/utils/directoryTree";

// Modal 컴포넌트의 props 타입 정의
export interface ModalProps {
    isModalOpen: boolean
    onClose: () => void;
    userId: number
    slugs: Slugs
    initPageNum: GetInitPageNum
    data: Directories
    directories: Directories
}


export default function Modal({isModalOpen, onClose, userId, slugs, initPageNum, data, directories}: ModalProps) {
    const initStackProcess = useCallback(() => {
        const directoryId = initPageNum.directoryId
        return getDirectoryTree({directories, directoryId}).tree
    }, [directories, initPageNum.directoryId])

    const [ stack, setStack ] = useState<number[]>(initStackProcess())

    return (
        <ModalLayout
            isModalOpen={isModalOpen}
            onClose={onClose}
            NavHeader={<NavHeader stack={stack} setStack={setStack} />}
            NavBody={<NavBody stack={stack} setStack={setStack} directories={directories} isModalOpen={isModalOpen} />}
            CardSection={
            <CardSection
                onClose={onClose}
                userId={userId}
                slugs={slugs}
                title={stack.map(v => data[v].name).join('/')}
                postCount={data[stack[stack.length - 1]].postCount}
                directories={directories}
                stack={stack}
                initPageNum={initPageNum.pageNum} isModalOpen={isModalOpen}/>}
        />
    )
}



