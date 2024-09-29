import DashboardSideBar from "@/components/sideBar/DashboardSideBar";
import React from "react";


export default async function Layout({children}: {children: React.ReactNode}) {


    return (
        <>
            <DashboardSideBar />
            {children}
        </>
    )
}