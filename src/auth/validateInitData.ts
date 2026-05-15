import { createHmac, timingSafeEqual } from "node:crypto";

export type TelegramWebAppUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
};

export type ValidatedInitData = {
  user?: TelegramWebAppUser;
  query_id?: string;
  auth_date: number;
  hash: string;
  start_param?: string;
  raw: Record<string, string>;
};

/**
 * Validates Telegram Mini App initData per
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
export function validateInitData(
  initData: string,
  botToken: string,
  maxAgeSeconds = 86_400,
): ValidatedInitData {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) {
    throw new Error("initData: missing hash");
  }

  const entries: [string, string][] = [];
  params.forEach((value, key) => {
    if (key !== "hash") entries.push([key, value]);
  });
  entries.sort(([a], [b]) => a.localeCompare(b));
  const dataCheckString = entries.map(([k, v]) => `${k}=${v}`).join("\n");

  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();
  const computedHash = createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  const a = Buffer.from(computedHash, "hex");
  const b = Buffer.from(hash, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new Error("initData: invalid signature");
  }

  const authDate = Number(params.get("auth_date"));
  if (!Number.isFinite(authDate)) {
    throw new Error("initData: missing auth_date");
  }
  const age = Math.floor(Date.now() / 1000) - authDate;
  if (age > maxAgeSeconds) {
    throw new Error("initData: expired");
  }

  const userRaw = params.get("user");
  let user: TelegramWebAppUser | undefined;
  if (userRaw) {
    user = JSON.parse(userRaw) as TelegramWebAppUser;
  }

  const raw: Record<string, string> = {};
  params.forEach((value, key) => {
    raw[key] = value;
  });

  return {
    user,
    query_id: params.get("query_id") ?? undefined,
    auth_date: authDate,
    hash,
    start_param: params.get("start_param") ?? undefined,
    raw,
  };
}
