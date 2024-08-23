'use server'

import {Directories} from "@/types/directories.interface";
import {Slugs} from "../SideBar"
import React from "react";
import {fetchDirectories} from "@/fetcher/server/GET/directoryFetcher";
import {fetchPageNumByDirectoryId} from "@/fetcher/server/GET/pageNumFetcher";
import {PageNum} from "@/app/api/page-num/interface";
import {fetchPost} from "@/fetcher/server/GET/postFetcher";
import FallBackButton from "@/components/sideBar/directory/FallBackNavButton";
import {FetchResult} from "@/fetcher/FetchResult";
import {PostDocument} from "@/types/posts.interface";
import {NavButton} from "@/components/sideBar/directory/NavButton";


export default async function DataProvider({slugs, userId}: {
    slugs: Slugs
    userId: number
}) {
    // 초기 모달 상태를 결정하는데 필요한 로직
    const directories: FetchResult<Directories> = await fetchDirectories(userId)
    if (directories.data === null) {
        return (
            <FallBackButton />
        )
    }

    let initPageNum = 1
    let initDirectoryId = 0

    if (slugs.postSlug) {
        const post: FetchResult<PostDocument> =  await fetchPost(userId, slugs.postSlug)
        if (post.data !== null) {
            initDirectoryId = post.data.directoryId
            const pageNum: FetchResult<PageNum> = await fetchPageNumByDirectoryId(userId, initDirectoryId, slugs.postSlug)
            if (pageNum.data !== null) {
                initPageNum = pageNum.data.pageNum
            }
        }

    }

    return (
        <NavButton
            userId={userId}
            slugs={slugs}
            initPageNum={initPageNum}
            initDirectoryId={initDirectoryId}
            data={directories.data}
            directories={directories.data} />
    )
}

