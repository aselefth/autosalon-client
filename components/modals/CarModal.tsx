import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
    useGetBodyTypesQuery,
    useGetColorsQuery,
    useGetEnginesQuery,
    useGetTransmissionsQuery
} from "../../store/AppSlice";
import {
    useAddCarMutation,
    useUpdateCarMutation,
    useGetCarByVinQuery
} from '../../store/CarSlice';
import { setIsModalClose } from "../../store/ModalSlice";

export const AddCarModal = () => {
    const [carName, setCarName] = useState("");
    const [vin, setVin] = useState("");
    const [engineId, setEngineId] = useState(1);
    const [transmissionId, setTransmissionId] = useState(1);
    const [bodyTypeId, setBodyTypeId] = useState(1);
    const [colorId, setColorId] = useState(1);
    const [addCar] = useAddCarMutation();
    const dispatch = useAppDispatch();
    const { data: engines } = useGetEnginesQuery(undefined);
    const { data: transmissions } = useGetTransmissionsQuery(undefined);
    const { data: bodyTypes } = useGetBodyTypesQuery(undefined);
    const { data: colors } = useGetColorsQuery(undefined);

    const handleAddCar = async (car: {
        vin: string;
        colorId: number;
        engineId: number;
        transmissionId: number;
        bodyTypeId: number;
        carName: string;
        img: string
    }) => {
        await addCar(car);
        return true;
    };

    return (
        <form
            className="flex flex-col gap-4 font-light italic"
            onSubmit={(e) => {
                e.preventDefault();
                const car = {
                    vin,
                    colorId,
                    engineId,
                    transmissionId,
                    bodyTypeId,
                    carName,
                    img: 'https://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png'
                };
                /[\w]+ [\w]+/.test(carName) &&
                    vin.length === 17 &&
                    handleAddCar(car);
                /[\w]+ [\w]+/.test(carName) &&
                    vin.length === 17 &&
                    dispatch(setIsModalClose());
            }}
        >
            <input
                placeholder="название машины"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                type="text"
                className="border rounded outline-none"
            />
            <input
                placeholder="vin"
                value={vin.toUpperCase()}
                onChange={(e) => setVin(e.target.value)}
                type="text"
                className="border rounded outline-none"
            />
            <h1>тип двигателя</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {engines &&
                    engines.map(
                        (engine: { engineId: number; engineName: string }) => (
                            <div key={engine.engineId}>
                                <span
                                    onClick={() => setEngineId(engine.engineId)}
                                    style={{
                                        border: `${
                                            engine.engineId === engineId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {engine.engineName}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <h1>тип коробки передач</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {transmissions &&
                    transmissions.map(
                        (transmission: {
                            transmissionId: number;
                            transmissionType: string;
                        }) => (
                            <div key={transmission.transmissionId}>
                                <span
                                    onClick={() =>
                                        setTransmissionId(
                                            transmission.transmissionId
                                        )
                                    }
                                    style={{
                                        border: `${
                                            transmission.transmissionId ===
                                            transmissionId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {transmission.transmissionType}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <h1>тип кузова</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {bodyTypes &&
                    bodyTypes.map(
                        (bodyType: {
                            bodyTypeId: number;
                            bodyType: string;
                        }) => (
                            <div key={bodyType.bodyTypeId}>
                                <span
                                    onClick={() =>
                                        setBodyTypeId(bodyType.bodyTypeId)
                                    }
                                    style={{
                                        border: `${
                                            bodyTypeId === bodyType.bodyTypeId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {bodyType.bodyType}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <h1>цвет</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4 w-[400px]">
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
            <button
                className="py-2 bg-yellow-200 font-bold rounded"
                type="submit"
            >
                add
            </button>
        </form>
    );
};

export interface UpdateCarModalProps {
    vin: string
}

export const UpdateCarModal: NextPage<UpdateCarModalProps> = (props) => {
    const [carName, setCarName] = useState("");
    const [vin, setVin] = useState("");
    const [engineId, setEngineId] = useState(1);
    const [transmissionId, setTransmissionId] = useState(1);
    const [bodyTypeId, setBodyTypeId] = useState(1);
    const [colorId, setColorId] = useState(1);
    const [updateCar] = useUpdateCarMutation();
    const {data: car} = useGetCarByVinQuery(props.vin);
    const dispatch = useAppDispatch();
    const { data: engines } = useGetEnginesQuery(undefined);
    const { data: transmissions } = useGetTransmissionsQuery(undefined);
    const { data: bodyTypes } = useGetBodyTypesQuery(undefined);
    const { data: colors } = useGetColorsQuery(undefined);

    useEffect(() => {
        car && setCarName(car.carName);
        car && setVin(car.vin);
        car && setEngineId(car.engineId);
        car && setTransmissionId(car.transmissionId);
        car && setBodyTypeId(car.bodyTypeId);
        car && setColorId(car.colorId);
    }, [car])

    const handleUpdateCar = async (car: {
        vin: string;
        colorId: number;
        engineId: number;
        transmissionId: number;
        bodyTypeId: number;
        carName: string;
        img: string;
    }) => {
        await updateCar(car);
    };

    return (
        <form
            className="flex flex-col gap-4 font-light italic"
            onSubmit={(e) => {
                e.preventDefault();
                const car = {
                    vin,
                    colorId,
                    engineId,
                    transmissionId,
                    bodyTypeId,
                    carName,
                    img: 'https://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png'
                };
                /[\w]+ [\w]+/.test(carName) &&
                    vin.length === 17 &&
                    handleUpdateCar(car);
                /[\w]+ [\w]+/.test(carName) &&
                    vin.length === 17 &&
                    dispatch(setIsModalClose());
            }}
        >
            <input
                placeholder="название машины"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                type="text"
                className="border rounded outline-none"
            />
            <input
                placeholder="vin"
                value={vin.toUpperCase()}
                onChange={(e) => setVin(e.target.value)}
                type="text"
                className="border rounded outline-none"
            />
            <h1>тип двигателя</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {engines &&
                    engines.map(
                        (engine: { engineId: number; engineName: string }) => (
                            <div key={engine.engineId}>
                                <span
                                    onClick={() => setEngineId(engine.engineId)}
                                    style={{
                                        border: `${
                                            engine.engineId === engineId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {engine.engineName}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <h1>тип коробки передач</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {transmissions &&
                    transmissions.map(
                        (transmission: {
                            transmissionId: number;
                            transmissionType: string;
                        }) => (
                            <div key={transmission.transmissionId}>
                                <span
                                    onClick={() =>
                                        setTransmissionId(
                                            transmission.transmissionId
                                        )
                                    }
                                    style={{
                                        border: `${
                                            transmission.transmissionId ===
                                            transmissionId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {transmission.transmissionType}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <h1>тип кузова</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4">
                {bodyTypes &&
                    bodyTypes.map(
                        (bodyType: {
                            bodyTypeId: number;
                            bodyType: string;
                        }) => (
                            <div key={bodyType.bodyTypeId}>
                                <span
                                    onClick={() =>
                                        setBodyTypeId(bodyType.bodyTypeId)
                                    }
                                    style={{
                                        border: `${
                                            bodyTypeId === bodyType.bodyTypeId
                                                ? "2px solid green"
                                                : ""
                                        }`,
                                    }}
                                    className={`text-lg bg-red-100 px-2 rounded py-1 cursor-pointer`}
                                >
                                    {bodyType.bodyType}
                                </span>
                            </div>
                        )
                    )}
            </div>
            <h1>цвет</h1>
            <div className="flex gap-2 overflow-x-scroll pb-4 w-[400px]">
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
            <button
                className="py-2 bg-yellow-200 font-bold rounded"
                type="submit"
            >
                update
            </button>
        </form>
    );
};
