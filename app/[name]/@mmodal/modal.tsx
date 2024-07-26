'use client'


import styles from "./modal.module.css"
import SvgUndo from "@/components/svg/Undo";
import SvgClose from "@/components/svg/Close";
import bg from '@/public/svg/hoverEffect58.svg'
import bg2 from '@/public/svg/hoverEffect352.svg'
import Link from "next/link";
import Image from "next/image";
import {useEffect} from "react";

export default function Modal({onClose}: {onClose: () => void}) {


    useEffect(() => {
        const html = document.documentElement; // document.html 대신 document.documentElement 사용
        html.style.overflow = 'hidden';
        return () => {
            html.style.overflow = '';
        };
    }, []);

    return (
        <Backdrop onClose={onClose}>
            <ModalContainer>
                <div className={styles.modalNavSection}>
                    <div className={styles.modalNavHeader}>
                        <span>
                            목록
                        </span>
                        <button onClick={e => {

                        }}>
                            <SvgUndo/>
                            <span>
                                이전
                            </span>
                        </button>
                    </div>
                    <div className={styles.modalNavBody}>
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />
                        <ModalNavItem />

                    </div>
                </div>
                <div className={styles.modalCardSection}>
                    <div className={styles.modalCardHeader}>
                        <span>
                            ~/FrontEnd/React
                        </span>
                        <span>
                            27 개의 글 | 5 페이지
                        </span>
                    </div>
                    <div className={styles.modalCardBody}>
                        <ModalCardItem />
                        <ModalCardItem />
                        <ModalCardItem />
                        <ModalCardItem />
                        <ModalCardItem />
                        <ModalCardItem />
                        <ModalCardItem />
                        <ModalCardItem />
                        <ModalCardItem />
                        <ModalCardItem />
                        <ModalCardItem />
                        <ModalCardItem />
                    </div>
                    <div className={styles.modalCardFooter}>

                    </div>
                </div>
                <button
                    onClick={onClose}
                    style={{
                    width: '30px',
                    height: '30px',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SvgClose/>
                </button>
            </ModalContainer>
        </Backdrop>

    )
}


function Backdrop({children, onClose}: { children: React.ReactNode, onClose: () => void }) {

    return (
        <div
            onClick={onClose}
            className={styles.backdrop}>
            {children}
        </div>
    )
}

function ModalContainer({children}: {children: React.ReactNode}) {

    return (
        <div className={styles.modalContainer}>
            {children}
        </div>
    )
}

function MoveBackgroundAnimation() {
    return (
        <div className={styles.moveBackgroundAnimation}
             style={{
                 position: 'absolute',
                 top: '0',
                 left: '0',
                 right: '0',
                 bottom: '0',
                 backgroundImage: `url(${bg.src})`,
                 width: '100%',
                 height: '100%',
                 backgroundRepeat: 'repeat-x',
             }}/>
    )
}

function ModalNavItem() {
    return (
        <button className={styles.modalNavItem}>
                            <span>
                                FrontEnd
                            </span>
            <span>
                                56
                            </span>
            <MoveBackgroundAnimation/>
        </button>
    )
}

function MoveBackgroundAnimation2() {
    return (
        <div className={styles.moveBackgroundAnimation}
             style={{
                 backgroundImage: `url(${bg2.src})`,
             }}/>
    )
}


function ModalCardItem() {
    return (
        <div className={styles.modalCardItem}>
            <Image
                src={'https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/Vercel-900x0.png'}
                width={300}
                height={200}
            />
            <div>
                <span>
                    ~/FrontEnd/React
                </span>
                <span>
                    2024.07.26
                </span>
            </div>
            <div>
                <span>
                    Next.js 14 요약하기
                </span>
            </div>
            <TagList />
            <MoveBackgroundAnimation2 />
        </div>

    )
}

function TagList() {

    return (
        <div>
            <Tag />
            <Tag />
            <Tag />

        </div>
    )
}

function Tag() {
    return (
        <div className={styles.tag}>
            <span>
                태그
            </span>
        </div>
    )
}