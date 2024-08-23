import styles from "./Button.module.css"

export interface ButtonProps {
    text: string
}

export default function Button({text}: ButtonProps) {

    return (
        <button className={styles.button}>
            <span>{text}</span>
        </button>
    )
}