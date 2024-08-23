import {PostDocument} from "@/types/posts.interface";


export type SeriesPost = Pick<PostDocument, "title" | "directoryId" | "seriesOrder" | "slug">