'use client'

import {useEditor, EditorContent, Editor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'

import {useCallback} from "react";
import {HorizontalRule} from "@tiptap/extension-horizontal-rule";
//import from "@/tiptap"

const Tiptap = () => {
    const editor: Editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Heading.configure({
                levels: [1, 2, 3],
            }),
            Image.configure({
                allowBase64: true
            }),
            Highlight,
            HorizontalRule,
        ],
        autofocus: true,
        content: '<p>Hello World! 🌎️</p><Link>22222</Link><section><h2>아하하</h2></section><blockquote>ddd</blockquote>',
    })

    const addLocalImage = useCallback(() => {
        const input: HTMLInputElement = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
            const file: File | null = input.files ? input.files[0] : null;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64String = e.target?.result;
                    console.log(base64String)
                    editor.chain().focus().setImage({ src: base64String }).run();
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }, [editor]);

    const f =() => {
        console.log(editor.getHTML())
        console.log(editor.getJSON())
        console.log(editor.getText())
        editor?.setEditable(true)
    }



    return (
        <>
            <EditorContent editor={editor} />
            <button onClick={addLocalImage}>클릭!!</button>

        </>
    )
}

export default Tiptap






