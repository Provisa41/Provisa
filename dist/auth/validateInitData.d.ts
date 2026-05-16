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
export declare function validateInitData(initData: string, botToken: string, maxAgeSeconds?: number): ValidatedInitData;
