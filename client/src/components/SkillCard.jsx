import { useState } from "react";

function SkillCard({ user }) {

  const [showDetails, setShowDetails] = useState(false);

  const handleDecision = (status) => {

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.push({
      name: user.name,
      email: user.email,
      status,
      time: new Date().toLocaleString()
    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

    setShowDetails(false);

    alert(`Request ${status}`);
  };

  return (
    <>
      <div
        className="user-request-card"
        onClick={() => setShowDetails(true)}
      >
        <h3>👤 {user.name}</h3>

        <p>
          <b>Skills:</b>
          {" "}
          {user.skills?.join(", ")}
        </p>

        <p>
          <b>Wanted:</b>
          {" "}
          {user.wanted?.join(", ")}
        </p>
      </div>

      {showDetails && (
        <div className="popup-overlay">

          <div className="details-popup">

            <h2>{user.name}</h2>

            <p>{user.email}</p>

            <p>
              <strong>Skills:</strong>
              {" "}
              {user.skills?.join(", ")}
            </p>

            <p>
              <strong>Wanted Skills:</strong>
              {" "}
              {user.wanted?.join(", ")}
            </p>

            <div className="action-buttons">

              <button
                className="accept-btn"
                onClick={() =>
                  handleDecision("Accepted")
                }
              >
                Accept
              </button>

              <button
                className="reject-btn"
                onClick={() =>
                  handleDecision("Rejected")
                }
              >
                Reject
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default SkillCard;