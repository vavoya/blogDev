import {auth} from "@/auth";
import {Session} from "next-auth";
import Post from "@/app/dashboard/post/Post";
import {fetchDirectories} from "@/fetcher/server/GET/directoryFetcher";
import {FetchResult} from "@/fetcher/FetchResult";
import {Directories} from "@/types/directories.interface";


export default async function Page() {
    const session = (await auth()) as Session
    const userId = session.userId as number

    const data: FetchResult<Directories> = await fetchDirectories(userId)


    return (
        <Post data={data}/>
    )
}