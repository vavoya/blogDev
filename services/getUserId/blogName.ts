import {clientPromise} from "@/lib/mongodb";
import {UserInfoDocument} from "@/types/userInfo.interface";

/**
 * 주어진 블로그 이름을 기준으로 태그 리스트를 가져옵니다.
 *
 * @param {string} blogName - userId 를 가져올 blogName 입니다.
 * @returns {Promise<GetUserIdDocument | null>} - blogName 에 해당하는 userId 반환하는 Promise 입니다.
 */
export async function getUserIdByBlogName({blogName}: { blogName: string }): Promise<GetUserIdDocument | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<UserInfoDocument>('userInfo');
    const filter = {
        blogName,
    };
    const projection = {
        '_id': 0,
        'userId': 1
    };
    return await coll.findOne<GetUserIdDocument>(filter, { projection });
}

export type GetUserIdDocument = Pick<UserInfoDocument, "userId">