import React from 'react'
import Widget from '../components/Widget'
import Chart from '../components/Chart';
import Reviews from '../components/Reviews';
import BuyRequests from './BRequests';
import "../styles/Dashboard.scss";

const Dashboard = () => {
    return (
        <div className="container">
            <div className="widgets">
                <Widget type="paintings"/>
                <Widget type="sales"/>
                <Widget type="commissions"/>
            </div>

            <div className="charts">
                <Chart/>
                <Reviews/>
            </div>
            <div className="tableContainer">
                <div className="tableTitle">Recent Buy Requests</div>
                <BuyRequests rows={4}/>
            </div>
        </div>
    )
}

export default Dashboard