
import styles from "./sideBar.module.css";
import {Suspense} from "react";
import DirectoryFallBackButton from "@/components/sideBar/directory/FallBackNavButton";
import DirectoryDataProvider from "@/components/sideBar/directory/DataProvider";
import SeriesFallBackButton from "@/components/sideBar/series/FallBackNavButton";
import SeriesDataProvider from "@/components/sideBar/series/DataProvider";
import TagFallBackButton from "@/components/sideBar/tag/FallBackNavButton";
import TagDataProvider from "@/components/sideBar/tag/DataProvider";


export interface Slugs {
    blogName: string
    postSlug?: string
}

export default async function SideBar({slugs, userId}: {slugs: Slugs, userId: number}) {

    return (
        <>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li>
                        <Suspense fallback={
                            <DirectoryFallBackButton />
                        }>
                            <DirectoryDataProvider slugs={slugs} userId={userId} />
                        </Suspense>
                    </li>
                    <li>
                        <Suspense fallback={
                            <SeriesFallBackButton />
                        }>
                            <SeriesDataProvider slugs={slugs} userId={userId} />
                        </Suspense>
                    </li>
                    <li>
                        <Suspense fallback={
                            <TagFallBackButton />
                        }>
                            <TagDataProvider slugs={slugs} userId={userId} />
                        </Suspense>
                    </li>
                    <li>
                        <Suspense fallback={
                            <TagFallBackButton />
                        }>
                            <TagDataProvider slugs={slugs} userId={userId} />
                        </Suspense>
                    </li>
                </ul>
            </nav>
        </>
    )
}


