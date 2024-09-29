
import styles from "./header.module.css"
import CommonHeader from "@/components/header/component/CommonHeader";
import DashboardNav from "@/components/header/component/DashboardNav";


interface DashboardHeaderProps {
    blogSlug?: string;
    blogName?: string;
}

export default function DashboardHeader({blogSlug, blogName}: DashboardHeaderProps) {


    return (
        <header className={styles.container}>
            <CommonHeader blogSlug={blogSlug} blogName={blogName}/>
            <DashboardNav />
        </header>
    )
}
