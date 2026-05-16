import { InlineKeyboard, Keyboard } from "grammy";
export declare function mainReplyKeyboard(): Keyboard;
export declare function welcomeInlineKeyboard(botUsername?: string): InlineKeyboard;
export declare function sectionInlineKeyboard(section: "documents" | "updates" | "consult" | "countries"): InlineKeyboard;
