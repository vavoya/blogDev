import {Metadata} from "@/types/posts.interface";


export interface PaginatedPost {
    metadata: Metadata;
    title: string
    directoryId: number
    slug: string
}

export interface PaginatedPostsWithCount {
    postCount: number
    paginatedPosts: PaginatedPost[]
}