import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

describe("Select", () => {
  it("uses the shared field radius", () => {
    render(<Select data-testid="select"><option>A</option></Select>);
    expect(screen.getByTestId("select")).toHaveClass("rounded-xl");
  });
});
