import SeriesApiResponse from "@/app/api/series/interface";
import {FetchResult} from "@/fetcher/FetchResult";
import {SeriesObject} from "@/types/series.interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;


export const fetchSeries = async (userId: number) => {
    const response = await fetch(`${uri}/api/series?userId=${userId}`, {
        next: {revalidate: 10, tags: [`${userId}/series`]}
    });
    const result: SeriesApiResponse = await response.json();

    return new FetchResult<SeriesObject>(response.status, result.data?.series ?? null)
}