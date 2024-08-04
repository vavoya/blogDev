

import {clientPromise} from "@/lib/mongodb";
import {
    GetPaginatedPostDocument,
} from "@/services/getPaginatedPosts/interface";
import {PostDocument} from "@/types/posts.interface";

/**
 * userId, directoryId, pageNum -> paginatedPosts(<=12)
 *
 * @param {number} userId - userId 의 posts 탐색
 * @param {number[]} directoryIds - directoryIds 의 posts 탐색
 * @param {number} pageNum - 탐색한 posts skip & limit
 */
export async function getPaginatedPostsByUserIdDirectorysIdPageNum({userId, directoryIds, pageNum}: { userId: number, directoryIds: number[], pageNum: number }): Promise<GetPaginatedPostDocument | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<PostDocument>('posts');
    const agg = [
        {
            '$match': {
                'userId': userId,
                'directoryId': {
                    '$in': directoryIds
                }
            }
        }, {
            '$sort': {
                'metadata.createdAt': 1
            }
        }, {
            '$group': {
                '_id': null,
                'postCount': {
                    '$sum': 1
                },
                'documents': {
                    '$push': '$$ROOT'
                }
            }
        }, {
            '$project': {
                '_id': 0,
                'postCount': 1,
                'PaginatedPostDocuments': {
                    '$slice': [
                        '$documents', (pageNum - 1) * 12, 12
                    ]
                }
            }
        }, {
            '$project': {
                'postCount': 1,
                'PaginatedPostDocuments.slug': 1,
                'PaginatedPostDocuments.title': 1,
                'PaginatedPostDocuments.metadata': 1,
                'PaginatedPostDocuments.directoryId': 1
            }
        }
    ];
    const cursor = coll.aggregate<GetPaginatedPostDocument>(agg);
    return await cursor.next();
}
