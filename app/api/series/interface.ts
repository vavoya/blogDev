import {SeriesWithoutId} from "@/services/series/getByUserId";

interface ApiResponseSuccess {
    data: SeriesWithoutId | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
