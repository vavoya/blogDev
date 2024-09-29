'use client'

import styles from "./sideBar.module.css";
import {IconLabel as PostIconLabel}  from "@/components/sideBar/post/IconLabel";
import {IconLabel as TagIconLabel}  from "@/components/sideBar/tag/IconLabel";
import {IconLabel as SeriesIconLabel} from "@/components/sideBar/series/IconLabel";
import {IconLabel as DirectoryIconLabel}  from "@/components/sideBar/directory/IconLabel";
import Link from "next/link";
import {usePathname} from "next/navigation";



export default function DashboardSideBar() {

    const pathname = usePathname()
    const defaultPathname = '/dashboard2/management'

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li>
                    <Link className={`${styles.button} ${pathname.startsWith(defaultPathname + '/folder') ? styles.current : ''}`} href={'/dashboard2/management/folder'}>
                        <DirectoryIconLabel />
                    </Link>
                </li>
                <li>
                    <Link className={`${styles.button} ${pathname.startsWith(defaultPathname + '/series') ? styles.current : ''}`} href={'/dashboard2/management/series'}>
                        <SeriesIconLabel />
                    </Link>
                </li>
                <li>
                    <Link className={`${styles.button} ${pathname.startsWith(defaultPathname + '/tag') ? styles.current : ''}`} href={'/dashboard2/management/tag'}>
                        <TagIconLabel />
                    </Link>
                </li>
                <li>
                    <Link className={`${styles.button} ${pathname.startsWith(defaultPathname + '/post') ? styles.current : ''}`} href={'/dashboard2/management/post'}>
                        <PostIconLabel />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}