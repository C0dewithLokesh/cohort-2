import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.on("error", (err) => console.error("Redis client error", err));

app.post("/submit", async (req, res) => {
  const { problemId, code, language } = req.body;
  try {
    await client.lPush("submission", JSON.stringify({code, problemId, language})) 
    res.status(200).send("Submission received and stored.")
  } catch (error) {
    console.log("Redis error", error) 
    res.status(500).send("Failed to store the submission.")
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => {
      console.log("Server running at port 3000");
    });
  } catch (error) {
    console.error("Failed to connect Redis", error);
  }
}

startServer();
