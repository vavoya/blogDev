import { clientPromise } from "@/lib/mongodb";
import { PostDocument } from "@/types/posts.interface";

/**
 * 주어진 사용자 ID와 슬러그를 기준으로 포스트를 가져옵니다.
 *
 * @param {number} userId - posts 를 가져올 사용자의 ID입니다.
 * @param {string} slug - posts 를 가져올 슬러그입니다.
 * @returns {Promise<PostDocument | null>} - 주어진 userId와 slug에 해당하는 post를 반환하는 Promise입니다.
 */
export async function getByUserIdAndSlug({ userId, slug }: { userId: number, slug: string }): Promise<PostDocument | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<PostDocument>('posts');

    return await coll.findOne<PostDocument>({
        userId: userId,
        slug: slug
    });
}
