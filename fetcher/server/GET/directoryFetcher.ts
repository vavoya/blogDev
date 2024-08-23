import DirectoryApiResponse from "@/app/api/directory/interface";
import {FetchResult} from "@/fetcher/FetchResult";
import {Directories} from "@/types/directories.interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;


export const fetchDirectories = async (userId: number) => {
    const response = await fetch(`${uri}/api/directory?userId=${userId}`, {
        next: {revalidate: 10, tags: [`${userId}/directory`]}
    });
    const result: DirectoryApiResponse = await response.json();

    return new FetchResult<Directories>(response.status, result.data?.directories ?? null)
}