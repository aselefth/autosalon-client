import { NextPage } from "next";
import { ReactElement } from "react";
import Navigation from "./Navigation";

export default function Layout ({children}: any) {
    return (
        <div className='layout'>
            <Navigation />
            {children}
        </div>
    )
}