import type { Express } from "express";
import { createBot } from "./bot/index.js";
import { createServer } from "./server.js";

let app: Express | undefined;

/** Shared Express app for local server and Vercel serverless */
export function getApp(): Express {
  if (!app) {
    const bot = createBot();
    app = createServer(bot);
  }
  return app;
}
