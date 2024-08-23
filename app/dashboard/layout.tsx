import AccessDeniedPage from "@/app/_error/AccessDeniedPage";
import React from "react";
import {auth} from "@/auth";


export default async function Layout({children}: {children: React.ReactNode}) {
    const session = await auth()

    // 로그인 되어 있으면(인증 세션 유지 시) 루트 이동
    if (!session || !session.registrationState) {
        return <AccessDeniedPage />
    }

    return (
        <>
            {children}
        </>
    )
}