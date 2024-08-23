'use client'

import styles from "@/components/sideBar/sideBar.module.css";
import React, {useCallback, useState} from "react";
import {createPortal} from "react-dom";
import {Directories} from "@/types/directories.interface";
import {Slugs} from "@/components/sideBar/SideBar";
import {GetInitPageNum} from "@/services/postIndex/interface";
import {IconLabel} from "@/components/sideBar/directory/IconLabel";
import Modal from "@/components/modal/directory/Modal";

export function NavButton({
                              userId,
                              slugs,
                              initPageNum,
                              data,
                              directories,
}: {
    userId: number
    slugs: Slugs
    initPageNum: GetInitPageNum
    data: Directories
    directories: Directories
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);



    return (
        <button
            className={styles.button}
            onClick={openModal}>
            <IconLabel />
            {isModalOpen && createPortal(
                <Modal
                    onClose={closeModal}
                    userId={userId}
                    slugs={slugs}
                    initPageNum={initPageNum}
                    data={data}
                    directories={directories}/>,
                document.body
            )}
        </button>
    )

}
