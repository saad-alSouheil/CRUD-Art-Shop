import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });

      setMsg(res.data.message);

      if (res.data.success) {
        window.location.href = "/login";
      }
    } catch (err) {
      setMsg("Server error");
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign up</h2>
      <form onSubmit={handleRegister}>
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
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
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
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Sign up
        </button>
      </form>
      <p style={{
        textAlign: "center",
        marginTop: "15px",
        color: msg.includes("error") ? "#dc3545" : "#28a745",
        minHeight: "20px"
      }}>
        {msg}
      </p>
    </div>
  );
}