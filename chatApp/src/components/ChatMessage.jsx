// src/components/ChatMessage.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { auth } from "../firebase";

const ChatMessage = ({ message, onEdit, onDelete }) => {
  const isSender = message.user === auth.currentUser.email;

  return (
    <div className={`message ${isSender ? "sent" : "received"}`}>
      <div className="message-content">
        <p>
          <strong>{message.user}</strong>: {message.text}
        </p>
      </div>
      {isSender && (
        <div className="message-actions">
          <FaEdit onClick={() => onEdit(message.id)} className="action-icon" />
          <FaTrash
            onClick={() => onDelete(message.id)}
            className="action-icon"
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
