import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Chat() {
  const { id } = useParams();
  const chatKey = id ? `chat_${id}` : "chat_general";

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(chatKey)) || [
      { from: "system", text: "👋 New chat started" },
    ];
    setMessages(saved);
  }, [chatKey]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = { from: "me", text };
    const updated = [...messages, msg];

    setMessages(updated);
    localStorage.setItem(chatKey, JSON.stringify(updated));

    // auto meeting detect
    if (text.includes("http")) {
      const meetings = JSON.parse(localStorage.getItem("meetings")) || [];
      localStorage.setItem("meetings", JSON.stringify([...meetings, text]));
    }

    setText("");
  };

  return (
    <div className="chat-wrapper">

      <div className="chat-header">
        💬 Chat {id ? `User ${id}` : ""}
      </div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>➤</button>
      </div>

    </div>
  );
}

export default Chat;