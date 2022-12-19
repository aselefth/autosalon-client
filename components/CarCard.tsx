import { useRouter } from "next/router";
import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { useGetCurrentUserQuery } from "../store/AuthSlice";
import { useDeleteCarMutation } from "../store/CarSlice";
import { setIsModalUpdate } from "../store/ModalSlice";
import { ICarFull } from "../types/Car";

interface CarCardProps {
    car: ICarFull;
    setVin: (vin: string) => void;
}

const CarCard = ({ car, setVin }: CarCardProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [deleteCar] = useDeleteCarMutation();
    const { data: user } = useGetCurrentUserQuery(undefined);

    const handleDeleteCar = async (vin: string) => {
        await deleteCar(vin);
    };

    return (
        <div
            onClick={() => router.push(`/cars/car/${car.vin}`)}
            className={`flex flex-col p-4 gap-2 rounded-xl shadow-md 
                    w-[230px] h-[220px] bg-red-100 hover:shadow-2xl
                    transition-shadow font-light italic cursor-pointer`}
            key={car.vin}
        >
            <h1 className="text-xl">{car.carName}</h1>
            <h1>{car.engineName}</h1>
            <h1>{car.transmissionType}</h1>
            <h1>{car.bodyType}</h1>
            <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                {user?.access === "admin" && (
                    <h1
                        onClick={() => {
                            handleDeleteCar(car.vin);
                        }}
                        className="px-4 py-2 bg-gray-100 flex rounded cursor-pointer"
                    >
                        delete
                    </h1>
                )}
                {user?.access === "admin" && (
                    <h1
                        onClick={() => {
                            setVin(car.vin);
                            dispatch(setIsModalUpdate());
                        }}
                        className="px-4 py-2 bg-gray-100 flex rounded cursor-pointer"
                    >
                        change
                    </h1>
                )}
            </div>
        </div>
    );
};

export default CarCard;
