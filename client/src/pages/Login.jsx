console.log("LOGIN PAGE OPEN");

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // ❌ validation
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // 🔥 get users from localStorage (DATABASE)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    console.log("ALL USERS IN DB:", users);

    // ❌ no users case
    if (users.length === 0) {
      alert("No users found. Please register first.");
      navigate("/register", { replace: true });
      return;
    }

    // 🔥 check credentials
    const validUser = users.find(
      (u) => u.email === email && u.password === password
    );

    console.log("FOUND USER:", validUser);

    if (!validUser) {
      alert("Incorrect email or password");
      return;
    }

    // 💾 save session
    localStorage.setItem("currentUser", JSON.stringify(validUser));

    console.log("LOGIN SUCCESS:", validUser);

    // 🚀 OLD NAVIGATION (THIS WAS YOUR ORIGINAL)
    navigate("/profile", { replace: true });
  };

  return (
    <div className="login-page">

      <form className="login-box" onSubmit={handleLogin}>

        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#38bdf8",
              fontSize: "12px"
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button type="submit">
          Login
        </button>

        <p>
          Create an account?{" "}
          <span
            onClick={() => navigate("/register", { replace: true })}
            style={{ cursor: "pointer", color: "#38bdf8" }}
          >
            Register
          </span>
        </p>

      </form>

    </div>
  );
}

export default Login;