import React from 'react';

interface TextStyleType {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    highlight: boolean;
}

interface TextRunType extends TextStyleType {
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

const parseText = (text: string): TextRunType[] => {
    const textRunArray: TextRunType[] = [];
    const currentTextStyle: TextStyleType = {
        bold: false,
        italic: false,
        strikethrough: false,
        highlight: false,
    };

    const styles = {
        bold: { delimiter: '**' },
        italic: { delimiter: '*' },
        strikethrough: { delimiter: '~~' },
        highlight: { delimiter: '==' },
        escape: {delimiter: '\\' },
    };

    let left = 0;
    let right = 0;

    while (right < text.length) {
        let text2 = text[right] + text[right + 1];
        let text1 = text[right];

        const addTextRun = () => {
            if (left < right) {
                const textData = text.slice(left, right);
                textRunArray.push({ text: textData, ...currentTextStyle });
            }
        };

        if (text1 === styles.escape.delimiter) {
            right++;
            text2 = text[right] + text[right + 1];
            text1 = text[right];
        }

        if (text2 === styles.bold.delimiter) {
            addTextRun();
            currentTextStyle.bold = !currentTextStyle.bold;
            left = right += 2;
        } else if (text1 === styles.italic.delimiter) {
            addTextRun();
            currentTextStyle.italic = !currentTextStyle.italic;
            left = right += 1;
        } else if (text2 === styles.strikethrough.delimiter) {
            addTextRun();
            currentTextStyle.strikethrough = !currentTextStyle.strikethrough;
            left = right += 2;
        } else if (text2 === styles.highlight.delimiter) {
            addTextRun();
            currentTextStyle.highlight = !currentTextStyle.highlight;
            left = right += 2;
        } else {
            right++;
        }
    }

    if (left < right) {
        const textData = text.slice(left, right);
        textRunArray.push({ text: textData, ...currentTextStyle });
    }

    return textRunArray;
};

const renderTextRuns = (textRunArray: TextRunType[]) => {
    return textRunArray.map((textRun: TextRunType, index: number) => {
        const className = `
      ${textRun.bold ? 'bold' : ''} 
      ${textRun.italic ? 'italic' : ''} 
      ${textRun.strikethrough ? 'strikethrough' : ''} 
      ${textRun.highlight ? 'highlight' : ''}
    `.trim();

        return (
            <span key={index} className={className}>{textRun.text}</span>
        );
    });
};

function Paragraph({ text }: { text: string }) {
    const textRunArray = parseText(text);

    return (
        <p>
            {renderTextRuns(textRunArray)}
        </p>
    );
}

export default Paragraph;
