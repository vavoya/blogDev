

export interface Series {
    name: string;
    updatedAt: string;
    postCount: number;
    thumbnail: string;
}

export type SeriesObject = { [key: string]: Series }

export interface SeriesDocument extends Document {
    _id: number
    series: SeriesObject
    userId: number
}