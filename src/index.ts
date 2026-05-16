import { getApp } from "./app.js";
import { config, webhookUrl } from "./config.js";
import { createBot, configureBot } from "./bot/index.js";

async function main(): Promise<void> {
  const bot = createBot();
  if (config.isDev) {
    console.warn("Dev mode: skipping Telegram bot profile setup");
  } else {
    await configureBot(bot);
  }

  const app = getApp();

  const server = app.listen(config.port, async () => {
    const url = webhookUrl();
    const miniApp = `${config.webhookBaseUrl}${config.miniAppPath}`;
    console.log(`Pro Visa listening on http://localhost:${config.port}`);
    console.log(`Mini App (browser): http://localhost:${config.port}${config.miniAppPath}`);
    console.log(`Health: http://localhost:${config.port}/health`);

    if (config.isDev) {
      console.warn("Dev mode: webhook not registered (use public HTTPS for Telegram)");
      console.log("✅ Starting bot in polling mode...");
      
      setTimeout(() => {
        bot.start({
          onStart: (botInfo) => {
            console.log(`✅ Bot @${botInfo.username} polling started - ready to receive messages!`);
          },
        }).catch((err) => {
          console.error("Polling error:", err);
        });
      }, 1000);
      
      return;
    }

    try {
      await bot.api.setWebhook(url, {
        allowed_updates: ["message", "callback_query", "inline_query"],
        drop_pending_updates: false,
      });
      console.log(`Webhook: ${url}`);
      console.log(`Mini App (Telegram): ${miniApp}`);
    } catch (err) {
      console.warn("Webhook not set:", err);
    }
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});