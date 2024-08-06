'use server'

import DirectoryApiResponse from "@/app/api/directory/interface";
import {Directories} from "@/types/directories.interface";
import InitPageNumApiResponse from "@/app/api/init-page-num-directoryId/interface";
import {Slugs} from "../SideBar"
import React from "react";
import {GetInitPageNum} from "@/services/getInitPageNum/interface";
import {NavButton} from "@/components/sideBar/search/NavButton";

const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;



export async function DataProvider({slugs, userId}: {
    slugs: Slugs
    userId: number
}) {
    const directories: Directories | null = await getDirectories(userId)
    let initPageNum: GetInitPageNum = {
        directoryId: 0,
        seriesId: 0,
        pageNum: 1,
    }
    if (slugs.postSlug) {
        const initData = await getInitPageNumOfDirectoryId(userId, slugs.postSlug)
        if (initData?.directoryId) initPageNum.directoryId = initData.directoryId
        if (initData?.pageNum) initPageNum.pageNum = initData.pageNum
    }


    return (
        <NavButton
            userId={userId}
            slugs={slugs}
            initPageNum={initPageNum}
            data={directories as Directories}
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


const getInitPageNumOfDirectoryId = async (userId: number, slug: string) => {
    console.log("동작")
    const response = await fetch(`${uri}/api/init-page-num-directoryId?userId=${userId}&slug=${slug}`, {
        next: {revalidate: 10, tags: [`${userId}/directory`]}
    })
    const result: InitPageNumApiResponse = await response.json();

    return result.data ?? null
}
