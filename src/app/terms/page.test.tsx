import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TermsPage from "./page";

describe("Terms page", () => {
  it("renders user agreement content", () => {
    render(<TermsPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Пользовательское соглашение" })).toBeInTheDocument();
    expect(screen.getByText(/сайт автосервиса «Грант Авто»/i)).toBeInTheDocument();
  });
});
