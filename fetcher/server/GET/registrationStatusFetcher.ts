import ApiResponse from "@/app/api/registration/status/interface";
import {FetchResult} from "@/fetcher/FetchResult";
import {UserId, UserInfoDocument} from "@/types/userInfo.interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;


export const fetchRegistrationStatus = async (providerId: string, provider: string) => {
    const response = await fetch(`${uri}/api/registration/status?providerId=${providerId}&provider=${provider}`, {
        next: {revalidate: 10, tags: [provider+'/'+providerId]}
    });
    const result: ApiResponse = await response.json();

    return new FetchResult<UserId>(response.status, result.data ?? null)
}