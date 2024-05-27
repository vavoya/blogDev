'use client'


import {Modal} from "@/app/[name]/@modal/modal";

export default function Layout(props: {
    children: React.ReactNode;
    catList: React.ReactNode;
    pageList: React.ReactNode;
}){

    return (



        <Modal>
            {props.catList}
            {props.children}
        </Modal>
    )
}

//<Footer />