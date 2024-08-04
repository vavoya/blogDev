import styles from "@/components/modal/common/modal.module.css";
import MoveBackgroundAnimation from "@/components/modal/common/MoveBackgroundAnimation";
import {useEffect, useRef, useState} from "react";

interface NavItemProps {
    stack: number[]
    setStack: (newStack: number[]) => void
    name: string,
    postCount: number | null
    directoryId: number
    isModalOpen: boolean
}

export default function NavItem({stack, setStack, name, postCount, directoryId, isModalOpen}: NavItemProps) {
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
            ref={ref}
            className={styles.modalNavItem}
            onClick={() => {
                const newStack = [...stack]
                newStack.push(directoryId)
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