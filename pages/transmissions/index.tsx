import { useGetTransmissionsQuery } from "../../store/AppSlice"

const Transmissions = () => {
    const {data: transmissions} = useGetTransmissionsQuery(undefined);
    

    return (
        <div className='wrapper flex flex-wrap mx-auto relative'>
            {transmissions && transmissions.map((transmission: {transmissionId: number, transmissionType: string}) => (
                <div 
                    key={transmission.transmissionId}
                    className={
                        `flex flex-col p-4 gap-2 rounded-xl shadow-md justify-center items-center
                        w-[200px] h-[120px] bg-red-100 hover:scale-105 transition-transform`}
                >
                    <h1 className={`text-2xl font-light italic`}>{transmission.transmissionType}</h1>
                </div>
            ))}
            
        </div>
        )
}

export default Transmissions;