import { createClient } from "redis";

const client = createClient();
const pubsubClient = client.duplicate();

async function processSubmission(submission: string) {
  try {
    const { problemId, code, language, userId } = JSON.parse(submission);
    console.log(problemId, code, language, userId);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate task processing
    console.log(`Finished processing submission for problemId ${problemId}.`);

    // Publish result to the specific user's Redis channel
    await pubsubClient.publish(
      userId,
      JSON.stringify({ problemId, status: "TLE" }),
    );
  } catch (err) {
    console.error("Worker Process", err);
  }
}

async function startWorker() {
  try {
    await client.connect();
    await pubsubClient.connect();
    console.log("Worker connected to Redis");

    while (true) {
      const submission = await client.brPop("submission", 0);
      await processSubmission(submission.element);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

startWorker();
