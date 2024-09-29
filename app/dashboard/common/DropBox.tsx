// 이후에는
import {useEffect, useRef} from "react";
import styles from "@/app/dashboard/common/DropBox.module.css";

interface DropBoxProps {
    setDropBox: (setDropBox: boolean) => void;
    enterHandler: () => void;
    arrowDownHandler: () => void;
    arrowUpHandler: () => void;
    title: React.ReactNode;
    children: React.ReactNode[]
}

export default function DropBox({setDropBox, enterHandler, arrowDownHandler, arrowUpHandler, title,  children}: DropBoxProps) {
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
    }, [])

    return (
        <div
            tabIndex={1}
            ref={ref}
            className={styles.dropBox}
            onKeyDown={e => {
                e.preventDefault()
                if (e.key === 'Enter') {
                    enterHandler()
                } else if (e.key === 'ArrowDown') {
                    arrowDownHandler()
                } else if (e.key === 'ArrowUp') {
                    arrowUpHandler()
                }
            }}
            onBlur={e => {
                setDropBox(false)
            }}>
            {title}
            <div className={styles.dropBoxScroll}>
                {children}
            </div>
        </div>
    )
}