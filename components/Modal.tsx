import { NextPage } from "next"
import { useAppDispatch } from "../hooks/redux"
import { setIsModalClose } from "../store/ModalSlice";


interface ModalProps {
    children?: any
}

const Modal: NextPage<ModalProps> = ({children}) => {
    const dispatch = useAppDispatch();
    return (
        <div
            onClick={() => dispatch(setIsModalClose())}
            style={{background: 'rgba(0, 0, 0, .4)', zIndex: '100'}}
            className="fixed z-100 left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center p-8"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white text-2xl p-4 rounded-lg"
            >
                {children}
            </div>
        </div>
    )
}

export default Modal;