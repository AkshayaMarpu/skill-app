import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [blast, setBlast] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // validation
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check duplicate email
    const exists = users.find((u) => u.email === email);

    if (exists) {
      alert("User already exists. Please login.");
      navigate("/login", { replace: true });
      return;
    }

    // NEW USER OBJECT (PASSWORD INCLUDED)
    const newUser = {
      name,
      email,
      password, // ✅ THIS IS SAVED IN DB (localStorage)
    };

    // push into DB
    users.push(newUser);

    // SAVE TO DATABASE (localStorage)
    localStorage.setItem("users", JSON.stringify(users));

    console.log("REGISTERED USERS DB:", users);

    // set current session user
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setBlast(true);

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1200);
  };

  return (
    <div className="login-page">

      {blast && (
        <div className="success-blast">
          🎉 Account Created Successfully!
        </div>
      )}

      <form className="login-box" onSubmit={handleRegister}>

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>

        <p>
          Already have account?{" "}
          <span
            onClick={() => navigate("/login", { replace: true })}
            style={{ cursor: "pointer", color: "#38bdf8" }}
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
}

export default Register;