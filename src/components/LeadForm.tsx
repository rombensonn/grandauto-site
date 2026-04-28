"use client";

import { CalendarCheck, Send, Wrench } from "lucide-react";
import { FormEvent, useState } from "react";
import { preferredTimeOptions } from "@/content/site";
import { withBasePath } from "@/lib/paths";
import type { LeadFieldErrors } from "@/lib/validation";

type SubmitState = "idle" | "loading" | "success" | "error";

type LeadFormState = {
  name: string;
  phone: string;
  vehicle: string;
  problem: string;
  preferredTime: string;
  personalDataConsent: boolean;
};

const initialFormState: LeadFormState = {
  name: "",
  phone: "",
  vehicle: "",
  problem: "",
  preferredTime: "",
  personalDataConsent: false
};

const staticFormFallback = process.env.NEXT_PUBLIC_STATIC_FORM_FALLBACK === "true";
const staticFallbackMessage =
  "Заявка подготовлена. Пожалуйста, позвоните по номеру 8 (800) 505-65-67 или дождитесь обратной связи после подключения формы";

export function LeadForm() {
  const [form, setForm] = useState<LeadFormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  function updateField(field: keyof LeadFormState, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("loading");
    setMessage("");

    if (staticFormFallback) {
      const nextErrors: LeadFieldErrors = {};
      if (!form.name.trim()) {
        nextErrors.name = "Укажите имя";
      }
      if (!form.phone.trim()) {
        nextErrors.phone = "Укажите телефон";
      }
      if (!form.problem.trim()) {
        nextErrors.problem = "Опишите проблему";
      }
      if (!form.personalDataConsent) {
        nextErrors.personalDataConsent = "Подтвердите согласие на обработку персональных данных";
      }

      if (Object.keys(nextErrors).length > 0) {
        setFieldErrors(nextErrors);
        setSubmitState("error");
        setMessage("Проверьте обязательные поля формы");
        return;
      }

      setFieldErrors({});
      setSubmitState("success");
      setMessage(staticFallbackMessage);
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setSubmitState("error");
        setMessage(result.error ?? "Проверьте поля формы");
        return;
      }

      setForm(initialFormState);
      setFieldErrors({});
      setSubmitState("success");
      setMessage("Заявка отправлена. Перезвоним и подскажем ближайшее окно.");
    } catch {
      setSubmitState("error");
      setMessage("Не удалось отправить заявку. Позвоните в сервис по телефону 8 (800) 505-65-67.");
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <span className="form-heading__icon" aria-hidden="true">
          <Wrench size={20} />
        </span>
        <div>
          <p className="eyebrow">Заявка в сервис</p>
          <h2 id="lead-form">Запишитесь на диагностику или ремонт</h2>
        </div>
      </div>

      <div className="form-grid">
        <label>
          <span>Имя</span>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name ? <small id="name-error">{fieldErrors.name}</small> : null}
        </label>

        <label>
          <span>Телефон</span>
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7"
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          />
          {fieldErrors.phone ? <small id="phone-error">{fieldErrors.phone}</small> : null}
        </label>

        <label>
          <span>Марка и модель автомобиля</span>
          <input
            value={form.vehicle}
            onChange={(event) => updateField("vehicle", event.target.value)}
            placeholder="Например, Mazda 3"
            aria-invalid={Boolean(fieldErrors.vehicle)}
            aria-describedby={fieldErrors.vehicle ? "vehicle-error" : undefined}
          />
          {fieldErrors.vehicle ? <small id="vehicle-error">{fieldErrors.vehicle}</small> : null}
        </label>

        <label>
          <span>Удобный день и время</span>
          <select
            value={form.preferredTime}
            onChange={(event) => updateField("preferredTime", event.target.value)}
            aria-invalid={Boolean(fieldErrors.preferredTime)}
            aria-describedby={fieldErrors.preferredTime ? "time-error" : undefined}
          >
            <option value="">Выберите удобное время</option>
            {preferredTimeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldErrors.preferredTime ? <small id="time-error">{fieldErrors.preferredTime}</small> : null}
        </label>

        <label className="form-grid__wide">
          <span>Что нужно сделать / какая проблема</span>
          <textarea
            value={form.problem}
            onChange={(event) => updateField("problem", event.target.value)}
            rows={5}
            placeholder="Опишите симптомы, работу или вопрос по автомобилю"
            aria-invalid={Boolean(fieldErrors.problem)}
            aria-describedby={fieldErrors.problem ? "problem-error" : undefined}
          />
          {fieldErrors.problem ? <small id="problem-error">{fieldErrors.problem}</small> : null}
        </label>
      </div>

      <label className="consent-row">
        <input
          checked={form.personalDataConsent}
          onChange={(event) => updateField("personalDataConsent", event.target.checked)}
          type="checkbox"
          aria-invalid={Boolean(fieldErrors.personalDataConsent)}
          aria-describedby={fieldErrors.personalDataConsent ? "consent-error" : undefined}
        />
        <span>
          Даю согласие на обработку персональных данных и принимаю{" "}
          <a href={withBasePath("/privacy")}>Политику конфиденциальности</a> и{" "}
          <a href={withBasePath("/personal-data-consent")}>Согласие на обработку персональных данных</a>.
        </span>
      </label>
      {fieldErrors.personalDataConsent ? (
        <small className="consent-error" id="consent-error">
          {fieldErrors.personalDataConsent}
        </small>
      ) : null}

      <button className="button button--primary form-submit" type="submit" disabled={submitState === "loading"}>
        {submitState === "loading" ? (
          <CalendarCheck size={18} aria-hidden="true" />
        ) : (
          <Send size={18} aria-hidden="true" />
        )}
        {submitState === "loading" ? "Отправляем..." : "Отправить заявку"}
      </button>

      <p className="form-note">Перезвоним, уточним задачу и подскажем, когда можно приехать.</p>
      <p className={`form-status form-status--${submitState}`} aria-live="polite">
        {message}
      </p>
    </form>
  );
}
