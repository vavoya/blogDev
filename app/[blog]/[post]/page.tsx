
import Image from "next/image";
import styles from "./page.module.css";
import page1 from "@/components/jsonRenderer/page1.json"
import PostContent from "@/app/[blog]/PostContent";
import SideBar from "@/components/sideBar/SideBar";
import React from "react";
import {fetchUserInfoBySlug} from "@/fetcher/server/GET/userInfoFetcher";
import {fetchPost} from "@/fetcher/server/GET/postFetcher";
import {FetchResult} from "@/fetcher/FetchResult";
import {UserInfoDocument} from "@/types/userInfo.interface";
import {PostDocument} from "@/types/posts.interface";
import ServerErrorPage from "@/app/_error/ServerErrorPage";
import NotFoundPage from "@/app/_error/NotFoundPage";
import Header from "@/components/header/Header";

export default async function Page({params}: {params: {blog: string, post: string}}) {
    // blogSlug는 앞선 layout.tsx에서 이미 검증됨.
    const userInfoResult: FetchResult<UserInfoDocument> = await fetchUserInfoBySlug(params.blog);
    if (userInfoResult.status !== 200) {
        return <ServerErrorPage />
    } else if (userInfoResult.data === null) {
        return <NotFoundPage />
    }
    const blogName = userInfoResult.data.blogName
    const blogSlug = userInfoResult.data.slug
    const postSlug = params.post
    const userId = userInfoResult.data.userId

    const postResult: FetchResult<PostDocument> = await fetchPost(userInfoResult.data.userId, params.post);
    if (postResult.status !== 200) {
        return <ServerErrorPage />
    } else if (postResult.data === null) {
        return <NotFoundPage />
    }



    return (
        <>
            <Header blogSlug={blogSlug} blogName={blogName}/>
            <SideBar slugs={{blogSlug, postSlug}} userId={userId}/>
            <main style={{
                width: "800px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
            }}>
                <article className={styles.article}>
                    <header className={styles.header}>
                        <ul className={styles.taglist}>
                            {page1.tag.map((tag, index) => (<li key={index}>{tag}</li>))}
                        </ul>
                        <h1>{page1.title}</h1>
                        <span className={styles.date}>{page1.date}</span>
                        <figure style={{height: "450px", width: "800px", position: "relative"}}>
                            <Image
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                className={styles.vercelLogo}
                                fill={true}
                                quality="100"
                                priority
                            />
                        </figure>
                    </header>
                    <PostContent/>
                </article>
            </main>
        </>
    )

}
