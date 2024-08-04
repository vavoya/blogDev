import Image from "next/image";
import styles from "@/components/modal/common/modal.module.css";
import MoveBackgroundAnimation from "@/components/modal/common/MoveBackgroundAnimation";
import {useEffect, useRef, useState} from "react";

interface NavItemProps {
    stack: number[]
    setStack: (newStack: number[]) => void
    imageUrl: string
    name: string,
    updatedAt: string
    postCount: number
    seriesId: number
    isModalOpen: boolean
}

export default function NavItem({stack, setStack, imageUrl, name, updatedAt, postCount, seriesId, isModalOpen}: NavItemProps) {
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
            className={`${styles.modalNavItem2} ${stack.includes(seriesId) ? styles.modalNavItemClick : ''}`}
            onClick={() => {
                if (stack.includes(seriesId)) {
                    return
                }
                setStack([seriesId])
            }}>
            <Image
                objectFit={"cover"}
                src={imageUrl}
                width={200}
                height={100}
                alt={"thumnail"}/>
            <div>
                <span>
                    {name}
                </span>
            </div>
            <div>
                <span>
                    {postCount}
                </span>
                <time>
                    {`${updatedAt} 업데이트`}
                </time>
            </div>
            <MoveBackgroundAnimation width={dimensions.width} height={dimensions.height}/>
        </button>
    )
}