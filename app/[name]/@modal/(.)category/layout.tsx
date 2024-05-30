import Modal from "@/app/[name]/@modal/modal";
import CatList from "@/app/[name]/@modal/(.)category/[[...pathName]]/.component/catList";
import PageList from "./../.component/pageList";

export default function ModalLayout({children}: {children: React.ReactNode}) {
    return (
        <Modal>
            <CatList />
            <PageList>
                {children}
            </PageList>
        </Modal>
    )
}