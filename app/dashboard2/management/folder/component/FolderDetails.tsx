

import styles from "@/app/dashboard2/management/folder/component/FolderDatails.module.css"
import DropBox from "@/app/dashboard2/management/common/DropBox";
import {Directories} from "@/types/directories.interface";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import getDirectoryTree from "@/utils/directoryTree";

interface FolderDatailsProps {
    state: {
        directories: Directories,
        selectedFolderId: number
    }
    setState: {
        directories: Dispatch<SetStateAction<Directories>>
        selectedFolderId: Dispatch<SetStateAction<number>>
    }
}

export default function FolderDetails({state, setState}: FolderDatailsProps) {
    const ref = useRef<HTMLInputElement>(null)
    const [translateX, setTranslateX] = useState(100);
    const [isDropboxMounted, setIsDropboxMounted] = useState(false)
    // 수정 도중에 path가 바뀌는 경우에는 directories가 아닌, 임시 parentId를 수정. 서버 저장 성공하면 그때 directories에서 수정
    const [parentId, setParentId] = useState<number>(state.directories[state.selectedFolderId].parentId)
    const folderPath = getDirectoryTree({directories: state.directories, directoryId: parentId}).path

    useEffect(() => {
        //requestAnimationFrame(() => setTranslateX(0))
        setTranslateX(0)

    }, [])

    useEffect(() => {
        setParentId(state.directories[state.selectedFolderId].parentId)
    }, [state.directories, state.selectedFolderId]);

    const deleteHandler = () => {


        // 여기 기능은 서버에 삭제 성공한 후에 동작
        const newDirectories: Directories = {...state.directories}
        const currentParentId = newDirectories[state.selectedFolderId].parentId

        // 포스트 이동
        newDirectories[currentParentId].postCount += newDirectories[state.selectedFolderId].postCount

        // 부모-자식 관계 수정
        newDirectories[state.selectedFolderId].children.map(v => newDirectories[v].parentId = currentParentId)
        newDirectories[currentParentId].children.push(...newDirectories[state.selectedFolderId].children)
        newDirectories[currentParentId].children = newDirectories[currentParentId].children.filter(v => v !== state.selectedFolderId)

        // 현재 폴더 삭제
        delete newDirectories[state.selectedFolderId]

        // 선택 폴더 초기화
        setState.selectedFolderId(0)

        // 디렉토리 수정
        setState.directories(newDirectories)
    }

    const saveHandler = () => {


        // 여기 기능은 서버에 저장 성공한 후에 동작
        const name = ref.current?.value ?? ""
        const newDirectories: Directories = {...state.directories}

        // 1단계, 현재 폴더 트리에서 제외시키기
        const currentParentId = newDirectories[state.selectedFolderId].parentId
        // 부모에게서 현재 폴더 지우기
        newDirectories[currentParentId].children = newDirectories[currentParentId].children.filter(v => v !== state.selectedFolderId)

        // 2단계, 현재 폴더로 새로운 위치에 추가
        newDirectories[parentId].children.push(state.selectedFolderId)
        newDirectories[state.selectedFolderId].parentId = parentId

        // 이름 수정
        newDirectories[state.selectedFolderId].name = name

        setState.directories(newDirectories)

    }

    const keyDownHandler = (e) => {

    }

    const clickHandler = (id: number) => {
        setParentId(id)
    }

    return (
        <div className={styles.folderDetails} style={{transform: `translateX(${translateX}%)`}}>
            <span className={styles.folderDetailsTitle}>
                경로
            </span>
            <div className={styles.folderDetailsInput} style={{zIndex: isDropboxMounted ? 1 : 0}}>
                <span onClick={() => setIsDropboxMounted(true)}>{folderPath}</span>
                {
                    isDropboxMounted &&
                    <DropBox setDropBox={setIsDropboxMounted} keyDownHandler={keyDownHandler} head={<span>{folderPath}</span>}>
                        {
                            // 상위 폴더로 이동이 가능하면
                            parentId !== 0 ?
                                <button
                                    className={styles.dropBoxItem}
                                    key={state.directories[parentId].parentId}
                                    onClick={() => clickHandler(state.directories[parentId].parentId)}>
                                    ..
                                </button> : null
                        }
                        {
                            state.directories[parentId].children.map(v => {
                                if (v === state.selectedFolderId) return null

                                return (
                                    <button
                                        className={styles.dropBoxItem}
                                        key={v}
                                        onClick={() => clickHandler(v)}>
                                        {state.directories[v].name}
                                    </button>
                                )
                            })
                        }
                    </DropBox>
                }
            </div>
            <span className={styles.folderDetailsTitle}>
                폴더 명
            </span>
            <div className={styles.folderDetailsInput}>
                <input
                    ref={ref}
                    key={state.selectedFolderId}
                    placeholder={"폴더 명을 입력하세요"}
                    defaultValue={state.directories[state.selectedFolderId].name}/>
            </div>
            <div className={styles.actionButtons}>
                <button onClick={deleteHandler}>
                    삭제
                </button>
                <button onClick={saveHandler}>
                    저장
                </button>
            </div>
        </div>
    )
}