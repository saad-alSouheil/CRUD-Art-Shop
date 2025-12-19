import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>Art Gallery</h2>
      </div>

      <div className="nav-right">
        {!user && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Sign up</Link>
          </>
        )}

        {user && (
          <>
            {user.username === "admin" && (
              <>
                <Link to="/mypaintings" className="nav-link">My Paintings</Link>
                <Link to="/add" className="nav-link">Add Painting</Link>
              </>
            )}

            {/* Normal client */}
            {user.username !== "admin" && (
              <>
              <Link to="/paintings" className="nav-link">Paintings</Link>
              <Link to="/about" className="nav-link">About</Link>
              </>
            )}

            {/* Logout for all */}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
