import { useState } from "react";
import axios from "axios";

import "../styles/Form.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        username,
        password
      });

      if (!res.data.success) {
        setMsg(res.data.message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));

        window.location.href = "/adminDashboard";
      

    } catch (err) {
      setMsg("Error connecting to server");
    }
  };

  return (
    <div className="formContainer" >
      <div className="form">
        <h1 >Login</h1>
        
        <input 
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      
      </div>
      
      <p style={{
        textAlign: "center",
        marginTop: "15px",
        color: msg.includes("Error") ? "#dc3545" : "#28a745",
        minHeight: "20px"
      }}>
        {msg}
      </p>

    </div>
  );
}