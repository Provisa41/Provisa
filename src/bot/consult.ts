import { Keyboard } from "grammy";
import type { Bot, Context } from "grammy";
import { sendConsultLead } from "../services/consultLead.js";
import { sectionInlineKeyboard } from "./keyboards.js";

const pendingConsultUsers = new Set<number>();
const pendingPhones = new Map<number, string>();

export function consultContactKeyboard() {
  return new Keyboard()
    .requestContact("📞 Отправить номер телефона")
    .row()
    .text("✖️ Отмена")
    .resized()
    .oneTime();
}

export async function promptConsult(ctx: Context): Promise<void> {
  if (!ctx.from) return;
  pendingConsultUsers.add(ctx.from.id);
  await ctx.reply(
    `👤 <b>Консультация</b>

Опишите страну, тип визы и сроки <b>одним сообщением</b> — заявка придёт специалисту.

Можно нажать «Отправить номер телефона», затем дописать вопрос.

Или оформите заявку в Mini App → вкладка «Консультация».`,
    {
      parse_mode: "HTML",
      reply_markup: consultContactKeyboard(),
    },
  );
}

export function registerConsultHandlers(bot: Bot): void {
  bot.command("consult", (ctx) => promptConsult(ctx));

  bot.hears("✖️ Отмена", async (ctx) => {
    if (!ctx.from) return;
    pendingConsultUsers.delete(ctx.from.id);
    pendingPhones.delete(ctx.from.id);
    await ctx.reply("Заявка отменена.", {
      reply_markup: { remove_keyboard: true },
    });
  });

  bot.on("message:contact", async (ctx, next) => {
    if (!ctx.from || !pendingConsultUsers.has(ctx.from.id)) return next();

    pendingPhones.set(ctx.from.id, ctx.message.contact.phone_number);
    await ctx.reply(
      "Номер сохранён. Теперь отправьте текстом: страна, тип визы, сроки.",
      { reply_markup: consultContactKeyboard() },
    );
  });

  bot.on("message:text", async (ctx, next) => {
    if (!ctx.from) return next();
    if (ctx.message.text?.startsWith("/")) return next();
    if (ctx.message.text === "✖️ Отмена") return next();
    if (
      [
        "📄 Документы",
        "🗺 Страны",
        "🌍 Обновления",
        "👤 Консультация",
        "🛂 Открыть приложение",
      ].includes(ctx.message.text ?? "")
    ) {
      return next();
    }

    if (!pendingConsultUsers.has(ctx.from.id)) return next();

    pendingConsultUsers.delete(ctx.from.id);
    const phone = pendingPhones.get(ctx.from.id);
    pendingPhones.delete(ctx.from.id);

    const { delivered } = await sendConsultLead(bot, {
      source: "bot",
      user: ctx.from,
      phone,
      topic: ctx.message.text,
    });

    await ctx.reply(
      delivered
        ? "✅ Заявка отправлена. Специалист свяжется с вами в Telegram."
        : "✅ Заявка принята. Мы свяжемся с вами в ближайшее время.",
      { reply_markup: { remove_keyboard: true } },
    );
  });
}
