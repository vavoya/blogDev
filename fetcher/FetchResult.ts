


export class FetchResult<T> {
    private _status: number;
    private _data: T | null;

    constructor(status: number, data: T | null) {
        this._status = status;
        this._data = data;
    }

    get status(): number {
        return this._status;
    }

    get data(): T | null {
        return this._data;
    }
}
