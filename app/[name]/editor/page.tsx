'use client'


import React, {useEffect, useRef, useState} from "react";

import NewEditor from "@/app/[name]/editor/TT/HAHA/Test";
import ParserMemo from "@/app/[name]/editor/TT/HAHA/Parser";

export default function EditorPage() {

    return (
        <NewEditor
            initialContent={[
            {
                key: 0,
                text: "텍스트 텍스트 텍스트 텍스트텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 "
            },
            {
                key: 1,
                text: "텍스트 텍스트 텍스트 텍스트텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 "
            },
            {
                key: 2,
                text: "텍스트 텍스트 텍스트 텍스트텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 "
            },
            {
                key: 3,
                text: "텍스트 텍스트 텍스트 텍스트텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 "
            },
            {
                key: 4,
                text: "텍스트 텍스트 텍스트 텍스트텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 "
            },
            {
                key: 5,
                text: ""
            },
            {
                key: 6,
                text: "# 텍스트 텍스트 텍스트 텍스트텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 "
            },
            {
                key: 7,
                text: "9"
            }
        ]}
            ParserComponent={ParserMemo}/>
    )

/*
    return (<MdEditor />);

    return (
        <div style={{width: '100%', height: '100vh', display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div
                suppressContentEditableWarning={true}
                contentEditable={true}
                onInput={() => {
                    if (ref.current) {
                        setText(ref.current.innerText);
                    }
                    console.log(iii)
                }}

                onClick={e=>{
                    const newRange = document.caretRangeFromPoint(e.clientX, e.clientY);
                    iii.current = newRange
                    console.log(newRange)
                    const rect = newRange.getBoundingClientRect();
                    const x = rect.left;
                    const y = rect.top;
                    const t = document.caretRangeFromPoint(e.clientX, y-1);
                    console.log(rect,x,y)
                    console.log(t)
                }}
                ref={ref}
                style={{width: '300px'}}>
                <p>dddddd*ddddd**ddddddd*ddddd</p>
            </div>
            <div style={{width: '300px'}} >
                <Editor mdText={text} />
            </div>
            <p contentEditable={true}
                 onKeyDown={e=>{
                     console.log(e)
                     e.preventDefault()
                 }}
                 onBeforeInput={e => {
                     e.preventDefault()
                     console.log(e)
                 }}
                 onInput={e => {
                     console.log('입력', e.nativeEvent.inputType, e.nativeEvent.data)
                     e.preventDefault()
                 }}
                 style={{borderStyle: 'dashed', width: '300px'}}
            >
                <span>ㅇㅇㅇㅇㅇㅇㅇ</span>
            </p>
        </div>
    )

 */
    /*
    ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ**ㅇㅇㅇㅇㅇ*ㅇㅇㅇㅇㅇㅇㅇ==ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ==ㅇㅇㅇㅇㅎㅁㄴㅇㄹ==ㅇㅇㅇ==* **  ㅇㅇdd
ㅇㅇㅇㅇㅇㅇㅇㅇㅇ
ㅇㅇㅇㅇㅇㅇ
# 제목1
## 제목2ㅇㅇㅇㅇ
    <div
                suppressContentEditableWarning={true}
                contentEditable={true}
                onInput={() => {
                    if (ref.current) {
                        setText(ref.current.innerText);
                    }
                }}
                ref={ref}
                style={{width: '300px'}}>
                <p>dddddd*ddddd**ddddddd*ddddd</p>
            </div>
            <div style={{width: '300px'}}>
                <Paragraph text={text}/>
            </div>
     */
}

/*
function Editor({mdText}: { mdText: string }): React.ReactNode {


    const parseBlocks = (text: string) => {
        const blocks = text.split('\n');
        blocks.map((v, i) => {
            if (v[0] === '#') {
                if (v[1] === '#') {
                    if (v[2] === '#') {
                        if (v[3] === ' ') {
                            return <Head level={3} text={v}/>
                        } else {
                            return <Paragraph text={v} />
                        }
                    } else if (v[2] === ' ') {
                        return <Head level={2} text={v} />
                    } else {
                        return <Paragraph text={v} />
                    }
                } else if (v[1] === ' ') {
                    return <Head level={1} text={v} />
                } else {
                    return <Paragraph text={v} />
                }
            } else {
                return <Paragraph text={v} />
            }
        })
    }
    return (

    )
}

function Head({level, text}: {level: number, text: string}) {

    switch (level) {
        case 1:
            return <h1>{text}</h1>;
        case 2:
            return <h2>{text}</h2>;
        case 3:
            return <h3>{text}</h3>;
    }
}

function Paragraph({text}: {text: string}) {
    const [AST, setAST] = useState([])

    interface Type {
        type: string;
        delimiter: string;
        list: any[];
        parent: any[] | null;
        state: boolean;
    }
    const Bold: Type = {
        type: 'strong',
        delimiter: '**',
        list: [],
        parent: null,
        state: false
    }
    const Italic: Type = {
        type: 'i',
        delimiter: '*',
        list: [],
        parent: [],
        state: false
    }
    const list = [Bold, Italic];

    function parse(text) {
        let ast = []
        let current = ast
        let i = 0;
        let p = 0

        function processDelimiter(Object: Type) {
            if (Object.state) {
                // 이전 내용 기록
                const t = text.slice(p, i);
                current.push(t);

                current.push(<span className={styles.markers}>{Object.delimiter}</span>)
                current = Object.parent
                Object.state = false;

                list.forEach((v, i) => {
                    if (v.state) {
                        // Bold 처리 시작
                        v.parent = current;
                        v.list = []
                        if (v.type === 'strong') {
                            current.push(<strong>{v.list}</strong>);
                        } else if (Object.type === 'i') {
                            current.push(<i>{v.list}</i>);
                        }
                        current = v.list;
                    }
                })

            } else {
                // 이전 내용 기록
                const t = text.slice(p, i);
                current.push(t);

                // Bold 처리 시작
                Object.parent = current;
                Object.list = [<span className={styles.markers}>{Object.delimiter}</span>];
                if (Object.type === 'strong') {
                    current.push(<strong>{Object.list}</strong>);
                } else if (Object.type === 'i') {
                    current.push(<i>{Object.list}</i>);
                }
                current = Object.list;
                Object.state = true;
            }
            i += Object.delimiter.length;
            p = i
        }

        while (i < text.length) {
            const text2 = text[i] + text[i+1];
            const text1 = text[i]

            if (text2 === Bold.delimiter) {
                processDelimiter(Bold)
            } else if (text1 === Italic.delimiter) {
                processDelimiter(Italic)
            } else {
                i++;
            }
        }
        const t = text.slice(p, text.length);
        current.push(t);
        setAST(ast)
    }

    useEffect(() => {
        parse(text);
    }, [text]);
    return (
        <p>
            {AST}
        </p>
    )
}

function Test({text}: {text: string}) {

    interface TextStyleType {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        highlight: boolean;
    }

    interface TextRunType extends TextStyleType{
        text: string;
    }

    class TextRun implements TextRunType {
        constructor(
            public text: string,
            public bold: boolean = false,
            public italic: boolean = false,
            public strikethrough: boolean = false,
            public highlight: boolean = false
        ) {}
    }

    const currentTextStyle: TextStyleType = {
        bold: false,
        italic: false,
        strikethrough: false,
        highlight: false,
    }

    const bold = {
        delimiter: '**'
    }

    const italic = {
        delimiter: '*'
    }

    const strikethrough = {
        delimiter: '~~'
    }

    const highlight = {
        delimiter: '=='
    }

    const underline = {
        delimiter: '*'
    }

    const textRunArray: TextRunType[] = [];

    let left = 0;
    let right = 0;

    console.log("파싱 시작", text)

    while (right < text.length) {
        const text2 = text[right] + text[right + 1]
        const text1 = text[right]

        if (text2 === bold.delimiter) {
            if (currentTextStyle.bold) {
                right += 2
            }

            // 이전 데이터 기록
            if (left < right) {
                const textData = text.slice(left, right);
                const textRun: TextRunType = {
                    text: textData,
                    ...currentTextStyle,
                }
                textRunArray.push(textRun);
            }
            left = right

            if (!currentTextStyle.bold) {
                right += 2
            }
            currentTextStyle.bold = !currentTextStyle.bold;

        } else if (text1 === italic.delimiter) {
            if (currentTextStyle.italic) {
                right += 1
            }

            // 이전 데이터 기록
            if (left < right) {
                const textData = text.slice(left, right);
                const textRun: TextRunType = {
                    text: textData,
                    ...currentTextStyle,
                }
                textRunArray.push(textRun);
            }
            left = right

            if (!currentTextStyle.bold) {
                right += 1
            }
            currentTextStyle.italic = !currentTextStyle.italic;
        } else if (text2 === strikethrough.delimiter) {
            if (currentTextStyle.strikethrough) {
                right += 2
            }

            // 이전 데이터 기록
            if (left < right) {
                const textData = text.slice(left, right);
                const textRun: TextRunType = {
                    text: textData,
                    ...currentTextStyle,
                }
                textRunArray.push(textRun);
            }
            left = right

            if (!currentTextStyle.strikethrough) {
                right += 2
            }
            currentTextStyle.strikethrough = !currentTextStyle.strikethrough;
        } else if (text2 === highlight.delimiter) {
            if (currentTextStyle.highlight) {
                right += 2
            }

            // 이전 데이터 기록
            if (left < right) {
                const textData = text.slice(left, right);
                const textRun: TextRunType = {
                    text: textData,
                    ...currentTextStyle,
                }
                textRunArray.push(textRun);
            }
            left = right

            if (!currentTextStyle.highlight) {
                right += 2
            }
            currentTextStyle.highlight = !currentTextStyle.highlight;
        } else {
            right++;
        }
    }

    if (left < right) {
        const textData = text.slice(left, right);
        const textRun: TextRunType = {
            text: textData,
            ...currentTextStyle,
        }
        textRunArray.push(textRun);
    }


    console.log(textRunArray);


    function renderTextRuns() {
        return textRunArray.map((textRun: TextRunType, index: number) => {
            const className = `
            ${textRun.bold ? 'bold' : ""} 
            ${textRun.italic ? 'italic' : ""} 
            ${textRun.strikethrough ? 'strikethrough' : ""} 
            ${textRun.highlight ? 'highlight' : ""}`.trim();

            return (
                <span key={index} className={className}>{textRun.text}</span>
            );
        });
    }

    return (
        <p>
            {renderTextRuns()}
        </p>
    )
}

 */