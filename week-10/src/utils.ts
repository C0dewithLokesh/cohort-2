import { Client } from "pg";

export async function getClient() {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "pass123",
    database: "postgres",
    port: 5432,
  });
  await client.connect();
  return client;
}
