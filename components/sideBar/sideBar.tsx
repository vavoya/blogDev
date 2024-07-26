'use client'

import Link from 'next/link';
import styles from "./sideBar.module.css";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import Modal from "@/app/[name]/@mmodal/modal";

export default function SideBar() {
    const pathname = usePathname()



    // 서버로부터 현재 페이지 post의 카테고리 경로를 알아냄
    // 이후 카테고리 Link의 href에는 그 것으로 설정하고 쿼리 스트링도 넘겨줌
    // 만약 post가 아니면? 그냥 /category

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li>
                        <button className={styles.button} onClick={openModal}>
                            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="14" fill="black"/>
                            </svg>
                            <span>폴더</span>
                        </button>
                    </li>
                    <li>
                        <button className={styles.button}>
                            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="14" fill="black"/>
                            </svg>
                            <span>시리즈</span>
                        </button>
                    </li>
                    <li>
                        <button className={styles.button}>
                            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="14" fill="black"/>
                            </svg>
                            <span>태그</span>
                        </button>
                    </li>
                    <li>
                        <button className={styles.button}>
                            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="14" fill="black"/>
                            </svg>
                            <span>검색</span>
                        </button>
                    </li>
                </ul>
            </nav>
            {
                isModalOpen
                    ? <Modal onClose={closeModal} />
                    : null
            }
        </>
    )
}