
export interface PageNum {
    pageNum: number;
}

interface ApiResponseSuccess {
    data: PageNum | null;
    error?: never;
}

interface ApiResponseError {
    data?: never;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;
export default ApiResponse
