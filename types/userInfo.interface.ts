export interface UserInfoDocument extends Document {
    _id: string
    googleId: string
    email: string
    name: string
    blogName: string
    profilePicture: string
    createdAt: string
    userId: number
    maxDirectoryId: number
    maxSeriesId: number
    maxTagId: number
}