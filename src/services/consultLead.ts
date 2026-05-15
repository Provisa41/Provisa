import type { Bot } from "grammy";
import type { User } from "@grammyjs/types";
import { config } from "../config.js";
import type { TelegramWebAppUser } from "../auth/validateInitData.js";

export type ConsultLeadInput = {
  source: "mini_app" | "bot";
  topic: string;
  user?: TelegramWebAppUser | User;
  phone?: string;
};

function formatUserLine(user?: TelegramWebAppUser | User): string {
  if (!user) return "Пользователь: неизвестен";
  const id = user.id;
  const name = [user.first_name, "last_name" in user ? user.last_name : undefined]
    .filter(Boolean)
    .join(" ");
  const username = "username" in user && user.username ? `@${user.username}` : "нет username";
  const link = username !== "нет username" ? username : `<a href="tg://user?id=${id}">написать в Telegram</a>`;
  return `👤 ${name}\n🆔 ID: <code>${id}</code>\n📎 ${link}`;
}

export function formatConsultLeadMessage(lead: ConsultLeadInput): string {
  const lines = [
    "🆕 <b>Заявка на консультацию</b>",
    "",
    formatUserLine(lead.user),
    "",
    `📍 Источник: ${lead.source === "mini_app" ? "Mini App" : "чат бота"}`,
  ];
  if (lead.phone) lines.push(`📞 Телефон: <code>${lead.phone}</code>`);
  lines.push("", "💬 <b>Сообщение:</b>", lead.topic || "—");
  return lines.join("\n");
}

export async function sendConsultLead(
  bot: Bot,
  lead: ConsultLeadInput,
): Promise<{ delivered: boolean }> {
  const text = formatConsultLeadMessage(lead);

  if (!config.adminChatId) {
    console.warn("[consult] ADMIN_CHAT_ID not set. Lead:\n", text.replace(/<[^>]+>/g, ""));
    return { delivered: false };
  }

  await bot.api.sendMessage(config.adminChatId, text, { parse_mode: "HTML" });
  return { delivered: true };
}
