import { describe, expect, it } from "vitest";
import { validateLeadInput } from "./validation";

describe("validateLeadInput", () => {
  it("trims and accepts a valid Russian phone-like lead", () => {
    const result = validateLeadInput({
      name: "  Иван  ",
      phone: " +7 (916) 123-45-67 ",
      vehicle: " Honda CR-V ",
      problem: " Горит Check Engine ",
      preferredTime: " завтра утром ",
      personalDataConsent: true
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual({
        name: "Иван",
        phone: "+7 (916) 123-45-67",
        vehicle: "Honda CR-V",
        problem: "Горит Check Engine",
        preferredTime: "завтра утром",
        personalDataConsent: true
      });
    }
  });

  it("rejects missing required fields", () => {
    const result = validateLeadInput({
      name: "",
      phone: "",
      problem: "",
      personalDataConsent: false
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors).toMatchObject({
        name: "Укажите имя",
        phone: "Укажите телефон",
        problem: "Опишите задачу или проблему",
        personalDataConsent: "Подтвердите согласие на обработку персональных данных"
      });
    }
  });

  it("rejects invalid phone input", () => {
    const result = validateLeadInput({
      name: "Иван",
      phone: "12345",
      problem: "Нужна диагностика",
      personalDataConsent: true
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.phone).toBe("Укажите корректный телефон");
    }
  });

  it("rejects values longer than configured limits", () => {
    const result = validateLeadInput({
      name: "И".repeat(81),
      phone: "+7 916 123 45 67",
      vehicle: "A".repeat(121),
      problem: "П".repeat(1001),
      preferredTime: "В".repeat(121),
      personalDataConsent: true
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors).toMatchObject({
        name: "Имя слишком длинное",
        vehicle: "Марка и модель слишком длинные",
        problem: "Описание слишком длинное",
        preferredTime: "Время слишком длинное"
      });
    }
  });

  it("rejects a missing personal data consent", () => {
    const result = validateLeadInput({
      name: "Иван",
      phone: "+7 916 123 45 67",
      problem: "Нужна диагностика"
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.personalDataConsent).toBe(
        "Подтвердите согласие на обработку персональных данных"
      );
    }
  });
});
