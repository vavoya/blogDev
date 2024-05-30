'use client'

import styles from "../(.)category/[[...pathName]]/category.module.css"


export default function Page({title, cardCount, pageCount}: {title: string; cardCount: number; pageCount: number}) {
    return (
        <div className={styles.pageListHead}>
                <span>
                    {title}
                </span>
            <div>
                <span>{cardCount}개의 글</span>
                <div/>
                <span>{pageCount} 페이지</span>
            </div>
        </div>
    )
}
