

import {clientPromise} from "@/lib/mongodb";
import {PostDocument} from "@/types/posts.interface";
import {PostIndex} from "@/services/postIndex/interface";

/**
 * userId, directoryId -> paginatedPosts(<=12)
 *
 * @param {number} userId - userId 의 posts 탐색
 * @param {number} seriesId - seriesId 의 posts 탐색
 * @param {number} slug - 기준 slug
 */
export async function getByUserIdAndSeriesIdAndSlug({userId, seriesId, slug}: { userId: number, seriesId: number, slug: string }): Promise<PostIndex | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<PostDocument>('posts');
    const agg = [
        {
            '$match': {
                'userId': userId,
                'seriesId': seriesId
            }
        }, {
            '$setWindowFields': {
                'sortBy': {
                    'metadata.createdAt': -1
                },
                'output': {
                    'index': {
                        '$documentNumber': {}
                    }
                }
            }
        }, {
            '$match': {
                'slug': slug
            }
        }, {
            '$project': {
                '_id': 0,
                'index': 1
            }
        }
    ]
    const cursor = coll.aggregate<PostIndex>(agg);
    return await cursor.next();
}