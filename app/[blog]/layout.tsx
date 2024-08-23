import React from "react";


export default async function Layout({children, params}: {children: React.ReactNode, params: {blog: string}}) {


    return (
        <>
            {children}
        </>
    )
}