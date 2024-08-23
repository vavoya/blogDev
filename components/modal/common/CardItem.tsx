import Link from "next/link";
import styles from "@/components/modal/common/modal.module.css";
import styles2 from "@/components/modal/common/CardItem.module.css";
import Image from "next/image";
import MoveBackgroundAnimation from "@/components/modal/common/MoveBackgroundAnimation";
import {Slugs} from "@/components/sideBar/SideBar";
import {useEffect, useRef, useState} from "react";

export default function ModalCardItem({slugs, href, thumbUrl, title, description, createdAt, path}: {
    slugs: Slugs
    href: string,
    thumbUrl: string
    title: string,
    description: string,
    createdAt: string,
    path: string,
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    const currentHref = decodeURIComponent(`/${slugs.blogSlug}/${slugs.postSlug}`)

    return (
        <Link
            ref={ref}
            className={styles.modalCardItem}
            href={href}>
            <Image
                src={thumbUrl}
                width={300}
                height={200}
                alt={"thumbnail"}/>
            {
                currentHref === href
                    ? <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(var(--primary-color), 0.1)'
                    }} />
                    :  isMounted && <MoveBackgroundAnimation width={ref.current!.offsetWidth} height={ref.current!.offsetHeight}/>
            }
            <div className={styles2.metadata}>
                <span>
                    {path}
                </span>
                <time>
                    {createdAt}
                </time>
            </div>
            <div className={styles2.title}>
                <span>
                    {title}
                </span>
            </div>
            <div className={styles2.description}>
                <span>
                    {description}
                </span>
            </div>
        </Link>

    )
}