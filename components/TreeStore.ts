import { makeAutoObservable } from 'mobx';
import Node, {Font, NodeParams} from './Node';

class TreeStore {
    root: Node | null = null;
    render: boolean = false;

    constructor() {

        makeAutoObservable(this);
    }

    // Node 생성
    createNode({ key, id, type, font = { bold: false, italic: false, underline: false, strike: false }, text = "" }: NodeParams) {
        return new Node({key, id, type, font, text});
    }

    // 자식 Node 추가 & 자식 Node의 parent 설정
    addChild(parent: Node, child: Node, index: number) {
        // index가 유효한지 확인하고 배열의 범위 내에 있는 경우 추가
        if (index >= 0 && index <= parent.children.length) {
            parent.children.splice(index, 0, child);
            child.parent = parent
        } else {
            throw new Error("Invalid index");
        }
    }

    // 자식 Node 제거
    removeChild(parent: Node, index: number) {
        // index가 유효한지 확인하고 배열의 범위 내에 있는 경우 제거
        if (index >= 0 && index < parent.children.length) {
            parent.children.splice(index, 1);
        } else {
            throw new Error("Invalid index");
        }
    }

    // span (code?) 의 text 수정
    changeText(node: Node, text: string) {
        node.text = text
    }

    // span font set
    setFont(node: Node, fontType: keyof Font) {
        node.font[fontType] = true;
    }

    // span font unset
    unsetFont(node: Node, fontType: keyof Font) {
        node.font[fontType] = false;
    }

    isEqual(obj1: any, obj2: any): boolean {
        if(Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }

        // 모든 속성을 반복하여 값이 동일한지 확인
        for (let key in obj1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }

        return true;
    }

    mergeChildren(parent: Node, startIndex: number, endIndex: number) {
        if (startIndex < 0 || endIndex >= parent.children.length || startIndex > endIndex) {
            throw new Error("Invalid index range");
        }

        let i = startIndex;

        while (i < endIndex) {
            const currentChild = parent.children[i];
            const nextChild = parent.children[i + 1];

            // childNode 존재 여부
            if (currentChild) {
                // 현재 childeNode의 text 또는 자식이 없으면 제거
                if ((currentChild.text === "" && currentChild.type === "span") || currentChild.children.length === 0) {
                    this.removeChild(parent, i)
                    i--
                } else if (nextChild) {
                    if ((currentChild.type === "span" && nextChild.type === "span") && this.isEqual(currentChild, nextChild)) {

                    }
                }
            }
        }

    }





}

const store = new TreeStore();
export default store;
