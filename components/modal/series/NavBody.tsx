import {SeriesObject} from "@/types/series.interface";
import styles from "@/components/modal/common/modal.module.css";
import SeriesModalNavItem from "@/components/modal/series/NavItem";
import {formatDate} from "@/utils/data";

interface NavBodyProps {
    data: SeriesObject
    stack: number[]
    setStack: (newStack: number[]) => void
    isModalOpen: boolean
}

export default function SeriesNavBody({data, stack, setStack, isModalOpen}: NavBodyProps) {

    return (
        <div className={styles.modalNavBody}>
            {
                Object.keys(data).map((seriesId: string) => {
                    const name = data[seriesId].name
                    const postCount = data[seriesId].postCount
                    const date = new Date(data[seriesId].updatedAt);
                    const updatedAt = formatDate(date)
                    const imageUrl = data[seriesId].thumbnail

                    return (
                        <SeriesModalNavItem
                            key={seriesId}
                            stack={stack}
                            setStack={setStack}
                            imageUrl={imageUrl}
                            name={name}
                            updatedAt={updatedAt}
                            postCount={postCount}
                            seriesId={Number(seriesId)}
                            isModalOpen={isModalOpen}/>
                    )
                })
            }
        </div>
    )
}