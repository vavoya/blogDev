

import {clientPromise} from "@/lib/mongodb";
import {PostAndAdjacentPostsDocument} from "@/services/getPostAndAdjacentPosts/interface";
import {PostDocument} from "@/types/posts.interface";

/**
 * 주어진 블로그 이름을 기준으로 디렉토리 리스트를 가져옵니다.
 *
 * @param {string} blogName - posts 를 가져올 블로그의 이름입니다
 * @param {string} slug - posts 를 가져올 slug 입니다
 * @returns {Promise<PostAndAdjacentPostsDocument | null>} - blogName + slug 에 해당하는 posts 를 반환하는 Promise 입니다.
 */
export async function getPostAndAdjacentPostsByUserId_Slug({userId, slug}: { userId: number, slug: string }): Promise<PostAndAdjacentPostsDocument | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<PostDocument>('posts');
    const agg = [
        {
            '$match': {
                'userId': userId
            }
        }, {
            '$sort': {
                'metadata.createdAt': 1
            }
        }, {
            '$group': {
                '_id': null,
                'posts': {
                    '$push': '$$ROOT'
                }
            }
        }, {
            '$addFields': {
                'currentIndex': {
                    '$indexOfArray': [
                        '$posts.slug', slug
                    ]
                }
            }
        }, {
            '$addFields': {
                'currentPost': {
                    '$arrayElemAt': [
                        '$posts', '$currentIndex'
                    ]
                },
                'previousPost': {
                    '$arrayElemAt': [
                        '$posts', {
                            '$subtract': [
                                '$currentIndex', 1
                            ]
                        }
                    ]
                },
                'nextPost': {
                    '$arrayElemAt': [
                        '$posts', {
                            '$add': [
                                '$currentIndex', 1
                            ]
                        }
                    ]
                }
            }
        }, {
            '$addFields': {
                'userId': '$currentPost.userId'
            }
        }, {
            '$project': {
                'userId': 1,
                'previousPost.title': 1,
                'previousPost.slug': 1,
                'currentPost': 1,
                'nextPost.title': 1,
                'nextPost.slug': 1,
                '_id': 0
            }
        }, {
            '$lookup': {
                'from': 'tags',
                'let': {
                    'tagIds': '$currentPost.tagIds',
                    'userId': '$userId'
                },
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$userId', '$$userId'
                                ]
                            }
                        }
                    }, {
                        '$project': {
                            '_id': 0,
                            'tags': {
                                '$arrayToObject': {
                                    '$filter': {
                                        'input': {
                                            '$objectToArray': '$tags'
                                        },
                                        'as': 'tag',
                                        'cond': {
                                            '$in': [
                                                {
                                                    '$toInt': '$$tag.k'
                                                }, '$$tagIds'
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                ],
                'as': 'tagDetails'
            }
        }, {
            '$addFields': {
                'currentPost.tags': {
                    '$arrayElemAt': [
                        '$tagDetails.tags', 0
                    ]
                }
            }
        }, {
            '$unset': [
                'currentPost.tagIds', 'currentPost._id', 'tagDetails'
            ]
        }
    ];
    const cursor = coll.aggregate<PostAndAdjacentPostsDocument>(agg);
    return await cursor.next();
}