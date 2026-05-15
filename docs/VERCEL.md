# Деплой Pro Visa на Vercel (пошагово)

## Что вы получите

Публичные ссылки вида:

- `https://ваш-проект.vercel.app/app` — Mini App
- `https://ваш-проект.vercel.app/health` — проверка, что сервер жив

Telegram-бот будет слать обновления на ваш URL после команды `npm run setup-telegram`.

---

## Шаг 0. Что понадобится

1. Аккаунт [GitHub](https://github.com) (бесплатно)
2. Аккаунт [Vercel](https://vercel.com) (бесплатно, вход через GitHub)
3. Токен бота от [@BotFather](https://t.me/BotFather) в Telegram

---

## Шаг 1. Создайте бота в Telegram

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/newbot`
3. Придумайте имя и username (например `provisa_helper_bot`)
4. Скопируйте **токен** вида `7123456789:AAH...` — это `BOT_TOKEN`

---

## Шаг 2. Загрузите код на GitHub

1. Установите [Git](https://git-scm.com/downloads)
2. В папке проекта `ProViza` выполните в терминале:

```bash
git init
git add .
git commit -m "Pro Visa MVP"
```

3. На GitHub: **New repository** → имя `provisa` → Create
4. Подключите репозиторий (команды GitHub покажет на странице репозитория):

```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/provisa.git
git branch -M main
git push -u origin main
```

---

## Шаг 3. Подключите проект к Vercel

1. Зайдите на [vercel.com](https://vercel.com) → **Add New…** → **Project**
2. Найдите репозиторий `provisa` → **Import**
3. Настройки сборки оставьте по умолчанию (Vercel сам найдёт `vercel.json`)
4. Разверните блок **Environment Variables** и добавьте:

| Name | Value |
|------|--------|
| `BOT_TOKEN` | токен от BotFather |
| `WEBHOOK_SECRET` | любая длинная случайная строка, например `my-secret-8f3a2b` |
| `MINI_APP_PATH` | `/app` |
| `NODE_ENV` | `production` |

`WEBHOOK_BASE_URL` пока можно не добавлять — подставится после первого деплоя (см. шаг 5).

5. Нажмите **Deploy** и дождитесь зелёной галочки **Ready**

---

## Шаг 4. Скопируйте публичный URL

На странице деплоя Vercel будет домен, например:

`https://provisa-abc123.vercel.app`

Откройте в браузере:

`https://provisa-abc123.vercel.app/health`

Должно появиться: `{"ok":true,"service":"provisa"}`

Mini App: `https://provisa-abc123.vercel.app/app`

---

## Шаг 5. Зафиксируйте URL в Vercel

1. Vercel → ваш проект → **Settings** → **Environment Variables**
2. Добавьте:

| Name | Value |
|------|--------|
| `WEBHOOK_BASE_URL` | `https://provisa-abc123.vercel.app` (ваш домен, **без** слэша в конце) |

3. **Deployments** → у последнего деплоя **⋯** → **Redeploy** (чтобы переменная применилась)

---

## Шаг 6. Подключите бота к серверу (webhook)

На своём компьютере в папке проекта создайте файл `.env`:

```env
BOT_TOKEN=ваш_токен_от_BotFather
WEBHOOK_BASE_URL=https://provisa-abc123.vercel.app
WEBHOOK_SECRET=тот_же_секрет_что_в_Vercel
NODE_ENV=production
```

Выполните:

```bash
npm install
npm run setup-telegram
```

В консоли должно быть `OK: bot profile + webhook`.

---

## Шаг 7. Настройте Mini App в BotFather

1. [@BotFather](https://t.me/BotFather) → `/mybots` → ваш бот
2. **Bot Settings** → **Menu Button** → **Configure menu button**
3. URL: `https://provisa-abc123.vercel.app/app`
4. (Опционально) **Edit Bot** → **Configure Mini App** → тот же URL

Проверка: откройте бота в Telegram → кнопка меню → откроется Pro Visa.

---

## Частые проблемы

| Симптом | Решение |
|---------|---------|
| 404 на `/app` | Сделайте Redeploy после деплоя |
| Бот не отвечает | Снова `npm run setup-telegram`, проверьте `WEBHOOK_SECRET` |
| Mini App: «Не удалось проверить сессию» | Открывайте только из Telegram, не в обычном браузере |
| `Missing BOT_TOKEN` | Добавьте переменные в Vercel и Redeploy |

---

## Обновление кода

После `git push` Vercel пересоберёт проект автоматически. Webhook менять не нужно, если домен тот же.
