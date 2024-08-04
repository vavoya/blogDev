

import {clientPromise} from "@/lib/mongodb";
import {PostDocument} from "@/types/posts.interface";
import {GetInitPageNum} from "@/services/getInitPageNum/interface";

/**
 * userId, directoryId -> paginatedPosts(<=12)
 *
 * @param {number} userId - userId 의 posts 탐색
 * @param {number} slug - 기준 slug
 */
export async function getInitPageNumByUserIdSlugDirectoryId({userId, slug}: { userId: number, slug: string }): Promise<GetInitPageNum | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<PostDocument>('posts');
    const agg = [
        {
            '$match': {
                'userId': userId,
                'slug': slug
            }
        }, {
            '$lookup': {
                'from': 'posts',
                'let': {
                    'userId': '$userId',
                    'directoryId': '$directoryId',
                    'slug': '$slug'
                },
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$and': [
                                    {
                                        '$eq': [
                                            '$userId', '$$userId'
                                        ]
                                    }, {
                                        '$eq': [
                                            '$directoryId', '$$directoryId'
                                        ]
                                    }
                                ]
                            }
                        }
                    }, {
                        '$setWindowFields': {
                            'sortBy': {
                                'metadata.createdAt': 1
                            },
                            'output': {
                                'index': {
                                    '$documentNumber': {}
                                }
                            }
                        }
                    }, {
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$slug', '$$slug'
                                ]
                            }
                        }
                    }, {
                        '$project': {
                            '_id': 0,
                            'index': 1
                        }
                    }
                ],
                'as': 'result'
            }
        }, {
            '$project': {
                '_id': 0,
                'seriesId': 1,
                'directoryId': 1,
                'pageNum': {
                    '$add': [
                        {
                            '$floor': {
                                '$divide': [
                                    {
                                        '$subtract': [
                                            {
                                                '$arrayElemAt': [
                                                    '$result.index', 0
                                                ]
                                            }, 1
                                        ]
                                    }, 12
                                ]
                            }
                        }, 1
                    ]
                }
            }
        }
    ];
    const cursor = coll.aggregate<GetInitPageNum>(agg);
    return await cursor.next();
}