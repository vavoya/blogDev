import {Directories} from "@/types/directories.interface";
import {Dispatch, MutableRefObject, SetStateAction} from "react";
import FolderItem from "@/app/dashboard2/management/folder/component/FolderItem";
import styles from "@/app/dashboard2/management/folder/component/FolderTree.module.css";


interface FolderTreeProps {
    state: {
        directories: Directories
        selectedFolderId: number
        folderMaxId: MutableRefObject<number>
    }
    setState: {
        directories: Dispatch<SetStateAction<Directories>>
        selectedFolderId: Dispatch<SetStateAction<number>>
    }
}

export default function FolderTree({state, setState}: FolderTreeProps) {

    const addHandler = () => {

        // 서버 성공 후
        if (Object.keys(state.directories).find(id => +id === state.selectedFolderId) === undefined) {
            return
        }

        const newDirectories: Directories = {...state.directories}

        // 새 폴더 숫자 계산
        // "새 폴더" 가 없으면 -1, 있으면 0~
        const maxNum = newDirectories[state.selectedFolderId].children.reduce((max, id) => {
            const name = newDirectories[id].name;
            if (name.startsWith("새 폴더")) {
                const num = Number(name.slice(5));  // "새 폴더" 뒤의 숫자 추출
                const validNum = Number.isNaN(num) ? 0 : num;  // 숫자가 없으면 0 처리
                return Math.max(max, validNum);  // 최대값 반환
            }
            return max;  // "새 폴더"가 아니면 기존 최대값 유지
        }, -1);

        // 새 폴더 설정
        const newName = maxNum === -1 ? "새 폴더" : "새 폴더 " + (maxNum + 1)
        const newParentId = state.selectedFolderId
        const newId = ++state.folderMaxId.current

        // 부모에 추가
        newDirectories[newParentId].children.push(newId)

        newDirectories[newId] = {
            name: newName,
            parentId: newParentId,
            postCount: 0,
            children: []
        }

        setState.directories(newDirectories)
        setState.selectedFolderId(newId)

    }

    const renderContent = () => {
        const rootFolderId = 0
        const stack = [[rootFolderId, 0]]
        const components = []

        while (stack.length > 0) {
            const [folderId, folderLevel] = stack.pop()!
            const children = [...state.directories[folderId].children].sort((a,b)=> state.directories[a].name.localeCompare(state.directories[b].name, undefined, { numeric: true }))
            for (let i = children.length - 1; i >= 0; i--) {
                const folderId = children[i]
                stack.push([folderId, folderLevel + 1])
            }

            components.push(
                <FolderItem
                    key={folderId}
                    state={{
                        directory: state.directories[folderId],
                        directoryId: folderId,
                        level: folderLevel,
                        isSelected: folderId === state.selectedFolderId
                    }}
                    setState={{
                        selectedFolderId: setState.selectedFolderId
                    }} />)
        }


        return components
    }

    return (
        <div className={styles.folderTree}>
            <button className={styles.addNewFolder} onClick={addHandler}>
                폴더 추가
            </button>
            {renderContent()}
        </div>
    )
}