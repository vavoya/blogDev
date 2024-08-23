import AccessDeniedPage from "@/app/_error/AccessDeniedPage";
import React from "react";
import {auth} from "@/auth";
import {redirect} from "next/navigation";


// page가 클라이언트 컴포넌트 이기에, layout으로 리다이렉트를 처리해야함, 서버 컴포넌트라면 page에서 리다이렉트 처리하는게 빠름
export default async function Layout({children}: {children: React.ReactNode}) {
    const session = await auth()

    if (!session || session.registrationState) {
        redirect("/");
    } else {
        return children;
    }
}