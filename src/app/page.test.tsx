import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Page from "./page";
import { metadata } from "./layout";

vi.mock("next/font/google", () => ({
  Unbounded: () => ({ variable: "font-heading-test" })
}));

describe("Grand Auto landing page", () => {
  it("renders the key conversion sections and trust proof", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Автосервис\s+в\s+Железнодорожном\s+—\s+диагностика,\s+ТО\s+и\s+ремонт\s+автомобиля/u
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText("Грант Авто").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Хорошее место 2026/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/5,0/).length).toBeGreaterThan(0);
    expect(screen.getByText("Рейтинг на Яндекс Картах")).toBeInTheDocument();
    expect(screen.getByText("25 отзывов · 33 оценки")).toBeInTheDocument();
    expect(screen.getByText("Награда любимых мест пользователей")).toBeInTheDocument();
    expect(screen.getByText(/Популярные услуги\s+и\s+цены/u)).toBeInTheDocument();
    expect(screen.getByLabelText("Панель доверия в первом экране")).toBeInTheDocument();
    expect(screen.getByText(/Запишитесь на\s+диагностику или ремонт/u)).toBeInTheDocument();
    expect(screen.getByText(/Клиенты отмечают скорость, честность\s+и\s+качество работы/u)).toBeInTheDocument();
  });

  it("renders categorized prices with the от prefix", () => {
    render(<Page />);

    const prices = screen.getAllByText(/^от\s/u);

    expect(prices.length).toBeGreaterThan(30);
    expect(screen.getAllByText("Диагностика").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Двигатель").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Трансмиссия").length).toBeGreaterThan(0);
    expect(screen.getByText("Компьютерная диагностика неисправностей")).toBeInTheDocument();
    expect(screen.getAllByText("от 1500 ₽").length).toBeGreaterThan(1);
  });

  it("renders clickable phone and sticky conversion controls", () => {
    render(<Page />);

    expect(screen.getAllByRole("link", { name: /Позвонить/i })[0]).toHaveAttribute(
      "href",
      "tel:88005056567"
    );
    expect(screen.getByLabelText("Быстрая запись")).toBeInTheDocument();
    expect(screen.getByLabelText("Мобильные быстрые действия")).toBeInTheDocument();
  });

  it("renders fixed time select and personal data consent in the lead form", () => {
    render(<Page />);

    expect(screen.getByRole("combobox", { name: /Удобный день\s+и\s+время/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Сегодня, ближайшее окно" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /согласие\s+на\s+обработку персональных данных/i })).toBeInTheDocument();
  });

  it("renders the conversion footer CTA and trust/legal structure", () => {
    render(<Page />);

    expect(screen.getByText("Не уверены, что именно сломалось?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Грант Авто" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Контакты\s+и\s+запись/u })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Адрес\s+и\s+режим/u })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Документы\s+и\s+информация/u })).toBeInTheDocument();

    expect(screen.getAllByText(/Исполнитель: \[полное наименование юрлица или ИП\]/u).length).toBeGreaterThan(0);
    expect(screen.getAllByText("ИНН: [указать]").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ОГРН/ОГРНИП: [указать]").length).toBeGreaterThan(0);
    expect(screen.getByText(/Информация на сайте не является публичной офертой/i)).toBeInTheDocument();
  });

  it("renders footer document links and mobile accordion labels", () => {
    render(<Page />);

    expect(screen.getAllByRole("link", { name: "Политика обработки персональных данных" })[0]).toHaveAttribute(
      "href",
      "/privacy"
    );
    expect(screen.getAllByRole("link", { name: /Согласие\s+на\s+обработку персональных данных/u })[0]).toHaveAttribute(
      "href",
      "/personal-data-consent"
    );
    expect(screen.getAllByRole("link", { name: "Пользовательское соглашение" })[0]).toHaveAttribute("href", "/terms");
    expect(screen.getAllByRole("link", { name: "Реквизиты исполнителя" })[0]).toHaveAttribute("href", "/requisites");
    expect(screen.getAllByRole("link", { name: "Карта сайта" })[0]).toHaveAttribute("href", "/sitemap");

    ["Контакты", "Адрес", "Услуги", "Документы", "Реквизиты"].forEach((label) => {
      expect(screen.getByText(label, { selector: "summary" })).toBeInTheDocument();
    });
  });

  it("exports SEO metadata from the layout", () => {
    expect(metadata.title).toBe(
      "Грант Авто — автосервис в Балашихе, мкр. Железнодорожный | Диагностика, ТО и ремонт авто"
    );
    expect(metadata.description).toContain("Рейтинг 5,0 на Яндекс Картах");
  });
});
