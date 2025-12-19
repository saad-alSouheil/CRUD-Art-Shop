import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css';

export default function AdminDashboard(){

    return(
        <div>
        <nav className="navbar">
        <Link to="myPaintings" className="nav-link">My Paintings</Link>
        <Link to="add" className="nav-link">Add Paintings</Link>

        </nav>
        <h1>Admin Dashboard</h1>
        </div>
    );
}