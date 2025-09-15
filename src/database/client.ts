import "@dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

if (!process.env.DATABASE_URL) {
    throw new Error("Database url not defined.");
}

export const db = drizzle(process.env.DATABASE_URL);
