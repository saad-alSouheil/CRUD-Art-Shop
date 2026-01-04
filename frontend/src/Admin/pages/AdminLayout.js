import { Outlet } from 'react-router-dom';

//component:
import Sidebar from '../components/Sidebar'

import "../styles/Layout.scss";

function AdminLayout(){
  return (
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
          <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout