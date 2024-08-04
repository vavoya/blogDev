import {GetInitPageNum} from "@/services/getInitPageNum/interface";

interface ApiResponseSuccess {
    data: GetInitPageNum | null;
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
