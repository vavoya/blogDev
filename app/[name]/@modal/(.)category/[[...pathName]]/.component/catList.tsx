'use client'

import styles from "../category.module.css"
import Link from "next/link";
import CatItem from "./catItem";
import {usePathname} from "next/navigation";
import {useEffect} from "react";



export default function CatList() {
    // 서버로 부터 카테고리 목록을 받아옴
    // http 또는 nextjs 캐시 때문에 반복 호출해도 문제 없을 듯 (GET으로 설계)

    const pathname = usePathname()


    return (
        <div className={styles.catList}>
            <div className={styles.catListHead}>
                <span>목록</span>
                <button>
                    <div />
                    <span>이전</span>
                </button>
            </div>
            <div className={styles.catListBody}>
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
                <CatItem path={`${pathname}/FrontEnd`} />
            </div>
        </div>
    )
}

const temp = {
    name: "~",
    child: [
        {
            name: "FrontEnd",
            child: [

            ]
        },
        {
            name: "FrontEnd",
            child: [

            ]
        },
        {
            name: "FrontEnd",
            child: [

            ]
        },
        {
            name: "FrontEnd",
            child: [

            ]
        },
        {
            name: "FrontEnd",
            child: [

            ]
        },
        {
            name: "FrontEnd",
            child: [

            ]
        },
    ]
}