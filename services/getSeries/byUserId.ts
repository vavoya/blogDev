import {clientPromise} from "@/lib/mongodb";
import {SeriesDocument} from "@/types/series.interface";

/**
 * userId -> series
 *
 * @param {number} userId - 디렉토리를 가져올 userId 입니다.
 * @returns {Promise<GetSeriesDocument | null>} - userId 에 해당하는 시리즈 리스트를 반환하는 Promise입니다.
 */
export async function getSeriesByUserId({userId}: { userId: number }): Promise<GetSeriesDocument | null> {
    const client = await clientPromise;
    const coll = client.db('Blog').collection<SeriesDocument>('series');
    const filter = {
        userId
    }
    const projection = {
        '_id': 0
    };
    return await coll.findOne<GetSeriesDocument>(filter, { projection });
}

export type GetSeriesDocument = Omit<SeriesDocument, "_id">;