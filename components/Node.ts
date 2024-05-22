import { makeAutoObservable } from 'mobx';

export interface Font {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strike: boolean;
}

export interface NodeParams {
    key: number;
    id: number;
    type: string;
    font?: Font;
    text?: string;
}

class Node {
    key: number;
    id: number;
    type: string;
    font: Font;
    children: (Node | null)[];
    parent: Node | null;
    text: string;

    constructor({ key, id, type, font = { bold: false, italic: false, underline: false, strike: false }, text = "" }: NodeParams) {
        this.key = key;
        this.id = id;
        this.type = type;
        this.font = font;
        this.children = [];
        this.parent = null;
        this.text = text;
        makeAutoObservable(this);
    }
}

export default Node;
