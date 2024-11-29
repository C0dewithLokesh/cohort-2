import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<string[] | []>([]);
  const [formData, setFormData] = useState("");
  const userId = (Math.floor(Math.random() * 100) + 1).toString();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);

      socket.send(JSON.stringify({ userId }));
    };
    socket.onmessage = (message) => {
      console.log("Received message: ", message.data);
      setMessages((prevData) => [...prevData, message.data]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  if (!socket) return <div>Loading ...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <input
        onChange={(e) => setFormData(e.currentTarget.value)}
        value={formData}
      />
      <button
        onClick={async () => {
          fetch("http://localhost:3000/submit/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              problemId: "1",
              code: "asdfasdfa",
              language: "js",
            }),
          });
          setFormData("");
        }}
      >
        Send Messge
      </button>

      <div
        style={{
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        Messages:-
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
