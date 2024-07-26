'use client'

import styles from "../category.module.css"
import CatItem from "./catItem";
import {usePathname} from "next/navigation";



export default function SeriesList() {
    // 서버로 부터 카테고리 목록을 받아옴
    // http 또는 nextjs 캐시 때문에 반복 호출해도 문제 없을 듯 (GET으로 설계)

    const pathname = usePathname()


    return (
        <div className={styles.SeriesList}>
            <div className={styles.SeriesListHead}>
                <span>목록</span>
            </div>
            <div className={styles.SeriesListBody}>

            </div>
        </div>
    )
}