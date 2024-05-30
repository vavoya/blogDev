
import Modal from "@/app/[name]/@modal/modal";
import CatList from "./.component/catList"
import PageList from "../../.component/pageList";

export default function Layout(props: {
    children: React.ReactNode;
}){
    // 아 이거, 탐색할 때 마다 리마운트 되는데... 그냥 냅둬더 될까. 고치자니 하... 유지보수가 쪼끔;;

    return (
        <>
            <CatList />
            <PageList>
                {props.children}
            </PageList>
        </>
    )
}

