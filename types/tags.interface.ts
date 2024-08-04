

export interface Tag {
    name: string;
    postCount: number
}

export type Tags = { [key: string]: Tag }

export interface TagsDocument extends Document {
    _id: number
    tags: Tags
    userId: number
}