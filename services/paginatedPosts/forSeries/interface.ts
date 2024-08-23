

export interface PaginatedPost {
    title: string
    directoryId: number
    slug: string
}

export interface PaginatedPosts {
    paginatedPosts: PaginatedPost[]
}