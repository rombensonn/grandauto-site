import { mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const tempDir = join(process.cwd(), ".tmp-tests");
const leadsFilePath = join(tempDir, "leads.jsonl");

describe("POST /api/leads", () => {
  beforeEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
    await mkdir(tempDir, { recursive: true });
    process.env.LEADS_FILE_PATH = leadsFilePath;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
    delete process.env.LEADS_FILE_PATH;
    vi.restoreAllMocks();
  });

  it("saves a valid lead and returns success when Telegram is not configured", async () => {
    const response = await POST(
      new Request("http://localhost/api/leads", {
        method: "POST",
        body: JSON.stringify({
          name: "Иван",
          phone: "+7 916 123-45-67",
          vehicle: "Mazda 3",
          problem: "Стук в подвеске",
          preferredTime: "сегодня после 15:00",
          personalDataConsent: true
        })
      })
    );

    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(response.status).toBe(200);

    const stored = await readFile(leadsFilePath, "utf8");
    const line = JSON.parse(stored.trim());
    expect(line).toMatchObject({
      name: "Иван",
      phone: "+7 916 123-45-67",
      vehicle: "Mazda 3",
      problem: "Стук в подвеске",
      preferredTime: "сегодня после 15:00",
      personalDataConsent: true,
      source: "grandauto-landing"
    });
    expect(line.createdAt).toEqual(expect.any(String));
  });

  it("returns validation errors and does not save invalid leads", async () => {
    const response = await POST(
      new Request("http://localhost/api/leads", {
        method: "POST",
        body: JSON.stringify({
          name: "",
          phone: "123",
          problem: "",
          personalDataConsent: false
        })
      })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: "Проверьте поля формы",
      fieldErrors: {
        name: "Укажите имя",
        phone: "Укажите корректный телефон",
        problem: "Опишите задачу или проблему",
        personalDataConsent: "Подтвердите согласие на обработку персональных данных"
      }
    });

    await expect(readFile(leadsFilePath, "utf8")).rejects.toThrow();
  });

  it("rejects valid contact data when personal data consent is missing", async () => {
    const response = await POST(
      new Request("http://localhost/api/leads", {
        method: "POST",
        body: JSON.stringify({
          name: "Иван",
          phone: "+7 916 123-45-67",
          problem: "Нужна диагностика",
          preferredTime: "Завтра утром"
        })
      })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      fieldErrors: {
        personalDataConsent: "Подтвердите согласие на обработку персональных данных"
      }
    });
  });
});
