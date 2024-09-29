import dynamic from 'next/dynamic';
import ModalLoader from '../common/ModalLoader';
import {ModalProps} from "./Modal";


// @ts-ignore
const Modal = dynamic<ModalProps>(() => import('./Modal'), {
    ssr: false,
    loading: () => <ModalLoader />
});

export default Modal;
