'use client'

import styles from "./pageList.module.css"
import PageListFoot from "./pageListFoot";
import PageListHead from "./pageListHead"

export default function PageList({children}: {children: React.ReactNode}) {
    // 여기서 페이지 관련 메타 데이터를 받아서 Head와 Foot에 전달


    return (
        <div className={styles.pageList}>
            <PageListHead title={"~/FrontEnd/React"} cardCount={27} pageCount={5}/>
            {children}
            <PageListFoot start={1} end={5}/>
        </div>
    )
}
