

import {clientPromise} from "@/lib/mongodb";
import {PostDocument} from "@/types/posts.interface";
import {PaginatedPosts} from "@/services/paginatedPosts/forSeries/interface";

/**
 * userId, directoryId, pageNum -> paginatedPosts(<=12)
 *
 * @param {number} userId - userId 의 posts 탐색
 * @param {number} directoryId - directoryId 의 posts 탐색
 * @param {number} pageNum - 탐색한 posts skip & limit
 */
export async function getByUserIdAndDirectoryIdAndPageNum({userId, directoryId, pageNum}: { userId: number, directoryId: number, pageNum: number }): Promise<PaginatedPosts | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<PostDocument>('posts');
    const agg = [
        {
            '$match': {
                'userId': userId,
                'directoryId': directoryId
            }
        }, {
            '$sort': {
                'metadata.createdAt': -1
            }
        }, {
            '$facet': {
                'postCount': [
                    {
                        '$count': 'count'
                    }
                ],
                'paginatedPosts': [
                    {
                        '$skip': (pageNum - 1) * 12,
                    }, {
                        '$limit': 12
                    }
                ]
            }
        }, {
            '$project': {
                'paginatedPosts.slug': 1,
                'paginatedPosts.title': 1,
                'paginatedPosts.directoryId': 1
            }
        }
    ];
    const cursor = coll.aggregate<PaginatedPosts>(agg);
    return await cursor.next();
}
