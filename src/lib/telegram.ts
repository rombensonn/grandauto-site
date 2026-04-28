import type { StoredLead } from "./leads-store";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildTelegramLeadMessage(lead: StoredLead): string {
  const vehicle = lead.vehicle || "не указано";
  const preferredTime = lead.preferredTime || "не указано";

  return [
    "<b>Новая заявка с лендинга Грант Авто</b>",
    `Имя: ${escapeHtml(lead.name)}`,
    `Телефон: ${escapeHtml(lead.phone)}`,
    `Автомобиль: ${escapeHtml(vehicle)}`,
    `Задача: ${escapeHtml(lead.problem)}`,
    `Удобное время: ${escapeHtml(preferredTime)}`,
    "Согласие на обработку ПДн: получено",
    `Дата: ${escapeHtml(lead.createdAt)}`
  ].join("\n");
}

export async function sendTelegramLead(lead: StoredLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.info("Telegram lead notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set.");
    return;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramLeadMessage(lead),
      parse_mode: "HTML",
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Telegram API responded with ${response.status}: ${text}`);
  }
}
