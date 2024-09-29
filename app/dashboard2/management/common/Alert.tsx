import styles from "./Alert.module.css"

interface AlertProps {
    title: string
    text: string
    LButton: {
        text: string
        onClick: () => void
    }
    RButton: {
        text: string
        onClick: () => void
    }
}

export default function Alert({title, text, LButton, RButton}: AlertProps) {


    return (
        <div className={styles.Alert}>
            <div>
                <div className={styles.TextSection}>
                    <h1>
                        {title}
                    </h1>
                    <span>
                        {text}
                    </span>
                </div>
                <div className={styles.ButtonSection}>
                    <button onClick={LButton.onClick}>
                        {LButton.text}
                    </button>
                    <button onClick={RButton.onClick}>
                        {RButton.text}
                    </button>
                </div>
            </div>
        </div>
    )
}