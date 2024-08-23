import {PostDocument} from "@/types/posts.interface";

interface ApiResponseSuccess {
    data: PostDocument | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
