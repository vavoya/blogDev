import styles from "./PostContent.module.css";

export default function PostContent() {


    return (
        <section className={styles.postContent}>
            <h1>ReadMe</h1>
            <p><span className={styles.bold + ' ' + styles.italic}>12312312{`\u00a0`}</span><span
                className={styles.highlight}>{`\u00a0`}뭘봐요{`\u00a0`}</span><span
                className={styles.bold + ' ' + styles.italic}>{`\u00a0`}2312312</span></p>
            <p><span className={styles.bold + ' ' + styles.italic}>12312312</span></p>
            <ul>
                <li><span
                    className={styles.bold + ' ' + styles.italic + ' ' + styles.highlight}>{`\u00a0`}2312312{`\u00a0`}{`\u00a0`}</span></li>
                <li>3</li>
            </ul>
            <h2>
                제목2제목2
            </h2>
            <p>평문평문평문</p>
        </section>
)
}