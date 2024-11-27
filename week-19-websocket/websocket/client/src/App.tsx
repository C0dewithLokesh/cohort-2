import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<string[] | []>([]);
  const [formData, setFormData] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws:localhost:8080");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log("Received message: ", message.data);
      setMessages((prevData) => [...prevData, message.data]);
    };

    return () => {
      socket.close();
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
        onClick={() => {
          socket.send(formData);
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
