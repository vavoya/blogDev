export interface FeaturedPostDocument extends Document {
    _id: string
    userId: number
    content: string
}