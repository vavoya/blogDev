'use client'

import { useEffect, useRef } from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import styles from '@/app/[name]/@modal/modal.module.css'

export function Modal({ children }: { children: React.ReactNode }) {
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
            console.log('경로이름',pathname);
            console.log(page);
        }
    }, [pathname, page]);

    function onDismiss() {
        console.log(historyCount.current);
        window.history.go(-historyCount.current);
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
