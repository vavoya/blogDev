'use server'

import {Directories} from "@/types/directories.interface";
import {Slugs} from "../SideBar"
import React from "react";
import {SeriesObject} from "@/types/series.interface";
import {fetchDirectories} from "@/fetcher/server/GET/directoryFetcher";
import {fetchSeries} from "@/fetcher/server/GET/seriesFetcher";
import {fetchPost} from "@/fetcher/server/GET/postFetcher";
import {fetchPageNumBySeriesId} from "@/fetcher/server/GET/pageNumFetcher";
import {PageNum} from "@/app/api/page-num/interface";
import FallBackButton from "@/components/sideBar/series/FallBackNavButton";
import {FetchResult} from "@/fetcher/FetchResult";
import {PostDocument} from "@/types/posts.interface";
import {NavButton} from "@/components/sideBar/series/NavButton";


export default async function DataProvider({slugs, userId}: {
    slugs: Slugs
    userId: number
}) {
    // 초기 모달 상태를 결정하는데 필요한 로직
    const directories: FetchResult<Directories> = await fetchDirectories(userId)
    const series: FetchResult<SeriesObject> = await fetchSeries(userId)
    if (directories.data === null || series.data === null) {
        return (
            <FallBackButton />
        )
    }


    let initPageNum = 1
    let initSeriesId = null


    if (slugs.postSlug) {
        const post: FetchResult<PostDocument> =  await fetchPost(userId, slugs.postSlug)
        if (post.data !== null) {
            initSeriesId = post.data.seriesId
            const data: FetchResult<PageNum> = await fetchPageNumBySeriesId(userId, initSeriesId, slugs.postSlug)
            if (data.data !== null) {
                initPageNum = data.data.pageNum
            }
        }

    }


    return (
        <NavButton
            userId={userId}
            slugs={slugs}
            initPageNum={initPageNum}
            initSeriesId={initSeriesId}
            data={series.data}
            directories={directories.data} />
    )
}
