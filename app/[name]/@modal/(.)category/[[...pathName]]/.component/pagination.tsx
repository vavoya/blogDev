'use client'

import styles from "../category.module.css"
import Link from "next/link";

export default function Page() {

    return (
        <div>
            <div>
                <FirstPage num={1}/>
                <PrevPage num={1}/>

                <span>2</span>

                <NextPage num={1}/>
                <LastPage num={1}/>
            </div>
            <div>
                <textarea>

                </textarea>
                <button>

                </button>
            </div>
        </div>
    )
}

// 여기 Link들 전부 css 줘서 호버되면 뭐... opacity가 변한다거나, translation? x축 이동을 한다거나...
function FirstPage({num = 0}: {num?: number}) {

    if (num === 0) {
        return (
            <div style={{width: '16px', height: '15px', backgroundColor: 'none'}}/>
        )
    }

    return (
        <Link href={`/`}>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 15L7 7.5L14.5 0L15.8382 1.33817L9.67635 7.5L15.8382 13.6618L14.5 15Z" fill="black"/>
                <path d="M7.5 15L0 7.5L7.5 0L8.83817 1.33817L2.67635 7.5L8.83817 13.6618L7.5 15Z" fill="black"/>
            </svg>
        </Link>
    )

}

function LastPage({num = 0}: { num?: number }) {
    if (num === 0) {
        return (
            <div style={{width: '16px', height: '15px', backgroundColor: 'none'}}/>
        )
    }

    return (
        <Link href={`/`}>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.16183 7.5L0 1.33817L1.33817 0L8.83817 7.5L1.33817 15L0 13.6618L6.16183 7.5Z"
                      fill="black"/>
                <path d="M13.1618 7.5L7 1.33817L8.33817 0L15.8382 7.5L8.33817 15L7 13.6618L13.1618 7.5Z"
                      fill="black"/>
            </svg>
        </Link>
    )
}

function PrevPage({num = 0}: { num?: number }) {
    if (num === 0) {
        return (
            <div style={{width: '16px', height: '15px', backgroundColor: 'none'}}/>
        )
    }

    return (
        <Link href={`/`}>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L0 7.5L7.5 0L8.83817 1.33817L2.67635 7.5L8.83817 13.6618L7.5 15Z" fill="black"/>
            </svg>
        </Link>
    )
}

function NextPage({num = 0}: { num?: number }) {
    if (num === 0) {
        return (
            <div style={{width: '16px', height: '15px', backgroundColor: 'none'}}/>
        )
    }

    return (
        <Link href={`/`}>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.16183 7.5L0 1.33817L1.33817 0L8.83817 7.5L1.33817 15L0 13.6618L6.16183 7.5Z"
                      fill="black"/>
            </svg>
        </Link>
    )
}