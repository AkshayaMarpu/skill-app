import { useState } from "react";

function Requests() {
  const [requests, setRequests] = useState([
    { id: 1, from: "John", status: "pending" },
    { id: 2, from: "Emma", status: "pending" },
  ]);

  const accept = (id) => {
    setRequests(requests.map(r =>
      r.id === id ? { ...r, status: "accepted" } : r
    ));
  };

  const reject = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div className="card">
      <h2>📩 Requests</h2>

      {requests.map((r) => (
        <div key={r.id} className="card">
          <p>{r.from}</p>
          <p>Status: {r.status}</p>

          <button className="btn" onClick={() => accept(r.id)}>
            Accept
          </button>

          <button className="btn" onClick={() => reject(r.id)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default Requests;