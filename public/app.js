const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  applyTheme(tg.themeParams);
  tg.onEvent("themeChanged", () => applyTheme(tg.themeParams));
}

const initData = tg?.initData ?? "";

const greeting = document.getElementById("user-greeting");
const fileInput = document.getElementById("file-input");
const checkBtn = document.getElementById("check-btn");
const resultEl = document.getElementById("result");
const consultBtn = document.getElementById("consult-btn");
const consultTopic = document.getElementById("consult-topic");
const consultStatus = document.getElementById("consult-status");

let selectedFile = null;

function applyTheme(params) {
  if (!params) return;
  const root = document.documentElement;
  if (params.bg_color) root.style.setProperty("--tg-bg", params.bg_color);
  if (params.text_color) root.style.setProperty("--tg-text", params.text_color);
  if (params.button_color) root.style.setProperty("--tg-button", params.button_color);
  if (params.button_text_color) {
    root.style.setProperty("--tg-button-text", params.button_text_color);
  }
  if (params.secondary_bg_color) {
    root.style.setProperty("--tg-secondary", params.secondary_bg_color);
  }
}

function getStartParam() {
  return (
    tg?.initDataUnsafe?.start_param ??
    new URLSearchParams(window.location.search).get("tgWebAppStartParam") ??
    ""
  );
}

function switchTab(name) {
  document.querySelectorAll(".tab").forEach((el) => {
    el.classList.toggle("active", el.dataset.tab === name);
  });
  document.querySelectorAll(".panel").forEach((el) => {
    el.classList.toggle("active", el.id === `panel-${name}`);
  });
}

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

async function apiPost(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Telegram-Init-Data": initData,
    },
    body: JSON.stringify({ initData, ...body }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data;
}

async function bootstrap() {
  if (!initData) {
    greeting.textContent = "Откройте через Telegram Mini App";
    return;
  }

  try {
    const session = await apiPost("/api/auth/session", {});
    const user = session.user;
    greeting.textContent = user
      ? `Привет, ${user.first_name}!`
      : "Сессия подтверждена";
  } catch {
    greeting.textContent = "Не удалось проверить сессию";
  }

  const start = getStartParam();
  if (start === "documents" || start === "updates" || start === "consult") {
    switchTab(start);
  }
}

fileInput?.addEventListener("change", () => {
  selectedFile = fileInput.files?.[0] ?? null;
  checkBtn.disabled = !selectedFile;
});

checkBtn?.addEventListener("click", async () => {
  if (!selectedFile) return;
  checkBtn.disabled = true;
  resultEl.classList.add("hidden");
  try {
    const data = await apiPost("/api/documents/check", {
      fileName: selectedFile.name,
    });
    resultEl.innerHTML = `
      <p class="score">Готовность: <strong>${data.score}%</strong></p>
      <p>${data.summary}</p>
      ${
        data.issues?.length
          ? `<ul>${data.issues.map((i) => `<li>${i}</li>`).join("")}</ul>`
          : ""
      }
      <p class="badge">Демо-оценка MVP</p>
    `;
    resultEl.classList.remove("hidden");
    tg?.HapticFeedback?.notificationOccurred("success");
  } catch (err) {
    resultEl.innerHTML = `<p class="error">${err.message}</p>`;
    resultEl.classList.remove("hidden");
    tg?.HapticFeedback?.notificationOccurred("error");
  } finally {
    checkBtn.disabled = !selectedFile;
  }
});

consultBtn?.addEventListener("click", async () => {
  consultStatus.textContent = "Отправка…";
  try {
    const data = await apiPost("/api/consult/request", {
      topic: consultTopic?.value ?? "",
    });
    consultStatus.textContent = data.message;
    consultTopic.value = "";
    tg?.HapticFeedback?.notificationOccurred("success");
  } catch (err) {
    consultStatus.textContent = err.message;
    tg?.HapticFeedback?.notificationOccurred("error");
  }
});

bootstrap();
