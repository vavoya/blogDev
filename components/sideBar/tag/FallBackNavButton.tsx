import styles from "@/components/sideBar/sideBar.module.css";
import {IconLabel} from "@/components/sideBar/tag/IconLabel";

export default function FallBackButton() {

    return (
        <button className={styles.button}>
            <IconLabel />
        </button>
    )
}