import express from "express";
import { createClient } from "redis";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const client = createClient();
client.on("error", (err) => console.error("Redis client error", err));

const pubsubClient = client.duplicate();
pubsubClient.on("error", (err) =>
  console.error("Redis Pub/Sub client error", err),
);

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("New WebSocket Connected");

  ws.on("message", async (message) => {
    try {
      const userMessage: { userId: string } = JSON.parse(message.toString());

      console.log(`Subscribing to user channel: ${userMessage.userId}`);
      await pubsubClient.subscribe(userMessage.userId, (msg) => {
        ws.send(`Message for user ${userMessage.userId}: ${msg}`);
      });

      ws.send("You are now subscribed to updates for your user.");
    } catch (error) {
      console.error("Failed to handle message:", error);
      ws.send("Error: Invalid message format.");
    }
  });

  ws.send("Hello from WebSocket server!");
});

pubsubClient.on("message", (channel, msg) => {
  console.log("Received message from Redis:", channel, msg);
});

app.post("/submit", async (req, res) => {
  const { problemId, code, language, userId } = req.body;

  try {
    await client.lPush(
      "submission",
      JSON.stringify({ code, problemId, language, userId }),
    );

    res.status(200).send("Submission received and stored.");
  } catch (error) {
    console.log("Redis error", error);
    res.status(500).send("Failed to store the submission.");
  }
});

async function startServer() {
  try {
    await client.connect();
    await pubsubClient.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => {
      console.log("Server running at port 3000");
    });
  } catch (error) {
    console.error("Failed to connect Redis", error);
  }
}

startServer();
