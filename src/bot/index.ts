import { Bot } from "grammy";
import { config } from "../config.js";
import { registerBotHandlers } from "./handlers.js";
import { mainReplyKeyboard } from "./keyboards.js";

export function createBot(): Bot {
  const bot = new Bot(config.botToken);
  registerBotHandlers(bot);

  bot.catch((err) => {
    console.error("Bot error:", err.error);
  });

  return bot;
}

export const BOT_COMMANDS = [
  { command: "start", description: "Запуск бота" },
  { command: "documents", description: "Загрузка и проверка документов" },
  { command: "updates", description: "Изменения визовой политики" },
  { command: "consult", description: "Заказать консультацию" },
] as const;

export async function configureBot(bot: Bot): Promise<void> {
  await bot.api.setMyCommands([...BOT_COMMANDS]);
  await bot.api.setMyDescription(
    "Pro Visa — AI-проверка визовых документов и консультации экспертов.",
  );
  await bot.api.setMyShortDescription(
    "Визовый помощник: документы за 30 секунд, обновления политики, консультации.",
  );

  const menuButton = {
    type: "web_app" as const,
    text: "Открыть Pro Visa",
    web_app: { url: `${config.webhookBaseUrl}${config.miniAppPath}` },
  };
  await bot.api.setChatMenuButton({ menu_button: menuButton });
}
