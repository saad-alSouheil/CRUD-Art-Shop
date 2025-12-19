export default function PaintingCard({ name, price, image }) {
  return (
    <div style={styles.card}>
      <img 
        src={image ? `data:image/jpeg;base64,${image}` : '/placeholder-image.jpg'} 
        alt={name}
        style={styles.image}
      />
      <h3 style={styles.title}>{name}</h3>
      <p style={styles.price}>${price}</p>

      <button 
        style={{ 
          margin: '5px', 
          padding: '10px 15px',
          backgroundColor: '#67dc35ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Buy
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