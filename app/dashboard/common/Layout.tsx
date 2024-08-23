'use client'

import styles from "./Layout.module.css"


export default function Layout({treeElements, detailsElements}: {treeElements: React.ReactElement[], detailsElements: React.ReactElement[]}) {





    return (
        <div className={styles.container}>
            <div className={styles.treeContainer}>
                <div className={styles.tree}>
                    {treeElements}
                </div>
            </div>
            <div className={styles.detailsContainer}>
                {detailsElements}
            </div>
        </div>
    )
}

