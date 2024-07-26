import Modal from "@/app/[name]/@modal/modal";
import PageList from "@/app/[name]/@modal/.component/pageList";


export default function ModalLayout({children}: {children: React.ReactNode}) {
    return (
        <Modal>
            
            <PageList>
                {children}
            </PageList>
        </Modal>
    )
}