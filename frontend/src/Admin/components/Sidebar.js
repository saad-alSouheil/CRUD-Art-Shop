import React from 'react'
import { Link } from 'react-router-dom';

import "../styles/Sidebar.scss";

//Icons from MUI:
import LogoutIcon from '@mui/icons-material/Logout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import DesignServicesIcon from '@mui/icons-material/DesignServices';


export default function Sidebar(){
    return (
    <div className='sidebar'>
        <div className="top">
            <span className="logo">Admin</span>
        </div>
        <hr/>
        <div className="center">
            <ul>
                    <p className="title">MAIN</p>
                <Link to="/adminDashboard">
                    <li>
                    <SpaceDashboardIcon className='icon'/>
                    <span>Dashboard</span>
                    </li>
                </Link>
                <Link to="/myPaintings">
                    <li>
                    <PhotoFilterIcon className='icon'/>
                    <span>My Paintings</span>
                    </li>
                </Link>
                    <p className="title">REQUESTS</p>
                <Link to="/buyRequests">
                    <li>
                    <LocalMallIcon className='icon'/>
                    <span>Buy Requests</span>
                    </li>
                </Link>
                <Link to="/comRequests">
                    <li>
                    <DesignServicesIcon className='icon'/>
                    <span>Commission Requests</span>
                    </li>
                </Link>
                    <p className="title">USER</p>
                <Link to="/admin">
                    <li>
                    <LogoutIcon className="icon"/>
                    <span>Logout</span>
                    </li>
                </Link>
                
            </ul>
        </div>
    </div>
    )
}
