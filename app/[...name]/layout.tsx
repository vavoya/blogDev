import Header from "../../components/header/header";
import SideBar from "@/components/sideBar/SideBar";
import React from "react";
import ApiResponse from "@/app/api/userId/interface";
const uri = process.env.NEXT_PUBLIC_API_BASE_URL as string;


export default async function Layout(props: {
    children: React.ReactNode;
    params: {name: string[]}
}){
    const blogName = props.params.name[0];
    const postSlug = decodeURIComponent(props.params.name[1]);
    const userId = await getUserId(uri, blogName)
    // userId가 없으면 error 페이지로 전송

    return (
        <>
            <Header />
            {/* @ts-expect-error Async Server Component */}
            <SideBar slugs={{blogName, postSlug}} userId={userId}/>
            <main style={{
                width: "800px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
            }}>
                {props.children}
            </main>
        </>
    )
}

const getUserId = async (uri: string, blogName: string) => {
    const response = await fetch(`${uri}/api/userId?blogName=${blogName}`, {
        next: {revalidate: false, tags: [blogName]}
    });
    const result: ApiResponse = await response.json();
    return result.data?.userId ?? null
}


//<Footer />