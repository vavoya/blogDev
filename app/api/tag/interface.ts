import {GetTagsDocument} from "@/services/getTags/byUserId";

interface ApiResponseSuccess {
    data: GetTagsDocument | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
