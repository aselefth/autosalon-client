import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    useAddPurchaseMutation,
    useGetBodyTypesQuery,
    useGetCarByVinQuery,
    useGetCarsQuery,
    useGetClientsQuery,
    useGetColorsQuery,
    useGetEmployeeQuery,
    useGetEnginesQuery,
    useGetPurchaseByIdQuery,
    useGetTransmissionByIdQuery,
    useGetTransmissionsQuery,
    useUpdateCarMutation,
    useUpdatePurchaseMutation,
} from "../../../store/AppSlice";
import { setIsModalClose } from "../../../store/ModalSlice";

const UpdatePurchase = () => {
    const router = useRouter();
    const { vin, purchaseId } = router.query;
    
    const {data: car} = useGetCarByVinQuery(String(vin));
    const {data: purchase} = useGetPurchaseByIdQuery(Number(purchaseId));
    const {data: employees} = useGetEmployeeQuery(undefined);
    const {data: clients} = useGetClientsQuery(undefined);
    const {data: colors} = useGetColorsQuery(undefined);
    const {data: engines} = useGetEnginesQuery(undefined);
    const {data: transmissions} = useGetTransmissionsQuery(undefined);
    const {data: bodyTypes} = useGetBodyTypesQuery(undefined);
    const [clientId, setClientId] = useState(0);
    const [price, setPrice] = useState(0);
    const [employeeId, setEmployeeId] = useState(0);
    
    
    const [updatePurchase] = useUpdatePurchaseMutation();
    
    useEffect(() => {
        purchase && setClientId(purchase.clientId);
        purchase && setPrice(purchase.price);
        purchase && setEmployeeId(purchase.employeeId);
    }, [purchase])

     const handleBuyCar = async (purchaseId: number, vin: string, employeeId: number, clientId: number, price: number) => {
          await updatePurchase({purchaseId, vin, employeeId, clientId, price});
      };

    return (
        car && 
        <div className="wrapper flex flex-wrap relative">
             <form
                className="flex flex-col gap-4 font-light italic w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleBuyCar(purchase.purchaseId, String(vin), employeeId, clientId, price)
                    router.push('/purchases');
                }}
            >   <div className="flex justify-between">
                    <div>
                        <h1>{car.carName}</h1>
                        <h1>{engines && engines.find((e: {engineId: number, engineName: string}) => e.engineId === car.engineId).engineName}</h1>
                        <h1>{transmissions && transmissions.find((tr: {transmissionId: number, transmissionType: string}) => tr.transmissionId === car.transmissionId).transmissionType}</h1>
                        <h1>{bodyTypes && bodyTypes.find((bt: {bodyTypeId: number, bodyType: string}) => bt.bodyTypeId === car.bodyTypeId).bodyType}</h1>
                        <h1>цвет</h1>
                    </div>
                    <img src={car.img} className='w-[300px]'/>
                </div>
                <h1 
                    className="w-[50px] h-[25px] rounded"
                    style={{background: `#${colors && colors.find((color: {colorId: number, colorHex: string}) => color.colorId === car.colorId).colorHex}`}}
                ></h1>
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
                    изменить контракт
                </button>
            </form> 
        </div>
    );
};

export default UpdatePurchase;
