'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/components/header/header.module.css";

export default function DashboardNav() {
    const pathname = usePathname();

    return (
        <div className={styles.dashboard}>
            <Link href="/dashboard2/management" className={`${styles.management} ${pathname.startsWith('/dashboard2/management') ? styles.current : ""}`}>
                <span>관리</span>
            </Link>
            <Link href="/dashboard2/analytics" className={`${styles.statistics} ${pathname.startsWith('/dashboard2/analytics') ? styles.current : ""}`}>
                <span>통계</span>
            </Link>
        </div>
    );
}
