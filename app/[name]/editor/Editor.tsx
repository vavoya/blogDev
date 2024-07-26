
import React from 'react';
import Heading from "@/app/[name]/editor/TT/HAHA/Heading";
import Paragraph from "@/app/[name]/editor/paragraph";

function Editor({ mdText }: { mdText: string }) {
    const parseBlocks = (text: string) => {
        const blocks = text.split('\n');
        return blocks.map((v, i) => {
            if (v.startsWith('### ')) {
                return <Heading key={i} level={3} text={v.slice(4)} />;
            } else if (v.startsWith('## ')) {
                return <Heading key={i} level={2} text={v.slice(3)} />;
            } else if (v.startsWith('# ')) {
                return <Heading key={i} level={1} text={v.slice(2)} />;
            } else {
                return <Paragraph key={i} text={v} />;
            }
        });
    };

    return (
        <div
            contentEditable={true}
            suppressContentEditableWarning={true}
            onCompositionStart={e=>{
                console.log('스타트',e.data)
                e.preventDefault()
            }}
            onCompositionUpdate={e=>{
                console.log('업데이트',e.data)
                e.preventDefault()
            }}
            onCompositionEnd={e=>{
                console.log('끝',e.data)
                e.preventDefault()
            }}
            onKeyDown={(e) => {
                console.log(e)
                e.preventDefault();
            }}
            onClick={(e) => {
            console.log(e)
        }}
        >
            {parseBlocks(mdText)}
        </div>
    );
}

export default Editor;