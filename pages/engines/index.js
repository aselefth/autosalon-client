import {useGetEnginesQuery} from '../../store/AppSlice.ts'

export default function Engines () {
    const {data: engines} = useGetEnginesQuery();

    return (
    <div className='wrapper flex flex-wrap mx-auto relative'>
        {engines && engines.map(engine => (
            <div 
                key={engine.engineName}
                className={
                    `flex flex-col p-4 gap-2 rounded-xl shadow-md justify-center items-center
                    w-[200px] h-[120px] bg-red-100 hover:scale-105 transition-transform`}
            >
                <h1 className={`text-2xl font-light italic`}>{engine.engineName}</h1>
            </div>
        ))}
        
    </div>
    )
}