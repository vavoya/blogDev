import SvgFolder from "@/components/svg/Folder";
import {Directory} from "@/types/directories.interface";
import {Dispatch, SetStateAction} from "react";
import styles from "@/app/dashboard2/management/folder/component/FolderItem.module.css";


interface FolderItemProps {
    state: {
        directory: Directory
        directoryId: number
        level: number
        isSelected: boolean
    }
    setState: {
        selectedFolderId: Dispatch<SetStateAction<number>>
    }
}


export default function FolderItem({state, setState}: FolderItemProps) {



    return (
        <button
            style={{paddingLeft: `${state.level * 30}px`}}
            className={`${styles.folderItem} ${state.isSelected ? styles.folderItemSelected : ''}`}
            onClick={() => {
                setState.selectedFolderId(state.directoryId)
            }}>
            <div>
                <SvgFolder strokeWidth={2} />
            </div>
            <span className={styles.folderItemName}>
                {state.directory.name}
            </span>
            <span className={styles.folderItemCount}>
                {state.directory.postCount}
            </span>
        </button>
    )
}