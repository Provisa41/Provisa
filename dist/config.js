import "dotenv/config";
function required(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
function resolveWebhookBaseUrl() {
    const explicit = process.env.WEBHOOK_BASE_URL?.replace(/\/$/, "");
    if (explicit)
        return explicit;
    const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
    if (vercel)
        return `https://${vercel}`;
    throw new Error("Set WEBHOOK_BASE_URL (e.g. https://your-project.vercel.app) or deploy on Vercel");
}
function parseAdminChatId() {
    const raw = process.env.ADMIN_CHAT_ID?.trim();
    if (!raw)
        return undefined;
    const id = Number(raw);
    if (!Number.isFinite(id)) {
        throw new Error("ADMIN_CHAT_ID must be a numeric Telegram chat ID");
    }
    return id;
}
export const config = {
    botToken: required("BOT_TOKEN"),
    webhookBaseUrl: resolveWebhookBaseUrl(),
    webhookSecret: process.env.WEBHOOK_SECRET ?? "provisa-webhook",
    miniAppPath: process.env.MINI_APP_PATH ?? "/app",
    port: Number(process.env.PORT ?? 3000),
    isDev: process.env.NODE_ENV !== "production",
    /** Your Telegram user/chat ID — consult leads are sent here */
    adminChatId: parseAdminChatId(),
};
export function miniAppUrl(startapp) {
    const base = `${config.webhookBaseUrl}${config.miniAppPath}`;
    if (!startapp)
        return base;
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}tgWebAppStartParam=${encodeURIComponent(startapp)}`;
}
export function webhookUrl() {
    return `${config.webhookBaseUrl}/${config.webhookSecret}`;
}
//# sourceMappingURL=config.js.map