// src/components/MessageInput.jsx
import React, { useState } from "react";

const MessageInput = ({ onSend, onTyping }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          onTyping();
        }}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
