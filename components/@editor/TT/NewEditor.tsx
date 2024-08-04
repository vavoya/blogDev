import {useLayoutEffect, useRef, useState} from "react";
import {base} from "next/dist/build/webpack/config/blocks/base";



export default function NewEditor()  {

    return (
        <div style={{
            position: 'relative',
            width: '60%',
            height: '1000px',
            backgroundColor: '#fff',
            margin: '300px 300px 300px 300px'
        }}>
            <div contentEditable={true}
                 onBeforeInput={e => {
                     e.preventDefault()
                 }}
                 onKeyDown={e => {
                     console.log(e.nativeEvent.isComposing)
                 }}
                 onCompositionStart={e => {
                     e.preventDefault()
                 }}
            >

            </div>
        </div>
    )
}
/*


export default function NewEditor () {
    const [code, setCode] = useState([
        {
            key: 0,
            text: "텍스트 텍스트 텍스트 텍스트텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 "
        },
        {
            key: 1,
            text: "텍스트 텍스트 텍스트 텍스트텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 "
        }
    ]);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputOffset, setInputOffset] = useState([0, 0]); // 문단 기준, 문자 입력 offset
    const [cursorOffset, setCursorOffset] = useState([0, 0, 0]); // 리렌더링으로 인한 range 객체 초기화를 고려한 보완책
    const [carotPosition, setCarotPosition] = useState([0, 0, 0]); // 렌더링할 커서 좌표
    const maxIndex = useRef<number>(2);
    const IMEState = useRef<boolean>(false)
    const IMELength = useRef<number>(0)
    const carotUpDownX = useRef<number>(0)
    const carotUpDownCached = useRef<boolean>(false)

    useLayoutEffect(() => {
        // 문자입력에 따른 carot range와 position 설정
        let [pIndex, spanIndex, offset] = cursorOffset;
        const editor = document.querySelector('#editor') as Node;
        const pNode = editor.childNodes[pIndex];
        let spanNode = pNode.firstChild as Element;
        let node = spanNode.firstChild as Node;

        if (node.nodeType === Node.TEXT_NODE) {
            // 텍스트노드가 있는 문단
            let spanNode = pNode.childNodes[spanIndex] as Node;
            let textNode = spanNode.firstChild as Text;
            let length = textNode.length;
            // 텍스트 입력 시에 span index는 유지하고 offset만 증가시키게 만들었기에, 기존 spanIndex와 offset은 불일치
            // 커서를 렌더링 할 때, spanIndex와 offset 재조정
            // 현재 span보다 offset이 초과된 경우, 커서 렌더링 과정에서 재조정
            while (length < offset) {
                // 다음 span으로 offset을 넘겨야하면
                offset -= length;
                spanNode = spanNode.nextSibling;
                textNode = spanNode.firstChild as Text;
                length = textNode.length;
                spanIndex++;
            }
            const newRange = document.createRange();
            newRange.setStart(textNode, offset);
            newRange.collapse(true);
            const carotPosition = getCarotPosition(newRange.getBoundingClientRect());
            setCursorOffset([pIndex, spanIndex, offset])
            setCarotPosition(carotPosition)
        } else {
            const newRange = document.createRange();
            newRange.setStart(spanNode, 0);
            newRange.collapse(true);
            const carotPosition = getCarotPosition(spanNode.getBoundingClientRect());
            setCarotPosition(carotPosition)
        }

    }, [code]);


    const getCarotPosition = (rect) => {
        const editor = document.querySelector('#editor');
        const editorRect = editor.getBoundingClientRect();
        console.log(rect, editorRect);

        const [x, y, height] = [rect.x - editorRect.x, rect.y - editorRect.y, rect.height];
        console.log(x, y, height)
        return [x, y, height];
    }

    const cursorClick = (range) => {
        if (range.startContainer.nodeType === Node.TEXT_NODE) {
            // 텍스트 노드가 선택 되었을 때
            const offset = range.startOffset;
            const span = range.startContainer.parentNode;
            const p = span.parentNode;
            const editor = p.parentNode
            const pIndex = Array.prototype.indexOf.call(editor.childNodes, p);
            const spanIndex = Array.prototype.indexOf.call(p.childNodes, span);
            const tempRange = document.createRange()
            tempRange.setStart(p, 0);
            tempRange.setEnd(range.startContainer, range.startOffset);
            const offset2 = tempRange.toString().length;
            setCursorOffset([pIndex, spanIndex, offset]);
            setInputOffset([pIndex, offset2]);


            const carotPosition = getCarotPosition(range.getBoundingClientRect());
            setCarotPosition(carotPosition);

        } else {
            // 빈 문단이 선택 되었을 때
            const span = range.startContainer;
            const p = span.parentNode;
            const editor = p.parentNode
            const pIndex = Array.prototype.indexOf.call(editor.childNodes, p);

            setCursorOffset([pIndex, 0, 0]);
            setInputOffset([pIndex, 0]);

            const carotPosition = getCarotPosition(range.startContainer.getBoundingClientRect());
            setCarotPosition(carotPosition);
        }
    }

    return (
        <div style={{
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
                    const range = document.caretRangeFromPoint(e.clientX, e.clientY);
                    cursorClick(range)
                    carotUpDownCache.current = false;
                }}
                onMouseUp={e => {
                    //console.log(e)
                    inputRef.current.focus()
                }}
            >
                {


                    code.map((p, index) => {
                        if (p.text === '') {
                            return(<p key={-p.key}><span><br/></span></p>)
                        } else {

                            return (<p key={p.key}><span style={{wordBreak: 'break-all'}}>{p.text.replace(/ /g, '\u00a0')}</span></p>)
                        }
                    })
                }
                <div id={'cursor'}
                    style={{position: 'absolute', top: carotPosition[1], left: carotPosition[0], height: carotPosition[2], width: '0px', overflow: 'visible'}}>
                    <div style={{background: 'black', width: '1px', height: carotPosition[2]}}/>
                </div>
            </div>
            <input style={{
                position: "absolute",
                top: carotPosition[1],
                left: carotPosition[0],
                width: '0px',
                height: '0px',
                zIndex: '1'
            }}
                   ref={inputRef}
                   onCompositionUpdate={e => {
                       console.log(e)
                       const newCode = [...code]
                       const text = newCode[inputOffset[0]].text;
                       let newText
                       if (IMEState.current) {
                           // IME 업데이트
                           newText = text.slice(0, inputOffset[1]) + (e.data) + text.slice(inputOffset[1] + IMELength.current);
                           setCursorOffset([cursorOffset[0], cursorOffset[1], cursorOffset[2] - IMELength.current + e.data.length]);
                           IMELength.current = e.data.length
                       } else {
                           // IME 시작
                           newText = text.slice(0, inputOffset[1]) + (e.data) + text.slice(inputOffset[1]);
                           setCursorOffset([cursorOffset[0], cursorOffset[1], cursorOffset[2] + e.data.length]);
                           IMELength.current = e.data.length
                       }
                       newCode.splice(inputOffset[0], 1, {key: newCode[inputOffset[0]].key, text: newText});
                       setCode(newCode)
                       IMEState.current = true;
                   }}
                   onCompositionEnd={e => {
                       IMEState.current = false;
                       console.log("길이", IMELength.current)
                       setInputOffset([inputOffset[0], inputOffset[1] + IMELength.current]);
                       IMELength.current = 0;
                       console.log(e)
                   }}
                   onInput={(e) => {
                       // 문자 입력만 처리
                       // 비IME
                       if (e.nativeEvent.inputType === 'insertText') {
                           // 커서 위치, 입력 위치 + 1
                           const newCode = [...code]
                           const text = newCode[inputOffset[0]].text;
                           const newText = text.slice(0, inputOffset[1]) + (e.nativeEvent.data) + text.slice(inputOffset[1]);
                           newCode.splice(inputOffset[0], 1, {key: newCode[inputOffset[0]].key, text: newText});
                           setCode(newCode)
                           setCursorOffset([cursorOffset[0], cursorOffset[1], cursorOffset[2] + e.nativeEvent.data.length]);
                           setInputOffset([inputOffset[0], inputOffset[1] + e.nativeEvent.data.length]);
                       }

                   }}
                   onKeyDown={e => {
                       // 방향키, 커서 위치 처리
                       console.log(e)
                       if (e.code === 'ArrowUp') {
                           const basePosition = {x: 0, y: 0};
                           let rect;
                           const editor = document.querySelector('#editor') as Node
                           const p = editor.childNodes[cursorOffset[0]]
                           const span = p.childNodes[cursorOffset[1]] as Element;
                           let node = span.firstChild as Node
                           if (node.nodeType === Node.TEXT_NODE) {
                               const textNode = node as Text;
                               const offset = cursorOffset[2];
                               const range = document.createRange();
                               range.setStart(textNode, offset);
                               range.collapse(true);
                               rect = range.getBoundingClientRect();
                           } else {
                               rect = span.getBoundingClientRect();
                           }


                           basePosition.y = rect.y;
                           if (carotUpDownCache.current) {
                               basePosition.x = carotUpDownX.current;
                           } else {
                               carotUpDownCache.current = true;
                               carotUpDownX.current = rect.x;
                               basePosition.x = rect.x;
                           }

                           // L <- R 탐색
                           // 1. Y 조건 만족
                           // 2. X가 x ~ 사이에 존재하는지

                           // 적합한 span rect를 찾을떄까지 width 더하기
                           // span을 뒤에서부터 읽어나가면서 getClientRect()
                           // 뒤에서 부터 y만족할때까지 읽어나가기, width는 저장
                           let spanNode = span as Element;
                           while(true) {
                               const rectList = spanNode.getClientRects();
                               const rect1 = rectList[0];
                               const rect2 = rectList[1];
                               console.log(spanNode)
                               if (rect1.y < basePosition.y) {
                                   if (rect1.x <= basePosition.x) {
                                       // span의 1번 줄이 y를 만족, x도 만족
                                       console.log('1번 줄 만족')
                                       break
                                   } else if (rect2 && rect2.y < basePosition.y) {
                                       // span의 2번 줄이 존재하고, y만족
                                       // x는 어차피 왼쪽부터 시작하는 줄이기에 만족
                                       console.log('2번 줄 만족')
                                       break
                                   }
                               }

                               const prevSpanNode = spanNode.previousSibling;
                               if (!prevSpanNode) {
                                   // 더 이상 span이 없어서 이전 문단으로 넘어가야 함
                                   const pNode = spanNode.parentNode as Node;
                                   const prevPNode = pNode.previousSibling;
                                   if (!prevPNode) {
                                       // 이전 문단도 없다? -> 아무것도 하지마. 그냥
                                       // 문단의 0에 커서?
                                       return
                                   } else {
                                       // 이전 문단으로 넘어가기
                                       spanNode = prevPNode.lastChild as Element;
                                   }
                               } else {
                                   spanNode = prevSpanNode as Element;
                               }
                           }

                           node = spanNode.firstChild as Node;
                           if (node.nodeType === Node.TEXT_NODE) {
                               // 텍스트 노드다
                               const textNode = node as Text;
                               let offset
                               if (span === spanNode) {
                                   // 현재 커서의 span과 동일하면
                                   offset = cursorOffset[2];
                               } else {
                                   offset = textNode.length
                               }

                               // 처음에는 텍스트 노드의 끝에 커서를 설정
                               const range2 = document.createRange();
                               range2.setStart(textNode, offset);
                               range2.collapse(true);
                               let rect = range2.getBoundingClientRect();

                               // basePosition.y와 basePosition.x를 기준으로 커서 위치 조정
                               while (!(rect.y < basePosition.y && rect.x <= basePosition.x)) {
                                   range2.setStart(textNode, --offset);
                                   range2.collapse(true);
                                   rect = range2.getBoundingClientRect();
                               }

                               if (rect.x < basePosition.x) {
                                   offset++
                               }
                               range2.setStart(textNode, offset);
                               range2.collapse(true);
                               rect = range2.getBoundingClientRect();


                               // 최종 커서 위치 설정
                               const p = spanNode.parentNode as Node;
                               const spanIndex = Array.prototype.indexOf.call(p.childNodes, spanNode);
                               const editor = p.parentNode as Node;
                               const pIndex = Array.prototype.indexOf.call(editor.childNodes, p);

                               const carotPosition = getCarotPosition(rect);
                               setCarotPosition(carotPosition);

                               // 최종 커서 위치 설정
                               range2.setStart(p, 0);
                               setCursorOffset([pIndex, spanIndex, offset])
                               setInputOffset([pIndex, range2.toString().length]);

                           } else {
                               const p = spanNode.parentNode as Node;
                               const spanIndex = Array.prototype.indexOf.call(p.childNodes, spanNode);
                               const editor = p.parentNode as Node;
                               const pIndex = Array.prototype.indexOf.call(editor.childNodes, p);
                               setCursorOffset([pIndex, spanIndex, 0])
                               setInputOffset([pIndex, 0]);
                           }
                           return
                       }
                       if (e.code === "ArrowDown") {
                           const basePosition = {x: 0, y: 0};
                           let rect;
                           const editor = document.querySelector('#editor') as Node
                           const p = editor.childNodes[cursorOffset[0]]
                           const span = p.childNodes[cursorOffset[1]] as Element;
                           let node = span.firstChild as Node
                           if (node.nodeType === Node.TEXT_NODE) {
                               const textNode = node as Text;
                               const offset = cursorOffset[2];
                               const range = document.createRange();
                               range.setStart(textNode, offset);
                               range.collapse(true);
                               rect = range.getBoundingClientRect();
                           } else {
                               rect = span.getBoundingClientRect();
                           }

                           basePosition.y = rect.y + rect.height;
                           if (carotUpDownCache.current) {
                               basePosition.x = carotUpDownX.current;
                           } else {
                               carotUpDownCache.current = true;
                               carotUpDownX.current = rect.x;
                               basePosition.x = rect.x;
                           }

                           // L -> R 탐색
                           // 현재 span 내에서 줄바꿈이 되는지

                           // 다음 span에 줄바꿈을 해야하는지
                           // 다음 문단에서 줄바꿈을 해야하는지



                           let spanNode = span as Element;
                           while(spanNode) {
                               let rectList = spanNode.getClientRects();
                               for (let i = 0; i < rectList.length; i++) {
                                   const rect = rectList[i];
                                   if (rect.y > basePosition.y && rect.right >= basePosition.x) {
                                       // 만족
                                       const textNode = spanNode.firstChild as Text;
                                       let offset;
                                       if (span === spanNode) {
                                           // 현재 커서의 span과 동일하면
                                           offset = cursorOffset[2];
                                       } else {
                                           offset = 0
                                       }

                                       // 혹시 몰라서, textNode maxOffset 지정
                                       const maxOffset = textNode.length

                                       const range2 = document.createRange();
                                       range2.setStart(textNode, offset);
                                       range2.collapse(true);
                                       let rect = range2.getBoundingClientRect();

                                       // basePosition.y와 basePosition.x를 기준으로 커서 위치 조정
                                       while (!(rect.y > basePosition.y && rect.right >= basePosition.x)) {
                                           if (offset >= maxOffset) break
                                           range2.setStart(textNode, ++offset);
                                           range2.collapse(true);
                                           rect = range2.getBoundingClientRect();
                                       }

                                       // 최종 커서 위치 설정
                                       const p = spanNode.parentNode as Node;
                                       const spanIndex = Array.prototype.indexOf.call(p.childNodes, spanNode);
                                       const editor = p.parentNode as Node;
                                       const pIndex = Array.prototype.indexOf.call(editor.childNodes, p);

                                       const carotPosition = getCarotPosition(rect);
                                       setCarotPosition(carotPosition);

                                       // 최종 커서 위치 설정
                                       range2.setStart(p, 0);
                                       setCursorOffset([pIndex, spanIndex, offset])
                                       setInputOffset([pIndex, range2.toString().length]);
                                       return
                                   }
                               }

                               if (!spanNode.nextSibling && rect.y > basePosition.y) {

                               }

                               spanNode = spanNode.nextSibling as Element;
                           }

                           // 현재 문단에서 줄바꿈이 안되고, 다음 문단으로 넘어가야하는 경우
                           const nextP = p.nextSibling as Node;
                           spanNode = nextP.firstChild as Element;
                           while (spanNode.nextSibling) {
                               const rectList = spanNode.getClientRects();
                               const rect = rectList[0];
                               if (rect.right >= basePosition.x) {
                                   // 만족
                                   const textNode = spanNode.firstChild as Text;
                                   let offset;
                                   if (span === spanNode) {
                                       // 현재 커서의 span과 동일하면
                                       offset = cursorOffset[2];
                                   } else {
                                       offset = 0
                                   }

                                   // 혹시 몰라서, textNode maxOffset 지정
                                   const maxOffset = textNode.length

                                   const range2 = document.createRange();
                                   range2.setStart(textNode, offset);
                                   range2.collapse(true);
                                   let rect = range2.getBoundingClientRect();

                                   // basePosition.y와 basePosition.x를 기준으로 커서 위치 조정
                                   while (!(rect.y > basePosition.y && rect.right >= basePosition.x)) {
                                       if (offset >= maxOffset) break
                                       range2.setStart(textNode, ++offset);
                                       range2.collapse(true);
                                       rect = range2.getBoundingClientRect();
                                   }

                                   // 최종 커서 위치 설정
                                   const p = spanNode.parentNode as Node;
                                   const spanIndex = Array.prototype.indexOf.call(p.childNodes, spanNode);
                                   const editor = p.parentNode as Node;
                                   const pIndex = Array.prototype.indexOf.call(editor.childNodes, p);

                                   const carotPosition = getCarotPosition(rect);
                                   setCarotPosition(carotPosition);

                                   // 최종 커서 위치 설정
                                   range2.setStart(p, 0);
                                   setCursorOffset([pIndex, spanIndex, offset])
                                   setInputOffset([pIndex, range2.toString().length]);
                                   return
                               }
                               spanNode = spanNode.nextSibling as Element;
                           }

                           // 문단 내에 x를 넘어서는 span이 없거나, 내용이 없거나
                           node = spanNode.firstChild as Node;
                           if (node.nodeType === Node.TEXT_NODE) {
                               const textNode = node as Text;
                               const p = spanNode.parentNode as Node;
                               const pIndex = cursorOffset[0] + 1;
                               const spanIndex = Array.prototype.indexOf.call(p.childNodes, spanNode);
                               const offset = textNode.length

                               const range2 = document.createRange();
                               range2.setStart(textNode, offset);
                               range2.collapse(true);
                               const carotPosition = getCarotPosition(range2.getBoundingClientRect());
                               setCarotPosition(carotPosition);

                               range2.setStart(p, 0);
                               setCursorOffset([pIndex, spanIndex, offset])
                               setInputOffset([pIndex, range2.toString().length]);
                           } else {
                               const pIndex = cursorOffset[0] + 1;
                               const carotPosition = getCarotPosition(spanNode.getBoundingClientRect());
                               setCarotPosition(carotPosition);
                               setCursorOffset([pIndex, 0, 0])
                               setInputOffset([pIndex, 0]);
                           }

                           return






                           while(true) {
                               let rectList = spanNode.getClientRects();
                               const length = rectList.length;
                               const rect1 = rectList[length - 1];
                               const rect2 = rectList[length - 2];
                               console.log(spanNode)
                               if (rect1.y > basePosition.y) {
                                   if (rect1.right >= basePosition.x) {
                                       // span의 마지막 줄이 y를 만족, x도 만족
                                       console.log('1번 줄 만족')
                                       break
                                   } else if (rect2 && rect2.y > basePosition.y) {
                                       // span의 마지막 - 1 줄이 존재하고, y만족
                                       // x는 어차피 오른쪽에 끝나는 줄이기에 만족
                                       console.log('2번 줄 만족')
                                       break
                                   }
                               }

                               const nextSpanNode = spanNode.nextSibling;
                               if (!nextSpanNode) {
                                   // 더 이상 span이 없어서 이후 문단으로 넘어가야 함
                                   const pNode = spanNode.parentNode as Node;
                                   const nextPNode = pNode.nextSibling;
                                   if (!nextPNode) {
                                       // 이후 문단도 없다? -> 아무것도 하지마. 그냥
                                       // 문단의 0에 커서?
                                       return
                                   } else {
                                       // 이후 문단으로 넘어가기
                                       // 새로운 반복문, 문단 이동하면 무조건 다음 줄이기에 1번만
                                       spanNode = nextPNode.firstChild as Element;
                                       while (true) {
                                           rectList = spanNode.getClientRects();
                                           rect = rectList[0];
                                           if (rect.right >= basePosition.x) {
                                               break
                                           }
                                           const nextSpanNode = spanNode.nextSibling as Node;
                                           if (!nextSpanNode) {
                                               break
                                           }
                                           spanNode = nextSpanNode as Element;
                                       }
                                       break
                                   }
                               } else {
                                   spanNode = nextSpanNode as Element;
                               }
                           }

                           node = spanNode.firstChild as Node;
                           if (node.nodeType === Node.TEXT_NODE) {
                               // 텍스트 노드다
                               const textNode = node as Text;
                               let offset
                               if (span === spanNode) {
                                   // 현재 커서의 span과 동일하면
                                   offset = cursorOffset[2];
                               } else {
                                   offset = 0
                               }
                               const maxOffset = textNode.length

                               // 처음에는 텍스트 노드의 끝에 커서를 설정
                               const range2 = document.createRange();
                               range2.setStart(textNode, offset);
                               range2.collapse(true);
                               let rect = range2.getBoundingClientRect();

                               // basePosition.y와 basePosition.x를 기준으로 커서 위치 조정
                               while (!(rect.y > basePosition.y && rect.right >= basePosition.x)) {
                                   if (offset >= maxOffset) break
                                   range2.setStart(textNode, ++offset);
                                   range2.collapse(true);
                                   rect = range2.getBoundingClientRect();
                               }


                               // 최종 커서 위치 설정
                               const p = spanNode.parentNode as Node;
                               const spanIndex = Array.prototype.indexOf.call(p.childNodes, spanNode);
                               const editor = p.parentNode as Node;
                               const pIndex = Array.prototype.indexOf.call(editor.childNodes, p);

                               const carotPosition = getCarotPosition(rect);
                               setCarotPosition(carotPosition);

                               // 최종 커서 위치 설정
                               range2.setStart(p, 0);
                               setCursorOffset([pIndex, spanIndex, offset])
                               setInputOffset([pIndex, range2.toString().length]);

                           } else {
                               const p = spanNode.parentNode as Node;
                               const spanIndex = Array.prototype.indexOf.call(p.childNodes, spanNode);
                               const editor = p.parentNode as Node;
                               const pIndex = Array.prototype.indexOf.call(editor.childNodes, p);
                               setCursorOffset([pIndex, spanIndex, 0])
                               setInputOffset([pIndex, 0]);
                           }
                           return
                       }
                       carotUpDownCache.current = false;
                       if (e.code === "ArrowLeft") {
                           const range = document.createRange();
                           const editor = document.querySelector('#editor') as Node
                           const p = editor.childNodes[cursorOffset[0]]
                           const span = p.childNodes[cursorOffset[1]]
                           const node = span.firstChild as Node
                           const offset = cursorOffset[2]


                           if (node.nodeType === Node.TEXT_NODE) {
                               const textNode = node as Text;
                               if (offset > 0) {
                                   // 텍스트 노드의 시작 지점에 커서가 있는게 아니면
                                   range.setStart(textNode, offset - 1)
                                   range.collapse(true)
                                   const carotPosition = getCarotPosition(range.getBoundingClientRect());
                                   setCarotPosition(carotPosition);

                                   // 입력 위치 기록
                                   setCursorOffset([cursorOffset[0], cursorOffset[1], cursorOffset[2] - 1]);
                                   setInputOffset([inputOffset[0], inputOffset[1] - 1]);
                               } else {
                                   // textnode의 시작지점에 커서가 있으면
                                   const span = textNode.parentNode as Node;
                                   const prevSpan = textNode.previousSibling as Node;
                                   if (prevSpan) {
                                       // 문단 내에서 이동이 가능한 경우
                                       const textNode = prevSpan.firstChild as Text;
                                       range.setStart(textNode, textNode.length - 1);
                                       range.collapse(true)
                                       const carotPosition = getCarotPosition(range.getBoundingClientRect());
                                       setCarotPosition(carotPosition);

                                       // 입력 위치 기록
                                       setCursorOffset([cursorOffset[0], cursorOffset[1] - 1, range.startOffset - 1]);
                                       setInputOffset([inputOffset[0], inputOffset[1] - 1]);
                                   } else {
                                       // 문단 이동을 해야하는 경우
                                       const p = span.parentNode as Node;
                                       const prevP = p.previousSibling as Node;
                                       if (prevP) {
                                           // 마지막 span의 textnode
                                           const prevSpan = prevP.lastChild as Element;
                                           const node = prevSpan.firstChild as Node;
                                           if (node.nodeType === Node.TEXT_NODE) {
                                               // 내용이 있는 문단이면
                                               const textNode = node as Text;
                                               range.setStart(textNode, textNode.length);
                                               range.collapse(true)
                                               const carotPosition = getCarotPosition(range.getBoundingClientRect());
                                               setCarotPosition(carotPosition);

                                               // 입력 위치 기록
                                               setCursorOffset([cursorOffset[0] - 1, prevP.childNodes.length - 1, range.startOffset]);
                                               setInputOffset([inputOffset[0] - 1, prevP.textContent!.length]);

                                           } else {
                                               // 비어있는 문단이면
                                               range.setStart(prevSpan, 0);
                                               range.collapse(true)
                                               const carotPosition = getCarotPosition(prevSpan.getBoundingClientRect());
                                               setCarotPosition(carotPosition);

                                               // 입력 위치 기록
                                               setCursorOffset([cursorOffset[0] - 1, 0, 0]);
                                               setInputOffset([inputOffset[0] - 1, 0]);
                                           }
                                       } else {
                                           // 이게 첫 문단이면
                                           // 아무것도 하지마
                                       }
                                   }
                               }
                           } else {
                               // textnode가 아닌 엘리먼트를 선택 -> 비어있는 문단을 선택했다는 것
                               // span -> p
                               const prevP = p.previousSibling as Node;
                               if (prevP) {
                                   // 마지막 span의 textnode
                                   const prevSpan = prevP.lastChild as Element;
                                   const node = prevSpan.firstChild as Node;
                                   if (node.nodeType === Node.TEXT_NODE) {
                                       // 내용이 있는 문단이면
                                       const textNode = node as Text;
                                       range.setStart(textNode, textNode.length);
                                       range.collapse(true)
                                       const carotPosition = getCarotPosition(range.getBoundingClientRect());
                                       setCarotPosition(carotPosition);

                                       // 입력 위치 기록
                                       setCursorOffset([cursorOffset[0] - 1, prevP.childNodes.length - 1, range.startOffset]);
                                       setInputOffset([inputOffset[0] - 1, prevP.textContent!.length]);
                                   } else {
                                       // 비어있는 문단이면
                                       range.setStart(prevSpan, 0);
                                       range.collapse(true)
                                       const carotPosition = getCarotPosition(prevSpan.getBoundingClientRect());
                                       setCarotPosition(carotPosition);

                                       // 입력 위치 기록
                                       setCursorOffset([cursorOffset[0] - 1, 0, 0]);
                                       setInputOffset([inputOffset[0] - 1, 0]);
                                   }
                               } else {
                                   // 이게 첫 문단이면
                                   // 아무것도 하지마
                               }
                           }
                       }
                       if (e.code === "ArrowRight") {
                           const range = document.createRange();
                           const editor = document.querySelector('#editor') as Node
                           const p = editor.childNodes[cursorOffset[0]]
                           const span = p.childNodes[cursorOffset[1]]
                           const node = span.firstChild as Node
                           const offset = cursorOffset[2]

                           if (node.nodeType === Node.TEXT_NODE) {
                               const textNode = node as Text;
                               if (offset < textNode.length) {
                                   // 텍스트 노드의 마지막 지점에 커서가 있는게 아니면
                                   range.setStart(node, offset + 1)
                                   range.collapse(true)
                                   const carotPosition = getCarotPosition(range.getBoundingClientRect());
                                   setCarotPosition(carotPosition);

                                   // 입력 위치 기록
                                   setCursorOffset([cursorOffset[0], cursorOffset[1], cursorOffset[2] + 1]);
                                   setInputOffset([inputOffset[0], inputOffset[1] + 1]);
                               } else {
                                   // textnode의 마지막에 커서가 있으면
                                   const span = node.parentNode as Node;
                                   const nextSpan = span.nextSibling as Node;
                                   if (nextSpan) {
                                       // 문단 내에서 이동이 가능한 경우
                                       const textNode = nextSpan.firstChild as Text;
                                       range.setStart(textNode, 1);
                                       range.collapse(true)
                                       const carotPosition = getCarotPosition(range.getBoundingClientRect());
                                       setCarotPosition(carotPosition);

                                       // 입력 위치 기록
                                       setCursorOffset([cursorOffset[0], cursorOffset[1] + 1, 1]);
                                       setInputOffset([inputOffset[0], inputOffset[1] + 1]);
                                   } else {
                                       // 문단 이동을 해야하는 경우
                                       const p = span.parentNode as Node;
                                       const nextP = p.nextSibling as Element;
                                       if (nextP && nextP.id !== 'cursor') {
                                           // 마지막 span의 textnode
                                           const nextSpan = nextP.firstChild as Element;
                                           const node = nextSpan.firstChild as Node;
                                           if (node.nodeType == Node.TEXT_NODE) {
                                               // 내용이 있는 문단이면
                                               const textNode = node as Text;
                                               range.setStart(textNode, 0);
                                               range.collapse(true)
                                               const carotPosition = getCarotPosition(range.getBoundingClientRect());
                                               setCarotPosition(carotPosition);

                                               // 입력 위치 기록
                                               setCursorOffset([cursorOffset[0] + 1, 0, 0]);
                                               setInputOffset([inputOffset[0] + 1, 0]);
                                           } else {
                                               // 비어있는 문단이면
                                               range.setStart(nextSpan, 0);
                                               range.collapse(true)
                                               const carotPosition = getCarotPosition(nextSpan.getBoundingClientRect());
                                               setCarotPosition(carotPosition);

                                               // 입력 위치 기록
                                               setCursorOffset([cursorOffset[0] + 1, 0, 0]);
                                               setInputOffset([inputOffset[0] + 1, 0]);
                                           }
                                       } else {
                                           // 이게 마지막 문단이라면
                                           // 아무것도 하지마
                                       }
                                   }
                               }
                           } else {
                               // textnode가 아닌 엘리먼트를 선택 -> 비어있는 문단을 선택했다는 것
                               const nextP = p.nextSibling as Element;
                               if (nextP && nextP.id !== 'cursor') {
                                   // 마지막 span의 textnode
                                   const nextSpan = nextP.firstChild as Element;
                                   const node = nextSpan.firstChild as Node;
                                   if (node.nodeType === Node.TEXT_NODE) {
                                       // 내용이 있는 문단이면
                                       const textNode = node as Text;
                                       range.setStart(textNode, 0);
                                       range.collapse(true)
                                       const carotPosition = getCarotPosition(range.getBoundingClientRect());
                                       setCarotPosition(carotPosition);

                                       // 입력 위치 기록
                                       setCursorOffset([cursorOffset[0] + 1, 0, 0]);
                                       setInputOffset([inputOffset[0] + 1, 0]);
                                   } else {
                                       // 비어있는 문단이면
                                       range.setStart(nextSpan, 0);
                                       range.collapse(true)
                                       const carotPosition = getCarotPosition(nextSpan.getBoundingClientRect());
                                       setCarotPosition(carotPosition);

                                       // 입력 위치 기록
                                       setCursorOffset([cursorOffset[0] + 1, 0, 0]);
                                       setInputOffset([inputOffset[0] + 1, 0]);
                                   }
                               } else {
                                   // 이게 마지막 문단이라면
                                   // 아무것도 하지마
                               }

                           }

                       }

                       // 백스페이스
                       if (e.code === 'Backspace') {
                           if (IMEState.current) {
                               // IME 도중에는 그냥 IME 백스페이스 동작 진행
                           } else {


                               if (cursorOffset[1] === 0 && cursorOffset[2] === 0) {
                                   // 현재 커서가 문단의 시작에 존재
                                   if (cursorOffset[0] === 0) {
                                       // 그게 첫 문단 이라면
                                       // 지울 내용 없으니 무시
                                   } else {
                                       const newCode = [...code]
                                       const text = newCode[inputOffset[0] - 1].text;
                                       const text2 = newCode[inputOffset[0]].text;
                                       const newText = text + text2
                                       newCode.splice(inputOffset[0] - 1, 2, {key: newCode[inputOffset[0] - 1].key, text: newText});
                                       console.log(newCode)


                                       const editor = document.querySelector('#editor') as Node;
                                       const p = editor.childNodes[cursorOffset[0] - 1];
                                       const spanIndex = p.childNodes.length - 1;
                                       const offset = p.lastChild.textContent.length;
                                       // 이전 문단의 마지막으로 이동
                                       setCursorOffset([cursorOffset[0] - 1, spanIndex, offset]);
                                       setInputOffset([inputOffset[0] - 1, p.textContent.length]);
                                       setCode(newCode)
                                   }
                               } else if (cursorOffset[1] === 0) {
                                   const newCode = [...code]
                                   const text = newCode[inputOffset[0]].text;
                                   const newText = text.slice(0, inputOffset[1] - 1) + text.slice(inputOffset[1]);
                                   newCode.splice(inputOffset[0], 1, {key: newCode[inputOffset[0]].key, text: newText});
                                   console.log(newCode)
                                   // 이전 span이 존재하지 않는 경우
                                   // 문단의 첫 span은 어차피 시작점이 문단 offset 기준 0 이기에 바꿀 필요 없다.
                                   // span은 문단 offset 계산을 패스하기 위한 캐시
                                   // 그러니 간단하게 offset만 감소
                                   setCursorOffset([cursorOffset[0], cursorOffset[1], cursorOffset[2] - 1]);
                                   setInputOffset([inputOffset[0], inputOffset[1] - 1]);
                                   setCode(newCode)
                               } else {
                                   const newCode = [...code]
                                   const text = newCode[inputOffset[0]].text;
                                   const newText = text.slice(0, inputOffset[1] - 1) + text.slice(inputOffset[1]);
                                   newCode.splice(inputOffset[0], 1, {key: newCode[inputOffset[0]].key, text: newText});
                                   console.log(newCode)
                                   // 이전 span이 존재하는 경우
                                   // 현재 커서의 span은 백스페이스로 인해 서체가 변경될 수 있기에, 이전 span을 기준으로 커서 offset을 지정
                                   const editor = document.querySelector('#editor') as Node;
                                   const p = editor.childNodes[cursorOffset[0] - 1];
                                   const prevSpan = p.childNodes[cursorOffset[1] - 1];
                                   const offset = prevSpan.textContent.length;
                                   // 이전 span offset + 현재 span offset - 1
                                   setCursorOffset([cursorOffset[0], cursorOffset[1] - 1, offset + cursorOffset[2] - 1]);
                                   setInputOffset([inputOffset[0], inputOffset[1] - 1]);
                                   setCode(newCode)
                               }
                           }
                       }
                       // 줄바꿈
                       if (e.code === 'Enter') {
                           console.log(inputOffset);
                           const newCode = [...code]
                           const text = newCode[inputOffset[0]].text;
                           const line1 = text.slice(0, inputOffset[1])
                           const line2 = text.slice(inputOffset[1]);
                           newCode.splice(inputOffset[0],1,{key: newCode[inputOffset[0]].key, text: line1}, {key: maxIndex.current, text: line2});
                           setCode(newCode)
                           setCursorOffset([cursorOffset[0] + 1, 0, 0]);
                           setInputOffset([inputOffset[0] + 1, 0]);
                           maxIndex.current++;
                       }

                       // 그외 한줄 지우기나 뭐 드래그 후 지우기 등등
                   }}
            />
        </div>
    )
}







/*

    return (
        <div style={{ width: '100%', height: '1000px', backgroundColor: '#fff', margin: '300px 300px 300px 300px' }}>
            <Editor
                code={code}
                codeParser={(text: string) => {
                    text.split('\n').map((line, i) => {
                        const node = line ? <span>{line}</span> : <br/>;
                        return <p key={line?i:-i}>{node}</p>
                    })
                }}
            />
        </div>
    )
}
*/






















function Editor({code, codeParser}: {code: string, codeParser: any}) {
    const [text, setText] = useState(code.replace(/ /g, ' '))
    const offset = useRef<number>(0)
    const IMEState = useRef<boolean>(false)

    useLayoutEffect(() => {
        setCursorPosition(offset.current)
    }, [text])

    return (
        <div contentEditable={true}
             id={'editor'}
             suppressContentEditableWarning={true}
             onClick={e => {
                 const t = getCursorPosition()
                 console.log("커서 옵셋", t)
             }}
             onBeforeInput={(e) => {
                 offset.current = getCursorPosition()
                 console.log("텍스트가 입력되는 index!",offset.current)
                 const newText = text.slice(0, offset.current) + e.data + text.slice(offset.current)
                 console.log(newText)
                 setText(newText)
                 offset.current = offset.current + 1;
                 e.preventDefault()
             }}
             onKeyDown={(e) => {
                 const modifyText = (modifier) => {
                     offset.current = getCursorPosition();
                     const newText = modifier(text, offset.current);
                     setText(newText);
                     e.preventDefault();
                 };
                 console.log(e)

                 switch (e.code) {
                     case 'Enter':
                         modifyText((text, position) => text.slice(0, position) + '\n' + text.slice(position));
                         offset.current = offset.current + 1;
                         break;
                     case 'Space':
                         modifyText((text, position) => text.slice(0, position) + ' ' + text.slice(position));
                         offset.current = offset.current + 1;
                         break;
                     case 'Backspace':

                         if (IMEState.current) {
                             // IME 도중에는 IME 백스페이스 기본 동작 적용
                             break
                         }
                         console.log(offset.current)
                         if (offset.current === 0) {
                             // 문서의 시작지점에서는 백스페이스 차단
                             break
                         }
                         modifyText((text, position) => text.slice(0, position - 1) + text.slice(position));
                         offset.current = offset.current - 1;
                         break;
                     default:
                         break;
                 }
             }}
             onCompositionUpdate={e => {
                 // IME 상태에 따른 백스페이스 제어
                 IMEState.current = true
                 e.preventDefault()
                 e.stopPropagation()

             }}
             onCompositionStart={e => {
                 // IME 상태에 따른 백스페이스 제어
                 IMEState.current = true
                 e.preventDefault()
                 e.stopPropagation()
             }}
             onCompositionEnd={e => {
                 // IME 상태에 따른 백스페이스 제어
                 IMEState.current = false
             }}
        >
            {
                text.split('\n').map((line, i) => {
                    const node = line ? <span>{line}</span> : <br/>;
                    return <p key={line?i:-i}>{node}</p>
                })
            }
        </div>
    )
}

const getCursorPosition = () => {
    const range = window.getSelection().getRangeAt(0);
    const div = document.querySelector('#editor')
    let pIndex = 0;
    let offset = -1;

    let p = range.startContainer;
    while (p.nodeName !== 'P') {
        p = p.parentNode;
    }

    let pList = [...div.childNodes]

    // p index 구하기
    for (let i in pList) {
        if (pList[i] === p) {
            // 줄바꿈 만 적용 된 것
            offset += 1
            break;
        } else {
            // 여기도 + 1은 줄바꿈 적용
            offset += pList[i].textContent.length + 1
        }
    }

    // 새로운 Range 생성하여 시작점부터 커서 위치까지 설정
    const newRange = document.createRange();
    newRange.setStart(p, 0);
    newRange.setEnd(range.startContainer, range.startOffset);

    // 전체 오프셋 길이를 계산하여 출력
    offset += newRange.toString().length;

    console.log("얻은 옵셋", offset)

    return offset
}

const setCursorPosition = (offset) => {
    let currentDivOffset = 0;
    let currentPOffset = 0;
    let currentTextNodeOffset = 0
    let pIndex = 0
    let spanIndex = 0

    const div = document.querySelector('#editor')

    const pList = [...div.childNodes];
    console.log("설정될 옵셋", offset)
    // p index 구하기
    for (let i in pList) {
        const pText = pList[i].textContent;
        if (currentDivOffset + pText.length < offset) {
            // 줄바꿈 적용해서 + 1
            currentDivOffset += pText.length + 1;
        } else {
            pIndex = +i;
            offset = offset - currentDivOffset;
            break
        }
    }

    if (offset === 0) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        const range = document.createRange();
        range.setStart(pList[pIndex], offset);
        range.collapse(true);
        selection.addRange(range);
        return
    }
    console.log("테스트2", offset, pList[pIndex])



    const spanList = [...pList[pIndex].childNodes];

    // p offset 구하기
    for (let i in spanList) {
        const spanText = spanList[i].innerText;
        if (currentPOffset + spanText.length < offset) {
            currentPOffset += spanText.length;
        } else {
            spanIndex = +i;
            offset = offset - currentPOffset;
            break
        }
    }

    const textNode = spanList[spanIndex].firstChild;

    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.setStart(textNode, offset);
    range.collapse(true);
    selection.addRange(range);

    console.log("문단 위치", pIndex)
    console.log("offset", offset)
}