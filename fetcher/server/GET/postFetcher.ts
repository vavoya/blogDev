import PostApiResponse from "@/app/api/post/interface";
import {FetchResult} from "@/fetcher/FetchResult";
import {PostDocument} from "@/types/posts.interface";

const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const fetchPost = async (userId: number, slug: string) => {
    const response = await fetch(`${uri}/api/post?userId=${userId}&slug=${slug}`, {
        next: {revalidate: 10, tags: [`${userId}/directory`]}
    })
    const result: PostApiResponse = await response.json();

    return new FetchResult<PostDocument>(response.status, result.data ?? null)
}