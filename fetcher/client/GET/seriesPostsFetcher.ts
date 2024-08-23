import ApiResponse from "@/app/api/series/posts/interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const fetchSeriesPosts = async (userId: number, seriesId: number) => {
    const response = await fetch(`${uri}/api/series/posts?userId=${userId}&seriesId=${seriesId}`);
    const result: ApiResponse = await response.json();
    return result.data ?? null
}