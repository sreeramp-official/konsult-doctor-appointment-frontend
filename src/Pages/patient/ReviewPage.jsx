import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../../config";
import "./Patient.css"

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctorId = location.state?.doctor;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const submitReview = async () => {
    if (!doctorId) {
      setMessage("No doctor selected.");
      return;
    }

    const reviewData = {
      doctorId, // use doctorId (matches backend)
      rating: Number(rating),
      comment,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Review submitted successfully!");
      } else {
        setMessage(data.error || "❌ Failed to submit review.");
      }
    } catch (error) {
      setMessage("❌ Error submitting review.");
    }
  };

  return (
    <div className="review-page">
      <div className="review-container">
        <h2>Post a Review</h2>

        {message && <p className="message">{message}</p>}

        <div className="input-group">
          <label>Rating (0 - 5)</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Comment</label>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button className="review-button" onClick={submitReview}>
          Submit
        </button>
        <button className="back-button" onClick={() => navigate("/patient/doctors")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
