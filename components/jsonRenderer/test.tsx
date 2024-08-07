

import React, {useEffect, useRef} from "react";

/*
tag
children
text
font

 */

interface Font {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strike: boolean;
}


interface Node {
    type: 'section' | 'p' | 'span' | 'h2' | 'h3' | 'h4';
    text?: string;
    font?: Font;
    children?: Node[];
    key?: string;
}

export default function Test({ jsonDocument }: {jsonDocument: Node}) {

    return (
        <>
            {
                jsonDocument.children?.map((node, index) => (
                    parshing(node, index.toString())
                ))
            }
        </>
    )

}

const parshing = (node: Node, key: React.Key): React.ReactNode | null => {
    switch (node.type) {
        case 'p':
            return <Paragraph key={key} initialNode={node} />;
        case 'span':
            return <Span key={key} initialNode={node} />;
        case 'h2':
        case 'h3':
        case 'h4':
            return <Heading key={key} initialNode={node} />;
        default:
            return null;
    }
}


const Paragraph = ({initialNode}: {initialNode: Node}) => {
    return (
        <p>
            {initialNode.children?.map((node, index) => (
                parshing(node, index.toString())
            ))}

        </p>
    )
}

const Heading = ({initialNode}: {initialNode: Node}) => {
    switch (initialNode.type) {
        case 'h2':
            return (<h2>{initialNode.text}</h2>);
        case 'h3':
            return (<h3>{initialNode.text}</h3>);
        case 'h4':
            return (<h4>{initialNode.text}</h4>);
        default:
            return null;
    }
}

const Span = ({initialNode}: {initialNode: Node}) => {
    // 클래스명 설정
    const classNames = [
        initialNode.font?.bold ? 'bold' : '',
        initialNode.font?.italic ? 'italic' : '',
        initialNode.font?.underline ? 'underline' : '',
        initialNode.font?.strike ? 'strike' : ''
    ].filter(Boolean).join(' ');

    return (
        <span className={classNames}>
            {initialNode.text}
        </span>
    )
}
