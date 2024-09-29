import styles from "@/components/modal/common/modal.module.css";
import MoveBackgroundAnimation from "@/components/modal/common/MoveBackgroundAnimation";
import {useEffect, useRef, useState} from "react";

interface NavItemProps {
    stack: number[]
    setStack: (newStack: number[]) => void
    name: string,
    postCount: number | null
    directoryId: number
}

export default function NavItem({stack, setStack, name, postCount, directoryId}: NavItemProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <button
            ref={ref}
            className={styles.modalNavItem}
            onClick={() => {
                const newStack = [...stack]
                newStack.push(directoryId)
                setStack(newStack)
            }}>
            <div>
                <span>
                    {name}
                </span>
                <button>

                </button>
            </div>
            <span>
                {postCount}
            </span>
            {isMounted && <MoveBackgroundAnimation width={ref.current!.offsetWidth} height={ref.current!.offsetHeight}/>}
        </button>
    )
}