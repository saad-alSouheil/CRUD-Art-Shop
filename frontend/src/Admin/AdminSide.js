import { Outlet, Link, useNavigate} from "react-router-dom";
import '../styles/NavBar.css';

export default function AdminLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {
     navigate('/admin');
  };

  return (
    <div>

      <h2>Admin Area</h2>
      <nav className="navbar">
        <div className="nav-right">
        <Link to="/adminDashboard" className="nav-link">Dashboard</Link>
        <Link to="/myPaintings" className="nav-link">My Paintings</Link>
        <Link to="/add" className="nav-link">Add Paintings</Link>
        <button onClick={handleLogout} className="logout-btn"> Logout </button>
        </div>
      </nav>

      <Outlet />

    </div>
  );
}
