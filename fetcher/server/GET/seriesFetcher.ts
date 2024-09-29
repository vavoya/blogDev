import SeriesApiResponse from "@/app/api/series/interface";
import {FetchResult} from "@/fetcher/FetchResult";
import {SeriesDocument} from "@/types/series.interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export type SeriesWithUpdatedAt = Pick<SeriesDocument, "series" | "updatedAt">

export const fetchSeries = async (userId: number) => {
    const response = await fetch(`${uri}/api/series?userId=${userId}`, {
        next: {revalidate: 10, tags: [`${userId}/series`]}
    });
    const result: SeriesApiResponse = await response.json();

    // 정상적인 쿼리 성공
    if (response.status === 200 && result.data) {
        const data = {
            series: result.data.series,
            updatedAt: new Date(result.data.updatedAt)
        }

        return new FetchResult<SeriesWithUpdatedAt>(response.status, data)
    }

    return new FetchResult<SeriesWithUpdatedAt>(response.status, null)
}