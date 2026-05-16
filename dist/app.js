import { createBot } from "./bot/index.js";
import { createServer } from "./server.js";
let app;
/** Shared Express app for local server and Vercel serverless */
export function getApp() {
    if (!app) {
        const bot = createBot();
        app = createServer(bot);
    }
    return app;
}
//# sourceMappingURL=app.js.map