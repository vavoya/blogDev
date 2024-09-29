
type errorCallbackType = (code: number) => void
type processCallbackType = (task: any) => Promise<number | null>

interface UpdatedAt {
    updatedAt: Date
    newUpdatedAt: Date
}

export class AsyncTaskManager<T extends UpdatedAt> {
    private readonly taskQueue: T[];
    private processing: boolean
    private isWaiting: boolean
    private updatedAt: Date

    /**
     * 0 - 작업 없음<br/>
     * 1 - 작업 중<br/>
     * 2 - 서버와 동기화가 안되는 작업<br/>
     * 3 - 업데이트 에러<br/>
     * */
    private errorCallback: errorCallbackType
    private processCallback: processCallbackType

    constructor(updatedAt: Date, processCallback: processCallbackType, errorCallback: errorCallbackType) {
        this.taskQueue = []
        this.processing = true
        this.isWaiting = false
        this.updatedAt = updatedAt
        this.errorCallback = errorCallback
        this.processCallback = processCallback
        this.processAsyncTask()
    }

    // 작업을 종료하는 메서드. useEffect 클린업에 사용 필수. 메모리 누수 방지
    stop() {
        this.taskQueue.length = 0
        this.processing = false;
    }

    // 작업 초기화
    private clear() {
        this.taskQueue.length = 0
        this.processing = true
        this.isWaiting = false
        this.errorCallback(0)
    }

    add(task: T) {
        this.taskQueue.push(task);
        console.log("추가")
        this.errorCallback(1)
    }

    // 작업 중단
    private pause() {
        this.isWaiting = true
    }

    // 작업 재개
    resume() {
        this.isWaiting = false
    }


    private async processAsyncTask() {
        while(this.processing || this.taskQueue.length > 0) {
            console.log("반복문")
            // 작업에 Block. 에러가 발생해서 사용자 응답 대기
            if (this.isWaiting) {
                await this.delay(1000)
                continue
            }

            // 대기 중인 작업이 없으면 pass
            if (this.taskQueue.length === 0) {
                // 작업이 없음을 알리기
                this.errorCallback(0)
                await this.delay(1000)
                continue
            }

            // 작업 중 알리기
            this.errorCallback(1)

            const task = this.taskQueue[0]
            // DB와 동기화 여부 확인
            task.updatedAt = this.updatedAt
            console.log("작업 중", task.updatedAt)
            const result: number | null = await this.processCallback(task)
            console.log("작업 끝", result)
            await this.delay(1000)

            switch (result) {
                case 0:
                    // 정상
                    // updatedAt 최신화하기
                    this.updatedAt = task.newUpdatedAt
                    // 완료한 작업 지우기
                    this.taskQueue.shift()
                    break
                case 1:
                    // 오래된 데이터
                    // 유효하지 않은 작업이니, 초기화
                    this.clear()
                    // 동기화 에러 알리기
                    this.errorCallback(2)
                    break
                case 2:
                // 업데이트 에러
                default:
                    // 그 외 모든 에러. 서버 연결. 데이터 에러 등등
                    // 사용자의 대응 기다리기
                    this.pause()
                    // 업데이트 에러 알리기
                    this.errorCallback(3)
                    break
            }
            await this.delay(1000)
        }
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}