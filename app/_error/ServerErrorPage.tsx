import styles from "./NotFoundPage.module.css"
import Link from "next/link";

export default function ServerErrorPage() {


    return (
        <div className={styles.container}>
            <span className={styles.errorTitle}>500!</span>
            <span className={styles.errorText}>서버 오류</span>
            <Link href={'/'} className={styles.link}>
                홈으로 이동
            </Link>
        </div>
    )
}