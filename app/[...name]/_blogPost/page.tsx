
import Image from "next/image";
import styles from "./page.module.css";
import page1 from "@/components/jsonRenderer/page1.json"
import PostContent from "@/app/[...name]/_blogHome/PostContent";

export default async function Page({params}: { params: string }) {

    return (
        <article className={styles.article}>
            <Header />
            <PostContent />
        </article>
    )

}

const Header = () => {
    return (
        <header className={styles.header}>
            <ul className={styles.taglist}>
                {page1.tag.map((tag, index) => (<li key={index}>{tag}</li>))}
            </ul>
            <h1>{page1.title}</h1>
            <span className={styles.date}>{page1.date}</span>
            <figure style={{height: "450px", width: "800px", position: "relative"}}>
                <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    className={styles.vercelLogo}
                    fill={true}
                    quality="100"
                    priority
                />
            </figure>
        </header>
    )
}