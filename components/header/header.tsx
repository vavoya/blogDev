'use client';

import {usePathname} from "next/navigation";
import Link from "next/link";
import styles from "./header.module.css"


export default function Header() {
    const pathname = usePathname()
    const blogName = pathname.split("/")[1]

    // 경로가 바뀌면 이게 음... 이것도 최적화를 고민해보자



    console.log(pathname, blogName)
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.ul}>
                    <LPageLink href={'/vavoya/category'} text={'이전글'} />
                    <HomeLink href={'/'+blogName} text={blogName} />
                    <RPageLink href={'/'} text={'다음글'} />
                </ul>
            </nav>
        </header>
    )
}

function LPageLink({href, text}: {href: string, text: string}) {
    // <Link href={'/'} className={css}>{text}</Link>
    return (
        <li>
            <Link href={href} className={styles.link}>
                <span className={styles.span}>이전 페이지</span>
                <span className={styles.spanTitle}>{text}</span>
            </Link>
        </li>
    )
}

function RPageLink({href, text}: {href: string, text: string}) {

    return (
        <li>
            <Link href={href} className={styles.link}>
                <span className={styles.spanTitle}>{text}</span>
                <span className={styles.span}>다음 페이지</span>
            </Link>
        </li>
    )
}

function HomeLink({href, text}: {href: string, text: string}) {

    return (
        <li>
            <Link href={href}>
                <span className={styles.homeTitle}>{`${text}'s 블로그`}</span>
            </Link>
        </li>
    )
}