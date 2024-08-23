import ApiResponse from "@/app/api/registration/interface";
import {State} from "@/app/register/page";

const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const fetchRegistration = async ({props}: {props: State}) => {
    const response = await fetch(`${uri}/api/registration`, {
        method: 'POST', // POST 메서드 지정
        headers: {
            'Content-Type': 'application/json', // 요청 본문 타입을 JSON으로 설정
        },
        body: JSON.stringify(props), // props 객체를 JSON 문자열로 변환하여 전송
    });

    const result: ApiResponse = await response.json();
    return result.data ?? null;
};
