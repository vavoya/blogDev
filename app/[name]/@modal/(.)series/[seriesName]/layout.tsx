'use client'

import {Modal} from "@/app/[name]/@modal/modal";
import PageList from "../../.component/pageList"

export default function Layout(props: {
    children: React.ReactNode;
}){

    return (
        <>
            <SeriesList />
            <PageList>
                {props.children}
            </PageList>
        </>
    )
}

