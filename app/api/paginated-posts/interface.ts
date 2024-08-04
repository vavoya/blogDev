import {GetPaginatedPostDocument} from "@/services/getPaginatedPosts/interface";

interface ApiResponseSuccess {
    data: GetPaginatedPostDocument | null;
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
