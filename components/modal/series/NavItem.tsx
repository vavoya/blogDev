import Image from "next/image";
import styles from "@/components/modal/common/modal.module.css";
import MoveBackgroundAnimation from "@/components/modal/common/MoveBackgroundAnimation";
import {useEffect, useRef, useState} from "react";

interface NavItemProps {
    stack: number[]
    setStack: (newStack: number[]) => void
    name: string,
    postCount: number
    seriesId: number
}

export default function NavItem({stack, setStack, name, postCount, seriesId}: NavItemProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <button
            ref={ref}
            className={`${styles.modalNavItem} ${stack.includes(seriesId) ? styles.modalNavItemClick : ''}`}
            onClick={() => {
                if (stack.includes(seriesId)) {
                    setStack([])
                    return
                }
                setStack([seriesId])
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