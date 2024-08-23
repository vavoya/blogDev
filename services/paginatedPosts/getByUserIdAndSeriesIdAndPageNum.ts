

import {clientPromise} from "@/lib/mongodb";
import {PaginatedPostsWithCount} from "@/services/paginatedPosts/interface";
import {PostDocument} from "@/types/posts.interface";

/**
 * userId, seriesIds, pageNum -> paginatedPosts(<=12)
 *
 * @param {number} userId - userId 의 posts 탐색
 * @param {number} seriesId - seriesIds 의 posts 탐색
 * @param {number} pageNum - 탐색한 posts skip & limit
 */
export async function getByUserIdAndSeriesIdAndPageNum({userId, seriesId, pageNum}: { userId: number, seriesId: number, pageNum: number }): Promise<PaginatedPostsWithCount | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<PostDocument>('posts');
    const agg = [
        {
            '$match': {
                'userId': userId,
                'seriesId': seriesId
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
                'postCount': {
                    '$arrayElemAt': [
                        '$postCount.count', 0
                    ]
                },
                'paginatedPosts.slug': 1,
                'paginatedPosts.title': 1,
                'paginatedPosts.metadata': 1,
                'paginatedPosts.directoryId': 1
            }
        }
    ];
    const cursor = coll.aggregate<PaginatedPostsWithCount>(agg);
    return await cursor.next();
}
