import { Keyboard } from "grammy";
import type { Bot, Context } from "grammy";
export declare function consultContactKeyboard(): Keyboard;
export declare function promptConsult(ctx: Context): Promise<void>;
export declare function registerConsultHandlers(bot: Bot): void;
