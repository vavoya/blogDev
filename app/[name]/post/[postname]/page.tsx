'use client'

import Image from "next/image";
import styles from "./page.module.css";
import JsonRenderer from "@/components/jsonRenderer/JsonRenderer"
import page1 from "@/components/jsonRenderer/page1.json"



export default function Post({params}: {params: string}) {
    return (
        <main>
            <article className={styles.article}>
                <header className={styles.header}>
                    <ul className={styles.taglist}>
                        {page1.tag.map((tag, index) => (<li key={index}>{tag}</li>))}
                    </ul>
                    <h1>{page1.title}</h1>
                    <span className={styles.date}>{page1.date}</span>
                    <figure style={{ height: "450px", width: "800px", position: "relative"}}>
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
                <JsonRenderer jsonDocument={page1}/>
            </article>
        </main>
    )
}