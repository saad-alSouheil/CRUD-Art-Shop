import { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import "../styles/Chart.scss";

function Chart() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
        const res = await axios.get("http://localhost:5000/buy-requests");
        setRequests(res.data);
        } catch (err) {
        console.error(err);
        }
    };

    function salesInMonth(buyRequests) {
        return buyRequests
        .filter(req => req.status === "approved")
        .map(req => {
            const date = new Date(req.created_at);

            return {
                month: date.toLocaleString("default", { month: "long" }),
                totalSales: req.price
            };
        });
    }

    return (
    <div className="chart">
        <div className="title">title</div>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
            <AreaChart
            width={730}
            height={250}
            data={salesInMonth(requests).reverse()}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
            <defs>
                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="gray" />
            <YAxis dataKey="totalSales" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
                type="monotone"
                dataKey="totalSales"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#total)"
            />
            </AreaChart>
        </ResponsiveContainer>
        </div>
    );
}

export default Chart