'use client'

import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Link from "next/link";
import SideBar from "@/components/sideBar/sideBar";


export default function Layout(props: {
    children: React.ReactNode;
    modal: React.ReactNode;
}){
    console.log(props.modal && true, '모달1',props)
    return (
        <>
            <Header />
            <SideBar />
            {props.children}
            {props.modal}
        </>
    )
}

//<Footer />