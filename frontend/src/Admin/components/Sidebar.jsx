import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/Sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';

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
                    <DashboardIcon className='icon'/>
                    <span>Dashboard</span>
                    </li>
                </Link>
                <Link to="/myPaintings">
                    <li>
                    <FilterVintageIcon className='icon'/>
                    <span>My Paintings</span>
                    </li>
                </Link>
                    <p className="title">REQUESTS</p>
                <li>
                    <span>Buy Requests</span>
                </li>
                <li>
                    <span>Commission Requests</span>
                </li>
                    <p className="title">USER</p>
                <li>
                    <LogoutIcon className="icon"/>
                    <span>Logout</span>
                </li>
                    <p className="title">COLOR THEME</p>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption"></div>
            <div className="colorOption"></div>
        </div>
    </div>
    )
}
