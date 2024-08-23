'use client'

import styles from "@/components/sideBar/sideBar.module.css";
import React, {useCallback, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {Directories} from "@/types/directories.interface";
import {Slugs} from "@/components/sideBar/SideBar";
import {IconLabel} from "@/components/sideBar/tag/IconLabel";
import Modal from "@/components/modal/tag/Modal";
import {Tags} from "@/types/tags.interface";

export interface NavButtonProps {
    userId: number
    slugs: Slugs
    data: Tags
    directories: Directories
}

export function NavButton({userId, slugs, data, directories}: NavButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

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
            {mounted && createPortal(
                <div style={{
                        position: "absolute",
                        display: isModalOpen ? "block" : "none",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                }}>
                    <Modal
                        isModalOpen={isModalOpen}
                        onClose={closeModal}
                        userId={userId}
                        slugs={slugs}
                        data={data}
                        directories={directories}/>
                </div>,
                document.body
            )}
        </button>
    )

}
