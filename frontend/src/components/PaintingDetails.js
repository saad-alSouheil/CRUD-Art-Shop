import "../styles/PaintingDetails.css";

export default function PaintingDetails({painting, onClose}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <img
            src={painting.picture ? `http://localhost:5000/pictures/${painting.picture}` : '/placeholder-image.jpg'}
            alt={painting.name}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
        />

        <h2>{painting.name}</h2>

        <p>{painting.description}</p>
        
        {painting.price && <p><strong>Price:</strong> ${painting.price}</p>}
      </div>
    </div>
  );
}
