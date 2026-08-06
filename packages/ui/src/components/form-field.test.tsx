import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "./form-field";
import { Input } from "./input";

describe("FormField", () => {
  it("connects a visible label and field-level error to the input", () => {
    render(
      <FormField
        id="seller-phone"
        label="Telefone ya nyir'ikibanza"
        error="Andika telefone ikora."
      >
        <Input placeholder="+250 7XX XXX XXX" />
      </FormField>,
    );

    const input = screen.getByLabelText("Telefone ya nyir'ikibanza");

    expect(input).toHaveAttribute("id", "seller-phone");
    expect(input).toHaveAccessibleDescription("Andika telefone ikora.");
    expect(screen.getByText("Andika telefone ikora.")).toBeVisible();
  });
});
