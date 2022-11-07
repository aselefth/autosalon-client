import { useGetBodyTypesQuery } from "../../store/AppSlice";

export default function BodyTypes () {
    const {data: bodyTypes} = useGetBodyTypesQuery(undefined);
    return (
        <div className='wrapper flex flex-wrap mx-auto relative'>
        {bodyTypes && bodyTypes.map((bodyType: {bodyTypeId: number, bodyType: string}) => (
            <div 
                key={bodyType.bodyType}
                className={
                    `flex flex-col p-4 gap-2 rounded-xl shadow-md justify-center items-center
                    w-[200px] h-[120px] bg-red-100 hover:scale-105 transition-transform`}
            >
                <h1 className={`text-2xl font-light italic`}>{bodyType.bodyType}</h1>
            </div>
        ))}
        
    </div>
    )

}