import { useState } from "react";
import Modal from "../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useGetColorsQuery, useDeleteColorMutation } from "../../store/AppSlice";
import { setIsModalAdd, setIsModalClose, setIsModalUpdate } from "../../store/ModalSlice";
import { AddColorsModal, UpdateColorsModal } from "../../components/modals/ColorModals";

export default function Colors () {
    const {data: colorsRtk} = useGetColorsQuery();
    const [deleteColor] = useDeleteColorMutation();
    const [colorId, setColorId] = useState(0);
    const isModal = useAppSelector(state => state.modalSlice.isModal);
    const isAdd = useAppSelector(state => state.modalSlice.isAdd);
    const isUpdate = useAppSelector(state => state.modalSlice.isUpdate);
    const dispatch = useAppDispatch();

    const handleDeleteColor = async(id) => {
        await deleteColor(id);
    }


    return (
    <div className='wrapper flex flex-wrap mx-auto relative'>
            {isModal &&
            <Modal> 
                {isAdd && <AddColorsModal />}
                {isUpdate && <UpdateColorsModal colorId={colorId}/>} 
            </Modal>}
            {colorsRtk && colorsRtk.map(color => (
                <div
                    className='flex flex-col p-4 gap-2 rounded-xl shadow-md w-[200px] h-[120px] bg-red-100 hover:scale-105 transition-transform font-light italic'
                    key={color.colorId}
                >
                    <h1
                        className=' h-[25px] rounded'
                        style={{background: `#${color.colorHex}`}}
                    >
                    </h1>
                    <h1>#{color.colorHex}</h1>
                    <div className="flex gap-2">
                        <h1 
                            onClick={() => handleDeleteColor(color.colorId)}
                            className='px-4 py-2 bg-gray-100 flex rounded cursor-pointer'
                        >
                            delete
                        </h1>
                        <h1 
                            onClick={() => {
                                setColorId(color.colorId)
                                dispatch(setIsModalUpdate())
                            }}
                            className='px-4 py-2 bg-gray-100 flex rounded cursor-pointer'
                        >
                            change
                        </h1>
                    </div>
                </div>
            ))}
            <div
                onClick={() => {
                    dispatch(setIsModalAdd());
                }}
                className="flex  items-center justify-center text-5xl flex-col p-4 gap-2 rounded-xl shadow-md w-[200px] h-[120px] bg-red-100 hover:scale-105 transition-transform">
            +
            </div>
        </div>
    )
}

// export const getServerSideProps = async () => {
//     const colorsJson = await fetch('http://localhost:3001/colors');
//     const colors = await colorsJson.json();
//     return {
//         props: {
//             colors
//         }
//     }
// }