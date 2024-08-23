export type UserId = number

export interface UserInfoDocument extends Document {
    _id: string
    googleId: string
    appleId: string
    email: string
    name: string
    blogName: string
    slug: string
    introduce: string
    profilePicture: string
    createdAt: string
    userId: UserId
    maxDirectoryId: number
    maxSeriesId: number
    maxTagId: number
}