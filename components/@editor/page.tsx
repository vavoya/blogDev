

import React from "react";

import NewEditor from "../../../untitled2/app/HAHA/Test"
import ParserMemo from "../../../untitled2/app/HAHA/Parser"
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

}
