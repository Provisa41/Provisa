import type { Bot } from "grammy";
import type { User } from "@grammyjs/types";
import type { TelegramWebAppUser } from "../auth/validateInitData.js";
export type ConsultLeadInput = {
    source: "mini_app" | "bot";
    topic: string;
    user?: TelegramWebAppUser | User;
    phone?: string;
};
export declare function formatConsultLeadMessage(lead: ConsultLeadInput): string;
export declare function sendConsultLead(bot: Bot, lead: ConsultLeadInput): Promise<{
    delivered: boolean;
}>;
