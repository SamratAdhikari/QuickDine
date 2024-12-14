// components/ChatBot.js
import { useState } from "react";
import "./ChatBot.css";

export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return; // Don't send if input is empty

        setMessages([...messages, { role: "user", content: input }]); // Add user message
        setLoading(true);
        setInput("");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            if (data.message) {
                setMessages([
                    ...messages,
                    { role: "user", content: input },
                    { role: "assistant", content: data.message },
                ]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={
                            msg.role === "user"
                                ? "user-message"
                                : "assistant-message"
                        }
                    >
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? "..." : "Send"}
                </button>
            </div>
        </div>
    );
}
