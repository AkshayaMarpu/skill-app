import SearchBar from "./SearchBar";

function TopBar({ onNavigate, onSearch }) {
  return (
    <div className="top-bar">

      {/* Left */}
      <div className="logo">
        🚀 SkillSwap
      </div>

      {/* Center */}
      <div className="top-search">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Right */}
      <div className="nav-icons">

        <span onClick={() => onNavigate("home")}>🏠</span>

        <span onClick={() => onNavigate("chat")}>💬</span>

        <span onClick={() => onNavigate("meeting")}>📅</span>

        <span onClick={() => onNavigate("notify")}>🔔</span>

        <span onClick={() => onNavigate("account")}>👤</span>

      </div>

    </div>
  );
}

export default TopBar;