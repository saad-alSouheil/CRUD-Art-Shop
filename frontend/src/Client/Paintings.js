import { useEffect, useState } from "react";
import axios from "axios";
import PaintingCard from "../components/Cards";

export default function Paintings() {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    const fetchAllPaintings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/paintings");
        console.log(res.data); 
        if (Array.isArray(res.data)) {
          setPaintings(res.data);
        } else {
          setPaintings([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPaintings();
  }, []);

  if (!Array.isArray(paintings)) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      {paintings.map((p, index) => (
        <PaintingCard
          key={p.pId || index}
          name={p.name}
          price={p.price}
          image={p.picture} 
        />
      ))}
      
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "20px",
    flexdirection: "row",
    gap: "20px",
  }
};
