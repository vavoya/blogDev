import PageNumApiResponse, {PageNum} from "@/app/api/page-num/interface";
import {FetchResult} from "@/fetcher/FetchResult";
import {PostDocument} from "@/types/posts.interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;



export const fetchPageNumByDirectoryId = async (userId: number, directoryId: number, slug: string) => {
    const response = await fetch(`${uri}/api/page-num/by-directory?userId=${userId}&directoryId=${directoryId}&slug=${slug}`, {
        next: {revalidate: 10, tags: [`${userId}/directory`]}
    })
    const result: PageNumApiResponse = await response.json();

    return new FetchResult<PageNum>(response.status, result.data ?? null)
}

export const fetchPageNumBySeriesId = async (userId: number, seriesId: number, slug: string) => {
    const response = await fetch(`${uri}/api/page-num/by-series?userId=${userId}&seriesId=${seriesId}&slug=${slug}`, {
        next: {revalidate: 10, tags: [`${userId}/directory`]}
    })
    const result: PageNumApiResponse = await response.json();

    return new FetchResult<PageNum>(response.status, result.data ?? null)
}