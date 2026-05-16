import "dotenv/config";
export declare const config: {
    botToken: string;
    webhookBaseUrl: string;
    webhookSecret: string;
    miniAppPath: string;
    port: number;
    isDev: boolean;
    /** Your Telegram user/chat ID — consult leads are sent here */
    adminChatId: number | undefined;
};
export declare function miniAppUrl(startapp?: string): string;
export declare function webhookUrl(): string;
