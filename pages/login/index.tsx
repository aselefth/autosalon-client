import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IClient } from "../../components/modals/ClientModal";
import { useAppDispatch } from "../../hooks/redux";
import {
    useAddCurrentUserMutation,
    useGetUsersQuery,
} from "../../store/AuthSlice";

export interface IUser {
    userId: number;
    login: string;
    password: string;
    access: string;
}

const Login = () => {
    const dispatch = useAppDispatch();
    const [isLogError, setIsLogError] = useState<boolean>(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { data: users } = useGetUsersQuery(undefined);
    const [addCurrentUser] = useAddCurrentUserMutation();
    const router = useRouter();
    console.log(users);
    

    const handleAuthenticate = async (login: string, password: string) => {
        const user = users?.find(
            (user: IUser) => user.login === login && user.password === password
        );
        try {
            await addCurrentUser({ userId: user.userId });
            setIsLogError(false);
            router.push("/cars");
        } catch (e) {
            console.log("нет аккаунта? Зарегистрируйтесь");
            setIsLogError(true);
        }
    };

    return (
        <form
            className="flex flex-col gap-4 font-light italic mt-4 px-4 items-center"
            onSubmit={(e) => {
                e.preventDefault();
                handleAuthenticate(login, password);
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
                className={`py-2 bg-yellow-200 font-bold rounded flex justify-center w-[150px]`}
                type="submit"
            >
                войти
            </button>
            {isLogError && (
                <div className="flex items-center justify-center">
                    <p>Нет аккаунта?</p>{" "}
                    <Link className="m-[0px]" href="/register">Зарегистрируйтесь</Link>
                </div>
            )}
        </form>
    );
};

export default Login;
