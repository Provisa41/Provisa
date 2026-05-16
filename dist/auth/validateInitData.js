import { createHmac, timingSafeEqual } from "node:crypto";
/**
 * Validates Telegram Mini App initData per
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
export function validateInitData(initData, botToken, maxAgeSeconds = 86_400) {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    if (!hash) {
        throw new Error("initData: missing hash");
    }
    const entries = [];
    params.forEach((value, key) => {
        if (key !== "hash")
            entries.push([key, value]);
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
    let user;
    if (userRaw) {
        user = JSON.parse(userRaw);
    }
    const raw = {};
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
//# sourceMappingURL=validateInitData.js.map