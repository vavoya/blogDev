import styles from "./NotFoundPage.module.css"
import Link from "next/link";

export default function AccessDeniedPage() {


    return (
        <div className={styles.container}>
            <span className={styles.errorTitle}>403!</span>
            <span className={styles.errorText}>잘못된 접근</span>
            <Link href={'/'} className={styles.link}>
                홈으로 이동
            </Link>
        </div>
    )
}