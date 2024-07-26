'use client'

import React, {useCallback, useEffect, useRef, useState} from "react";
import ParagraphMemo from "@/app/[name]/editor/TT/HAHA/Paragraph";


type Content = {
    key: number
    text: string
}


export default function Test() {
    const [content, setContent] = useState<Content[]>([
        {
            key: 0,
            text: "텍스트 텍스트 텍스트 텍스트텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 "
        },
        {
            key: 1,
            text: "텍스트 텍스트 텍스트 텍스트텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 "
        }
    ]);
    const [caretOffsetState, setCaretOffsetState] = useState<[number, number]>([0, 0])
    const [inputOffsetState, setInputOffsetState] = useState<[number, number]>([0, 0])
    const [caretPositionState, setCaretPositionState] = useState<[number, number, number]>([0, 0, 0])
    const maxIndex = useRef<number>(2);
    const IMEState = useRef<boolean>(false)
    const caretUpDownX = useRef<number>(0)
    const caretUpDownCached = useRef<boolean>(false)
    const IMELength = useRef<number>(0)

    // 커서 리렌더링
    useEffect(() => {
        console.log(caretOffsetState)
        const range = getRangeByOffset(...caretOffsetState)
        const rect = getRectByRange(range)
        const x = rect.x
        const y = rect.y
        const height = Math.round(rect.height);

        const editor = document.getElementById('editor') as HTMLDivElement;
        const rect2 = editor.getBoundingClientRect();
        const x2 = rect2.x
        const y2 = rect2.y

        const absoluteX = x - x2
        const absoluteY = y - y2


        setCaretPositionState([absoluteX, absoluteY, height])
        console.log("커서 포지션")
        console.log(absoluteX, absoluteY, height)


    }, [caretOffsetState, content]);



    return (
        <div
            id={'editor-container'}
            style={{
                position: 'relative',
                width: '60%',
                height: '1000px',
                backgroundColor: '#fff',
                margin: '300px 300px 300px 300px'
            }}>
            <div
                id={'editor'}
                onMouseDown={e => {
                    console.log(e)
                }}
                onMouseUp={e => {
                    console.log(e)
                }}
            >
                <ParserMemo content={content}/>
            </div>


            <input
                onCompositionUpdate={e => {
                    const newContent = [...content]
                    const key = newContent[inputOffsetState[0]].key;
                    const text = newContent[inputOffsetState[0]].text;
                    let newText
                    if (IMEState.current) {
                        // IME 업데이트
                        const char = e.data
                        newText = text.slice(0, inputOffsetState[1]) + char + text.slice(inputOffsetState[1] + IMELength.current);
                        setCaretOffsetState([caretOffsetState[0], caretOffsetState[1] - IMELength.current + char.length]);
                        IMELength.current = char.length
                    } else {
                        // IME 시작
                        const char = e.data
                        newText = text.slice(0, inputOffsetState[1]) + char + text.slice(inputOffsetState[1]);
                        setCaretOffsetState([caretOffsetState[0], caretOffsetState[1] + char.length]);
                        IMELength.current = char.length
                    }
                    newContent.splice(inputOffsetState[0], 1, {key: key, text: newText});
                    setContent(newContent)
                    IMEState.current = true;
                }}
                onCompositionEnd={e => {
                    IMEState.current = false;
                    console.log("길이", IMELength.current)
                    setInputOffsetState([inputOffsetState[0], inputOffsetState[1] + IMELength.current]);
                    IMELength.current = 0;
                    console.log(e)
                }}
                onInput={(e) => {
                    // 문자 입력만 처리
                    // 비 IME
                    if ((e.nativeEvent as InputEvent).inputType === 'insertText') {
                        // 커서 위치, 입력 위치 + 1
                        const newContent = [...content]
                        const key = newContent[inputOffsetState[0]].key;
                        const text = newContent[inputOffsetState[0]].text;
                        const char = (e.nativeEvent as InputEvent).data as string;
                        const newText = text.slice(0, inputOffsetState[1]) + char + text.slice(inputOffsetState[1]);
                        newContent.splice(inputOffsetState[0], 1, {key: key, text: newText});
                        setContent(newContent)
                        setCaretOffsetState([caretOffsetState[0], caretOffsetState[1] + char.length]);
                        setInputOffsetState([inputOffsetState[0], inputOffsetState[1] + char.length]);
                    }

                }}
                onKeyDown={e => {
                    switch (e.code) {
                        case 'ArrowUp': {
                            let [index, offset] = caretOffsetState
                            const newOffset = getCaretUpOffset(index, offset, content, {state: caretUpDownCached.current, x: caretUpDownX.current}, (state, x) => {caretUpDownCached.current = state; caretUpDownX.current = x})

                            if (newOffset) {
                                [index, offset] = newOffset;
                                setCaretOffsetState(newOffset)
                                setInputOffsetState(newOffset)
                            }
                            break
                        }
                        case 'ArrowDown': {
                            let [index, offset] = caretOffsetState
                            const newOffset = getCaretDownOffset(index, offset, content, {state: caretUpDownCached.current, x: caretUpDownX.current}, (state, x) => {caretUpDownCached.current = state; caretUpDownX.current = x})

                            if (newOffset) {
                                [index, offset] = newOffset;
                                setCaretOffsetState(newOffset)
                                setInputOffsetState(newOffset)
                            }
                            break
                        }
                        case 'ArrowLeft': {
                            let [index, offset] = caretOffsetState
                            const newOffset = getCaretLeftOffset(index, offset, content)

                            if (newOffset) {
                                [index, offset] = newOffset;
                                setCaretOffsetState(newOffset)
                                setInputOffsetState(newOffset)
                            }
                            break
                        }
                        case 'ArrowRight': {
                            let [index, offset] = caretOffsetState
                            const newOffset = getCaretRightOffset(index, offset, content)

                            if (newOffset) {
                                [index, offset] = newOffset;
                                setCaretOffsetState(newOffset)
                                setInputOffsetState(newOffset)
                            }
                            break
                        }
                        case 'Backspace': {
                            if (IMEState.current) {

                            } else {
                                if (0 < caretOffsetState[1]) {
                                    // 문단 내에서 이루어지는 행위
                                    const newContent = [...content]
                                    const key = newContent[inputOffsetState[0]].key;
                                    const text = newContent[inputOffsetState[0]].text;
                                    const newText = text.slice(0, inputOffsetState[1] - 1) + text.slice(inputOffsetState[1]);
                                    newContent.splice(inputOffsetState[0], 1, {key: key, text: newText});

                                    setCaretOffsetState([caretOffsetState[0], caretOffsetState[1] - 1]);
                                    setInputOffsetState([inputOffsetState[0], inputOffsetState[1] - 1]);
                                    setContent(newContent)
                                } else if (0 < caretOffsetState[0]) {
                                    // 문단을 삭제
                                    const newContent = [...content]
                                    const key = newContent[inputOffsetState[0] - 1].key;
                                    const text = newContent[inputOffsetState[0] - 1].text;
                                    const text2 = newContent[inputOffsetState[0]].text;
                                    const newText = text + text2
                                    newContent.splice(inputOffsetState[0] - 1, 2, {key: key, text: newText});
                                    console.log(newContent)

                                    // 이전 문단의 마지막으로 이동
                                    setCaretOffsetState([caretOffsetState[0] - 1, text.length]);
                                    setInputOffsetState([inputOffsetState[0] - 1, text.length]);
                                    setContent(newContent)
                                } else {
                                    // 문서의 시작에 있는 경우
                                }
                            }
                            break
                        }
                        case 'Enter': {
                            const newContent = [...content]
                            const key = newContent[inputOffsetState[0]].key;
                            const text = newContent[inputOffsetState[0]].text;
                            const line1 = text.slice(0, inputOffsetState[1])
                            const line2 = text.slice(inputOffsetState[1]);
                            newContent.splice(inputOffsetState[0],1,{key: key, text: line1}, {key: maxIndex.current, text: line2});
                            setContent(newContent)
                            setCaretOffsetState([caretOffsetState[0] + 1, 0]);
                            setInputOffsetState([inputOffsetState[0] + 1, 0]);
                            maxIndex.current++;
                        }
                    }
                    // 방향키 왼쪽/오른쪽 및 공통 동작을 여기에 추가
                    if (!(['ArrowUp', 'ArrowDown'].includes(e.code))) {
                        caretUpDownCached.current = false;
                    }
                }}
            />
            <Cursor style={{
                position: 'absolute',
                top: caretPositionState[1],
                left: caretPositionState[0],
                height: caretPositionState[2],
                width: '0px',
                overflow: 'visible',
                WebkitTransform: 'translateZ(0)',
            }}/>
        </div>
    )
}

const getRangeByOffset = (index: number, offset: number) => {
    const editor = document.getElementById("editor") as HTMLDivElement;
    const block = editor.childNodes[index]
    let span = block.firstChild as HTMLSpanElement;
    const node = span.firstChild as Node;
    if (node.nodeType === Node.TEXT_NODE) {
        // 텍스트노드 존재
        let textNode = node as Text;
        let currentOffset = 0;
        while (currentOffset + textNode.length < offset) {
            currentOffset += textNode.length;
            span = span.nextSibling as HTMLSpanElement;
            textNode = span.firstChild as Text;
        }
        const range = document.createRange();
        range.setStart(textNode, offset - currentOffset);
        range.collapse(true);
        return range
    } else {
        // <br/>
        const range = document.createRange();
        range.setStart(span, 0)
        range.collapse(true);
        return range
    }
}

/*
const getNextRange = (range: Range): Range | null => {
    let node: Node = range.startContainer;
    const offset: number = range.startOffset;

    const createRange = (startNode: Node, startOffset: number): Range => {
        const nextRange = document.createRange();
        nextRange.setStart(startNode, startOffset);
        nextRange.collapse(true);
        return nextRange;
    };

    // 현재 텍스트 노드 offset -> 현재 텍스트 노드 offset + 1
    if (node.nodeType === Node.TEXT_NODE && (node as Text).length > offset) {
        return createRange(node, offset + 1);
    }

    // 현재 텍스트 노드 max -> 다음 텍스트 노드 0
    if (node.nodeType === Node.TEXT_NODE && (node as Text).length === offset) {
        let nextSpan = node.parentNode?.nextSibling;
        if (nextSpan) {
            node = nextSpan.firstChild as Node;
            if (node.nodeType === Node.TEXT_NODE) {
                return createRange(node, 0);
            }
        }
    }

    // ? -> 다음 문단 0
    let span = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
    const block = span?.parentNode;
    const nextBlock = block?.nextSibling;
    if (nextBlock) {
        span = nextBlock.firstChild as Node;
        node = span.firstChild as Node;

        if (node.nodeType === Node.TEXT_NODE) {
            return createRange(node, 0);
        } else if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'BR') {
            return createRange(span, 0);
        }
    }

    return null;
}

const getPrevRange = (range: Range): Range | null => {
    let node: Node = range.startContainer;
    const offset: number = range.startOffset;

    const createRange = (startNode: Node, startOffset: number): Range => {
        const prevRange = document.createRange();
        prevRange.setStart(startNode, startOffset);
        prevRange.collapse(true);
        return prevRange;
    };

    // 현재 텍스트 노드 offset - 1 <- 현재 텍스트 노드 offset
    if (node.nodeType === Node.TEXT_NODE && 0 < offset) {
        return createRange(node, offset - 1);
    }

    // 이전 텍스트 노드 max <- 현재 텍스트 노드 0
    if (node.nodeType === Node.TEXT_NODE && 0 === offset) {
        let prevSpan = node.parentNode?.previousSibling;
        if (prevSpan) {
            node = prevSpan.firstChild as Node;
            if (node.nodeType === Node.TEXT_NODE) {
                return createRange(node, (node as Text).length);
            }
        }
    }

    // 이전 문단 max <- ?
    let span = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
    const block = span?.parentNode;
    const prevBlock = block?.previousSibling;
    if (prevBlock) {
        span = prevBlock.lastChild as Node;
        node = span.firstChild as Node;

        if (node.nodeType === Node.TEXT_NODE) {
            return createRange(node, (node as Text).length);
        } else if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'BR') {
            return createRange(span, 0);
        }
    }

    return null;
}
 */

const getRectByRange = (range: Range): DOMRect => {
    const { startContainer, startOffset } = range;
    // 텍스트 노드의 오프셋일 경우
    if (startContainer.nodeType === Node.TEXT_NODE) {
        const textNode = startContainer as Text;
        const rangeForRect = document.createRange();
        rangeForRect.setStart(textNode, startOffset);
        rangeForRect.collapse(true);
        return rangeForRect.getBoundingClientRect();
    }

    // 빈 문단일 경우 (span 태그 내부에 <br> 태그만 있는 경우)
    if (startContainer.nodeType === Node.ELEMENT_NODE && (startContainer as HTMLElement).tagName === 'SPAN') {
        const spanElement = startContainer as HTMLElement;
        if (spanElement.childNodes.length === 1 && spanElement.firstChild?.nodeType === Node.ELEMENT_NODE && (spanElement.firstChild as HTMLElement).tagName === 'BR') {
            return spanElement.getBoundingClientRect();
        }
    }

    // 기본 처리
    return range.getBoundingClientRect();
};

const getCaretUpOffset = (index: number, offset: number, content: Content[], caretUpDownCached: {state: boolean, x: number}, caretUpDownCachedUpdate: (state: boolean, x: number) => void): [number, number] | null => {
    const range = getRangeByOffset(index, offset);
    const node = range.startContainer;

    if (node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'SPAN')) {
        const rect = getRectByRange(range);
        let startX = rect.x;
        if (caretUpDownCached.state) {
            startX = caretUpDownCached.x
        } else {
            caretUpDownCachedUpdate(true, startX)
        }
        let currentX = startX;
        let lineCount = 0;

        let prevIndex = index;
        let prevOffset = offset;

        // offset 을 감소시키면서 탐색
        while (true) {

            if (0 < offset) {
                // 문단 내에서 처리
                offset -= 1;
            } else if (0 < index) {
                // 문단 이동
                offset = content[index - 1].text.length;
                index -= 1;
            } else {
                // 문서의 처음으로 도착
                return [0, 0]
            }

            const newRange = getRangeByOffset(index, offset);
            const newRect = getRectByRange(newRange);
            const newX = newRect.x

            // 줄바꿈 확인
            if (currentX <= newX) {
                lineCount += 1;
            }

            // 조건 만족
            if (newX <= startX && lineCount === 1) {
                return [index, offset]
            }
            if (lineCount === 2) {
                return [prevIndex, prevOffset];
            }

            // X값 최신화
            currentX = newX;
            prevIndex = index;
            prevOffset = offset;
        }
    }

    return null;
}

const getCaretDownOffset = (index: number, offset: number, content: Content[], caretUpDownCached: {state: boolean, x: number}, caretUpDownCachedUpdate: (state: boolean, x: number) => void): [number, number] | null => {
    const range = getRangeByOffset(index, offset);
    const node = range.startContainer;

    if (node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'SPAN')) {
        const rect = getRectByRange(range);
        let startX = rect.x;
        if (caretUpDownCached.state) {
            startX = caretUpDownCached.x
        } else {
            caretUpDownCachedUpdate(true, startX)
        }
        let currentX = startX;
        let lineCount = 0;

        let prevIndex = index;
        let prevOffset = offset;

        // offset 을 증가시키면서 탐색
        while (true) {
            if (offset < content[index].text.length) {
                // 문단 내에서 처리
                offset += 1;
            } else if (index < content.length - 1) {
                // 문단 이동
                index += 1;
                offset = 0;
            } else {
                // 문서의 마지막으로 도착
                return [content.length - 1, content[content.length - 1].text.length];
            }

            const newRange = getRangeByOffset(index, offset);
            const newRect = getRectByRange(newRange);
            const newX = newRect.x;

            // 줄바꿈 확인
            if (newX <= currentX) {
                lineCount += 1;
            }

            // 조건 만족
            // 줄바꿈이 한번 된 상태에서 기존 X를 넘을 경우 || 줄바꿈이 2번 된 순간
            if (startX <= newX && lineCount === 1) {
                return [index, offset];
            }
            if (lineCount === 2) {
                return [prevIndex, prevOffset];
            }

            currentX = newX;
            prevIndex = index;
            prevOffset = offset;
        }
    }

    return null;
}

const getCaretLeftOffset = (index: number, offset: number, content: Content[]): [number, number] => {
    if (0 < offset) {
        return [index, offset - 1]
    } else if (0 < index) {
        return [index - 1, content[index - 1].text.length];
    } else {
        return [0, 0]
    }
}

const getCaretRightOffset = (index: number, offset: number, content: Content[]): [number, number] => {
    if (offset < content[index].text.length) {
        return [index, offset + 1]
    } else if (index < content.length - 1) {
        return [index + 1, 0]
    } else {
        return [content.length - 1, content[content.length - 1].text.length];
    }
}





function Cursor({style}: {style: {}}) {
    return (
        <div id={'cursor'}
             style={style}>
            <div style={{background: 'black', width: '1px', height: '100%'}}/>
        </div>
    )
}

function Parser({content}: {content: Content[]}) {



    return (
        <>
            {
                content.map((v) => {
                    return <ParagraphMemo key={v.key} text={v.text.replace(/ /g, '\u00a0')} />
                })
            }
        </>
    )
}

const ParserMemo = React.memo(Parser)