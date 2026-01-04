import React, {useEffect, useState} from 'react'
import axios from 'axios';

function Reviews ({N}) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchAllReviews = async () => {
        try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/reviews`);
        console.log(res.data); 
        if (Array.isArray(res.data)) {
            setReviews(res.data);
        } else {
            setReviews([]);
        }
        } catch (err) {
        console.log(err);
        }
        };
        fetchAllReviews();
    }, []);

    return (
        <div>
            <div className="reviews-grid">
                {reviews.slice(0,N).map((r, index) => (
                <div className="review-card" key={index}>
                    <div className="review-author">
                        <div className="author-info">
                            <h4 className="author-name">{r.name}</h4>
                        </div>
                    </div>

                    <div className="review-content">
                        <p>"{r.comment}"</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews