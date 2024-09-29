import styles from "@/components/modal/common/modal.module.css";
import styles2 from "@/components/modal/common/CardItem.module.css";
import Image from "next/image";
import MoveBackgroundAnimation from "@/components/modal/common/MoveBackgroundAnimation";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {SeriesPostsObject} from "@/app/dashboard2/management/series/component/SeriesPosts";

interface ModalCardItemProps {
    state: {
        thumbUrl: string
        title: string,
        description: string,
        createdAt: string,
        path: string,
        seriesOrder: number
        directoryId: number
        slug: string
        postSlug: string
        seriesPosts: SeriesPostsObject
    }
    setState: {
        seriesPosts: Dispatch<SetStateAction<SeriesPostsObject>>
        onClose: () => void
    }
}

export default function ModalCardItem({state, setState}: ModalCardItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);


    const onClick = () => {
        const newSeriesPosts = {...state.seriesPosts}
        newSeriesPosts[state.seriesOrder] = {
            title: state.title,
            directoryId: state.directoryId,
            seriesOrder: state.seriesOrder,
            slug: state.slug
        }
        setState.seriesPosts(newSeriesPosts)
        setState.onClose()
    }

    return (
        <div
            onClick={onClick}
            ref={ref}
            className={styles.modalCardItem}>
            <Image
                src={state.thumbUrl}
                width={300}
                height={200}
                alt={"thumbnail"}/>
            {
                state.postSlug === state.slug
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
                    {state.path}
                </span>
                <time>
                    {state.createdAt}
                </time>
            </div>
            <div className={styles2.title}>
                <span>
                    {state.title}
                </span>
            </div>
            <div className={styles2.description}>
                <span>
                    {state.description}
                </span>
            </div>
        </div>

    )
}