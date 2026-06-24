import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const me = JSON.parse(localStorage.getItem("currentUser"));

    if (!me) return;

    const mySkills =
      JSON.parse(localStorage.getItem("skills_" + me.email)) || [];

    const myWanted =
      JSON.parse(localStorage.getItem("wanted_" + me.email)) || [];

    setCurrentUser({
      ...me,
      skills: mySkills,
      wanted: myWanted,
    });

    const registeredUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const formattedUsers = registeredUsers
      .filter((u) => u.email !== me.email)
      .map((u, index) => ({
        id: index + 1,
        name: u.name,
        email: u.email,
        skills:
          JSON.parse(
            localStorage.getItem("skills_" + u.email)
          ) || [],
        wanted:
          JSON.parse(
            localStorage.getItem("wanted_" + u.email)
          ) || [],
      }));

    setUsers(formattedUsers);
  }, []);

  // Skill Match Logic
  const isMatch = (u) => {
    if (!currentUser) return false;

    return (
      u.skills.some((s) =>
        currentUser.wanted.includes(s)
      ) ||
      currentUser.skills.some((s) =>
        u.wanted.includes(s)
      )
    );
  };

  // Notification Save
  const addNotification = (type, user) => {
    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.push({
      type,
      user: user.name,
      email: user.email,
      skills: user.skills,
      wanted: user.wanted,
      time: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

    alert(
      `${user.name} ${
        type === "accept"
          ? "accepted"
          : "rejected"
      } successfully`
    );
  };

  const acceptUser = (user) => {
    addNotification("accept", user);
  };

  const rejectUser = (user) => {
    addNotification("reject", user);
  };

  return (
    <div className="users-page">

      <div className="users-header">
        <h1>👥 Skill Match Users</h1>
        <p>
          Find people whose skills match
          your requirements
        </p>
      </div>

      {users.length === 0 ? (
        <div className="empty-users">
          No users found
        </div>
      ) : (
        <div className="users-grid">

          {users.map((u) => (

            <div
              key={u.id}
              className={`user-card ${
                isMatch(u) ? "matched" : ""
              }`}
            >

              <div className="card-glow"></div>

              <div className="user-top">

                <div className="avatar">
                  {u.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2>{u.name}</h2>
                  <p>{u.email}</p>
                </div>

              </div>

              {isMatch(u) && (
                <div className="match-badge">
                  🎯 Skill Match
                </div>
              )}

              <div className="skill-section">

                <h4>💡 Skills</h4>

                <div className="tags">
                  {u.skills.length > 0 ? (
                    u.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="skill-tag"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span>No Skills</span>
                  )}
                </div>

              </div>

              <div className="skill-section">

                <h4>🎯 Required Skills</h4>

                <div className="tags">
                  {u.wanted.length > 0 ? (
                    u.wanted.map((skill, i) => (
                      <span
                        key={i}
                        className="wanted-tag"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span>No Requirements</span>
                  )}
                </div>

              </div>

              <div className="actions">

                <button
                  className="chat-btn"
                  onClick={() =>
                    navigate(`/chat/${u.id}`)
                  }
                >
                  💬 Chat
                </button>

                <button
                  className="accept"
                  onClick={() =>
                    acceptUser(u)
                  }
                >
                  ✅ Accept
                </button>

                <button
                  className="reject"
                  onClick={() =>
                    rejectUser(u)
                  }
                >
                  ❌ Reject
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Users;