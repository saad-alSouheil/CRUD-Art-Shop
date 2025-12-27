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
      await axios.post("http://localhost:5000/buy-request", {
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
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>Buy Request</h2>
        <p><strong>{painting.name}</strong></p>

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

            <button type="submit">Send Request</button>
          </form>
        )}
      </div>
    </div>
  );
}
