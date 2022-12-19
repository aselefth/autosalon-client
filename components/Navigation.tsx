import Link from "next/link";
import {
  useGetCurrentUserQuery,
  useQuitCurrentUserMutation,
} from "../store/AuthSlice";

export default function Navigation() {
  const { data: user } = useGetCurrentUserQuery(undefined);
  const [quitUser] = useQuitCurrentUserMutation();

  const handleQuitUser = async () => {
    await quitUser(user?.userId);
  };

  return (
    <nav className="w-full flex px-4 py-2 bg-yellow-200 text-black nav justify-around">
      <div className="flex">
      <Link href="/cars">
        <h1>Авто</h1>
      </Link>
      {user?.access === "admin" && (
        <>
          <Link href="/purchases">
            <h1>Договоры</h1>
          </Link>
          <Link href="/colors">
            <h1>Цвета</h1>
          </Link>
          <Link href="/engines">
            <h1>Двигатели</h1>
          </Link>
          <Link href="/transmissions">
            <h1>Трансмиссии</h1>
          </Link>
          <Link href="/bodyTypes">
            <h1>Кузова</h1>
          </Link>
          <Link href="/clients">
            <h1>Клиенты</h1>
          </Link>
          <Link href="/departments">
            <h1>Отделы</h1>
          </Link>
          <Link href="/equipmentTypes">
            <h1>Типы оборудования</h1>
          </Link>
          <Link href="/equipment">
            <h1>Оборудование</h1>
          </Link>
          <Link href="/employees">
            <h1>Персонал</h1>
          </Link>
        </>
      )}
      </div>
      <div className="bg-black text-yellow-200 rounded">
      {user === null && (
        <Link href="/login">
          <h1>войти</h1>
        </Link>
      )}
      {user !== null && (
        <h1
          onClick={() => {
            handleQuitUser();
          }}
        >
          выйти
        </h1>
      )}
      </div>
    </nav>
  );
}
