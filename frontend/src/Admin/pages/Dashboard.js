import React from 'react'

//components:
import Widget from '../components/Widget'
import Chart from '../components/Chart';
import Reviews from '../../Client/components/Reviews';
import BuyRequests from './BRequests';

//style:
import "../styles/Dashboard.scss";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="widgets">
                <Widget type="paintings"/>
                <Widget type="sales"/>
                <Widget type="commissions"/>
            </div>

            <div className="charts">
                <Chart/>
                <div className="recentRev">
                    <div className="rtitle">Recent Reviews</div>
                    <Reviews N={3}/>
                </div>
            </div>
            <div className="tableContainer">
                <div className="tableTitle">Recent Buy Requests</div>
                <BuyRequests rows={4}/>
            </div>
        </div>
    )
}

export default Dashboard