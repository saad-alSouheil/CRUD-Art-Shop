import "../styles/PopUp.css";

export default function PaintingDetails({painting, onClose}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-details"
        onClick={(e) => e.stopPropagation()}
      >
        <img
            src={painting.picture ? `${process.env.REACT_APP_API_URL}/pictures/${painting.picture}` : '/placeholder-image.jpg'}
            alt={painting.name}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
        />

        <h2 className="header">{painting.name}</h2> <br/>

        <p>{painting.description}</p> <br/>

        {painting.price && <p><strong>Potential price:</strong> ${painting.price}</p>}
      </div>
    </div>
  );
}
