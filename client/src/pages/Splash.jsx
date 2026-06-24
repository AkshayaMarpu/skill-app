import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // check login session
        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (user) {
          navigate("/home", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        // fallback safety
        navigate("/login", { replace: true });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="logo-container">

        {/* FULL ORIGINAL SVG - DO NOT CHANGE */}
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">

          <defs>
            <linearGradient id="grad1">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            <linearGradient id="grad2">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            <radialGradient id="bgGrad">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* BACKGROUND CIRCLE */}
          <circle cx="100" cy="100" r="90" fill="url(#bgGrad)" />

          {/* OUTER RING */}
          <circle cx="100" cy="100" r="60" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />

          {/* CORE DESIGN */}
          <g className="glow-pulse">
            <path d="M60 75 C60 50,95 40,125 58 L118 48"
              stroke="url(#grad1)" strokeWidth="8" fill="none" strokeLinecap="round"
            />

            <path d="M125 58 L125 70"
              stroke="url(#grad1)" strokeWidth="8"
            />

            <path d="M140 125 C140 150,105 160,75 142 L82 152"
              stroke="url(#grad2)" strokeWidth="8" fill="none" strokeLinecap="round"
            />

            <path d="M75 142 L75 130"
              stroke="url(#grad2)" strokeWidth="8"
            />
          </g>

          {/* ORBIT BALLS */}
          <g className="orbit-ring">
            <circle cx="100" cy="30" r="5" fill="#0d9488" />
            <circle cx="100" cy="170" r="5" fill="#f97316" />
          </g>

          <g className="orbit-ring-reverse">
            <circle cx="30" cy="100" r="4" fill="#06b6d4" />
            <circle cx="170" cy="100" r="4" fill="#eab308" />
          </g>

          {/* CENTER */}
          <circle cx="100" cy="100" r="14" fill="#0f172a" />
          <path d="M94 100 L100 94 L106 100 L100 106 Z" fill="#06b6d4" />

        </svg>

        <h1 className="brand-title">Skill Swap</h1>
        <p className="tagline">Exchange Skills. Grow Together.</p>

      </div>
    </div>
  );
}

export default Splash;