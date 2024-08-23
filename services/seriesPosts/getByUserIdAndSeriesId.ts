import {clientPromise} from "@/lib/mongodb";
import {PostDocument} from "@/types/posts.interface";
import {SeriesPost} from "@/services/seriesPosts/interface";

/**
 * userId, seriesId -> posts(<=50)
 *
 * @param {number} userId - userId 의 posts 탐색
 * @param {number} seriesId - seriesId 의 posts 탐색
 */
export async function getByUserIdAndSeriesId({userId, seriesId}: { userId: number, seriesId: number }): Promise<SeriesPost[] | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<PostDocument>('posts');
    const filter = {
        'userId': userId,
        'seriesId': seriesId
    };
    const projection = {
        'title': 1,
        'directoryId': 1,
        'seriesOrder': 1,
        'slug': 1,
        '_id': 0
    };
    const cursor = coll.find<SeriesPost>(filter, { projection });
    return await cursor.toArray()
}
