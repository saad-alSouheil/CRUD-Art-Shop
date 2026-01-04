import { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from "@mui/material/Stack";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";

import Table from "../components/Table";

import "../styles/Table.scss";


function BRequests ({rows}){
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async() => {
        const res = await axios.get(`{process.env.REACT_APP_API_URL}/buy-requests`);
        setRequests(res.data);
    };

    const updateStatus = async (id, status) =>{
        await axios.put(`${process.env.REACT_APP_API_URL}/buy-request/${id}`, { status });
        fetchRequests();
    };

    const columns = [
        {
            field: "painting_name",
            header: "Painting",
            render: (r) => (
                <div className="cellWrapper">
                    <img src={`${process.env.REACT_APP_API_URL}/pictures/${r.picture}`} alt="" className="image" />
                    {r.painting_name}
                </div>
            ),
        },

        {field: "price", header: "Price"},
        {field: "buyer_name", header: "Buyer"},
        {field: "buyer_email", header: "Email"},
        {field: "message", header: "Message"},
        {
            field: "status", header: "Status",
            render: (r) => (
                <span className={`status ${r.status}`}>{r.status}</span>
            ),    
        },

        {
            field: "actions",
            header: "",
            render: (r) =>
                r.status === "pending" && (
                    <Stack direction="row" spacing={2}>
                        <CheckBoxIcon style={{color: "#88dc7f"}}
                            onClick={() => updateStatus(r.id, "approved")}
                        />
                        <DisabledByDefaultRoundedIcon style={{color: "#e75555"}}
                            onClick={() => updateStatus(r.id, "rejected")}
                        />
                    </Stack>
            ),
        },
    ];

    return (
        <div style={{padding: "10px"}}>
            <Table
                data = {requests}
                columns={columns}
                rows={rows}
            />
        </div>
    );
}

export default BRequests