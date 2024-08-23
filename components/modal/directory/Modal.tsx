import React, {MutableRefObject, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from "react";

// interface
import {Directories} from "@/types/directories.interface";
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
    initPageNum: number
    initDirectoryId: number
    data: Directories
    directories: Directories
}


export default function Modal({isModalOpen, onClose, userId, slugs, initPageNum, initDirectoryId, data, directories}: ModalProps) {
    const initStackProcess = useCallback(() => {
        return getDirectoryTree({directories, directoryId: initDirectoryId}).tree
    }, [directories, initDirectoryId])

    const [ stack, setStack ] = useState<number[]>(initStackProcess())

    useEffect(() => {
        // 모달이 열리고 닫히면 리렌더링 시키기 위해 상태 재설정
        setStack([...stack])
    }, [isModalOpen]);

    return (
        <ModalLayout
            isModalOpen={isModalOpen}
            onClose={onClose}
            NavHeader={<NavHeader stack={stack} setStack={setStack} />}
            NavBody={<NavBody stack={stack} setStack={setStack} directories={directories}/>}
            CardSection={<CardSection
                userId={userId}
                slugs={slugs}
                title={stack.map(v => data[v].name).join('/')}
                postCount={data[stack[stack.length - 1]].postCount}
                directories={directories}
                stack={stack}
                initPageNum={initPageNum}/>}
        />
    )
}



