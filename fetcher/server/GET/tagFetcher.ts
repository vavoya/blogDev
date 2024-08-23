import TagApiResponse from "@/app/api/tag/interface";
import {FetchResult} from "@/fetcher/FetchResult";
import {Tags} from "@/types/tags.interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;


export const fetchTag = async (userId: number) => {
    const response = await fetch(`${uri}/api/tag?userId=${userId}`, {
        next: {revalidate: 10, tags: [`${userId}/tag`]}
    });
    const result: TagApiResponse = await response.json();

    return new FetchResult<Tags>(response.status, result.data?.tags ?? null)
}