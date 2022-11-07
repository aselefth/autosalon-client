import { useGetEmployeeQuery } from "../../store/AppSlice";

const Employees = () => {
    const { data: employees } = useGetEmployeeQuery(undefined);
    

    return (
        <div className="wrapper flex flex-wrap mx-auto relative">
            {employees &&
                employees.map(
                    (employee: {
                        employeeName: string;
                        employeeId: number;
                        equipmentType: string;
                        equipmentName: string;
                        departmentName: string;
                    }) => (
                        <div
                            className={`flex flex-col p-4 gap-2 rounded-xl shadow-md w-[230px] h-[130px] 
                            bg-red-100 hover:shadow-2xl transition-shadow font-light italic`}
                            key={employee.employeeId}
                        >
                            <h1 className="text-2xl">{employee.employeeName}</h1>
                            <h1>{employee.departmentName}</h1>
                            <h1>{employee.equipmentName}</h1>
                        </div>
                    )
                )}
            
        </div>
    );
};

export default Employees;
