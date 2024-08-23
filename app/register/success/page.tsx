import Link from "next/link";
import styles from "@/app/_error/NotFoundPage.module.css";


export default async function Page({searchParams}: {searchParams: { [key: string]: string | string[] | undefined}}) {
    const href = Array.isArray(searchParams.homeUrl) ? searchParams.homeUrl[0] : searchParams.homeUrl ?? '/';
    const name = Array.isArray(searchParams.name) ? searchParams.name[0] : searchParams.name ?? '';

    return (
        <div className={styles.container}>
            <span className={styles.errorTitle}>환영합니다!</span>
            <span className={styles.errorText}>{name + ' 님'}</span>
            <Link href={href} className={styles.link}>
                블로그 이동
            </Link>
        </div>
    )
}