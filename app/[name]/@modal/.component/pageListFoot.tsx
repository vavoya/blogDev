'use client'

import styles from "./pageList.module.css"
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useRef} from "react";

export default function Page({start, end}: {start: number; end: number}) {
    const router = useRouter()
    const params = useSearchParams();
    const pathname = usePathname();
    const findePageNum = useRef<HTMLInputElement>(null);

    // 서버에 요청을 보내서

    const handleClick = () => {
        console.log(findePageNum.current.value);
        const pageNum = findePageNum.current.value
        router.push(pathname + '?' + 'page='+pageNum)
    }

    return (
            <div className={styles.pageListBottom}>
                <FirstPage num={1} pathname={pathname} />
                <PrevPage num={1} pathname={pathname} />

                <span>2</span>

                <NextPage num={3} pathname={pathname} />
                <LastPage num={5} pathname={pathname} />
                <div>
                    <input placeholder={"번호"} ref={findePageNum} />
                    <button onClick={handleClick}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.7778 20L11.4722 12.6944C10.9167 13.1759 10.2689 13.5509 9.52889 13.8194C8.78889 14.088 8.00148 14.2222 7.16667 14.2222C5.1637 14.2222 3.46852 13.5278 2.08111 12.1389C0.693704 10.75 0 9.07407 0 7.11111C0 5.14815 0.694444 3.47222 2.08333 2.08333C3.47222 0.694444 5.15278 0 7.125 0C9.09722 0 10.7731 0.694444 12.1528 2.08333C13.5324 3.47222 14.2222 5.14954 14.2222 7.11528C14.2222 7.9088 14.0926 8.67593 13.8333 9.41667C13.5741 10.1574 13.1852 10.8519 12.6667 11.5L20 18.7778L18.7778 20ZM7.13889 12.5556C8.64352 12.5556 9.9225 12.0231 10.9758 10.9583C12.029 9.89352 12.5556 8.61111 12.5556 7.11111C12.5556 5.61111 12.029 4.3287 10.9758 3.26389C9.9225 2.19907 8.64352 1.66667 7.13889 1.66667C5.61889 1.66667 4.32685 2.19907 3.26278 3.26389C2.1987 4.3287 1.66667 5.61111 1.66667 7.11111C1.66667 8.61111 2.1987 9.89352 3.26278 10.9583C4.32685 12.0231 5.61889 12.5556 7.13889 12.5556Z"
                            fill="black"/>
                        </svg>
                    </button>
                </div>
        </div>
    )
}

// 여기 Link들 전부 css 줘서 호버되면 뭐... opacity가 변한다거나, translation? x축 이동을 한다거나...
function FirstPage({num = 0, pathname}: { num?: number , pathname?: string } = {}) {

    if (num === 0) {
        return (
            <div style={{width: '16px', height: '15px', backgroundColor: 'none'}}/>
        )
    }

    return (
        <Link href={`${pathname}?page=${num}`}>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 15L7 7.5L14.5 0L15.8382 1.33817L9.67635 7.5L15.8382 13.6618L14.5 15Z" fill="black"/>
                <path d="M7.5 15L0 7.5L7.5 0L8.83817 1.33817L2.67635 7.5L8.83817 13.6618L7.5 15Z" fill="black"/>
            </svg>
        </Link>
    )

}

function LastPage({num = 0, pathname}: { num?: number , pathname?: string } = {}) {
    if (num === 0) {
        return (
            <div style={{width: '16px', height: '15px', backgroundColor: 'none'}}/>
        )
    }

    return (
        <Link href={`${pathname}?page=${num}`}>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.16183 7.5L0 1.33817L1.33817 0L8.83817 7.5L1.33817 15L0 13.6618L6.16183 7.5Z"
                      fill="black"/>
                <path d="M13.1618 7.5L7 1.33817L8.33817 0L15.8382 7.5L8.33817 15L7 13.6618L13.1618 7.5Z"
                      fill="black"/>
            </svg>
        </Link>
    )
}

function PrevPage({num = 0, pathname}: { num?: number , pathname?: string } = {}) {
    if (num === 0) {
        return (
            <div style={{width: '16px', height: '15px', backgroundColor: 'none'}}/>
        )
    }

    return (
        <Link href={`${pathname}?page=${num}`}>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L0 7.5L7.5 0L8.83817 1.33817L2.67635 7.5L8.83817 13.6618L7.5 15Z" fill="black"/>
            </svg>
        </Link>
    )
}

function NextPage({num = 0, pathname}: { num?: number , pathname?: string } = {}) {
    if (num === 0) {
        return (
            <div style={{width: '16px', height: '15px', backgroundColor: 'none'}}/>
        )
    }

    return (
        <Link href={`${pathname}?page=${num}`}>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.16183 7.5L0 1.33817L1.33817 0L8.83817 7.5L1.33817 15L0 13.6618L6.16183 7.5Z"
                      fill="black"/>
            </svg>
        </Link>
    )
}