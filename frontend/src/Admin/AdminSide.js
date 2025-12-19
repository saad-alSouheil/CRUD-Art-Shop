import { Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  
  

  return (

    <div>
      <Navigate to="/admin/login" replace />
      <h2>Admin Area</h2>
      <Outlet />
    </div>
  );
}
