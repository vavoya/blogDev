import { clientPromise } from "@/lib/mongodb";

interface PostByGoogleIdProps {
    googleId: string;
    email: string;
    name: string;
    blogName: string;
    slug: string;
    introduce: string;
}

/**
* 사용자를 등록하는 함수입니다. 사용자가 중복되는지 여부를 확인하고, 중복되지 않을 경우 새로운 사용자를 생성합니다.
*
* @param {string} googleId - 구글 id
* @param {string} email - 이메일
* @param {string} name - 유저 이름
* @param {string} blogName - 블로그 이름
* @param {string} slug - 블로그 주소
* @param {string} introduce - 유저 한 줄 소개
* @returns {number} - 작업 결과를 나타내는 정수 값
*   0: 에러 발생
*   1: 정상 처리 완료
*   2: googleId가 이미 존재함
*   3: 사용자 이름(name)이 이미 존재함
*   4: 블로그 이름(blogName)이 이미 존재함
*   5: 블로그 주소(slug)가 이미 존재함
*/
export async function postByGoogleId({
                                         googleId,
                                         email,
                                         name,
                                         blogName,
                                         slug,
                                         introduce,
}: PostByGoogleIdProps): Promise<number> {
    const client = await clientPromise;
    const session = client.startSession();

    const database = client.db("Blog");
    const adminCollection = database.collection("admin");
    const userInfoCollection = database.collection("userInfo");
    const directoriesCollection = database.collection("directories");
    const seriesCollection = database.collection("series");
    const tagsCollection = database.collection("tags");
    const featuredPostsCollection = database.collection("featuredPosts");

    session.startTransaction();

    try {
        // 이미 등록된 googleId 검사
        const existingUser = await userInfoCollection.findOne({ googleId }, { session });
        if (existingUser) {
            await session.abortTransaction();
            return 2;
        }

        // 사용자 이름 중복 검사
        const existingUserName = await userInfoCollection.findOne({ name }, { session });
        if (existingUserName) {
            await session.abortTransaction();
            return 3;
        }

        // 블로그 이름 중복 검사
        const existingBlogName = await userInfoCollection.findOne({ blogName }, { session });
        if (existingBlogName) {
            await session.abortTransaction();
            return 4;
        }

        // 블로그 주소 중복 검사
        const existingSlug = await userInfoCollection.findOne({ slug }, { session });
        if (existingSlug) {
            await session.abortTransaction();
            return 5;
        }


        const result = await adminCollection.findOneAndUpdate(
            { id: "userManagementSettings" },
            { $inc: { maxUserId: 1 } },
            { returnDocument: 'after', session: session }
        );

        if (!result) {
            throw new Error("Document not found or update failed");
        }

        const userId = result?.maxUserId

        const newUserInfoDoc = {
            _id: undefined, // MongoDB에서 자동 생성되도록 undefined로 설정
            googleId: googleId,
            email: email,
            name: name,
            blogName: blogName,
            profilePicture: "",
            createdAt: new Date(), // 현재 시간으로 설정
            userId: userId,
            maxDirectoryId: 0,
            maxSeriesId: 0,
            maxTagId: 0,
            slug: slug,
            appleId: "",
            introduce: introduce
        };
        const newDirectoriesDoc = {
            _id: undefined,
            directories: {
                0: {
                    name: "~",
                    parentId: -1,
                    postCount: 0,
                    children: []
                }
            },
            userId: userId
        }
        const newSeriesDoc = {
            _id: undefined,
            series: {},
            userId: userId
        }
        const newTagsDoc = {
            _id: undefined,
            tags: {},
            userId: userId
        }
        const newFeaturedPostsDoc = {
            _id: undefined,
            userId: userId,
            content: "쏼라쏼라"
        }

        await userInfoCollection.insertOne(newUserInfoDoc, { session: session });
        await directoriesCollection.insertOne(newDirectoriesDoc, { session: session });
        await seriesCollection.insertOne(newSeriesDoc, { session: session });
        await tagsCollection.insertOne(newTagsDoc, { session: session });
        await featuredPostsCollection.insertOne(newFeaturedPostsDoc, { session: session });


        await session.commitTransaction();
        console.log("Transaction successfully committed.");
        return 1;
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction aborted due to an error: ", error);
        return 0;
    } finally {
        await session.endSession();
    }
}
