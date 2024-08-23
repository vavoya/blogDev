import styles from "./TreeItem.module.css";
import SvgAdd from "@/components/svg/Add";
import SvgSubtract from "@/components/svg/Subtrack";
import SvgFolder from "@/components/svg/Folder";
import SvgSeries from "@/components/svg/Series";
import SvgTag from "@/components/svg/Tag";
import SvgPost from "@/components/svg/Post";
import SvgError from "@/components/svg/Error";
import {isError} from "node:util";

export interface TreeItemProps {
    type: string
    itemName: string;
    level: number;
    count?: number
    isError?: boolean
    isFocused?: boolean;
    clickCallback?: () => void;
    addCallback?: () => void;
    subtractCallback?: () => void;
}

export default function TreeItem({type, itemName, level, count, isError, isFocused, clickCallback, addCallback, subtractCallback}: TreeItemProps) {

    return (
        <div
            className={`${styles.treeItem} ${isFocused && styles.currentItem}`}
            style={{marginLeft: `${(level + 2) * 30}px`}}>
            <button className={styles.item} onClick={clickCallback}>
                <div className={styles.itemIcon}>
                    {
                        type === 'folder' && <SvgFolder strokeWidth={2} />
                    }
                    {
                        type === 'series' && <SvgSeries strokeWidth={2} />
                    }
                    {
                        type === 'tag' && <SvgTag width={19.12} height={18} strokeWidth={2} />
                    }
                    {
                        type === 'post' && <SvgPost strokeWidth={2} />
                    }
                    {
                        isError === true && <SvgError />
                    }
                </div>
                <div className={styles.itemName}>
                    <span className={styles.name}>
                        {itemName}
                    </span>
                    {
                        count !== undefined &&
                        <span className={styles.count}>
                            {count}
                        </span>
                    }
                </div>
            </button>
            <div className={styles.buttonSection}>
                {
                    subtractCallback &&
                    <button className={styles.button} onClick={subtractCallback}>
                        <SvgSubtract />
                    </button>
                }
                {
                    addCallback &&
                    <button className={styles.button} onClick={addCallback}>
                        <SvgAdd />
                    </button>
                }
            </div>
        </div>
    )
}