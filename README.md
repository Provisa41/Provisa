# Pro Visa — Telegram Bot + Mini App (MVP starter)

Node.js / TypeScript starter for **Pro Visa**: webhook bot, Mini App with server-side `initData` validation, and deployable Docker image.

## What's included

| Spec section | Implementation |
|--------------|----------------|
| Commands `/start`, `/documents`, `/updates`, `/consult` | Bot handlers + BotFather command list |
| Rich messages | Inline keyboards + reply keyboard |
| Mini App entry (profile menu, links) | Static app at `MINI_APP_PATH`, menu button, `webApp` buttons |
| Webhooks | `POST /{WEBHOOK_SECRET}` |
| Auth | HMAC validation in `src/auth/validateInitData.ts` |
| V1 scope | Demo AI score, no payments, no external visa DB |

## Quick start

1. Create a bot via [@BotFather](https://t.me/BotFather).
2. Copy `.env.example` → `.env` and set `BOT_TOKEN`, `WEBHOOK_BASE_URL` (public HTTPS).
3. Install and run:

```bash
npm install
npm run dev
```

4. Expose port `3000` with HTTPS (ngrok, Cloudflare Tunnel, or your host).
5. In BotFather:
   - Set **Menu Button** → Web App URL: `https://your-host/app`
   - Optional: **Direct Link** mini app at `https://t.me/YourBot/app`

Or run `npm run set-webhook` after the server is reachable.

## Environment

| Variable | Description |
|----------|-------------|
| `BOT_TOKEN` | From BotFather |
| `WEBHOOK_BASE_URL` | Public origin, no trailing slash |
| `WEBHOOK_SECRET` | Webhook path segment (default: `provisa-webhook`) |
| `MINI_APP_PATH` | Mini App route (default: `/app`) |
| `PORT` | HTTP port (default: `3000`) |

Webhook URL: `{WEBHOOK_BASE_URL}/{WEBHOOK_SECRET}`

## API (Mini App)

All routes require `initData` in body or `X-Telegram-Init-Data` header.

- `POST /api/auth/session` — validate user session
- `POST /api/documents/check` — demo document readiness score
- `POST /api/consult/request` — demo consultation request

## Deploy on Vercel

See step-by-step guide (Russian): [docs/VERCEL.md](docs/VERCEL.md)

After deploy, from your PC:

```bash
# .env with BOT_TOKEN and WEBHOOK_BASE_URL=https://your-project.vercel.app
npm run setup-telegram
```

Public links:

- Mini App: `https://your-project.vercel.app/app`
- Health: `https://your-project.vercel.app/health`

## Production (Docker / VPS)

```bash
npm run build
npm start
```

Docker:

```bash
docker build -t provisa .
docker run -p 3000:3000 --env-file .env provisa
```

## Deep links

- Bot: `https://t.me/YourBot?start=param`
- Mini App: `https://t.me/YourBot/app?startapp=documents`

## Out of scope (V1)

Per product spec: full i18n, support desk, external visa databases, complex traffic matching, off-hours support, Telegram Stars / provider payments (add via `sendInvoice` later).

## References

- [Bots](https://core.telegram.org/bots)
- [Mini Apps](https://core.telegram.org/bots/webapps)
- [Webhooks](https://core.telegram.org/bots/api#setwebhook)
