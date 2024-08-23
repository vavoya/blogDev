import {PostDocument} from "@/types/posts.interface";
import {Tags} from "@/types/tags.interface";


interface AdjacentPosts {

    title: string
    slug: string

}

export interface PostAndAdjacentPostsDocument {
    prevPost: AdjacentPosts;
    nextPost: AdjacentPosts;
    currentPost: Omit<PostDocument, "_id" | "tagIds" & { tags: Pick<Tags, "tags"> }>;
    userId: number
}