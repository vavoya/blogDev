import {UserId, UserInfoDocument} from "@/types/userInfo.interface";

interface ApiResponseSuccess {
    data: UserId | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
