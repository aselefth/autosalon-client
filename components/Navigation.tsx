import Link from "next/link";
import Image from "next/image";
import { useState } from "react"; 
import car from '../assets/car.png';

export default function Navigation () {
    const [department, setDepartment] = useState(0);
    return (
        <nav className="w-full flex px-4 py-2 bg-yellow-200 text-black nav">
            {/* <p style={{transform: `translateX(${department *100}px)`}}></p> */}
            <Link href='/cars'><h1 onClick={() => setDepartment(0)}>Авто</h1></Link>
            <Link href='/purchases'><h1 onClick={() => setDepartment(1)}>Договоры</h1></Link>
            <Link href='/colors'><h1 onClick={() => setDepartment(2)}>Цвета</h1></Link>
            <Link href='/engines'><h1 onClick={() => setDepartment(3)}>Двигатели</h1></Link>
            <Link href='/transmissions'><h1 onClick={() => setDepartment(4)}>Трансмиссии</h1></Link>
            <Link href='/bodyTypes'><h1 onClick={() => setDepartment(5)}>Кузова</h1></Link>
            <Link href='/clients'><h1 onClick={() => setDepartment(6)}>Клиенты</h1></Link>
            <Link href='/departments'><h1 onClick={() => setDepartment(7)}>Отделы</h1></Link>
            <Link href='/equipmentTypes'><h1 onClick={() => setDepartment(8)}>Типы оборудования</h1></Link>
            <Link href='/equipment'><h1 onClick={() => setDepartment(9)}>Оборудование</h1></Link>
            <Link href='/employees'><h1 onClick={() => setDepartment(10)}>Персонал</h1></Link>
        </nav>
    )
}