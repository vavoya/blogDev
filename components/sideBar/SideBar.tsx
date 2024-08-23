
import styles from "./sideBar.module.css";
import {Suspense} from "react";
import DirectoryFallBackButton from "@/components/sideBar/directory/FallBackNavButton";
import DirectoryDataProvider from "@/components/sideBar/directory/DataProvider";
import SeriesFallBackButton from "@/components/sideBar/series/FallBackNavButton";
import SeriesDataProvider from "@/components/sideBar/series/DataProvider";
import TagFallBackButton from "@/components/sideBar/tag/FallBackNavButton";
import TagDataProvider from "@/components/sideBar/tag/DataProvider";

export interface Slugs {
    blogSlug: string
    postSlug?: string
}

export default async function SideBar({slugs, userId}: {slugs: Slugs, userId: number}) {

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <Suspense fallback={
                    <>
                        <li>
                            <DirectoryFallBackButton/>
                        </li>
                        <li>
                            <SeriesFallBackButton />
                        </li>
                        <li>
                            <TagFallBackButton />
                        </li>
                        <li>
                            <TagFallBackButton />
                        </li>
                    </>
                }>
                    <li>
                        <DirectoryDataProvider slugs={slugs} userId={userId}/>
                    </li>
                    <li>
                        <SeriesDataProvider slugs={slugs} userId={userId}/>
                    </li>
                    <li>
                        <TagDataProvider slugs={slugs} userId={userId}/>
                    </li>
                    <li>
                        <TagDataProvider slugs={slugs} userId={userId}/>
                    </li>
                </Suspense>
            </ul>
        </nav>
    )
}


