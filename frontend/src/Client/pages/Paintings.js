import { useEffect, useState } from "react";
import axios from "axios";
import PaintingCard from "../components/Cards";
import PaintingDetails from "../components/PaintingDetails"
import BuyRequest from "../components/BuyRequest";

export default function Paintings() {
  const [paintings, setPaintings] = useState([]);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [buyPainting, setBuyPainting] = useState(null);

  useEffect(() => {
    const fetchAllPaintings = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/paintings`);
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

  return (
    <div style={styles.container}>
      {paintings.map((p, index) => (
        <div
          key={p.pId || index}
          onClick={() => setSelectedPainting(p)}
          style={{cursor: "pointer"}}
        >
          <PaintingCard
            name={p.name}
            price={p.price}
            description={p.description}
            image={p.picture}
            sold={p.sold}
            onBuy={(e) => {
              e.stopPropagation();
              setBuyPainting(p);
            }}
          />
        </div>
      ))}

      {selectedPainting && (
        <PaintingDetails
          painting = {selectedPainting}
          onClose={() => setSelectedPainting(null)}
        />
      )}

      {buyPainting && (
        <BuyRequest
          painting={buyPainting}
          onClose={() => setBuyPainting(null)}
        />
      )}
      
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
