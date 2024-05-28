'use client'

import {Modal} from "@/app/[name]/@modal/modal";
import styles from "./category.module.css";
import CatList from "./.component/catList";
import PageList from "./.component/pageList";
import Pagination from "./.component/pagination"

export default function Layout(props: {
    children: React.ReactNode;
}){

    return (
        <Modal>
            <CatList />
            <div className={styles.pageList}>
                <PageList />
                {props.children}
                <Pagination />
            </div>
        </Modal>
)
}

