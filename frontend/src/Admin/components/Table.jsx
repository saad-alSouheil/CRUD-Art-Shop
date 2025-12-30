import { useEffect, useState } from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import "../styles/Table.scss";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function BasicTable () {
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
    
    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/buy-request/${id}`, { status });
            fetchRequests(); 
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ bgcolor: "#eee" }}> 
                        <TableCell align="center" className="headCell">Painting</TableCell>
                        <TableCell align="center" className="headCell">Price</TableCell>
                        <TableCell align="center" className="headCell">Buyer</TableCell>
                        <TableCell align="center" className="headCell">Email</TableCell>
                        <TableCell align="center" className="headCell">Message</TableCell>
                        <TableCell align="center" className="headCell">Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.map((r) => (
                    <TableRow key={r.id}>
                        <TableCell className="tableCell">
                            <div className="cellWrapper">
                                <img
                                    src={r.picture ? `http://localhost:5000/pictures/${r.picture}` : '/placeholder-image.jpg'}
                                    alt=""
                                    className="image"
                                />
                                {r.painting_name}
                            </div>
                        </TableCell>
                        <TableCell className="tableCell">${r.price}</TableCell>
                        <TableCell className="tableCell">{r.buyer_name}</TableCell>
                        <TableCell className="tableCell">{r.buyer_email}</TableCell>
                        <TableCell className="tableCell">{r.message || "-"}</TableCell>
                        <TableCell className="tableCell">
                            <span className={`status ${r.status}`}>{r.status}</span>
                        </TableCell>
                        <TableCell className="tableCell" style={{borderLeft:"1px solid headCell#e2e0e0ff"}}>
                            {r.status === "pending" && (
                            <Stack direction="row" spacing={2}>
                              <CheckBoxIcon 
                                className={`icon ${r.status}`}
                                onClick={() => updateStatus(r.id, "approved")}
                                style={{color: "#88dc7fee"}}
                              />
                              <DisabledByDefaultRoundedIcon 
                                className={`icon ${r.status}`}
                                onClick={() => updateStatus(r.id, "rejected")}
                                style={{color: "#e75555ee"}}
                              />
                            </Stack>
                          )}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>  )
}

export default BasicTable;
