import Link from 'next/link';
import styles from "./sideBar.module.css";
import {usePathname} from "next/navigation";

export default function SideBar() {
    const pathname = usePathname()
    const blogName = pathname.split("/")[1]
    console.log(blogName)

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