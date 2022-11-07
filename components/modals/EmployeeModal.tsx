import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useAddEmployeeMutation, useGetDepartmentsQuery, useGetEmployeeByIdQuery, useGetEquipmentQuery, useUpdateEmployeeMutation } from "../../store/AppSlice";
import { setIsModalClose } from "../../store/ModalSlice";

export const AddEmployeeModal = () => {
    const [name, setName] = useState('');
    const [equipmentId, setEquipmentId] = useState(0);
    const [departmentId, setDepartmentId] = useState(0);
    const [addEmployee] = useAddEmployeeMutation();
    const dispatch = useAppDispatch();

    const {data: departments} = useGetDepartmentsQuery(undefined);
    const {data: equipments} = useGetEquipmentQuery(undefined);

    const handleAddEmployee = async(employee: {employeeName: string, equipmentId: number, departmentId: number}) => {
        await addEmployee(employee);
    }

    return (
        <form
            className="flex flex-col gap-4 font-light italic"
            onSubmit={(e) => {
                e.preventDefault();
                handleAddEmployee({employeeName: name, equipmentId, departmentId});
                dispatch(setIsModalClose());
            }}
        >
            <input 
                placeholder="name..."
                type='text' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className='border rounded outline-none'
            />
            <h1>Отдел</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {departments &&
                    departments.map(
                        (department: { departmentId: number; departmentName: string }) => (
                            <div key={department.departmentId}>
                                <span
                                    onClick={() => setDepartmentId(department.departmentId)}
                                    style={{
                                        border: `${
                                            department.departmentId === departmentId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {department.departmentName}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <h1>Оборудование</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {equipments &&
                    equipments.map(
                        (equipment: { equipmentId: number; equipmentName: string, typeId: number }) => (
                            <div key={equipment.equipmentId}>
                                <span
                                    onClick={() => setEquipmentId(equipment.equipmentId)}
                                    style={{
                                        border: `${
                                            equipment.equipmentId === equipmentId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {equipment.equipmentName}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <button
            className="py-2 bg-yellow-200 font-bold rounded" 
                type='submit'
            >
                add
            </button>
        </form>
    )
}

interface UpdateEmployeeModalProps {
    employeeId: number
}

export const UpdateEmployeeModal: NextPage<UpdateEmployeeModalProps> = ({employeeId}) => {
    const [name, setName] = useState('');
    const [equipmentId, setEquipmentId] = useState(0);
    const [departmentId, setDepartmentId] = useState(0);
    const [updateEmployee] = useUpdateEmployeeMutation();
    const dispatch = useAppDispatch();

    const {data: departments} = useGetDepartmentsQuery(undefined);
    const {data: equipments} = useGetEquipmentQuery(undefined);
    const {data: employee} = useGetEmployeeByIdQuery(employeeId);

    const handleUpdateEmployee = async(employee: {employeeId: number, employeeName: string, equipmentId: number, departmentId: number}) => {
        await updateEmployee(employee);
    }

    useEffect(() => {
        employee && setName(employee.employeeName);
        employee && setEquipmentId(employee.equipmentId);
        employee && setDepartmentId(employee.departmentId);        
    }, [employee])

    return (
        <form
            className="flex flex-col gap-4 font-light italic"
            onSubmit={(e) => {
                e.preventDefault();
                handleUpdateEmployee({employeeName: name, departmentId, equipmentId, employeeId})
                dispatch(setIsModalClose());
            }}
        >
            <input 
                placeholder="name..."
                type='text' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className='border rounded outline-none'
            />
            <h1>Отдел</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {departments &&
                    departments.map(
                        (department: { departmentId: number; departmentName: string }) => (
                            <div key={department.departmentId}>
                                <span
                                    onClick={() => setDepartmentId(department.departmentId)}
                                    style={{
                                        border: `${
                                            department.departmentId === departmentId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {department.departmentName}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <h1>Оборудование</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {equipments &&
                    equipments.map(
                        (equipment: { equipmentId: number; equipmentName: string, typeId: number }) => (
                            <div key={equipment.equipmentId}>
                                <span
                                    onClick={() => setEquipmentId(equipment.equipmentId)}
                                    style={{
                                        border: `${
                                            equipment.equipmentId === equipmentId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {equipment.equipmentName}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <button
            className="py-2 bg-yellow-200 font-bold rounded" 
                type='submit'
            >
                update
            </button>
        </form>
    )
}