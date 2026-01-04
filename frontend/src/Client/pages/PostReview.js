import { useState } from "react";
import axios from "axios";
import "../../Admin/styles/Form.scss";

export default function PostReview() {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        await axios.post(`${process.env.REACT_APP_API_URL}/review`, {
            name: name,
            comment: comment,
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
            <h1>Write us a Review!</h1>
            {success ? (
            <p className="success-msg">Request sent successfully</p>
            ) : (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <textarea
                placeholder="Your Review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                />

                <button type="submit">Submit</button>
            </form>
            )}
        </div>
        </div>
    );
}
