'use client'

import Layout from "@/app/dashboard/common/Layout";
import TreeItem from "@/app/dashboard/common/TreeItem";
import InputFieldWithLabel from "@/app/dashboard/common/InputFieldWithLabel";
import Button from "@/app/dashboard/common/Button";
import {Directories} from "@/types/directories.interface";
import {useEffect, useState} from "react";
import getDirectoryTree from "@/utils/directoryTree";
import ProcessingOverlay from "@/components/processingOverlay/ProcessingOverlay";
import {ErrorState, checkInputErrors, folderErrorTexts} from "@/app/dashboard/common/checkInputErrors";

// 모든 JSX 다시 계산하는거 인지
// 글자 20 제한, 양쪽 공백 제한, 빈 이름 제한, 중복 제한
export default function Folder({data}: {data: Directories}) {
    const initMaxId = Math.max(...Object.keys(data).map(Number))
    const [directories, setDirectories] = useState<Directories>(JSON.parse(JSON.stringify(data)));
    const [treeElements, setTreeElements] = useState<any>([]);
    const [detailsElements, setDetailsElements] = useState<any>([]);
    const [currentDirectoryId, setCurrentDirectoryId] = useState<number>(0);
    const [errorState, setErrorState] = useState<ErrorState>({});


    // 트리 컴포넌트 초기 렌더링
    useEffect(() => {
        const stack = [{
            id: 0,
            level: 0
        }]

        const newTreeElement = []

        while (stack.length > 0) {
            const {id, level} = stack.pop()!;
            console.log(id, level)
            newTreeElement.push(
                <TreeItem
                    clickCallback={() => {
                        setCurrentDirectoryId(id)
                    }}
                    addCallback={() => {
                        const maxDirectoryId = Math.max(...Object.keys(directories).map(Number))
                        const newDirectoryId = initMaxId <= maxDirectoryId ? maxDirectoryId + 1 : initMaxId + 1
                        const newDirectories = {...directories}
                        newDirectories[newDirectoryId] = {
                            name: "새 폴더",
                            parentId: id,
                            postCount: 0,
                            children: []
                        }
                        newDirectories[id].children.push(newDirectoryId)

                        // 중복 검사
                        const newErrorState = {...errorState}
                        checkInputErrors({
                            data: newDirectories,
                            errorState: newErrorState,
                            children: newDirectories[id].children
                        })

                        setErrorState(newErrorState)
                        setDirectories(newDirectories)
                    }}
                    subtractCallback={id !== 0 ? () => {
                        const newDirectory = {...directories}
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
                        setDirectories(newDirectory)
                        setCurrentDirectoryId(0)
                    }: undefined}
                    count={directories[id].postCount}
                    isError={!(errorState[id] === undefined)}
                    isFocused={id === currentDirectoryId}
                    type={'folder'}
                    key={id}
                    itemName={directories[id].name}
                    level={level} />
            )
            const children = [...directories[id].children]
            while (children.length > 0) {
                stack.push({
                    id: children.pop()!,
                    level: level + 1
                });
            }
        }

        setTreeElements(newTreeElement);
    }, [directories, currentDirectoryId]);
    // errorState 를 의존성으로 안넣어도 되는 이유 -> 어차피 directories 의 name 필드가 수정되기에 상관없음

    useEffect(() => {
        let path = ""
        if (currentDirectoryId) {
            const parentId = directories[currentDirectoryId].parentId
            if (parentId !== -1) {
                path = getDirectoryTree({directories, directoryId: parentId}).path;
            }
        }
        const errorCode = errorState[currentDirectoryId]
        const errorText = errorCode === undefined ? undefined : folderErrorTexts[errorCode]

        setDetailsElements([
            <InputFieldWithLabel
                key={'0'}
                labelText={"경로"}
                value={path}
                readOnly={true}/>,
            <InputFieldWithLabel
                key={'1'}
                maxLength={20}
                errorText={errorText}
                id={currentDirectoryId}
                labelText={"폴더 이름"}
                value={directories[currentDirectoryId].name}
                placeholder={"폴더 이름을 입력해 주세요"}
                readOnly={currentDirectoryId === 0}
                onChange={(e) => {
                    const newErrorState = {...errorState}
                    const newDirectories = {...directories};
                    newDirectories[currentDirectoryId].name = e.target.value;
                    const parentId = newDirectories[currentDirectoryId].parentId;

                    checkInputErrors({
                        data: newDirectories,
                        children: newDirectories[parentId].children,
                        errorState: newErrorState,
                    })

                    // 정상
                    setErrorState(newErrorState)
                    setDirectories(newDirectories)
                }}/>,
            <Button key={'2'} text={"변경 사항 저장"} />
        ])
    }, [currentDirectoryId, errorState]);




    return (
        <>
            <Layout treeElements={treeElements} detailsElements={detailsElements} />
            {/*<ProcessingOverlay text={"에러에러!!"} onClick={() => null}/>*/}
        </>
    )
}