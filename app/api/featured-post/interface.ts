import {FeaturedPostDocument} from "@/types/featuredPosts.interface";

interface ApiResponseSuccess {
    data: FeaturedPostDocument | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
