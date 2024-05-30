import Modal from "@/app/[name]/@modal/modal";


export default function ModalLayout({children}: {children: React.ReactNode}) {
    return (
        <Modal>
            {children}
        </Modal>
    )
}