export default function PaintingCard({ name, price, image, onBuy, sold }) {
  return (
    <div style={styles.card}>
      <img 
        src={image? `http://localhost:5000/pictures/${image}` : '/placeholder-image.jpg'}
        alt={name}
        style={styles.image}
      />
      <h3 style={styles.title}>{name}</h3>
      <p style={styles.price}>${price}</p>
    
      <button 
        style={{ 
          margin: '5px', 
          padding: '10px 15px',
          backgroundColor:sold? "gray" : '#67dc35ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: sold? 'not-allowed' : "pointer"
        }}
        onClick={!sold? onBuy : null}
        disabled={sold}
      >
        {sold? "Sold" : "Buy"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    width: "250px",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    background: "white",
    margin: "15px",
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  title: {
    margin: "10px 0 5px",
    fontSize: "18px",
    fontWeight: "600"
  },
  price: {
    fontSize: "16px",
    color: "green",
    fontWeight: "bold"
  }
};