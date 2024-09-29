
import styles from "@/app/dashboard2/management/common/LoadingSpinner.module.css"


export default function LoadingSpinner() {


    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner} />
            <span>
                저장 중...
            </span>
        </div>
    )
}