import { useState, useEffect } from "react";

function Meeting() {
  const [link, setLink] = useState("");
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("meetings")) || [];
    setMeetings(saved);
  }, []);

  const addMeeting = () => {
    if (!link.trim()) return;

    const updated = [...meetings, link];
    setMeetings(updated);
    localStorage.setItem("meetings", JSON.stringify(updated));
    setLink("");
  };

  return (
    <div className="meeting-wrapper">

      <h2 className="title">📅 Meetings</h2>

      <div className="meeting-input">
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste meeting link..."
        />
        <button onClick={addMeeting}>Add</button>
      </div>

      <div className="meeting-grid">
        {meetings.length === 0 ? (
          <p className="empty">No meetings yet</p>
        ) : (
          meetings.map((m, i) => (
            <a key={i} href={m} target="_blank" className="meeting-card">
              🔗 Meeting {i + 1}
            </a>
          ))
        )}
      </div>

    </div>
  );
}

export default Meeting;