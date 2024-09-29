
import styles from "./header.module.css"
import CommonHeader from "@/components/header/component/CommonHeader";


interface DefaultHeaderProps {
    blogSlug?: string;
    blogName?: string;
}

export default async function DefaultHeader({blogSlug, blogName}: DefaultHeaderProps) {
    return (
        <header className={styles.container}>
            <CommonHeader blogSlug={blogSlug} blogName={blogName}/>
        </header>
    )
}
