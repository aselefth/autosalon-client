import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useAddClientMutation, useGetClientByIdQuery, useUpdateClientMutation } from "../../store/ClientSlice";
import { setIsModalClose } from "../../store/ModalSlice";

export const AddClientModal = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [passport, setPasport] = useState('');
    const [addClient] = useAddClientMutation();
    const dispatch = useAppDispatch();

    const handleAddClient = async(client: {name: string, age: number, passport: string}) => {
        await addClient(client);
    }

    return (
        <form
            className="flex flex-col gap-4 font-light italic"
            onSubmit={(e) => {
                e.preventDefault();
                age > 0 && passport.length === 10 && Number(passport) && name.length > 0 && 
                handleAddClient({name, age, passport})
                dispatch(setIsModalClose());
            }}
        >
            <input 
                placeholder="name"
                type='text' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className='border rounded outline-none'
            />
            <input
                type='number'
                value={age}
                placeholder='age'
                onChange={(e) => setAge(Number(e.target.value))} 
                className='border rounded outline-none'
            />
            <input
                type='text'
                placeholder="passport"
                value={passport}
                onChange={(e) => setPasport(e.target.value)}
                className='border rounded outline-none'
            />
            <button
            className="py-2 bg-yellow-200 font-bold rounded" 
                type='submit'
            >
                add
            </button>
        </form>
    )
}

interface UpdateCLeintModalProps {
    clientId: number
}

export const UpdateClientModal: NextPage<UpdateCLeintModalProps> = ({clientId}) => {
    const {data: client} = useGetClientByIdQuery(clientId);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [passport, setPasport] = useState('');
    const [updateClient] = useUpdateClientMutation();
    const dispatch = useAppDispatch();

    const handleUpdateCLient = async(client: {clientId: number, name: string, age: number, passport: string}) => {
        await updateClient(client);
    }

    useEffect(() => {
        client && setName(client.name) 
        client && setAge(client.age)
        client && setPasport(client.passport)
    }, [client])

    return (
        <form
            className="flex flex-col gap-4 font-light italic"
            onSubmit={(e) => {
                e.preventDefault();
                age > 0 && passport.length === 10 && Number(passport) && name.length > 0 && 
                handleUpdateCLient({clientId: client.clientId, name, age, passport})
                dispatch(setIsModalClose());
            }}
        >
            <input 
                placeholder="name"
                type='text' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className='border rounded outline-none'
            />
            <input
                type='number'
                value={age}
                placeholder='age'
                onChange={(e) => setAge(Number(e.target.value))} 
                className='border rounded outline-none'
            />
            <input
                type='text'
                placeholder="passport"
                value={passport}
                onChange={(e) => setPasport(e.target.value)}
                className='border rounded outline-none'
            />
            <button
            className="py-2 bg-yellow-200 font-bold rounded" 
                type='submit'
            >
                update
            </button>
        </form>
    )
}