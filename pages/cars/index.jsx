import { useState } from "react";
import { useGetCarsQuery } from "../../store/AppSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import Modal from "../../components/Modal";
import {AddCarModal, UpdateCarModal} from '../../components/modals/CarModal.tsx';
import {
  setIsModalAdd,
  setIsModalUpdate,
} from "../../store/ModalSlice";
import { useDeleteCarMutation } from "../../store/AppSlice";
import { useRouter } from "next/router";

export default function Cars() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isModal = useAppSelector((state) => state.modalSlice.isModal);
  const isAdd = useAppSelector((state) => state.modalSlice.isAdd);
  const isUpdate = useAppSelector((state) => state.modalSlice.isUpdate);
  const { data: cars } = useGetCarsQuery();
  const [deleteCar] = useDeleteCarMutation();
  const [vin, setVin] = useState('');

  const handleDeleteCar = async (vin) => {
    await deleteCar(vin);
  }

  return (
    <div className="wrapper flex flex-wrap relative">
      {isModal && (
        <Modal>
          {isAdd && <AddCarModal />}
          {isUpdate && <UpdateCarModal vin={vin} />}
        </Modal>
      )}
      {cars &&
        cars.map((car) => (
          <div
          onClick={() => router.push(`/cars/${car.vin}`)}
            className={`flex flex-col p-4 gap-2 rounded-xl shadow-md 
            w-[230px] h-[250px] bg-red-100 hover:shadow-2xl
            transition-shadow font-light italic`}
            key={car.vin}
          >
            <h1 className="text-xl">{car.carName}</h1>
            <h1>{car.engineName}</h1>
            <h1>{car.transmissionType}</h1>
            <h1>{car.bodyType}</h1>
            <h1
              className="w-[50px] h-[25px] rounded"
              style={{ background: `#${car.colorHex}` }}
            ></h1>
            <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
              <h1
                onClick={() => {
                  handleDeleteCar(car.vin)
                }}
                className="px-4 py-2 bg-gray-100 flex rounded cursor-pointer"
              >
                delete
              </h1>
              <h1
                onClick={() => {
                  setVin(car.vin)
                  dispatch(setIsModalUpdate());
                }}
                className="px-4 py-2 bg-gray-100 flex rounded cursor-pointer"
              >
                change
              </h1>
            </div>
          </div>
        ))}
        <div 
            onClick={() => {
                dispatch(setIsModalAdd());
            }}
            className="flex text-5xl flex-col items-center justify-center p-4 gap-2 rounded-xl shadow-md w-[250px] h-[250px] bg-red-100 hover:shadow-2xl transition-shadow">
            +
        </div>
    </div>
  );
}
