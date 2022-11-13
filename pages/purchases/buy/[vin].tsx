import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    useAddPurchaseMutation,
    useGetBodyTypesQuery,
    useGetClientsQuery,
    useGetColorsQuery,
    useGetEmployeeQuery,
    useGetEnginesQuery,
    useGetTransmissionByIdQuery,
    useGetTransmissionsQuery,
} from "../../../store/AppSlice";
import {
    useUpdateCarMutation,
    useGetCarByVinQuery,
    useGetCarsQuery,
} from '../../../store/CarSlice';
import { setIsModalClose } from "../../../store/ModalSlice";

const AddPurchaseModal = () => {
    const router = useRouter();
    const { vin } = router.query;
    const { data: car } = useGetCarByVinQuery(String(vin));
    const { data: colors } = useGetColorsQuery(undefined);
    const {data: engines} = useGetEnginesQuery(undefined);
    const {data: transmissions} = useGetTransmissionsQuery(undefined);
    const {data: bodyTypes} = useGetBodyTypesQuery(undefined);
    const { data: clients } = useGetClientsQuery(undefined);
    const { data: employees } = useGetEmployeeQuery(undefined);
    const [updateCar] = useUpdateCarMutation();
    const [addPurchase] = useAddPurchaseMutation();
    const [clientId, setClientId] = useState(0);
    const [price, setPrice] = useState(10000);
    const [employeeId, setEmployeeId] = useState(0);
    const [colorId, setColorId] = useState(0);

    
    const handleBuyCar = async (car: {
        vin: string;
        colorId: number;
        engineId: number;
        transmissionId: number;
        bodyTypeId: number;
        carName: string;
        img: string;
    }, purchase: {
        vin: string,
        employeeId: number,
        clientId: number,
        price: number
    }) => {
        await updateCar(car);
        await addPurchase(purchase);
    };

    return (
        car && <div className="wrapper flex flex-wrap relative">
            <form
                className="flex flex-col gap-4 font-light italic w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleBuyCar({...car, colorId}, {vin: String(vin), employeeId, clientId, price})
                    router.push('/purchases');
                }}
            >
                <h1>{car.carName}</h1>
                <h1>{engines && engines.find((engine: {engineId: number, engineName: string}) => engine.engineId === car.engineId).engineName}</h1>
                <h1>{transmissions && transmissions.find((tr: {transmissionId: number, transmissionType: string}) => tr.transmissionId === car.transmissionId).transmissionType}</h1>
                <h1>{bodyTypes && bodyTypes.find((bt: {bodyTypeId: number, bodyType: string}) => bt.bodyTypeId === car.bodyTypeId).bodyType}</h1>
                <h1>цвет</h1>
                <div className="flex gap-2 overflow-x-scroll pb-4 w-full">
                    {colors &&
                        colors.map(
                            (color: { colorId: number; colorHex: string }) => (
                                <div key={color.colorId}>
                                    <span
                                        onClick={() => setColorId(color.colorId)}
                                        style={{
                                            border: `${
                                                colorId === color.colorId
                                                    ? "2px solid green"
                                                    : ""
                                            }`,
                                            background: `#${color.colorHex}`,
                                        }}
                                        className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer block w-[40px] h-[20px]`}
                                    ></span>
                                </div>
                            )
                        )}
                </div>
                <h1>
                    Менеджер
                </h1>
                <div className="flex gap-2 overflow-x-scroll pb-4 w-full">
                    {employees &&
                        employees.map(
                            (employee: {employeeId: number, employeeName: string, departmentId: number}) => (
                                <div key={employee.employeeId}>
                                    <span
                                        onClick={() => {setEmployeeId(employee.employeeId)}}
                                        style={{
                                            border: `${
                                                employeeId === employee.employeeId
                                                    ? "2px solid green"
                                                    : ""
                                            }`,
                                        }}
                                        className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer block`}
                                    >
                                        {employee.employeeName}
                                    </span>
                                </div>
                            )
                        )}
                </div>
                <h1>Клиент</h1>
                <div className="flex gap-2 overflow-x-scroll pb-4 w-full">
                    {clients &&
                        clients.map(
                            (client: {clientId: number, name: string, age: number, passport: string}) => (
                                <div key={client.clientId}>
                                    <span
                                        onClick={() => {setClientId(client.clientId)}}
                                        style={{
                                            border: `${
                                                clientId === client.clientId
                                                    ? "2px solid green"
                                                    : ""
                                            }`,
                                        }}
                                        className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer block`}
                                    >
                                        {client.name}
                                    </span>
                                </div>
                            )
                        )}
                </div>
                <h1>Цена</h1>
                <input
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder='цена'
                />
                <button
                    className="py-2 bg-yellow-200 font-bold rounded"
                    type="submit"
                >
                    подписать контракт
                </button>
            </form>
        </div>
    );
};

export default AddPurchaseModal;
