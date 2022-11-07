import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useDeleteEquipmentMutation, useGetEquipmentQuery } from "../../store/AppSlice";
import Modal from "../../components/Modal";
import { setIsModalAdd, setIsModalUpdate } from "../../store/ModalSlice";
import { AddEquipmentModal, UpdateEquipmentModal } from "../../components/modals/EquipmentModal";
import { useState } from "react";

const Equipment = () => {
    const isModal = useAppSelector(state => state.modalSlice.isModal);
    const isAdd = useAppSelector(state => state.modalSlice.isAdd);
    const isUpdate = useAppSelector(state => state.modalSlice.isUpdate);
    const dispatch = useAppDispatch();
    const {data: equipment} = useGetEquipmentQuery(undefined);    
    const [deleteEquipment] = useDeleteEquipmentMutation();
    const [equipmentId, setEquipmentId] = useState(0);

    const handleDeleteEquipment = async (equipmentId: number) => {
        await deleteEquipment(equipmentId);
    }

    return (
        <div className='wrapper flex flex-wrap mx-auto relative'>
                {isModal &&
                <Modal> 
                    {isAdd && <AddEquipmentModal />}
                     {isUpdate && <UpdateEquipmentModal equipmentId={equipmentId}/>}  
                </Modal>} 
                {equipment && equipment.map((equip: {equipmentId: number, equipmentName: string, equipmentType: string}) => (
                    <div
                        className='flex flex-col p-4 gap-2 rounded-xl shadow-md w-[200px] h-[140px] bg-red-100 hover:scale-105 transition-transform font-light italic'
                        key={equip.equipmentName}
                    >
                        <h1 className="text-lg">{equip.equipmentName}</h1>
                        <h1>{equip.equipmentType}</h1>
                        <div className="flex gap-2">
                            <h1 
                                onClick={() => {
                                    handleDeleteEquipment(equip.equipmentId);
                                }}
                                className='px-4 py-2 bg-gray-100 flex rounded cursor-pointer'
                            >
                                delete
                            </h1>
                            <h1 
                                onClick={() => {
                                    setEquipmentId(equip.equipmentId);
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
                    className="flex  items-center justify-center text-5xl flex-col p-4 gap-2 rounded-xl shadow-md w-[200px] h-[140px] bg-red-100 hover:scale-105 transition-transform">
                +
                </div>
            </div>
        )
}

export default Equipment;