import {AsyncTask} from "@/app/dashboard2/management/series/component/SeriesSection";
import ApiResponse from "@/app/api/series/patch/interface";

const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export default async function seriesFetcher(task: AsyncTask) {
    const response = await fetch(`${uri}/api/series/patch`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json', // 요청 본문 타입을 JSON으로 설정
        },
        body: JSON.stringify(task)
    });

    const result: ApiResponse = await response.json();
    return result.data ?? null;
}
