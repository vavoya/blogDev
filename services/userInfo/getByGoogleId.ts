import { clientPromise } from "@/lib/mongodb";
import { UserInfoDocument } from "@/types/userInfo.interface";

/**
 * 주어진 슬러그를 기준으로 userInfo 전체를 가져옵니다.
 *
 * @param {string} googleId - userInfo 전체를 가져올 googleId 입니다.
 * @returns {Promise<UserInfoDocument | null>} - googleId 에 해당하는 userInfo 전체를 반환하는 Promise 입니다.
 */
export async function getByGoogleId({ googleId }: { googleId: string }): Promise<UserInfoDocument | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<UserInfoDocument>('userInfo');
    const filter = { googleId };
    return await coll.findOne<UserInfoDocument>(filter);
}
