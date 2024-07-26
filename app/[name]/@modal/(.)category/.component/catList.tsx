'use client';

import styles from '../[[...pathName]]/category.module.css';
import CatItem from './catItem';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

interface Node {
    name: string;
    folder: boolean;
    list: Node[];
}

export default function CatList({ JSONData }: { JSONData: Node }) {
    const [nodeStack, setNodeStack] = useState<Node[]>([JSONData]);
    const [catListComponent, setCatListComponent] = useState<React.ReactNode[]>([]);
    const pathname = usePathname();

    const pushNodeStack = useCallback((index: number) => {
        const lastNode = nodeStack.at(-1);
        if (!lastNode) {
            setNodeStack([JSONData]);
            return;
        }

        const node = lastNode.list[index];
        if (node && node.folder) {
            setNodeStack([...nodeStack, node]);
        }
    }, [nodeStack, JSONData]);

    const popNodeStack = useCallback(() => {
        if (nodeStack.length > 1) {
            setNodeStack(nodeStack.slice(0, -1));
        } else {
            console.warn('Cannot pop the root node.');
        }
    }, [nodeStack]);

    const getFullPathname = useCallback((depth: number) => {
        const base = pathname.split('/').slice(1, 3).join('/');
        const path = nodeStack.slice(1, depth).map(node => node.name).join('/');
        return `/${base}/${path}`;
    }, [pathname, nodeStack]);

    const getPrevPathname = useCallback(() => {
        const prevPath = getFullPathname(-1);
        const isFile = nodeStack.at(-2)?.folder === false;
        return isFile ? `${prevPath}?page=1` : prevPath;
    }, [getFullPathname, nodeStack]);

    useEffect(() => {
        const lastNode = nodeStack.at(-1) ?? JSONData;
        if (lastNode.folder) {
            const path = getFullPathname(nodeStack.length);
            const newCatListComponent = lastNode.list.map((v, i) => (
                <CatItem
                    path={path}
                    name={v.name}
                    folder={v.folder}
                    key={i}
                    onClick={() => pushNodeStack(i)}
                />
            ));
            setCatListComponent(newCatListComponent);
        }
        // getFullPathname의 변경이 있을 경우 바뀌는 걸로 보면 됨
    }, [nodeStack, getFullPathname, pushNodeStack, JSONData]);

    return (
        <div className={styles.catList}>
            <div className={styles.catListHead}>
                <span>폴더</span>
                <Link href={getPrevPathname()} onClick={popNodeStack}>
                    <div />
                    <span>이전</span>
                </Link>
            </div>
            <div className={styles.catListBody}>
                {catListComponent}
            </div>
        </div>
    );
}
