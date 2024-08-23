import FeaturedPostApiResponse from "@/app/api/featured-post/interface";
import {FetchResult} from "@/fetcher/FetchResult";
import {PageNum} from "@/app/api/page-num/interface";
import {FeaturedPostDocument} from "@/types/featuredPosts.interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;


export const fetchFeaturedPost = async (userId: number) => {
    const response = await fetch(`${uri}/api/featured-post?userId=${userId}`, {
        next: {revalidate: 10, tags: [`${userId}/featuredPost`]}
    });
    const result: FeaturedPostApiResponse = await response.json();

    return new FetchResult<FeaturedPostDocument>(response.status, result.data ?? null)
}