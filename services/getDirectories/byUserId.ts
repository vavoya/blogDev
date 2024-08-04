import {clientPromise} from "@/lib/mongodb";
import {Directories, DirectoriesDocument} from "@/types/directories.interface";

/**
 * userId -> directories
 *
 * @param {number} userId - 디렉토리를 가져올 userId 입니다.
 * @returns {Promise<GetDirectoriesDocument | null>} - userId 에 해당하는 디렉토리 리스트를 반환하는 Promise입니다.
 */
export async function getDirectoriesByUserId({userId}: { userId: number }): Promise<GetDirectoriesDocument | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<DirectoriesDocument>('directories');
    const filter = {
        userId
    }
    const projection = {
        '_id': 0
    };
    return await coll.findOne<GetDirectoriesDocument>(filter, { projection });
}


export type GetDirectoriesDocument = Omit<DirectoriesDocument, "_id">