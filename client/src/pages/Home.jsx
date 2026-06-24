import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* TOP HEADER */}
      <header className="top-header">

        {/* LEFT LOGO */}
        <div className="logo">
          Skill Swap
        </div>

        {/* RIGHT BUTTONS */}
        <div className="auth-buttons">

          {/* LOGIN BUTTON */}
          <button onClick={() => navigate("/login")}>
            Login
          </button>

          {/* REGISTER BUTTON */}
          <button onClick={() => navigate("/register")}>
            Register
          </button>

        </div>

      </header>

      {/* CENTER CONTENT */}
      <main className="center-content">

        <h1>Exchange Skills, Build Your Future</h1>

        <p>Learn. Share. Grow Together.</p>

      </main>

    </div>
  );
}

export default Home;