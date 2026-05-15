import type { Bot } from "grammy";
import {
  consultText,
  documentsText,
  updatesText,
  welcomeText,
} from "./copy.js";
import {
  mainReplyKeyboard,
  sectionInlineKeyboard,
  welcomeInlineKeyboard,
} from "./keyboards.js";

export function registerBotHandlers(bot: Bot): void {
  bot.command("start", async (ctx) => {
    const startParam = ctx.match?.trim();
    const me = await ctx.api.getMe();
    await ctx.reply(welcomeText, {
      parse_mode: "HTML",
      reply_markup: welcomeInlineKeyboard(me.username),
    });
    await ctx.reply("Меню команд:", { reply_markup: mainReplyKeyboard() });
    if (startParam) {
      await ctx.reply(
        `Параметр deep link: <code>${startParam}</code>`,
        { parse_mode: "HTML" },
      );
    }
  });

  bot.command("documents", async (ctx) => {
    await ctx.reply(documentsText, {
      parse_mode: "HTML",
      reply_markup: sectionInlineKeyboard("documents"),
    });
  });

  bot.command("updates", async (ctx) => {
    await ctx.reply(updatesText, {
      parse_mode: "HTML",
      reply_markup: sectionInlineKeyboard("updates"),
    });
  });

  bot.command("consult", async (ctx) => {
    await ctx.reply(consultText, {
      parse_mode: "HTML",
      reply_markup: sectionInlineKeyboard("consult"),
    });
  });

  bot.callbackQuery(/^cmd:(updates|consult)$/, async (ctx) => {
    const cmd = ctx.match![1] as "updates" | "consult";
    const text = cmd === "updates" ? updatesText : consultText;
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(text, {
      parse_mode: "HTML",
      reply_markup: sectionInlineKeyboard(cmd),
    });
  });

  bot.hears("📄 Документы", (ctx) => ctx.reply(documentsText, {
    parse_mode: "HTML",
    reply_markup: sectionInlineKeyboard("documents"),
  }));

  bot.hears("🌍 Обновления", (ctx) => ctx.reply(updatesText, {
    parse_mode: "HTML",
    reply_markup: sectionInlineKeyboard("updates"),
  }));

  bot.hears("👤 Консультация", (ctx) => ctx.reply(consultText, {
    parse_mode: "HTML",
    reply_markup: sectionInlineKeyboard("consult"),
  }));

  bot.hears("🛂 Открыть приложение", async (ctx) => {
    const me = await ctx.api.getMe();
    await ctx.reply("Откройте Mini App:", {
      reply_markup: welcomeInlineKeyboard(me.username),
    });
  });

  bot.on("message", async (ctx, next) => {
    if (ctx.message.text?.startsWith("/")) return next();
    if (
      ctx.message.text === "📄 Документы" ||
      ctx.message.text === "🌍 Обновления" ||
      ctx.message.text === "👤 Консультация" ||
      ctx.message.text === "🛂 Открыть приложение"
    ) {
      return next();
    }
    await ctx.reply(
      "Используйте команды /documents, /updates, /consult или кнопки ниже.",
      { reply_markup: mainReplyKeyboard() },
    );
  });
}
