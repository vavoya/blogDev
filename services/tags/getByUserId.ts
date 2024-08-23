import {clientPromise} from "@/lib/mongodb";
import {TagsDocument} from "@/types/tags.interface";

/**
 * userId -> tags
 *
 * @param {number} userId - 디렉토리를 가져올 userId 입니다.
 * @returns {Promise<TagWithoutId | null>} - userId 에 해당하는 디렉토리 리스트를 반환하는 Promise입니다.
 */
export async function getByUserId({userId}: { userId: number }): Promise<TagWithoutId | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<TagsDocument>('tags');
    const filter = {
        userId
    }
    const projection = {
        '_id': 0
    };
    return await coll.findOne<TagWithoutId>(filter, { projection });
}

export type TagWithoutId = Omit<TagsDocument, "_id">;