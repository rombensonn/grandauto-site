import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PersonalDataConsentPage from "./page";

describe("Personal data consent page", () => {
  it("renders the personal data consent content", () => {
    render(<PersonalDataConsentPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Согласие на обработку персональных данных" })
    ).toBeInTheDocument();
    expect(screen.getByText(/имя, телефон, марка и модель автомобиля/i)).toBeInTheDocument();
    expect(screen.getByText(/отозвать согласие/i)).toBeInTheDocument();
  });
});
