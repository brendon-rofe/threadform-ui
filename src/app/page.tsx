"use client";

import { useState, useRef, useEffect } from "react";

const mockConversations = [
  { id: 1, name: "Conversation 1" },
  { id: 2, name: "Conversation 2" },
  { id: 3, name: "Conversation 3" },
];

export default function Home() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messages, setMessages] = useState([
    { role: "system", content: "Welcome to the chat!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
    ]);
    setInput("");
  };

  const handleSelectConversation = (id: number) => {
    setSelectedConversation(id);
    // In a real app, you would load messages for the selected conversation here
    setMessages([
      { role: "system", content: `Welcome to ${conversations.find(c => c.id === id)?.name}!` },
    ]);
  };

  return (
    <div className="main-layout">
      <aside className="side-panel">
        <div className="side-panel-header">Conversations</div>
        <ul className="conversation-list">
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className={`conversation-item${selectedConversation === conv.id ? " selected" : ""}`}
              onClick={() => handleSelectConversation(conv.id)}
            >
              {conv.name}
            </li>
          ))}
        </ul>
      </aside>
      <div className="chat-container dark">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.role === "user" ? "user" : "system"}`}
            >
              <span>{msg.content}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-input" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <style jsx>{`
        .main-layout {
          display: flex;
          height: 100vh;
          background: #18181b;
        }
        .side-panel {
          width: 240px;
          background: #1e1e23;
          border-right: 1px solid #23272f;
          display: flex;
          flex-direction: column;
        }
        .side-panel-header {
          padding: 20px;
          font-size: 1.2rem;
          font-weight: bold;
          color: #e5e7eb;
          border-bottom: 1px solid #23272f;
        }
        .conversation-list {
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          overflow-y: auto;
        }
        .conversation-item {
          padding: 16px 20px;
          color: #a1a1aa;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .conversation-item.selected, .conversation-item:hover {
          background: #27272a;
          color: #fff;
        }
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 80vh;
          max-width: 600px;
          margin: 40px auto;
          border: 1px solid #23272f;
          border-radius: 8px;
          background: #18181b;
          box-shadow: 0 2px 8px rgba(0,0,0,0.24);
          flex: 1;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }
        .chat-message {
          margin-bottom: 16px;
          padding: 12px 16px;
          border-radius: 8px;
          max-width: 80%;
          word-break: break-word;
          color: #e5e7eb;
        }
        .chat-message.user {
          background: #3730a3;
          align-self: flex-end;
        }
        .chat-message.system {
          background: #27272a;
          align-self: flex-start;
        }
        .chat-input {
          display: flex;
          border-top: 1px solid #23272f;
          padding: 16px;
          background: #18181b;
        }
        .chat-input input {
          flex: 1;
          padding: 10px;
          border: 1px solid #23272f;
          border-radius: 6px;
          margin-right: 8px;
          background: #27272a;
          color: #e5e7eb;
        }
        .chat-input input::placeholder {
          color: #a1a1aa;
        }
        .chat-input button {
          padding: 10px 20px;
          background: #6366f1;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .chat-input button:hover {
          background: #4f46e5;
        }
      `}</style>
    </div>
  );
}
