

export interface Series {
    name: string;
    postCount: number;
}

export type SeriesObject = { [key: string]: Series }

export interface SeriesDocument extends Document {
    _id: number
    series: SeriesObject
    userId: number
}