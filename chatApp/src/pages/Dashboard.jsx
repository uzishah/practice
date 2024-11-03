import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import MessageInput from "../components/MessageInput";
import ChatMessage from "../components/ChatMessage";
import TypingIndicator from "../components/TypingIndicator";
import "../index.css";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessages(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (messageContent, clearInput) => {
    if (!messageContent.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: messageContent, // Message content
        user: auth.currentUser.email, // Authenticated user's email
        timestamp: serverTimestamp(),
      });

      clearInput();
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleTyping = () => {
    setTyping(true);
    setTimeout(() => setTyping(false), 2000); // Keep typing for 2 seconds
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Group Chat
        <button onClick={() => auth.signOut()} className="logout-button">
          Logout
        </button>
      </div>

      <div className="chat-content">
        {typing && <TypingIndicator />}
        <div className="chat-box">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </div>
      <MessageInput onSend={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
};

export default Dashboard;
