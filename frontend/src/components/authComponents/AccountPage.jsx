import Navbar from "../Navbar";
import Header from "../Header";
import { Outlet } from "react-router-dom";
export default function AccountPage() { 
    return (
        <>
        <Navbar></Navbar>
        <Outlet/>
        </>
    )
}