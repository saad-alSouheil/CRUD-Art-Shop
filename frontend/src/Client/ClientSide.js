import React from "react";
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";
import "../styles/NavBar.css";

export default function ClientSide(){

    return(
        <div>

            <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/paintings" className="nav-link">Paintings</Link>
                <Link to="/commission" className="nav-link">Commission</Link>
                <Link to="/about" className="nav-link">About</Link>
            </nav>

            <main>
                <Outlet/>
            </main>

        </div>
    );
}