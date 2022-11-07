import { useRouter } from "next/router";
import { useAppDispatch } from "../../hooks/redux";
import { useDeletePurchaseMutation, useGetPurchasesQuery } from "../../store/AppSlice";
import { setIsModalAdd, setIsModalUpdate } from "../../store/ModalSlice";

const Purchases = () => {
    const dispatch = useAppDispatch();
    const {data: purchases} = useGetPurchasesQuery(undefined);
    const [deletePurchase] = useDeletePurchaseMutation();
    const router = useRouter();
    
    const handleDeletePurchase = async(purchaseId: number) => {
        await deletePurchase(purchaseId);
    }
    
    
    
    return (
        <div className='wrapper flex flex-wrap mx-auto relative'>
            {purchases && purchases.map((purchase: {purchaseId: number, name: string, employeeName: string, price: number, carName: string, vin: string}) => (
                <div
                    className='flex flex-col p-4 gap-2 rounded-xl shadow-md w-[260px] h-[220px] bg-red-100 hover:scale-105 transition-transform font-light italic'
                    key={purchase.purchaseId}
                >
                    <h1>{purchase.carName}</h1>
                    <h1>Клиент: {purchase.name}</h1>
                    <h1>Менеджер: {purchase.employeeName}</h1>
                    <h1>{purchase.price}p</h1>
                    <div className="flex gap-2">
                        <h1 
                            onClick={() => {
                                handleDeletePurchase(purchase.purchaseId)
                            }}
                            className='px-4 py-2 bg-gray-100 flex rounded cursor-pointer'
                        >
                            delete
                        </h1>
                        <h1 
                            onClick={() => {
                                router.push(`/purchases/${purchase.purchaseId}/${purchase.vin}`)
                            }}
                            className='px-4 py-2 bg-gray-100 flex rounded cursor-pointer'
                        >
                            change
                        </h1>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Purchases;