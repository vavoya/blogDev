import {Directories} from "@/types/directories.interface";
import {SeriesObject} from "@/types/series.interface";
import {Tags} from "@/types/tags.interface";

/**
 *
 * @param directories - 디렉토리 정보
 * @param children - 현재 계층 디렉토리 ids
 * @param errorState - 에러를 저장할 객체, 에러 정보가 저장될 객체
 * @param currentDirectoryId - 현재 입력 디렉토리 id
 * @return errorState - 에러 객체 반환
 */

// 공백 0, 중복 1, trim 2
export const folderErrorTexts = ["폴더 이름을 적어주세요", "이미 존재하는 폴더 이름 입니다", "이름 양쪽의 공백을 제거해 주세요"]
export const seriesErrorTexts = ["시리즈 이름을 적어주세요", "이미 존재하는 시리즈 이름 입니다", "이름 양쪽의 공백을 제거해 주세요"]
export const tagErrorTexts = ["태그 이름을 적어주세요", "이미 존재하는 태그 이름 입니다", "이름 양쪽의 공백을 제거해 주세요"]

export interface ErrorState {
    [key: string]: number
}

export const checkInputErrors = ({data, children, errorState}: {data: Directories | SeriesObject | Tags, children: number[], errorState: ErrorState}) => {

    // 중복 수집 and 기존 에러 제거
    const dup: { [key: string]: number[] } = {}
    children.forEach(v => {
        delete errorState[v]
        const name = data[v].name
        if (dup[name]){
            dup[name].push(v)
        } else {
            dup[name] = [v]
        }
    })

    // 중복
    Object.values(dup).forEach(v => {
        if (v.length > 1) {
            v.forEach(id => {
                errorState[id] = 1
            })
        }
    })

    // 공백
    children.forEach(v => {
        const name = data[v].name
        if (name === "") {
            errorState[v] = 0;
        }
    })

    // trim
    children.forEach(v => {
        const name = data[v].name
        const trimmedName = name.trim();
        if (trimmedName !== name) {
            errorState[v] = 2;
        }
    })

    return errorState
}