import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Widget.scss";
import PaidIcon from '@mui/icons-material/Paid';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ColorLensIcon from '@mui/icons-material/ColorLens';

function Widget({type}){
    const [paintings, setPaintings] = useState([]);
    const [requests, setRequests] = useState([]);


    useEffect(() => {
        const fetchAllPaintings = async () => {
            try {
                const res = await axios.get("http://localhost:5000/paintings");
                if (Array.isArray(res.data)) setPaintings(res.data);
            } catch (err) {
            console.log(err);
            }
        };
        fetchAllPaintings();
    }, []);


    useEffect(() => {
        const fetchAllRequests = async () => {
        try {
            const res = await axios.get("http://localhost:5000/commission-requests");
            if (Array.isArray(res.data)) setRequests(res.data);
        } catch (err) {
            console.log(err);
            }
        };
        fetchAllRequests();
    }, []);

    //Function to get the total number of sales:
    function sales(paintings) {
        let total = 0;
        for (let i = 0; i < paintings.length; i++) {
            if (paintings[i].sold) {
                total += Number(paintings[i].price);
            }
        }
        return total;
    }
    
    let data;

    switch(type){
        case "paintings":
            data = {
                title: "Total Paintings",
                count: paintings.length,
                isMoney: false,
                link: <Link to="/mypaintings">See all paintings</Link>,
                icon: <ColorLensIcon className="icon" style={{color:"white", backgroundColor:"#fbf1349b"}}/>
            };
            break;
        case "sales":
            data = {
                title: "Total Sales",
                count: sales(paintings),
                isMoney: true,
                link: "",
                icon: <PaidIcon className="icon" style={{color:"white", backgroundColor:"#a1e982ad"}}/>
            };
            break;  
        case "commissions":
            data = {
                title: "Total Commission Requests",
                count: requests.length,
                isMoney: false,
                link: <Link to="/comRequests">See all commissions</Link>,
                icon: <DesignServicesIcon className="icon" style={{color:"white", backgroundColor:"#f25d5dba"}}/>
            };
            break;
        default:
            break;         
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"}{data.count}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">{data.icon}</div>
        </div>
    );
}

export default Widget