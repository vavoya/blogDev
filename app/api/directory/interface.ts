import {GetDirectoriesDocument} from "@/services/getDirectories/byUserId";

export interface ApiResponseSuccess {
    data: GetDirectoriesDocument | null;
    error?: never;
}

export interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
