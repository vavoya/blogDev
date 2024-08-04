import {GetSeriesDocument} from "@/services/getSeries/byUserId";

interface ApiResponseSuccess {
    data: GetSeriesDocument | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
