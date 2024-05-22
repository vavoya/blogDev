
import React, {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {reader} from "next/dist/experimental/testmode/fetch";
import { observer } from 'mobx-react-lite';
import Node from './Node'
import Tree from './TreeStore'
import {action, reaction} from "mobx";





export const Editor = observer(() => {
    const [keyList, setKeyList] = useState<number[]>([]);
    const [node, setNode] = useState<Node>();
    const ref = useRef(null);


    const handleKeyDown = useCallback(
        action((e: KeyboardEvent) => {
            Tree.render = false;
            switch (e.key) {
                case 'Enter': {
                    e.preventDefault();
                    console.log('새노드 추가');
                    console.log(Tree.root.children);
                    const maxKey = Tree.root.children.reduce((max, child) => Math.max(max, child.key), -1);
                    const newPNode = new Node({key: maxKey + 1, id: 0, type: 'p'});
                    const newSpanNode = new Node({key: 0, id: 0, type: 'span', text: "응애, 나 새로운 문단"});
                    newPNode.children.push(newSpanNode);
                    Tree.root.children.push(newPNode)
                    Tree.render = true
                    break;
                }
                case 'Backspace': {
                    console.log(e)
                    //Tree.render = true
                    break;
                }
            }
            console.log(e.key);
            console.log(ref);
        }),
        [Tree.root]
    );



    // 초기 VDOM 생성
    useEffect(() => {
        // 초기 루트 노드 설정
        const rootNode = new Node({key: 0, id: 0, type: 'div'})
        const h2Node = new Node({key: 0, id: 0, type: 'h2', text: "이것은 제목이여"})
        const pNode = new Node({key: 1, id: 0, type: 'p'})
        const spanNode = new Node({key: 0, id: 0, type: 'span', text: "예시"})
        const spanNode2 = new Node({key: 1, id: 0, type: 'span', text: "에시2",
        font: {bold: true, italic: false, strike: false, underline: false}})
        const spanNode3 = new Node({key: 2, id: 0, type: 'span', text: "에시3",
            font: {bold: true, italic: true, strike: false, underline: false}})
        const spanNode4 = new Node({key: 3, id: 0, type: 'span', text: "에시4",
            font: {bold: true, italic: true, strike: true, underline: false}})
        const spanNode5 = new Node({key: 4, id: 0, type: 'span', text: "에시5",
            font: {bold: true, italic: true, strike: false, underline: true}})
        spanNode.parent = pNode
        pNode.children.push(spanNode)
        pNode.children.push(spanNode2)
        pNode.children.push(spanNode3)
        pNode.children.push(spanNode4)
        pNode.children.push(spanNode5)
        pNode.parent = rootNode
        rootNode.children.push(h2Node)
        rootNode.children.push(pNode)
        setNode(rootNode)
        Tree.root = rootNode
        Tree.render = false

        const updateKeyList = () => {
            const list = Tree.root.children.map(childNode => childNode?.key);
            setKeyList(list);
        };

        // 초기 keyList 설정
        updateKeyList();

        const disposeReaction = reaction(
            () => Tree.render,
            (render: boolean) => {
                if (!render) return;

                // 자식 노드의 길이가 동일한지 확인
                if (Tree.root.children.length === keyList.length) {
                    // 자식 노드의 key가 동일한지 확인
                    for (let i = 0; i < keyList.length; i++) {
                        if (Tree.root.children[i]?.key !== keyList[i]) {
                            updateKeyList();
                            return;
                        }
                    }
                    return;
                }

                // 자식 노드의 구조가 변경되었으므로 keyList 업데이트
                updateKeyList();
            }
        );

        return () => {
            disposeReaction();
        };

    }, []);




    return (
        <div
            key={0}
            ref={ref}
            onKeyDown={handleKeyDown}
            contentEditable={true}
            suppressContentEditableWarning={true}>
            {Tree.root?.children?.map((node) => (parshing(node)))}
        </div>
    )
})

const parshing = (node: Node) => {
    switch (node.type) {
        case 'p': {
            return <ParagraphMemo key={node.key} initialNode={node} />
        }
        case 'span': {
            return <SpanMemo key={node.key} initialNode={node} />
        }
        case 'h2':
        case 'h3':
        case 'h4': {
            return <HeadingMemo key={node.key} initialNode={node} />
        }
    }
}

const Paragraph = ({initialNode}: {initialNode: Node}) => {
    const [keyList, setKeyList] = useState<number[]>([]);

    useEffect(() => {
        const updateKeyList = () => {
            const list = initialNode.children.map(childNode => childNode?.key);
            setKeyList(list);
        };

        // 초기 keyList 설정
        updateKeyList();

        const disposeReaction = reaction(
            () => Tree.render,
            (render: boolean) => {
                if (!render) return;

                // 자식 노드의 길이가 동일한지 확인
                if (initialNode.children.length === keyList.length) {
                    // 자식 노드의 key가 동일한지 확인
                    for (let i = 0; i < keyList.length; i++) {
                        if (initialNode.children[i]?.key !== keyList[i]) {
                            updateKeyList();
                            return;
                        }
                    }
                    return;
                }

                // 자식 노드의 구조가 변경되었으므로 keyList 업데이트
                updateKeyList();
            }
        );

        return () => {
            disposeReaction();
        };
    }, []);


    return (
        <p>
            {initialNode.children.map((node: Node) => parshing(node))}
        </p>
    )
}
const ParagraphMemo = React.memo(Paragraph)

const Heading = ({initialNode}: {initialNode: Node}) => {

    switch (initialNode.type) {
        case 'h2': {
            return (
                <h2>
                    {initialNode.text}
                </h2>
            )
        }
        case 'h3': {
            return (
                <h3>
                    {initialNode.text}
                </h3>
            )
        }
        case 'h4': {
            return (
                <h4>
                    {initialNode.text}
                </h4>
            )
        }

        default: {
            return (
                <h2>
                    {initialNode.text}
                </h2>
            )
        }
    }
}
const HeadingMemo = React.memo(Heading)

const Span = ({initialNode}: {initialNode: Node}) => {
    // 클래스명 설정
    const classNames = [
        initialNode.font.bold ? 'bold' : '',
        initialNode.font.italic ? 'italic' : '',
        initialNode.font.underline ? 'underline' : '',
        initialNode.font.strike ? 'strike' : ''
    ].filter(Boolean).join(' ');

    return (
        <span className={classNames} mobx={initialNode}>
            {initialNode.text}
        </span>
    )
}
const SpanMemo = React.memo(Span)

/*
const getCursorPosition = () => {
    const selection = window.getSelection();
    const Range = selection.getRangeAt(0);
    //selection.deleteFromDocument()
    const startOffset = selection.anchorOffset;
    const endOffset = selection.focusOffset;
    console.log(window, selection)
    console.log(selection.toString());
    console.log(Range)
    return [startOffset, endOffset-startOffset];
}
 */