import { Bot } from "grammy";
import { config } from "../config.js";
import { registerBotHandlers } from "./handlers.js";
export function createBot() {
    const bot = new Bot(config.botToken);
    registerBotHandlers(bot);
    bot.catch((err) => {
        console.error("Bot error:", err.error);
    });
    return bot;
}
export const BOT_COMMANDS = [
    { command: "start", description: "Запуск бота" },
    { command: "countries", description: "Документы по странам" },
    { command: "documents", description: "Проверка документов AI" },
    { command: "updates", description: "Визовые новости" },
    { command: "consult", description: "Заказать консультацию" },
];
export async function configureBot(bot) {
    await bot.api.setMyCommands([...BOT_COMMANDS]);
    await bot.api.setMyDescription("Pro Visa — AI-проверка визовых документов и консультации экспертов.");
    await bot.api.setMyShortDescription("Визовый помощник: документы за 30 секунд, обновления политики, консультации.");
    const menuButton = {
        type: "web_app",
        text: "Открыть Pro Visa",
        web_app: { url: `${config.webhookBaseUrl}${config.miniAppPath}` },
    };
    await bot.api.setChatMenuButton({ menu_button: menuButton });
}
//# sourceMappingURL=index.js.map