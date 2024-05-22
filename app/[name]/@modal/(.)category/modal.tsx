'use client'

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import styles from './modal.module.css'

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    return (
        <div onClick={onDismiss} className={styles.modalBackdrop}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
                <button className={styles.closeButton}
                    onClick={onDismiss}>

                </button>
            </div>
        </div>
    )

    /*
    return createPortal(



                <dialog ref={dialogRef} className={styles.modal} onClose={onDismiss}>
                    {children}
                    <button onClick={onDismiss} className={styles.closeButton}/>
                </dialog>
        , document.body
    );

     */
}