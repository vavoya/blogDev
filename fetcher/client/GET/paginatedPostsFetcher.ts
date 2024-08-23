import ApiResponse from "@/app/api/paginated-posts/interface";
import ApiResponse2 from "@/app/api/paginated-posts/for-series/interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const fetchPaginatedPostsByDirectoryIds = async (userId: number, directoryIds: number[], pageNum: number) => {
    try {
        const response = await fetch(`${uri}/api/paginated-posts/by-directory?userId=${userId}&directoryIds=${directoryIds.join(',')}&pageNum=${pageNum}`);
        const result: ApiResponse = await response.json();
        return result.data ?? null;
    } catch (error) {
        console.error("Error fetching paginated posts by directory IDs:", error);
        return undefined;
    }
}

export const fetchPaginatedPostsBySeriesId = async (userId: number, seriesId: number, pageNum: number) => {
    try {
        const response = await fetch(`${uri}/api/paginated-posts/by-series?userId=${userId}&seriesId=${seriesId}&pageNum=${pageNum}`);
        const result: ApiResponse = await response.json();
        return result.data ?? null;
    } catch (error) {
        console.error("Error fetching paginated posts by series ID:", error);
        return undefined;
    }
}

export const fetchPaginatedPostsByTagIds = async (userId: number, tagIds: number[], pageNum: number) => {
    try {
        const response = await fetch(`${uri}/api/paginated-posts/by-tag?userId=${userId}&tagIds=${tagIds.join(',')}&pageNum=${pageNum}`);
        const result: ApiResponse = await response.json();
        return result.data ?? null;
    } catch (error) {
        console.error("Error fetching paginated posts by tag IDs:", error);
        return undefined;
    }
}

export const fetchPaginatedPostsForSeries = async (userId: number, directoryId: number, pageNum: number) => {
    try {
        const response = await fetch(`${uri}/api/paginated-posts/for-series?userId=${userId}&directoryId=${directoryId}&pageNum=${pageNum}`);
        const result: ApiResponse2 = await response.json();
        return result.data ?? null;
    } catch (error) {
        console.error("Error fetching paginated posts for series:", error);
        return undefined;
    }
}
