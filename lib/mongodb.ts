import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

// 전역 네임스페이스를 확장하여 타입 정의
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
    // 개발 모드에서는 클라이언트를 재사용
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise!;
} else {
    // 프로덕션 모드에서는 새로운 클라이언트를 생성
    client = new MongoClient(uri);
    clientPromise = client.connect()
}

export { clientPromise };
