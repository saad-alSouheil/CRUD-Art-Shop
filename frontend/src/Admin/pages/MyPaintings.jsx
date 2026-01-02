import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Table from "../components/Table";
import "../styles/Table.scss";

import Stack from "@mui/material/Stack";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import AddIcon from "@mui/icons-material/Add";

function MyPaintings ({rows}){
    const [paintings, setPaintings] = useState([]);
    //const navigate = useNavigate();

    useEffect(() => {
        fetchPaintings();
    }, []);

    const fetchPaintings = async() => {
        const res = await axios.get("http://localhost:5000/paintings");
        setPaintings(res.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete/${id}`);
            setPaintings(paintings.filter(p => p.pId !== id)); 
        } catch (err) {
            console.log(err);
        }
    };

    /*const handleUpdate =() =>{
        navigate(`/update/${paintings.pId}`)
    }*/

    const columns = [
        {
            field: "picture",
            header: "Paintings",
            render: (r) => (
                <div>
                    {r.picture ? (
                        <img
                        src={`http://localhost:5000/pictures/${r.picture}`}
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