import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPage from "./page";

describe("Privacy page", () => {
  it("renders the privacy policy content", () => {
    render(<PrivacyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Политика обработки персональных данных" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Грант Авто/)).toBeInTheDocument();
    expect(screen.getByText(/152-ФЗ/)).toBeInTheDocument();
  });
});
