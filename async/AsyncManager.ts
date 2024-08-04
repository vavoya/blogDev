interface AsyncTaskObject {
    [key: string]: any
}

class AsyncManager {
    private asyncTaskObject: AsyncTaskObject = {}

    constructor() {
    }

    run (ayncCallbackFunc: () => Promise<any>, tag: string): Promise<any> {
        if (tag in this.asyncTaskObject) {
            return this.asyncTaskObject[tag]
        } else {
            const promise = ayncCallbackFunc().finally(() => {
                delete this.asyncTaskObject[tag];
            });
            this.asyncTaskObject[tag] = promise;
            return promise;

        }
    }
}

// AsyncManager 인스턴스 생성
const asyncManager = new AsyncManager();
export default asyncManager