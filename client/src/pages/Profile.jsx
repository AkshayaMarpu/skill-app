import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [search, setSearch] = useState("");

  const [skills, setSkills] = useState([]);
  const [wanted, setWanted] = useState([]);

  const [newSkill, setNewSkill] = useState("");
  const [newWanted, setNewWanted] = useState("");

  const [profilePic, setProfilePic] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [notificationSetting, setNotificationSetting] = useState(true);

  const [active, setActive] = useState("dashboard");

  // 🔥 NEW STATES FOR SEARCH
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const me = JSON.parse(localStorage.getItem("currentUser"));
    if (!me) return;

    setUser(me);
    setEditName(me.name);

    setSkills(JSON.parse(localStorage.getItem("skills_" + me.email)) || []);
    setWanted(JSON.parse(localStorage.getItem("wanted_" + me.email)) || []);

    setProfilePic(localStorage.getItem("profile_" + me.email) || "");
    setDarkMode(localStorage.getItem("theme") === "dark");

    setNotificationSetting(
      localStorage.getItem("notificationSetting") !== "false"
    );

    // 🔥 LOAD ALL USERS
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setAllUsers(users);
    setFilteredUsers(users);
  }, []);

  // 🔥 SEARCH FUNCTION
  const handleSearch = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setFilteredUsers(allUsers);
      return;
    }

    const filtered = allUsers.filter((u) =>
      (u.name + " " + (u.skills || []).join(" "))
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const saveProfile = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, name: editName } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedCurrentUser = { ...user, name: editName };

    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    setUser(updatedCurrentUser);

    alert("Profile Updated");
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;

    const updated = [...skills, newSkill];

    setSkills(updated);

    localStorage.setItem("skills_" + user.email, JSON.stringify(updated));

    setNewSkill("");
  };

  const addWanted = () => {
    if (!newWanted.trim()) return;

    const updated = [...wanted, newWanted];

    setWanted(updated);

    localStorage.setItem("wanted_" + user.email, JSON.stringify(updated));

    setNewWanted("");
  };

  const deleteSkill = (skill) => {
    const updated = skills.filter((s) => s !== skill);

    setSkills(updated);

    localStorage.setItem("skills_" + user.email, JSON.stringify(updated));
  };

  const deleteWanted = (skill) => {
    const updated = wanted.filter((s) => s !== skill);

    setWanted(updated);

    localStorage.setItem("wanted_" + user.email, JSON.stringify(updated));
  };

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProfilePic(reader.result);

      localStorage.setItem("profile_" + user.email, reader.result);
    };

    reader.readAsDataURL(file);
  };

  const toggleTheme = () => {
    const value = !darkMode;

    setDarkMode(value);

    localStorage.setItem("theme", value ? "dark" : "light");
  };

  const toggleNotifications = () => {
    const value = !notificationSetting;

    setNotificationSetting(value);

    localStorage.setItem("notificationSetting", value);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🚀 SkillSwap</h2>

        <button onClick={() => setActive("dashboard")}>🏠 Dashboard</button>
        <button onClick={() => navigate("/users")}>👥 Users</button>
        <button onClick={() => navigate("/chat")}>💬 Chat</button>
        <button onClick={() => navigate("/meeting")}>📅 Meeting</button>
        <button onClick={() => navigate("/notifications")}>🔔 Notifications</button>
        <button onClick={() => setActive("account")}>👤 Account</button>
        <button onClick={logout}>🚪 Logout</button>
      </div>

      {/* MAIN */}
      <div className="main-content">

        {/* DASHBOARD + SEARCH */}
        {active === "dashboard" && (
          <div className="dashboard-home">

            <h1 className="welcome">
              Welcome {user?.name}
            </h1>

            {/* SEARCH */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search users or skills..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* RESULTS */}
            <div className="user-results">

              {filteredUsers.length === 0 ? (
                <p>No users found</p>
              ) : (
                filteredUsers.map((u, i) => (
                  <div key={i} className="user-card">

                    <h3>{u.name}</h3>
                    <p>{u.email}</p>

                    <p>
                      Skills:{" "}
                      {u.skills && u.skills.length > 0
                        ? u.skills.join(", ")
                        : "No skills"}
                    </p>

                    <button onClick={() => navigate("/chat/" + u.email)}>
                      Chat
                    </button>

                  </div>
                ))
              )}

            </div>

          </div>
        )}

        {/* ACCOUNT SECTION */}
        {active === "account" && (
          <>
            <div className="profile-card">

              <img
                src={
                  profilePic ||
                  "https://via.placeholder.com/150"
                }
                className="profile-image"
                alt=""
              />

              <input type="file" accept="image/*" onChange={uploadPhoto} />

              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <button onClick={saveProfile}>Save Profile</button>

              <p>{user?.email}</p>

            </div>

            <div className="skills-section">
              <h2>My Skills</h2>

              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add Skill"
              />

              <button onClick={addSkill}>Add</button>

              {skills.map((skill, i) => (
                <div key={i}>
                  {skill}
                  <button onClick={() => deleteSkill(skill)}>❌</button>
                </div>
              ))}
            </div>

            <div className="skills-section">
              <h2>Required Skills</h2>

              <input
                value={newWanted}
                onChange={(e) => setNewWanted(e.target.value)}
                placeholder="Add Required Skill"
              />

              <button onClick={addWanted}>Add</button>

              {wanted.map((skill, i) => (
                <div key={i}>
                  {skill}
                  <button onClick={() => deleteWanted(skill)}>❌</button>
                </div>
              ))}
            </div>

            <div className="settings-card">
              <h2>Settings</h2>

              <button onClick={toggleTheme}>
                Theme: {darkMode ? "Dark" : "Light"}
              </button>

              <button onClick={toggleNotifications}>
                Notifications: {notificationSetting ? "ON" : "OFF"}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default ProfileDashboard;