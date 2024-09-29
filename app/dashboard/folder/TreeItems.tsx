import TreeItem from "@/app/dashboard/common/TreeItem";
import {checkInputErrors, ErrorState} from "@/app/dashboard/common/checkInputErrors";
import {Directories} from "@/types/directories.interface";
import {useCallback} from "react";

interface TreeItmesProps {
    state: {
        directories: Directories
        currentDirectoryId: number
        initMaxId: number
        errorState: ErrorState
    }
    setState: {
        directories: (directories: Directories) => void
        currentDirectoryId: (currentDirectoryId: number) => void
        errorState: (errorState: ErrorState) => void
    }
}

export default function TreeItems({state, setState}: TreeItmesProps) {


    const addCallback = useCallback((id: number) => {
        const maxDirectoryId = Math.max(...Object.keys(state.directories).map(Number))
        const newDirectoryId = state.initMaxId <= maxDirectoryId ? maxDirectoryId + 1 : state.initMaxId + 1
        const newDirectories = {...state.directories}
        newDirectories[newDirectoryId] = {
            name: "새 폴더",
            parentId: id,
            postCount: 0,
            children: []
        }
        newDirectories[id].children.push(newDirectoryId)

        // 중복 검사
        const newErrorState = {...state.errorState}
        checkInputErrors({
            data: newDirectories,
            errorState: newErrorState,
            children: newDirectories[id].children
        })

        setState.errorState(newErrorState)
        setState.directories(newDirectories)
    }, [setState, state.directories, state.errorState, state.initMaxId])

    const subtractCallback = useCallback((id: number) => {
        const newDirectory = {...state.directories}
        const parentDirectory = newDirectory[newDirectory[id].parentId]
        const index = parentDirectory.children.indexOf(id)

        // 부모 요소의 자식 목록에 현재 디렉토리를 지우고, 그 위치에 자식 목록으로 채우기
        parentDirectory.children.splice(index, 1, ...newDirectory[id].children)

        // 현재 디렉토리의 자식들의 부모 id 변경
        while(newDirectory[id].children.length > 0) {
            const childDirectory = newDirectory[newDirectory[id].children.pop()!]
            childDirectory.parentId = newDirectory[id].parentId
        }

        // 현재 디렉토리 삭제
        delete newDirectory[id]
        setState.directories(newDirectory)
        setState.currentDirectoryId(0)
    }, [setState, state.directories])

    const renderContent = () => {
        const stack = [{
            id: 0,
            level: 0
        }]

        const newTreeElement = []

        while (stack.length > 0) {
            const {id, level} = stack.pop()!;
            newTreeElement.push(
                <TreeItem
                    clickCallback={() => setState.currentDirectoryId(id)}
                    addCallback={() => addCallback(id)}
                    subtractCallback={id !== 0 ? () => subtractCallback(id) : undefined}
                    count={state.directories[id].postCount}
                    isError={!(state.errorState[id] === undefined)}
                    isFocused={id === state.currentDirectoryId}
                    type={'folder'}
                    key={id}
                    itemName={state.directories[id].name}
                    level={level} />
            )
            const children = [...state.directories[id].children]
            while (children.length > 0) {
                stack.push({
                    id: children.pop()!,
                    level: level + 1
                });
            }
        }

        return newTreeElement
    }

    return (
        <>
            {renderContent()}
        </>
    )
}