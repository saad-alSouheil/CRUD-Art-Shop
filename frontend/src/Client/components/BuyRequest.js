import { useState } from "react";
import axios from "axios";

import "../styles/PopUp.css";

export default function BuyRequest({ painting, onClose }) {
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/buy-request`, {
        painting_id: painting.pId,
        buyer_name: buyerName,
        buyer_email: buyerEmail,
        message,
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-form" onClick={(e) => e.stopPropagation()}>

        <h2 className="header">Buy Request</h2>
        <p><strong>{painting.name}</strong></p> <br></br>

        {success ? (
          <p className="success-msg">Request sent successfully</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              required
            />

            <textarea
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" className="submit-btn">Send Request</button>
          </form>
        )}
      </div>
    </div>
  );
}
