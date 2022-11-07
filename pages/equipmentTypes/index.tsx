import { useGetEquipmentTypesQuery } from "../../store/AppSlice";

const EquipmentTypes = () => {
    const {data: equipmentTypes} = useGetEquipmentTypesQuery(undefined);
    return (
        <div className='wrapper flex flex-wrap mx-auto relative'>
        {equipmentTypes && equipmentTypes.map((equipmentType: {typeId: number, equipmentType: string}) => (
            <div 
                key={equipmentType.typeId}
                className={
                    `flex flex-col p-4 gap-2 rounded-xl shadow-md justify-center items-center
                    w-[200px] h-[120px] bg-red-100 hover:scale-105 transition-transform`}
            >
                <h1 className={`text-2xl font-light italic`}>{equipmentType.equipmentType}</h1>
            </div>
        ))}
        
    </div>
    )
}

export default EquipmentTypes;