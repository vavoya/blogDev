'use client'

import Layout from "@/app/dashboard/common/Layout";
import TreeItem from "@/app/dashboard/common/TreeItem";
import InputFieldWithLabel from "@/app/dashboard/common/InputFieldWithLabel";
import Button from "@/app/dashboard/common/Button";
import {useEffect, useState} from "react";
import {Tags} from "@/types/tags.interface";



export default function Series({data}: {data: Tags}) {
    const [tags, setTags] = useState<Tags>({...data});
    const [treeElements, setTreeElements] = useState<any>([]);
    const [detailsElements, setDetailsElements] = useState<any>([]);
    const [currentTagId, setCurrentTagId] = useState<number | null>(null);

    // 트리 컴포넌트 초기 렌더링
    useEffect(() => {
        const newTreeElement = Object.keys(tags).map(key => {
            return (
                <TreeItem
                    clickCallback={() => {
                        setCurrentTagId(+key)
                    }}
                    addCallback={() => {
                        const maxTagId = Math.max(...Object.keys(tags).map(Number))
                        const newTagId = maxTagId + 1
                        const newTags = {...tags}
                        newTags[newTagId] = {
                            name: "새 태그",
                            postCount: 0,
                        }
                        setTags(newTags)
                    }}
                    subtractCallback={() => {
                        const newTags = {...tags}
                        // 현재 시리즈 삭제
                        delete newTags[key]
                        setTags(newTags)
                        setCurrentTagId(null)
                    }}
                    count={tags[key].postCount}
                    isFocused={+key === currentTagId}
                    type={'tag'}
                    key={key}
                    itemName={tags[key].name}
                    level={0} />
            )
        })


        setTreeElements(newTreeElement);
    }, [tags, currentTagId]);


    useEffect(() => {
        let path = ""

        setDetailsElements([
            <InputFieldWithLabel
                key={'0'}
                id={currentTagId === null ? undefined : currentTagId}
                labelText={"태그 명"}
                value={currentTagId !== null ? tags[currentTagId].name : ""}
                placeholder={currentTagId === null ? "태그를 선택해 주세요" : "태그 명을 입력해 주세요"}
                readOnly={currentTagId === null}
                onChange={(e) => {
                    const newSeries = {...tags};
                    newSeries[currentTagId].name = e.target.value;
                    setTags(newSeries)
                }}/>,

            <Button key={'2'} text={"변경 사항 저장"} />
        ])
    }, [currentTagId]);


    return (
        <Layout treeElements={treeElements} detailsElements={detailsElements} />
    )
}

