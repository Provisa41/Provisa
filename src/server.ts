import express from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateInitData } from "./auth/validateInitData.js";
import { mockDocumentScore } from "./bot/copy.js";
import { config } from "./config.js";
import { countries, getCountry, getNews } from "./data/visaData.js";
import type { Bot } from "grammy";
import { webhookCallback } from "grammy";

/** On Vercel, bundle includes `public/` at project root (see vercel.json includeFiles) */
const publicDir =
  process.env.VERCEL === "1"
    ? join(process.cwd(), "public")
    : join(dirname(fileURLToPath(import.meta.url)), "..", "public");

export function createServer(bot: Bot): express.Express {
  const app = express();

  app.use(express.json({ limit: "2mb" }));

  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "provisa" });
  });

  app.get("/api/countries", (_req, res) => {
    res.json({
      ok: true,
      countries: countries.map((c) => ({
        id: c.id,
        flag: c.flag,
        name: c.name,
        region: c.region,
        summary: c.summary,
      })),
    });
  });

  app.get("/api/countries/:id", (req, res) => {
    const country = getCountry(req.params.id);
    if (!country) {
      res.status(404).json({ ok: false, error: "country not found" });
      return;
    }
    res.json({ ok: true, country });
  });

  app.get("/api/news", (req, res) => {
    const countryId =
      typeof req.query.country === "string" ? req.query.country : undefined;
    res.json({ ok: true, news: getNews(countryId) });
  });

  app.post(`/${config.webhookSecret}`, webhookCallback(bot, "express"));

  app.post("/api/auth/session", (req, res) => {
    const initData =
      typeof req.body?.initData === "string"
        ? req.body.initData
        : req.headers["x-telegram-init-data"];

    if (typeof initData !== "string" || !initData) {
      res.status(400).json({ ok: false, error: "initData required" });
      return;
    }

    try {
      const data = validateInitData(initData, config.botToken);
      res.json({
        ok: true,
        user: data.user,
        start_param: data.start_param,
        auth_date: data.auth_date,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "validation failed";
      res.status(401).json({ ok: false, error: message });
    }
  });

  app.post("/api/documents/check", (req, res) => {
    const initData =
      typeof req.body?.initData === "string"
        ? req.body.initData
        : req.headers["x-telegram-init-data"];

    if (typeof initData !== "string" || !initData) {
      res.status(400).json({ ok: false, error: "initData required" });
      return;
    }

    try {
      validateInitData(initData, config.botToken);
    } catch (err) {
      const message = err instanceof Error ? err.message : "validation failed";
      res.status(401).json({ ok: false, error: message });
      return;
    }

    const fileName =
      typeof req.body?.fileName === "string" ? req.body.fileName : "document.pdf";
    const result = mockDocumentScore(fileName);
    res.json({ ok: true, ...result, demo: true });
  });

  app.post("/api/consult/request", (req, res) => {
    const initData =
      typeof req.body?.initData === "string"
        ? req.body.initData
        : req.headers["x-telegram-init-data"];

    if (typeof initData !== "string" || !initData) {
      res.status(400).json({ ok: false, error: "initData required" });
      return;
    }

    try {
      const data = validateInitData(initData, config.botToken);
      const topic =
        typeof req.body?.topic === "string" ? req.body.topic.slice(0, 500) : "";
      res.json({
        ok: true,
        demo: true,
        message: "Заявка принята (MVP). Эксперт свяжется с вами в Telegram.",
        userId: data.user?.id,
        topic,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "validation failed";
      res.status(401).json({ ok: false, error: message });
    }
  });

  const miniAppPath = config.miniAppPath.replace(/\/$/, "") || "/app";
  app.use(miniAppPath, express.static(publicDir));
  app.get(miniAppPath, (_req, res) => {
    res.sendFile(join(publicDir, "index.html"));
  });

  return app;
}
