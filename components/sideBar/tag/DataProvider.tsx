'use server'

import {Directories} from "@/types/directories.interface";
import {Slugs} from "../SideBar"
import React from "react";
import {Tags} from "@/types/tags.interface";
import FallBackButton from "@/components/sideBar/series/FallBackNavButton";
import {fetchDirectories} from "@/fetcher/server/GET/directoryFetcher";
import {fetchTag} from "@/fetcher/server/GET/tagFetcher";
import {FetchResult} from "@/fetcher/FetchResult";
import {NavButton} from "@/components/sideBar/tag/NavButton";


export default async function DataProvider({slugs, userId}: {
    slugs: Slugs
    userId: number
}) {
    const directories: FetchResult<Directories> = await fetchDirectories(userId)
    const tags: FetchResult<Tags> = await fetchTag(userId)
    if (directories.data === null || tags.data === null) {
        return (
            <FallBackButton />
        )
    }


    return (
        <NavButton
            userId={userId}
            slugs={slugs}
            data={tags.data}
            directories={directories.data} />
    )
}

