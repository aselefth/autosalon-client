import { useGetDepartmentsQuery } from "../../store/AppSlice"

const Departments = () => {
    const {data: departments} = useGetDepartmentsQuery(undefined);
    return (
        <div className='wrapper flex flex-wrap mx-auto relative'>
        {departments && departments.map((department: {departmentId: number, departmentName: string}) => (
            <div 
                key={department.departmentName}
                className={
                    `flex flex-col p-4 gap-2 rounded-xl shadow-md justify-center items-center
                    w-[200px] h-[120px] bg-red-100 hover:scale-105 transition-transform`}
            >
                <h1 className={`text-2xl font-light italic`}>{department.departmentName}</h1>
            </div>
        ))}
        
    </div>
    )
}

export default Departments;