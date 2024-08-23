import styles from "./sideBar.module.css";
import {IconLabel as PostIconLabel}  from "@/components/sideBar/post/IconLabel";
import {IconLabel as TagIconLabel}  from "@/components/sideBar/tag/IconLabel";
import {IconLabel as SeriesIconLabel} from "@/components/sideBar/series/IconLabel";
import {IconLabel as DirectoryIconLabel}  from "@/components/sideBar/directory/IconLabel";
import Link from "next/link";



export default function DashboardSideBar({slug}: {slug: string}) {

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li>
                    <Link className={`${styles.button} ${slug === 'folder' ? styles.current : ''}`} href={'/dashboard/folder'}>
                        <DirectoryIconLabel />
                    </Link>
                </li>
                <li>
                    <Link className={`${styles.button} ${slug === 'series' ? styles.current : ''}`} href={'/dashboard/series'}>
                        <SeriesIconLabel />
                    </Link>
                </li>
                <li>
                    <Link className={`${styles.button} ${slug === 'tag' ? styles.current : ''}`} href={'/dashboard/tag'}>
                        <TagIconLabel />
                    </Link>
                </li>
                <li>
                    <Link className={`${styles.button} ${slug === 'post' ? styles.current : ''}`} href={'/dashboard/post'}>
                        <PostIconLabel />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}