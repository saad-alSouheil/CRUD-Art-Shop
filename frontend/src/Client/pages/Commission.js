import { useState } from "react";
import axios from "axios";

import "../../Admin/styles/Form.scss";

export default function Commission() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [medium, setMedium] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/commission-request`, {
        client_name: clientName,
        client_email: clientEmail,
        message,
        medium,
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="formContainer">
      <div className="form">
        <h1>Make A Commission Request!</h1>
        {success ? (
          <p className="success-msg">Request sent successfully</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
            />

            <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                required
            >
                <option value="">Select Medium</option>
                <option value="watercolor">Watercolor</option>
                <option value="acrylic">Acrylic</option>
                <option value="oil">Oil</option>
                <option value="gouache">Gouache</option>
            </select>

            <textarea
              placeholder="Describe your commission"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button type="submit">Send</button>
          </form>
        )}
      </div>
    </div>
  );
}
