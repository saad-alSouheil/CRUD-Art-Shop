import { useEffect, useState } from "react";
import axios from "axios";

export default function ComRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/commission-requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/commission-request/${id}`, { status });
      fetchRequests(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Commission Requests</h2>

      <table border="1" style={styles.table}>
        <thead>
          <tr style={{backgroundColor: '#f2f2f2'}}>
            <th style={{ padding: '10px' }}>Client Name</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Medium</th>
            <th style={{ padding: '10px' }}>Description</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td style={{ padding: '10px' }}>{r.client_name}</td>
              <td style={{ padding: '10px' }}>${r.client_email}</td>
              <td style={{ padding: '10px' }}>{r.medium}</td>
              <td style={{ padding: '10px' }}>{r.message}</td>
              <td style={{ padding: '10px' }}> <strong>{r.status}</strong> </td>
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
