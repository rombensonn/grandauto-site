import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RequisitesPage from "./page";

describe("Requisites page", () => {
  it("renders executor requisites placeholders", () => {
    render(<RequisitesPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Реквизиты исполнителя" })).toBeInTheDocument();
    expect(screen.getByText("Исполнитель: [полное наименование юрлица или ИП]")).toBeInTheDocument();
    expect(screen.getByText("ИНН: [указать]")).toBeInTheDocument();
  });
});
