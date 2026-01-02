import axios from "axios";
import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import "../styles/Form.scss";

export default function AddPainting() {
  const [painting, setPainting] = useState({
    name: "",
    price: "",
    description:"",
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPainting((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", painting.name);
    formData.append("price", painting.price);
    formData.append("image", file);
    formData.append("description", painting.description);

    try {
      await axios.post("http://localhost:5000/create", formData);
      navigate("/mypaintings");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="form">
        <h1>Add Painting</h1>

        <input
          type="text"
          name="name"
          placeholder="Painting Name"
          onChange={handleChange}
        />

        <textarea
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <input type="file" name="image" onChange={handleFile} />

        <button onClick={handleClick}>Add</button>

        {error && "Something went wrong!"}

      </div>
    </div>
  );
}
