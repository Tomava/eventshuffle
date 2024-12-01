import { config } from "dotenv";

config();

export const CONFIG = {
  PORT: process.env.PORT || 3000,
  ENVIRONMENT: process.env.ENVIRONMENT || "dev",
};

export const DB_CONFIG = {
  DB_USER: process.env.DB_USER || "db_user",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB: process.env.DB || "db",
  DB_PASSWORD:
    process.env.DB_PASSWORD || "grY3ANahkuXxUqRT8nztVHKDsjEL7cb2JB4MyepP",
  DB_PORT: Number(process.env.DB_PORT) || 5431,
  EVENTS_TABLE: "events",
  VOTES_TABLE: "votes",
};
