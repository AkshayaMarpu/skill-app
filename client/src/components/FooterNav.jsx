function FooterNav({ onNavigate }) {
  return (
    <div className="footer-nav">

      <div
        className="nav-item"
        onClick={() => onNavigate("home")}
      >
        <span className="icon">🏠</span>
        <small>Home</small>
      </div>

      <div
        className="nav-item"
        onClick={() => onNavigate("chat")}
      >
        <span className="icon">💬</span>
        <small>Chat</small>
      </div>

      <div
        className="nav-item"
        onClick={() => onNavigate("meeting")}
      >
        <span className="icon">📅</span>
        <small>Meeting</small>
      </div>

      <div
        className="nav-item notify"
        onClick={() => onNavigate("notify")}
      >
        <span className="icon">🔔</span>
        <span className="badge">3</span>
        <small>Notify</small>
      </div>

      <div
        className="nav-item"
        onClick={() => onNavigate("account")}
      >
        <span className="icon">👤</span>
        <small>Account</small>
      </div>

    </div>
  );
}

export default FooterNav;