/**
 * Run once after deploy: registers webhook and bot menu (BotFather commands still manual once).
 * Usage: npm run setup-telegram
 */
import "dotenv/config";
import { Bot } from "grammy";
import { config, webhookUrl } from "../src/config.js";
import { configureBot } from "../src/bot/index.js";

const bot = new Bot(config.botToken);

await configureBot(bot);
const url = webhookUrl();
await bot.api.setWebhook(url, {
  allowed_updates: ["message", "callback_query", "inline_query"],
});
console.log("OK: bot profile + webhook");
console.log("Webhook:", url);
console.log("Mini App:", `${config.webhookBaseUrl}${config.miniAppPath}`);
