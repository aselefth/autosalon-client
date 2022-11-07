import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
    useGetBodyTypesQuery,
    useGetCarByVinQuery,
    useGetColorsQuery,
    useGetEnginesQuery,
    useGetTransmissionsQuery,
    useUpdateCarMutation,
} from "../../store/AppSlice";
import { setIsModalClose } from "../../store/ModalSlice";

const Car = () => {
    const router = useRouter();
    const { vin } = router.query;
    const { data: car } = useGetCarByVinQuery(String(vin));

    const dispatch = useAppDispatch();
    const { data: colors } = useGetColorsQuery(undefined);
    const { data: engines } = useGetEnginesQuery(undefined);
    const { data: transmissions } = useGetTransmissionsQuery(undefined);
    const { data: bodyTypes } = useGetBodyTypesQuery(undefined);
    const [colorId, setColorId] = useState(1);


    useEffect(() => {
        car && setColorId(car.colorId);
    }, [car]);

    return (
        car && 
        <div className="text-2xl p-4 rounded-lg font-light italic">
            <img src={car.img} className='w-[450px]'/>
            <h1>{car.carName}</h1>
            <h1>
                {engines &&
                    engines.find(
                        (engine: { engineId: number; engineName: string }) =>
                            engine.engineId === car.engineId
                    ).engineName}
            </h1>
            <h1>{transmissions &&
                    transmissions.find(
                        (transmission: { transmissionId: number; transmissionType: string }) =>
                            transmission.transmissionId === car.transmissionId
                    ).transmissionType}
            </h1>
            <h1>
            {bodyTypes &&
                    bodyTypes.find(
                        (bodyType: { bodyTypeId: number; bodyType: string }) =>
                            bodyType.bodyTypeId === car.bodyTypeId
                    ).body}
            </h1>
            <form
                className="flex flex-col gap-4 font-light italic"
                onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/purchases/buy/${String(vin)}`)
                }}
            >
                <h1>цвет</h1>
                <div className="flex gap-2 overflow-x-scroll pb-4 w-full">
                    {colors &&
                        colors.map(
                            (color: { colorId: number; colorHex: string }) => (
                                <div key={color.colorId}>
                                    <span
                                        onClick={() =>
                                            setColorId(color.colorId)
                                        }
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
                    купить
                </button>
            </form>
        </div>
    );
};

export default Car;
