import {TagWithoutId} from "@/services/tags/getByUserId";

interface ApiResponseSuccess {
    data: TagWithoutId | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
