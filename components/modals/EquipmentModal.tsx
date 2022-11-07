import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
    useAddEquipmentMutation,
    useGetEquipmentTypesQuery,
    useGetEquipmentByIdQuery,
    useUpdateEquipmentMutation
} from "../../store/AppSlice";
import { setIsModalClose } from "../../store/ModalSlice";

export const AddEquipmentModal = () => {
    const [equipmentName, setEquipmentName] = useState('');
    const [typeId, setTypeId] = useState(0);
    const [addEquipment] = useAddEquipmentMutation();
    const dispatch = useAppDispatch();
    const {data: equipmentTypes} = useGetEquipmentTypesQuery(undefined);

    const handleAddEquipment = async (equipment: {
        equipmentName: string,
        typeId: number
    }) => {
        await addEquipment(equipment);
    };
    

    return (
        <form
            className="flex flex-col gap-4 font-light italic"
            onSubmit={(e) => {
                e.preventDefault();
                const equipment = {
                    equipmentName,
                    typeId
                };
                equipmentName.length > 0 && handleAddEquipment(equipment);
                equipmentName.length > 0 && dispatch(setIsModalClose());
            }}
        >
            <input
                placeholder="название оборудования"
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
                type="text"
                className="border rounded outline-none"
            />
            
            <h1>тип оборудования</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {equipmentTypes &&
                    equipmentTypes.map(
                        (equipmentType: { typeId: number; equipmentType: string }) => (
                            <div key={equipmentType.equipmentType}>
                                <span
                                    onClick={() => setTypeId(equipmentType.typeId)}
                                    style={{
                                        border: `${
                                            equipmentType.typeId === typeId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {equipmentType.equipmentType}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <button
                className="py-2 bg-yellow-200 font-bold rounded"
                type="submit"
            >
                add
            </button>
        </form>
    );
};

export interface UpdateEquipmentModalProps {
    equipmentId: number
}

export const UpdateEquipmentModal: NextPage<UpdateEquipmentModalProps> = ({equipmentId}) => {
    const [equipmentName, setEquipmentName] = useState('');
    const [typeId, setTypeId] = useState(0);
    const [updateEquipment] = useUpdateEquipmentMutation();
    const dispatch = useAppDispatch();
    const {data: equipmentTypes} = useGetEquipmentTypesQuery(undefined);
    const {data: equipment} = useGetEquipmentByIdQuery(equipmentId);
    

    useEffect(() => {
        equipment && setEquipmentName(equipment.equipmentName);
        equipment && setTypeId(equipment.typeId);
        
    }, [equipment])

    const handleUpdateEquipment = async (equipment: {equipmentId: number, equipmentName: string, typeId: number}) => {
        await updateEquipment(equipment);
    };

    return (
        <form
            className="flex flex-col gap-4 font-light italic"
            onSubmit={(e) => {
                e.preventDefault();
                equipmentName.length > 0 && handleUpdateEquipment({equipmentId, equipmentName, typeId});
                equipmentName.length > 0 && dispatch(setIsModalClose());
            }}
        >
            <input
                placeholder="название оборудования"
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
                type="text"
                className="border rounded outline-none"
            />
            
            <h1>тип оборудования</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {equipmentTypes &&
                    equipmentTypes.map(
                        (equipmentType: { typeId: number; equipmentType: string }) => (
                            <div key={equipmentType.equipmentType}>
                                <span
                                    onClick={() => setTypeId(equipmentType.typeId)}
                                    style={{
                                        border: `${
                                            equipmentType.typeId === typeId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {equipmentType.equipmentType}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <button
                className="py-2 bg-yellow-200 font-bold rounded"
                type="submit"
            >
                add
            </button>
        </form>
    );
};
