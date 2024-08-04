import {GetUserIdDocument} from "@/services/getUserId/blogName";

interface ApiResponseSuccess {
    data: GetUserIdDocument | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
