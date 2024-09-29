import PostContent from "./PostContent";
import ProfileSection from "@/app/[blog]/ProfileSection";
import {UserInfoDocument} from "@/types/userInfo.interface";
import SideBar from "@/components/sideBar/SideBar";
import React from "react";
import {fetchUserInfoBySlug} from "@/fetcher/server/GET/userInfoFetcher";
import NotFoundPage from "@/app/_error/NotFoundPage";
import DefaultHeader from "@/components/header/DefaultHeader";
import {FetchResult} from "@/fetcher/FetchResult";
import {FeaturedPostDocument} from "@/types/featuredPosts.interface";
import {fetchFeaturedPost} from "@/fetcher/server/GET/featuredPostFetcher";
import ServerErrorPage from "@/app/_error/ServerErrorPage";


export default async function Page({params}: {params: {blog: string}}) {
    const data: FetchResult<UserInfoDocument> = await fetchUserInfoBySlug(params.blog);
    if (data.status !== 200) {
        return <ServerErrorPage />
    } else if (data.data === null) {
        return <NotFoundPage />
    }
    const userId = data.data.userId
    const blogName = data.data.blogName
    const blogSlug = data.data.slug

    const data2: FetchResult<FeaturedPostDocument> = await fetchFeaturedPost(userId)
    if (data2.status !== 200) {
        return <ServerErrorPage />
    } else if (data2.data === null) {
        return <NotFoundPage />
    }



    return (
        <>
            <DefaultHeader blogSlug={blogSlug} blogName={blogName}/>
            <SideBar slugs={{blogSlug}} userId={userId}/>
            <main style={{
                width: "800px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
            }}>
                <ProfileSection />
                <PostContent />
            </main>
        </>
    )
}