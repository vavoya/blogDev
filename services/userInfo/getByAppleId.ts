import { clientPromise } from "@/lib/mongodb";
import { UserInfoDocument } from "@/types/userInfo.interface";

/**
 * 주어진 슬러그를 기준으로 userInfo 전체를 가져옵니다.
 *
 * @param {string} appleId - userInfo 전체를 가져올 appleId 입니다.
 * @returns {Promise<UserInfoDocument | null>} - appleId 에 해당하는 userInfo 전체를 반환하는 Promise 입니다.
 */
export async function getByAppleId({ appleId }: { appleId: string }): Promise<UserInfoDocument | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<UserInfoDocument>('userInfo');
    const filter = { appleId };
    return await coll.findOne<UserInfoDocument>(filter);
}
