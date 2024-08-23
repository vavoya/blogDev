import styles from "@/components/modal/common/modal.module.css";
import SvgClose from "@/components/svg/Close";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

// Modal 컴포넌트의 props 타입 정의
export interface ModalLayoutProps {
    isModalOpen: boolean
    onClose: () => void;
    NavHeader: React.ReactElement;
    NavBody: React.ReactElement;
    CardSection: React.ReactElement;
}

export default function ModalLayout({isModalOpen, onClose, NavHeader, NavBody, CardSection}: ModalLayoutProps) {
    const router = useRouter();
    useEffect(() => {
        onClose()
    }, [onClose, router]);

    useEffect(() => {
        if (!isModalOpen) return

        // esc 키로 모달 닫기
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
                event.preventDefault();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // html 페이지 스크롤 막기
        const html = document.documentElement; // document.html 대신 document.documentElement 사용
        html.style.overflow = 'hidden';

        return () => {
            html.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, isModalOpen]);

    return (
        <Backdrop  onClose={onClose}>
            <ModalContainer>
                <div className={styles.modalNavSection}>
                    <div className={styles.modalNavHeader}>
                        {NavHeader}
                    </div>
                    <div className={styles.modalNavBody}>
                        {NavBody}
                    </div>
                </div>
                <div className={styles.modalCardSection}>
                    {CardSection}
                </div>
                <button
                    onClick={onClose}
                    className={styles.modalCloseButton}>
                    <SvgClose />
                </button>
            </ModalContainer>
        </Backdrop>

    )
}


function Backdrop({children, onClose}: { children: React.ReactNode, onClose: () => void }) {

    return (
        <div
            onClick={e => {
                e.stopPropagation()
                onClose()
            }}
            className={styles.backdrop}>
            {children}
        </div>
    )
}

function ModalContainer({children}: {children: React.ReactNode}) {

    return (
        <div
            onClick={e => {
                e.stopPropagation()
            }}
            className={styles.modalContainer}>
            {children}
        </div>
    )
}