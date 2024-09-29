import React from "react";
import DashboardHeader from "@/components/header/DashboardHeader";


export default async function Layout({children}: {children: React.ReactNode}) {




    return (
        <>
            <DashboardHeader />
            {children}
        </>
    )
}