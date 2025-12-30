import React from 'react'
import Widget from '../components/Widget'
import "../styles/Dashboard.scss";

const Dashboard = () => {
    return (
        <div className="container">
            <div className="widgets">
                <Widget type="paintings"/>
                <Widget type="sales"/>
                <Widget type="commissions"/>
            </div>
            </div>
    )
}

export default Dashboard