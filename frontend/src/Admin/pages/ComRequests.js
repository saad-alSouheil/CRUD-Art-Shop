import { useEffect, useState } from 'react';
import axios from 'axios';

//mui imports:
import Stack from "@mui/material/Stack";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";

//used component:
import Table from "../components/Table";

import "../styles/Table.scss";


function ComRequests ({rows}){
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async() => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/commission-requests`);
        setRequests(res.data);
    };

    const updateStatus = async (id, status) =>{
        await axios.put(`${process.env.REACT_APP_API_URL}/commission-request/${id}`, { status });
        fetchRequests();
    };

    //saving the commission requests data from the db in "columns" to display using the "Table" component:
    const columns = [
        {field: "client_name", header: "Client Name"},
        {field: "client_email", header: "E-mail"},
        {field: "medium", header: "Painting Medium"},
        {field: "message", header: "Discription"},
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

export default ComRequests;