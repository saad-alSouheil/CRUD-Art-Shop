import React, { useState } from 'react';
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";

//mui icon:
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import "../styles/Navbar.css";

export default function ClientSide(){
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    };

    return(
        <div>
            <header className="header1">
                <div className="container header-container">
                    <div className="logo">
                        <span className="logo-icon"><AutoAwesomeIcon/></span>
                        <span className="logo-text">Art Gallery</span>
                    </div>

                <button className="menu-toggle" onClick={toggleMenu}>
                    {menuOpen ? '✕' : '☰'}
                </button>

                <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/paintings" className="nav-link">Paintings</Link>
                    <Link to="/commission" className="nav-link">Commission</Link>
                    <Link to="/about" className="nav-link">About</Link>
                </nav>

                <div className="header-actions">
                    <Link to="/postReview" className="lnk btn-primary">RATE US</Link>
                </div>
                </div>
            </header>

            <main>
                <Outlet/>
            </main>

        </div>
    );
}