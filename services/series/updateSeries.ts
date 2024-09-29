import {clientPromise} from "@/lib/mongodb";
import {ClientSession} from "mongodb";
import {AsyncTask} from "@/app/dashboard2/management/series/component/SeriesSection";


/**
*   0: 정상<br/>
*   1: 오래된 데이터 수정<br/>
*   2: 업데이트 에러<br/>
*/
export async function updateSeries({userId, validTask}: {userId: number, validTask: AsyncTask} ) {
    const client = await clientPromise;
    const seriesCollection = client.db('Blog').collection('series');
    const postsCollection = client.db('Blog').collection('posts');

    const session: ClientSession = client.startSession();

    async function deleteSeries() {
        const seriesPath = `series.${validTask.seriesId}`;
        await seriesCollection.updateOne(
            { userId: userId },
            {
                $unset: {
                    [seriesPath]: ""
                }
            },
            { session }  // 트랜잭션 세션 내에서 실행
        )
        await postsCollection.updateMany(
            { userId: userId, seriesId: validTask.seriesId },
            {
                $set: {
                    seriesId : -1,
                    seriesOrder: -1,
                }
            }
        )


    }

    async function updateSereis() {
        const seriesPath = `series.${validTask.seriesId}`;
        await seriesCollection.updateOne(
            { userId: userId },
            {
                $set: {
                    [`${seriesPath}.name`]: validTask.name,   // 동적 키의 name 필드를 업데이트
                    [`${seriesPath}.postCount`]: validTask.postCount,     // 동적 키의 postCount 필드를 업데이트
                    'updatedAt': validTask.newUpdatedAt // 업데이트를 업데이트
                }
            },
            { session }  // 트랜잭션 세션 내에서 실행
        );

        for (const post of validTask.posts) {
            await postsCollection.updateOne(
                { userId: userId, slug: post.slug },
                {
                    $set: {
                        seriesId : post.seriesId,
                        seriesOrder: post.seriesOrder,
                    }
                },
                { session }  // 트랜잭션 세션 내에서 실행
            );
        }
    }

    try {
        // 트랜잭션 시작
        session.startTransaction();

        // updatedAt이 유효한지 검사
        const validRequest = await seriesCollection.findOne({ userId, updatedAt: validTask.updatedAt }, { session });
        if (!validRequest) {
            // "Document with matching userId and updatedAt not found, or outdated document."
            return 1
        }

        validTask.delete ? await deleteSeries() : await updateSereis()

        await session.commitTransaction(); // 트랜잭션 커밋
        return 0

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction(); // 트랜잭션 중단
        }
        console.error("업데이트 에러:", error);
        return 2

    } finally {
        await session.endSession(); // 세션 종료
    }

}

