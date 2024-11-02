// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase"; // Adjust path as necessary
import { collection, onSnapshot, addDoc } from "firebase/firestore";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    // Listen for messages in Firestore
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sort messages by timestamp
      setMessages(messagesArray.sort((a, b) => a.timestamp - b.timestamp));
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messageText.trim() === "") return; // Prevent empty messages

    // Add message to Firestore
    await addDoc(collection(db, "messages"), {
      text: messageText,
      user: auth.currentUser.email, // Assuming you use email for user identification
      timestamp: new Date(),
    });

    setMessageText(""); // Clear input field after sending
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Dashboard;
