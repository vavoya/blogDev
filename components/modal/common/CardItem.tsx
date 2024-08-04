import Link from "next/link";
import styles from "@/components/modal/common/modal.module.css";
import Image from "next/image";
import MoveBackgroundAnimation from "@/components/modal/common/MoveBackgroundAnimation";
import {Slugs} from "@/components/sideBar/SideBar";
import {useEffect, useRef, useState} from "react";

export default function ModalCardItem({slugs, href, thumbUrl, title, description, createdAt, path, onClose}: {
    slugs: Slugs
    href: string,
    thumbUrl: string
    title: string,
    description: string,
    createdAt: string,
    path: string,
    onClose: () => void
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    const currentHref = decodeURIComponent(`/${slugs.blogName}/${slugs.postSlug}`)

    return (
        <Link
            ref={ref}
            className={styles.modalCardItem}
            href={href}
            onClick={(e) => {
                onClose()
            }}>
            <Image
                src={thumbUrl}
                width={300}
                height={200}
                alt={"thumbnail"}/>
            <div>
                <span>
                    {path}
                </span>
                <time>
                    {createdAt}
                </time>
            </div>
            <div>
                <span>
                    {title}
                </span>
            </div>
            <div>
                <span>
                    {description}
                </span>
            </div>
            {
                currentHref === href
                    ? <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.1)'
                    }} />
                    :  isMounted && <MoveBackgroundAnimation width={ref.current!.offsetWidth} height={ref.current!.offsetHeight}/>
            }
        </Link>

    )
}