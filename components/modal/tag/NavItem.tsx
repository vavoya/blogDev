import styles from "@/components/modal/common/modal.module.css";
import MoveBackgroundAnimation from "@/components/modal/common/MoveBackgroundAnimation";
import {useEffect, useRef, useState} from "react";

interface NavItemProps {
    stack: number[]
    setStack: (newStack: number[]) => void
    name: string,
    postCount: number
    tagId: number
}

export default function NavItem({stack, setStack, name, postCount, tagId}: NavItemProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <button
            ref={ref}
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
            {isMounted && <MoveBackgroundAnimation width={ref.current!.offsetWidth} height={ref.current!.offsetHeight}/>}
        </button>
    )
}