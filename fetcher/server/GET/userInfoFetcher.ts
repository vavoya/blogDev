import UserInfoApiResponse from "@/app/api/userInfo/interface";
import {FetchResult} from "@/fetcher/FetchResult";
import {UserInfoDocument} from "@/types/userInfo.interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;


export const fetchUserInfoBySlug = async (slug: string) => {
    const response = await fetch(`${uri}/api/userInfo/by-slug?data=${slug}`, {
        next: {revalidate: 10, tags: [slug]}
    });
    const result: UserInfoApiResponse = await response.json();

    return new FetchResult<UserInfoDocument>(response.status, result.data ?? null)
}

export const fetchUserInfoByUserId = async (userId: number) => {
    const response = await fetch(`${uri}/api/userInfo/by-user-id?data=${userId}`, {
        next: {revalidate: 10, tags: [`${userId}`]}
    });
    const result: UserInfoApiResponse = await response.json();

    return new FetchResult<UserInfoDocument>(response.status, result.data ?? null)
}