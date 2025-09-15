import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
    throw new Error("Database url not defined.");
}

export default defineConfig({
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    out: "./drizzle",
    schema: "./src/database/schema.ts",
});
