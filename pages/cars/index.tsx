import { useEffect, useState } from "react";
import { useGetCarsQuery, useGetCarsByNameQuery } from "../../store/CarSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Modal from "../../components/Modal";
import { AddCarModal, UpdateCarModal } from "../../components/modals/CarModal";
import { setIsModalAdd, setIsModalUpdate } from "../../store/ModalSlice";
import { useRouter } from "next/router";
import { useDebounce } from "../../hooks/useDebounced";
import { usePagination } from "../../hooks/usePagination";
import { ICarFull } from "../../types/Car";
import CarCard from "../../components/CarCard";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useGetCurrentUserQuery } from "../../store/AuthSlice";

export default function Cars({
    cars,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { data: user } = useGetCurrentUserQuery(undefined);
    const [engineFilter, setEngineFilter] = useState("");
    const [bodyTypeFilter, setBodyTypeFilter] = useState("");
    const [transmissionFilter, setTransmissionFilter] = useState("");
    const [search, setSearch] = useState("");
    const debounce = useDebounce(search, 700);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isModal = useAppSelector((state) => state.modalSlice.isModal);
    const isAdd = useAppSelector((state) => state.modalSlice.isAdd);
    const isUpdate = useAppSelector((state) => state.modalSlice.isUpdate);
    const [totalItems, setTotalItems] = useState(0);
    const {
        currPage,
        handleNextPage,
        handlePrevPage,
        itemsPerPage,
        setCurrPage,
    } = usePagination({ currentPage: 0, totalItems, itemsPerPage: 3 });
    const [vin, setVin] = useState("");
    const { data: searchResult } = useGetCarsByNameQuery(
        { name: `${debounce}` },
        {
            skip: debounce.length < 3,
        }
    );

    useEffect(() => {
        setTotalItems(
            cars?.filter(
                (car: ICarFull) =>
                    car.engineName.includes(engineFilter) &&
                    car.bodyType.includes(bodyTypeFilter) &&
                    new RegExp(`^${transmissionFilter}`).test(
                        car.transmissionType
                    )
            ).length
        );
        console.log(
            cars?.filter(
                (car: ICarFull) =>
                    car.engineName.includes(engineFilter) &&
                    car.bodyType.includes(bodyTypeFilter) &&
                    new RegExp(`^${transmissionFilter}`).test(
                        car.transmissionType
                    )
            ).length
        );
    }, [engineFilter, bodyTypeFilter, transmissionFilter, cars]);

    return (
        cars && (
            <div className="flex flex-col justify-between h-full relative">
                {isModal && (
                    <Modal>
                        {isAdd && <AddCarModal />}
                        {isUpdate && <UpdateCarModal vin={vin} />}
                    </Modal>
                )}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.push(`/cars/${search}`);
                    }}
                    className="flex italic font-light justify-center mt-4 relative mx-auto z-40"
                >
                    <input
                        type="text"
                        className="border"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="px-4 bg-yellow-200 italic" type="submit">
                        найти
                    </button>
                    <div className="absolute left-0 right-0 top-full flex flex-col bg-white z-1000 items-center gap-1">
                        {searchResult?.map(
                            (car: ICarFull) =>
                                debounce && (
                                    <div
                                        onClick={() =>
                                            router.push(`/cars/car/${car.vin}`)
                                        }
                                        className="flex border w-full px-2 py-2 justify-between cursor-pointer hover:bg-gray-100"
                                        key={car.carName}
                                    >
                                        <span>{car.carName}</span>
                                        <span>{car.engineName}</span>
                                    </div>
                                )
                        )}
                    </div>
                </form>
                <div className="flex justify-between">
                    <div className="wrapper flex flex-wrap relative">
                        {cars
                            ?.filter(
                                (car: ICarFull) =>
                                    car.engineName.includes(engineFilter) &&
                                    car.bodyType.includes(bodyTypeFilter) &&
                                    car.transmissionType.includes(
                                        transmissionFilter
                                    )
                            )
                            .map(
                                (car: ICarFull, i: number) =>
                                    i < (currPage + 1) * itemsPerPage &&
                                    i >= (currPage + 0) * itemsPerPage && (
                                        <CarCard
                                            car={car}
                                            key={car.vin}
                                            setVin={setVin}
                                        />
                                    )
                            )}
                        {user?.access === "admin" && (
                            <div
                                onClick={() => {
                                    dispatch(setIsModalAdd());
                                }}
                                className="flex text-5xl flex-col items-center justify-center p-4 gap-2 rounded-xl shadow-md w-[250px] h-[220px] bg-red-100 hover:shadow-2xl transition-shadow"
                            >
                                +
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col mr-4 gap-2 italic font-light">
                        <h1 className="text-xl">фильтры:</h1>
                        <p>тип двигателя</p>
                        <div className="flex gap-2 mr-2 items-center">
                            <div
                                onClick={() => {
                                    setEngineFilter("");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        engineFilter === ""
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    все
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setEngineFilter("бензин");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        engineFilter === "бензин"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    бензин
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setEngineFilter("дизель");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        engineFilter === "дизель"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    дизель
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setEngineFilter("гибрид");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        engineFilter === "гибрид"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    гибрид
                                </p>
                            </div>
                        </div>
                        <p>тип кузова</p>
                        <div className="flex gap-2 mr-2 items-center">
                            <div
                                onClick={() => {
                                    setBodyTypeFilter("");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        bodyTypeFilter === ""
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    все
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setBodyTypeFilter("седан");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        bodyTypeFilter === "седан"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    седан
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setBodyTypeFilter("хэтчбэк");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        bodyTypeFilter === "хэтчбэк"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    хэтчбэк
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setBodyTypeFilter("универсал");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        bodyTypeFilter === "универсал"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    универсал
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setBodyTypeFilter("кроссовер");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        bodyTypeFilter === "кроссовер"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    кроссовер
                                </p>
                            </div>
                        </div>
                        <p>коробка передач</p>
                        <div className="flex gap-2 mr-2 items-center">
                            <div
                                onClick={() => {
                                    setTransmissionFilter("");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        transmissionFilter === ""
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    все
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setTransmissionFilter("AT");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        transmissionFilter === "AT"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    AT
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setTransmissionFilter("MT");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        transmissionFilter === "MT"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    MT
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setTransmissionFilter("CVT");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        transmissionFilter === "CVT"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    CVT
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setTransmissionFilter("AMT");
                                    setCurrPage(0);
                                }}
                            >
                                <p
                                    className={`${
                                        transmissionFilter === "AMT"
                                            ? "bg-black text-white p-2"
                                            : ""
                                    } cursor-pointer`}
                                >
                                    AMT
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-6 text-xl italic font-light items-center">
                    <span
                        onClick={() => {
                            handlePrevPage();
                        }}
                        className="bg-yellow-200 px-4 rounded cursor-pointer"
                    >
                        {"<"}
                    </span>
                    <p>{currPage + 1}</p>
                    <span
                        onClick={() => handleNextPage()}
                        className="bg-yellow-200 px-4 rounded cursor-pointer"
                    >
                        {">"}
                    </span>
                </div>
            </div>
        )
    );
}

export const getServerSideProps: GetServerSideProps<{
    cars: ICarFull[];
}> = async () => {
    const res = await fetch("http://localhost:3001/cars");
    const cars = await res.json();
    return {
        props: {
            cars,
        },
    };
};
