import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IClient } from "../../components/modals/ClientModal";
import { useAppDispatch } from "../../hooks/redux";
import {
    useAddCurrentUserMutation,
    useAddUserMutation,
    useGetUsersQuery,
} from "../../store/AuthSlice";

export interface IUser {
    userId: number;
    login: string;
    password: string;
    access: string;
}

const Register = () => {
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [addCurrentUser] = useAddCurrentUserMutation();
    const [addUser] = useAddUserMutation();
    const router = useRouter();


    const handleRegister = async (login: string, password: string) => {
        try {
            await addUser({login, password});
            router.push("/login");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form
            className="flex flex-col gap-4 font-light italic mt-4 px-4 items-center"
            onSubmit={(e) => {
                e.preventDefault();
                handleRegister(login, password);
            }}
        >
            <input
                placeholder="логин"
                type="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="border rounded outline-none w-[350px]"
            />
            <input
                type="password"
                placeholder="пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded outline-none w-[350px]"
            />
            <button
                className={`py-2 bg-yellow-200 font-bold rounded flex justify-center w-[250px]`}
                type="submit"
            >
                зарегистрироваться
            </button>
        </form>
    );
};

export default Register;
