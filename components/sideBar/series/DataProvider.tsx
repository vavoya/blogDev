'use server'

import DirectoryApiResponse from "@/app/api/directory/interface";
import {Directories} from "@/types/directories.interface";
import InitPageNumApiResponse from "@/app/api/init-page-num-directoryId/interface";
import {Slugs} from "../SideBar"
import React from "react";
import {GetInitPageNum} from "@/services/getInitPageNum/interface";
import {NavButton} from "@/components/sideBar/series/NavButton";
import SeriesApiResponse from "@/app/api/series/interface";
import {SeriesObject} from "@/types/series.interface";

const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;



export default async function DataProvider({slugs, userId}: {
    slugs: Slugs
    userId: number
}) {
    const directories: Directories | null = await getDirectories(userId)
    const series: SeriesObject | null = await getSeries(userId)
    let initPageNum: GetInitPageNum = {
        directoryId: 0,
        seriesId: 0,
        pageNum: 1,
    }
    if (slugs.postSlug) {
        const initData = await getInitPageNumOfSeriesId(userId, slugs.postSlug)
        if (initData?.directoryId) initPageNum.directoryId = initData.directoryId
        if (initData?.pageNum) initPageNum.pageNum = initData.pageNum
    }


    return (
        <NavButton
            userId={userId}
            slugs={slugs}
            initPageNum={initPageNum}
            data={series as SeriesObject}
            directories={directories as Directories} />
    )
}



const getDirectories = async (userId: number) => {
    const response = await fetch(`${uri}/api/directory?userId=${userId}`, {
        next: {revalidate: 10, tags: [`${userId}/directory`]}
    });
    const result: DirectoryApiResponse = await response.json();

    return result.data?.directories ?? null;
}

const getSeries = async (userId: number) => {
    const response = await fetch(`${uri}/api/series?userId=${userId}`, {
        next: {revalidate: 10, tags: [`${userId}/series`]}
    });
    const result: SeriesApiResponse = await response.json();

    return result.data?.series ?? null;
}


const getInitPageNumOfSeriesId = async (userId: number, slug: string) => {
    const response = await fetch(`${uri}/api/init-page-num-seriesId?userId=${userId}&slug=${slug}`, {
        next: {revalidate: 10, tags: [`${userId}/series`]}
    })
    const result: InitPageNumApiResponse = await response.json();

    return result.data ?? null
}
