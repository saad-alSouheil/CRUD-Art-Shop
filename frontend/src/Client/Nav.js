import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

export default function Nav(){

    return(
        <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/paintings" className="nav-link">Paintings</Link>
        <Link to="/about" className="nav-link">About</Link>
        </nav>
    );
}