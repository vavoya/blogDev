import styles from "@/components/sideBar/sideBar.module.css";
import {IconLabel} from "@/components/sideBar/directory/IconLabel";

export function FallBackButton() {

    return (
        <button className={styles.button}>
            <IconLabel />
        </button>
    )
}