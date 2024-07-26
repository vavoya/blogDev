import Modal from "@/app/[name]/@modal/modal";
import CatList from "@/app/[name]/@modal/(.)category/.component/catList";
import PageList from "./../.component/pageList";

export default async function ModalLayout({children}: { children: React.ReactNode }) {

    let CatItemListJSONData: {} = {'a':1};

    try {
        const response = await fetch('http://localhost:3000/dum.json'); // 절대 경로를 사용
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        CatItemListJSONData = await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }



    return (
        <Modal>
            <CatList JSONData={CatItemListJSONData} />
            {children}
        </Modal>
    )
}