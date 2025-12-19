import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
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
    <div style={{
      maxWidth: "300px",
      margin: "100px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        />

        <input 
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        />

        <button 
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#ff6600ff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
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