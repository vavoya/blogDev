import { makeAutoObservable } from 'mobx';

class Node {
    // 리액트 컴포넌트 key 값
    key;
    // 부모 노드 children의 index
    id;
    // html 태그 타입
    type;
    // span 서체
    font = {bold: false, italic: false, underline: false, strike: false};
    // 자식 노드 리스트
    children:(Node | null)[] = [];
    // 부모 노드
    parent: Node | null = null;
    // span 텍스트
    text: string = "";


    constructor(key: number, id:number, type: string, font: {bold: false, italic: false, underline: false, strike: false}) {
        this.key = key;
        this.id = id;
        this.type = type;
        this.font = font;
        makeAutoObservable(this);
    }



















    // 부모 설정
    setParent(parent: Node) {
        // 여기서 this는 메소드를 호출한 노드 객체
        this.parent = parent;
    }

    // 자식 추가
    addChild(child: Node, index: number) {
        // this === 부모 노드 객체 를 넘겨주는 것
        child.setParent(this);
        this.children.splice(index, 0, child); // index 위치에 child를 삽입
    }


    // 텍스트 변경
    changeText(text: string) {
        this.children[0] = text
    }

    // 서체 스타일 설정
    setFont(fontType: string) {
        this.font[fontType] = true;
    }

    unsetFont(fontType: string) {
        this.font[fontType] = false;
    }



    // 객체를 JSON으로 직렬화
    toJSON() {
        return {
            key: this.key,
            id: this.id,
            type: this.type,
            font: this.font,
            parent: this.parent,
            children: this.children.map(child =>
                typeof child === 'string' ? child : child?.toJSON()
            )
        };
    }

    // JSON 데이터를 통해 객체를 복원
    static fromJSON(json) {
        const node = new Node(json.key, json.id, json.type, json.font);
        node.children = json.children.map(child =>
            typeof child === 'string' ? child : Node.fromJSON(child)
        );
        node.children.forEach(child => {
                if (child instanceof Node) {
                    child.setParent(node);
                }
        });
        return node;
    }
}
/*

 */

export default Node;