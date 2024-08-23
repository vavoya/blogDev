import {DirectoriesWithoutId} from "@/services/directories/getByUserId";

export interface ApiResponseSuccess {
    data: DirectoriesWithoutId | null;
    error?: never;
}

export interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
