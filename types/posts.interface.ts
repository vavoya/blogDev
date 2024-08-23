// types/posts.FetchResult.ts
export interface Metadata {
    createdAt: string
    updatedAt: string
    commentsCount: number
    likesCount: number
    viewsCount: number
    description: string
    thumbUrl: string
}

export interface PostDocument extends Document {
    _id: string;
    userId: number;
    metadata: Metadata;
    content: string;
    tags: number[];
    title: string;
    tagIds: number[]
    seriesId: number
    seriesOrder: number
    directoryId: number;
    status: 'published' | 'draft' | 'archived';
    slug: string;
}
