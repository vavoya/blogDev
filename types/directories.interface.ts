

export interface Directory {
    name: string;
    parentId: number
    postCount: number
    children: number[]
}

export type Directories = { [key: string]: Directory }

export interface DirectoriesDocument extends Document {
    _id: string
    directories: Directories
    userId: number
}