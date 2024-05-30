import Link from 'next/link';
import styles from "./sideBar.module.css";
import {usePathname} from "next/navigation";

export default function SideBar() {
    const pathname = usePathname()
    const blogName = pathname.split("/")[1]
    console.log(blogName)


    // 서버로부터 현재 페이지 post의 카테고리 경로를 알아냄
    // 이후 카테고리 Link의 href에는 그 것으로 설정하고 쿼리 스트링도 넘겨줌
    // 만약 post가 아니면? 그냥 /category

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li>
                    <Link href={`/${blogName}/category`} className={styles.link}>
                        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="14" fill="black"/>
                        </svg>
                        <span>목록</span>
                    </Link>
                </li>
                <li>
                    <Link href="/" className={styles.link}>
                        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="14" fill="black"/>
                        </svg>
                        <span>시리즈</span>
                    </Link>
                </li>
                <li>
                    <Link href="/" className={styles.link}>
                        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="14" fill="black"/>
                        </svg>
                        <span>태그</span>
                    </Link>
                </li>
                <li>
                    <Link href="/" className={styles.link}>
                        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="14" fill="black"/>
                        </svg>
                        <span>검색</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}