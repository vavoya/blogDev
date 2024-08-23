import {PaginatedPostsWithCount} from "@/services/paginatedPosts/interface";

interface ApiResponseSuccess {
    data: PaginatedPostsWithCount | null;
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
