import {KeyboardEventHandler, useEffect, useRef} from "react";
import styles from "@/app/dashboard2/management/common/DropBox.module.css";

interface DropBoxProps {
    setDropBox: (setDropBox: boolean) => void;
    keyDownHandler: KeyboardEventHandler<HTMLDivElement>
    head: React.ReactNode;
    children: React.ReactNode[]
}

export default function DropBox({setDropBox, keyDownHandler, head,  children}: DropBoxProps) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const closeDropBox = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setDropBox(false)
                e.preventDefault()
            }
        }

        document.addEventListener('keydown', closeDropBox)

        if(ref.current) {
            ref.current.focus()
        }

        return () => {
            document.removeEventListener('keydown', closeDropBox)
        }
    }, [setDropBox])

    return (
        <div
            tabIndex={1}
            ref={ref}
            className={styles.dropBox}
            onKeyDown={keyDownHandler}
            onBlur={e => {
                setDropBox(false)
            }}>
            {head}
            <div className={styles.dropBoxScroll}>
                {children}
            </div>
        </div>
    )
}