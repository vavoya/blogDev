'use client'



import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Paragraph from "@/app/[name]/editor/TT/HAHA/Paragraph";
import "./tt.css"

export default function MdEditor() {
    const [cursorPosition, setCursorPosition] = useState([0, 0]);
    const ref = useRef<HTMLDivElement>(null);
    const [editorText, setEditorText] = useState<{key: number; text: string}[]>([{key: 0, text: '**본문**'},{key: 1, text: '테스트'}]);
    const maxIndex = useRef<number>(2);

    useEffect(() => {
        const selection = window.getSelection();
        selection.removeAllRanges();

        let currentOffset = 0;

        const range = document.createRange();
        const paragraph = ref.current.childNodes[cursorPosition[0]];
        console.log(ref.current.innerText)
        console.log(paragraph.firstChild.tagName)
        console.log(editorText)

        for (let i = 0; i < paragraph.childNodes.length; i++) {
            const node = paragraph.childNodes[i];
            const nodeLength = node.textContent.length;
            console.log("노드", node)
            console.log("노드 길이", nodeLength)


            if (currentOffset + nodeLength >= cursorPosition[1]) {
                range.setStart(node.firstChild, cursorPosition[1] - currentOffset);
                range.collapse(true);
                selection.addRange(range);
                break
            }
            currentOffset += nodeLength;
        }
        console.log("커서 렌더링 완료")


    }, [editorText]);




    return (
        <div onCompositionEndCapture={e => {
            console.log("상위요소", e)
            e.preventDefault();
            e.stopPropagation()
        }}
            style={{width: '100%', height: '100vh', display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div contentEditable={true}
                 ref={ref}
                 suppressContentEditableWarning={true}
                 onKeyDown={e => {
                     // 여기서 엔터 처리를 해줘야함 , 아 백스페이스도 !!!!! , 탭도? 붙여넣기도
                     // 커서 데이터를 변경하고 상태값도 재설정 해주고
                     console.log(e)
                     if (e.code === "Enter") {
                         e.preventDefault()
                         const range = window.getSelection().getRangeAt(0);
                         const p = range.startContainer.parentNode.parentNode;

                         // 새로운 Range 생성하여 시작점부터 커서 위치까지 설정
                         const newRange = document.createRange();
                         newRange.setStart(p, 0);
                         newRange.setEnd(range.startContainer, range.startOffset);

                         // 전체 오프셋 길이를 계산하여 출력
                         const offset = newRange.toString().length;
                         console.log("Cursor offset in <p>: ", offset);

                         // p 요소가 부모의 몇 번째 자식인지 계산
                         const parent = p.parentNode;
                         const index = Array.prototype.indexOf.call(parent.childNodes, p);
                         //console.log("p is the " + index + "th child of its parent.");
                         console.log("현재 커서는", index, offset, "에 위치합니다")
                         console.log("해당 문단 내용은", editorText[index], "입니다");


                         const test = [...editorText]; // editorText 배열을 복사
                         const paragraph1text = editorText[index].text.substring(0, offset)
                         const paragraph2text = editorText[index].text.substring(offset)

                         if (paragraph1text.length === 0) {
                             test.splice(index, 1, {key: maxIndex.current++, text: paragraph1text}, {key: editorText[index].key, text: paragraph2text});
                         } else {
                             test.splice(index, 1, {key: editorText[index].key, text: paragraph1text}, {key: maxIndex.current++, text: paragraph2text});
                         }

                         console.log("해당 문단을 분리하면", paragraph1text, paragraph2text, "입니다");

                         console.log("새로 만들어진 문단 리스트는 ", test)
                         console.log("상태값을 업데이트 합니다")
                         setEditorText(test);
                         console.log("커서 위치는 ", index + 1, 0, "로 업데이트합니다.")

                         setCursorPosition([index + 1, 0]);
                     } else if (e.code === "Space") {
                         console.log("스페이스 핸들러 시작")
                         console.log(e)
                         e.preventDefault()
                         const range = window.getSelection().getRangeAt(0);
                         let p = range.startContainer.parentNode;
                         while (p.nodeName !== 'P') {
                             p = p.parentNode;
                         }
                         console.log('p 내용', p.textContent);
                         console.log(range)

                         // 새로운 Range 생성하여 시작점부터 커서 위치까지 설정
                         const newRange = document.createRange();
                         newRange.setStart(p, 0);
                         newRange.setEnd(range.startContainer, range.startOffset);

                         // 전체 오프셋 길이를 계산하여 출력
                         const offset = newRange.toString().length;
                         console.log("Cursor offset in <p>: ", offset);

                         // p 요소가 부모의 몇 번째 자식인지 계산
                         const parent = p.parentNode;
                         const index = Array.prototype.indexOf.call(parent.childNodes, p);
                         //console.log("p is the " + index + "th child of its parent.");
                         console.log("현재 커서는", index, offset, "에 위치합니다")
                         setCursorPosition([index, offset + 1])

                         const newParagraphText = editorText[index].text.slice(0,offset) + '\u00A0' + editorText[index].text.slice(offset)
                         console.log("새 텍스트",newParagraphText)

                         const tEditorText = [...editorText];
                         tEditorText.splice(index,   1, {key: tEditorText[index].key, text: newParagraphText});
                         setEditorText(tEditorText);
                         console.log("스페이스 핸들러 완료")
                     }
                 }}
                 onCompositionEnd={e => {
                     console.log(e)
                     e.preventDefault()
                 }}
                 onBeforeInput={e => {

                     console.log("입력 핸들러 시작")
                     console.log(e)
                     e.preventDefault()

                     const range = window.getSelection().getRangeAt(0);
                     let p = range.startContainer;
                     console.log(p.class, p.nodeName);
                     while (p.nodeName !== 'P') {
                         p = p.parentNode;
                     }
                     console.log('p 내용', p.textContent);
                     console.log(range)
                     console.log(range.startOffset)

                     // 맥북 더블 스페이스 막기
                     if (e.data.length > 1) {
                         const selection = window.getSelection();
                         selection.removeAllRanges();

                         let currentOffset = 0;

                         const range = document.createRange();
                         const paragraph = ref.current.childNodes[cursorPosition[0]];
                         console.log(paragraph)
                         console.log(editorText)

                         for (let i = 0; i < paragraph.childNodes.length; i++) {
                             const node = paragraph.childNodes[i];
                             const nodeLength = node.textContent.length;
                             console.log("노드", node)
                             console.log("노드 길이", nodeLength)


                             if (currentOffset + nodeLength >= cursorPosition[1]) {
                                 range.setStart(node.firstChild, cursorPosition[1] - currentOffset);
                                 range.collapse(true);
                                 selection.addRange(range);
                                 break
                             }
                             currentOffset += nodeLength;
                         }
                         return
                     }

                     // 새로운 Range 생성하여 시작점부터 커서 위치까지 설정
                     const newRange = document.createRange();
                     newRange.setStart(p, 0);
                     newRange.setEnd(range.startContainer, range.startOffset);

                     // 전체 오프셋 길이를 계산하여 출력
                     const offset = newRange.toString().length;
                     console.log("Cursor offset in <p>: ", offset);

                     // p 요소가 부모의 몇 번째 자식인지 계산
                     const parent = p.parentNode;
                     const index = Array.prototype.indexOf.call(parent.childNodes, p);
                     //console.log("p is the " + index + "th child of its parent.");
                     console.log("현재 커서는", index, offset, "에 위치합니다")

                     setCursorPosition([index, offset + 1])

                     const newParagraphText = editorText[index].text.slice(0,offset) + e.data + editorText[index].text.slice(offset)
                     console.log(newParagraphText)

                     const tEditorText = [...editorText];
                     tEditorText.splice(index, 1, {key: tEditorText[index].key, text: newParagraphText});
                     setEditorText(tEditorText);
                     console.log("입력 핸들러 완료")
                 }}
                 onInput={e=>{
                     console.log(e)
                     e.preventDefault()
                     if (e.nativeEvent.inputType === "deleteCompositionText") {

                     }
                 }}
            >
                {
                    editorText.map((object) => {
                        return (<Paragraph key={object.key} text={object.text} />)
                    })
                }
            </div>
        </div>
    )
}






