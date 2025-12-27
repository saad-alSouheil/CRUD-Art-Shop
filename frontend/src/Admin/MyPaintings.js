import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyPaintings = () => {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    const fetchAllPaintings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/paintings");
        if (Array.isArray(res.data)) setPaintings(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPaintings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setPaintings(paintings.filter(p => p.pId !== id)); // remove locally
    } catch (err) {
      console.log(err);
    }
  };

  if (!paintings.length) return <p>Loading paintings...</p>;

    return (
    <div style={{padding: "10px"}}>
      <div>
        <div>
          <table border="1" width="100%" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px' }}>Picture</th>
                <th style={{ padding: '10px' }}>Painting Name</th>
                <th style={{ padding: '10px' }}>Price</th>
                <th style={{ padding: '10px' }}>Description</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paintings.map((painting) => (
                <tr key={painting.pId}>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    {painting.picture ? (
                      <img
                        src={`http://localhost:5000/pictures/${painting.picture}`}
                        alt={painting.name}
                        style={{ 
                          width: "100px", 
                          height: "100px", 
                          objectFit: "cover",
                          border: '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                      />
                    ) : (
                      <span style={{ color: '#999' }}>No image</span>
                    )}
                  </td>
                  <td style={{ padding: '10px' }}>{painting.name}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>${painting.price}</td>
                  <td style={{ padding: '10px' }}>{painting.description}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button 
                      className="delete" 
                      onClick={() => handleDelete(painting.pId)}
                      style={{ 
                        margin: '5px', 
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                    <button 
                      className="update"
                      style={{ 
                        margin: '5px', 
                        padding: '5px 10px',
                        backgroundColor: '#8400ffff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <Link 
                        to={`/update/${painting.pId}`} 
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Update
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPaintings;
