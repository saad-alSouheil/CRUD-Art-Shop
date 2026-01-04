import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

//component:
import Table from "../components/Table";

import "../styles/Table.scss";

//MUI icons:
import Stack from "@mui/material/Stack";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";


function MyPaintings ({rows}){
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        fetchPaintings();
    }, []);

    const fetchPaintings = async() => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/paintings`);
        setPaintings(res.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/delete/${id}`);
            setPaintings(paintings.filter(p => p.pId !== id)); 
        } catch (err) {
            console.log(err);
        }
    };

    //saving the paintings data from the db in "columns" to display using the "Table" component:
    const columns = [
        {
            field: "picture",
            header: "Paintings",
            render: (r) => (
                <div>
                    {r.picture ? (
                        <img
                        src={`${process.env.REACT_APP_API_URL}/pictures/${r.picture}`}
                        alt={r.name}
                        style={{ 
                            width: "200px", 
                            height: "150px", 
                            objectFit: "cover",
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                        />
                    ) : (
                        <span style={{ color: '#999' }}>No image</span>
                    )}
                </div>
            ),
        },

        {field: "name", header: "Title"},
        {field: "price", header: "Price"},
        {field: "description", header: "Description"},

        {
            field: "actions",
            header: "",
            render: (r) =>
                <Stack direction="row" spacing={2}>
                    <Link
                        to={`/update/${r.pId}`} 
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        <EditIcon style={{color: "#be55e7ff"}}/>
                    </Link>

                    <DeleteIcon style={{color: "#e75555", cursor: "pointer"}}
                        onClick={() => handleDelete(r.pId)}
                    />
                </Stack>
        },
    ];

    return (
        <div style={{padding: "10px"}}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                <Link to="/add" className='addButton'>
                    <AddIcon/>
                    Add a New Painting
                </Link>
            </div>

            <Table
                data = {paintings}
                columns={columns}
                rows={rows}
            />
        </div>
    );
}

export default MyPaintings;