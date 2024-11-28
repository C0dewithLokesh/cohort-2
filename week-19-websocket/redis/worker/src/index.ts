import { createClient } from "redis";

const client = createClient();

async function processSubmission(submission: string) {
  const { problemId, code, language } = JSON.parse(submission);
  console.log(problemId, code, language);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Finished processing submission for problemId ${problemId}.`);
}

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis");
    while (true) {
      const submission = await client.brPop("submission", 0);
      await processSubmission(submission.element);
    }
  } catch (error) {
    console.error("error", error);
  }
}

startWorker();
