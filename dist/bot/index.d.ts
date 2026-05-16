import { Bot } from "grammy";
export declare function createBot(): Bot;
export declare const BOT_COMMANDS: readonly [{
    readonly command: "start";
    readonly description: "Запуск бота";
}, {
    readonly command: "countries";
    readonly description: "Документы по странам";
}, {
    readonly command: "documents";
    readonly description: "Проверка документов AI";
}, {
    readonly command: "updates";
    readonly description: "Визовые новости";
}, {
    readonly command: "consult";
    readonly description: "Заказать консультацию";
}];
export declare function configureBot(bot: Bot): Promise<void>;
