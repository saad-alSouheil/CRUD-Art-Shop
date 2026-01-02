import axios from "axios";
import React, { useState, useEffect } from "react";
import {useNavigate, useParams } from "react-router-dom";

import '../styles/Form.scss';

export default function UpdatePainting() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description,setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/search/${id}`)
      .then((res) => {
        setName(res.data[0].name);
        setDescription(res.data[0].description)
        setPrice(res.data[0].price);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", file); 

    try {
      await axios.post(`http://localhost:5000/modify/${id}`, formData);
      navigate("/mypaintings");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="form">
        <h1>Update Painting</h1>

        <input
          type="text"
          value={name}
          placeholder="Painting Name"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <input
          type="number"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input type="file" name="image" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={handleClick}>Update</button>

        {error && "Something went wrong!"}

      </div>
    </div>
  );
}
