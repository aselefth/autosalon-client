import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useDeleteClientMutation, useGetClientsQuery } from "../../store/AppSlice";
import Modal from "../../components/Modal";
import { AddClientModal, UpdateClientModal } from "../../components/modals/ClientModal";
import { setIsModalAdd, setIsModalUpdate } from "../../store/ModalSlice";

export default function Clients () {
    const [clientId, setClientId] = useState(0);
    const isModal = useAppSelector(state => state.modalSlice.isModal);
    const isUpdate = useAppSelector(state => state.modalSlice.isUpdate);
    const isAdd = useAppSelector(state => state.modalSlice.isAdd);
    const dispatch = useAppDispatch();
    const {data: clients} = useGetClientsQuery();
    const [deleteClient] = useDeleteClientMutation();

    const handleDeleteClient = async (id) => {
        await deleteClient(id);
    }

    return (
        <div className='wrapper flex flex-wrap mx-auto relative'>
            {isModal &&
            <Modal> 
                {isAdd && <AddClientModal />}
                {isUpdate && <UpdateClientModal clientId={clientId}/>} 
            </Modal>}
            {clients && clients.map(
                client => 
                    (<div
                        key={client.name}
                        className={`flex flex-col p-4 gap-2 rounded-xl shadow-md 
                        w-[200px] h-[170px] bg-red-100 hover:scale-105 
                        transition-transform font-light italic`}
                    >
                        <h1>{client.name}</h1>
                        <h1>
                            {`${client.age} 
                            ${String(client.age).at(-1) == 1 
                            ? 'год' 
                            : String(client.age).at(-1) == 2 
                                || String(client.age).at(-1) == 3 
                                || String(client.age).at(-1) == 4 
                            ? 'года' : 'лет'}`}
                        </h1>
                        <h1>{`${client.passport.slice(0, 4)} ${client.passport.slice(4, client.passport.length)}`}</h1>
                        <div className="flex gap-2">
                        <h1 
                            onClick={() => {handleDeleteClient(client.clientId)}}
                            className='px-4 py-2 bg-gray-100 flex rounded cursor-pointer'
                        >
                            delete
                        </h1>
                        <h1 
                            onClick={() => {
                                setClientId(client.clientId)
                                dispatch(setIsModalUpdate());
                            }}
                            className='px-4 py-2 bg-gray-100 flex rounded cursor-pointer'
                        >
                            change
                        </h1>
                    </div>
                    </div>)
            )}
            <div
                onClick={() => {
                    dispatch(setIsModalAdd())
                }}
                className="flex items-center justify-center text-5xl flex-col p-4 gap-2 rounded-xl shadow-md w-[200px] h-[170px] bg-red-100 hover:scale-105 transition-transform">
            +
            </div>
        </div>
        )
}