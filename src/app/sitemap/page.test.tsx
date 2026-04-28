import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SitemapPage from "./page";

describe("Sitemap page", () => {
  it("renders key landing page anchors and legal links", () => {
    render(<SitemapPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Карта сайта" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Услуги" })).toHaveAttribute("href", "/#services");
    expect(screen.getByRole("link", { name: "Политика обработки персональных данных" })).toHaveAttribute(
      "href",
      "/privacy"
    );
  });
});
