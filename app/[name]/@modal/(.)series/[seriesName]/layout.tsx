'use client'

import {Modal} from "@/app/[name]/@modal/modal";
import PageList from "../../.component/pageList"

export default function Layout(props: {
    children: React.ReactNode;
}){

    return (
        <Modal>
            <SeriesList />
            <PageList>
                {props.children}
            </PageList>
        </Modal>
    )
}

