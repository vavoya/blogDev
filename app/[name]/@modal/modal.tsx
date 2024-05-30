'use client'

import React, { useEffect, useRef } from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import styles from './modal.module.css'

export default function Modal({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    const historyCount = useRef(0);
    const prevPathname = useRef('')
    const prevPage = useRef('')

    useEffect(() => {
        if ((pathname !== prevPathname.current) || (page !== prevPage.current)) {
            prevPathname.current = pathname;
            prevPage.current = page;
            historyCount.current += 1;
        }
    }, [pathname, page]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);




    function onDismiss() {
        window.history.go(-historyCount.current);
    }

    return (
        <div
            onClick={onDismiss}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
            className={styles.modalBackdrop}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={styles.modal}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: 'white'
                }}>
                {children}
                <button
                    onClick={onDismiss}
                    className={styles.closeButton}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        backgroundColor: 'black',
                        borderRadius: '100%',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        width: '50px',
                        height: '50px'
                    }}>
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
