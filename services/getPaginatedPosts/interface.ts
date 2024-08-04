import {Metadata} from "@/types/posts.interface";


export interface PaginatedPostDocument {
    metadata: Metadata;
    title: string
    directoryId: number
    slug: string
}

export interface GetPaginatedPostDocument {
    postCount: number
    PaginatedPostDocuments: PaginatedPostDocument[]
}