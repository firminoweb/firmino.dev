import { defineConfig } from "drizzle-kit";

// drizzle-kit não lê o .env.local sozinho; assim `yarn db:migrate` usa a mesma DATABASE_URL do app
try {
  process.loadEnvFile(".env.local");
} catch {
  /* sem .env.local: usa a DATABASE_URL do ambiente */
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
