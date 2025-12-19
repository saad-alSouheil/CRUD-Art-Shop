import React from "react";
import { Outlet } from "react-router-dom";
import {Navigate} from "react-router-dom";
import Nav from "./Nav";
import "../styles/NavBar.css";

export default function ClientSide(){

    return(
        <>
        <Nav/>
        <Outlet />
        </>
    );
}