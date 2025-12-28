import { useEffect, useState } from "react";
import axios from "axios";

export default function BRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/buy-requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/buy-request/${id}`, { status });
      fetchRequests(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Buy Requests</h2>

      <table border="1" style={styles.table}>
        <thead>
          <tr style={{backgroundColor: '#f2f2f2'}}>
            <th style={{ padding: '10px' }}>Painting</th>
            <th style={{ padding: '10px' }}>Price</th>
            <th style={{ padding: '10px' }}>Buyer</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Message</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td style={{ padding: '10px' }}>{r.painting_name}</td>
              <td style={{ padding: '10px' }}>${r.price}</td>
              <td style={{ padding: '10px' }}>{r.buyer_name}</td>
              <td style={{ padding: '10px' }}>{r.buyer_email}</td>
              <td style={{ padding: '10px' }}>{r.message || "-"}</td>
              <td style={{ padding: '10px' }}>
                <strong>{r.status}</strong>
              </td>
              <td style={{ padding: '10px' }}>
                {r.status === "pending" && (
                  <>
                    <button
                      style={styles.approve}
                      onClick={() => updateStatus(r.id, "approved")}
                    >
                      Approve
                    </button>

                    <button
                      style={styles.reject}
                      onClick={() => updateStatus(r.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  approve: {
    background: "green",
    color: "white",
    border: "none",
    padding: "6px 10px",
    margin: "5px",
    cursor: "pointer",
  },
  reject: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
};
