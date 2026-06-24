import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();

    window.addEventListener("storage", loadNotifications);

    return () =>
      window.removeEventListener("storage", loadNotifications);
  }, []);

  const loadNotifications = () => {
    const data =
      JSON.parse(localStorage.getItem("notifications")) || [];

    setNotifications([...data].reverse());
  };

  const clearNotifications = () => {
    localStorage.removeItem("notifications");
    setNotifications([]);
  };

  return (
    <div className="notify-page">

      <div className="notify-bg"></div>
      <div className="notify-bg2"></div>

      <div className="notify-header">

        <h1>🔔 Notifications</h1>

        <p>
          Accepts, Rejects, Skill Matches &
          Chat Updates
        </p>

        {notifications.length > 0 && (
          <button
            className="clear-btn"
            onClick={clearNotifications}
          >
            Clear All
          </button>
        )}

      </div>

      {notifications.length === 0 ? (

        <div className="empty-state">
          🚀 No Notifications Yet
        </div>

      ) : (

        <div className="notify-list">

          {notifications.map((n, i) => (

            <div
              key={i}
              className={`notify-card ${n.type}`}
            >

              <div className="notify-icon">

                {n.type === "accept" && "✅"}

                {n.type === "reject" && "❌"}

                {n.type === "match" && "🎯"}

                {n.type === "chat" && "💬"}

              </div>

              <div className="notify-content">

                <h3>

                  {n.type === "accept" &&
                    "Request Accepted"}

                  {n.type === "reject" &&
                    "Request Rejected"}

                  {n.type === "match" &&
                    "Skill Match Found"}

                  {n.type === "chat" &&
                    "New Chat Message"}

                </h3>

                <p>
                  <strong>User:</strong>{" "}
                  {n.user}
                </p>

                {n.email && (
                  <p>
                    <strong>Email:</strong>{" "}
                    {n.email}
                  </p>
                )}

                {n.skills?.length > 0 && (
                  <p>
                    <strong>Skills:</strong>{" "}
                    {n.skills.join(", ")}
                  </p>
                )}

                {n.wanted?.length > 0 && (
                  <p>
                    <strong>Required:</strong>{" "}
                    {n.wanted.join(", ")}
                  </p>
                )}

                <span className="notify-time">
                  ⏱ {n.time}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}