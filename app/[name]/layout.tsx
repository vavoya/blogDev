
import Header from "../../components/header/header";
import SideBar from "@/components/sideBar/sideBar";


export default function Layout(props: {
    children: React.ReactNode;
    modal: React.ReactNode;
}){
    return (
        <>
            <Header />
            <SideBar />
            <main style={{
                width: "800px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
            }}>
                {props.children}
            </main>
            {props.modal}
        </>
    )
}

//<Footer />