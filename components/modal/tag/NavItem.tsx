import styles from "@/components/modal/common/modal.module.css";
import MoveBackgroundAnimation from "@/components/modal/common/MoveBackgroundAnimation";
import {useEffect, useRef, useState} from "react";

interface NavItemProps {
    stack: number[]
    setStack: (newStack: number[]) => void
    name: string,
    postCount: number
    tagId: number
    isModalOpen: boolean
}

export default function NavItem({stack, setStack, name, postCount, tagId, isModalOpen}: NavItemProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (ref.current) {
            setDimensions({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight
            });
        }
    }, [isModalOpen]);

    return (
        <button
            className={`${styles.modalNavItem} ${stack.includes(tagId) ? styles.modalNavItemClick : ''}`}
            onClick={() => {
                let newStack = [...stack]
                if (newStack.includes(tagId)) {
                    newStack = newStack.filter(v => v !== tagId)
                } else {
                    newStack.push(tagId)
                }
                setStack(newStack)
            }}>
            <span>
                {name}
            </span>
            <span>
                {postCount}
            </span>
            <MoveBackgroundAnimation width={dimensions.width} height={dimensions.height}/>
        </button>
    )
}