import {Dispatch, SetStateAction} from "react";
import styles from "@/app/dashboard2/management/folder/component/FolderItem.module.css";
import {Series} from "@/types/series.interface";
import SvgSeries from "@/components/svg/Series";


interface SeriesItemProps {
    state: {
        series: Series
        seriesId: number
        level: number
        isSelected: boolean
    }
    setState: {
        selectedSeriesId: Dispatch<SetStateAction<number>>
    }
}


export default function SeriesItem({state, setState}: SeriesItemProps) {



    return (
        <button
            style={{paddingLeft: `${state.level * 30}px`}}
            className={`${styles.folderItem} ${state.isSelected ? styles.folderItemSelected : ''}`}
            onClick={() => {
                setState.selectedSeriesId(state.seriesId)
            }}>
            <div>
                <SvgSeries strokeWidth={2} />
            </div>
            <span className={styles.folderItemName}>
                {state.series.name}
            </span>
            <span className={styles.folderItemCount}>
                {state.series.postCount}
            </span>
        </button>
    )
}

