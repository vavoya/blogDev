import React from "react";
import {auth} from "@/auth";
import {redirect} from "next/navigation";


export default async function Layout({children}: {children: React.ReactNode}) {
    const session = await auth()
    console.log(session)

    // 로그인 되어 있으면(인증 세션 유지 시) 루트 이동
    if (session?.registrationState === true) {
        redirect("/")
    }

    return children

}