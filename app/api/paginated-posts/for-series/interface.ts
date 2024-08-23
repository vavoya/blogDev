import {PaginatedPosts} from "@/services/paginatedPosts/forSeries/interface";

interface ApiResponseSuccess {
    data: PaginatedPosts | null;
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
