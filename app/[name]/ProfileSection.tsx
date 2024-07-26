import styles from "@/app/[name]/profileSection.module.css";

export default function ProfileSection({params}: {params: null}) {
    return (
        <section className={styles.profileSection}>
            <div className={styles.profileInfo}>
                <h1>허동영</h1>
                <p>개발을 싫어하는 개발자가 되고 싶은 사람</p>
                <ul>
                    <li>E-Mail: vavoya6324@gamil.com</li>
                    <li>Phone: 010-6324-2148</li>
                </ul>
            </div>
            <div className={styles.profileImage}>

            </div>
        </section>
    )
}