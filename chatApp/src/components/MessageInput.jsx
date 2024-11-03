import React, { useState } from "react";

const MessageInput = ({ onSend, onTyping }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
    onTyping();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(message, () => setMessage(""));
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
