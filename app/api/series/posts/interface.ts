import {SeriesPost} from "@/services/seriesPosts/interface";

interface ApiResponseSuccess {
    data: SeriesPost[] | null
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
