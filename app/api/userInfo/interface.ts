import {UserInfoDocument} from "@/types/userInfo.interface";

interface ApiResponseSuccess {
    data: UserInfoDocument | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
