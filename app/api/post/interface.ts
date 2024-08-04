import {PostAndAdjacentPostsDocument} from "@/services/getPostAndAdjacentPosts/interface";

interface ApiResponseSuccess {
    data: PostAndAdjacentPostsDocument | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
