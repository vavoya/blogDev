'use client'

import {Modal} from "@/app/[name]/@modal/modal";
import CatList from "./.component/catList";
import PageList from "../../.component/pageList";

export default function Layout(props: {
    children: React.ReactNode;
}){

    return (
        <Modal>
            <CatList />
            <PageList>
                {props.children}
            </PageList>
        </Modal>
)
}

