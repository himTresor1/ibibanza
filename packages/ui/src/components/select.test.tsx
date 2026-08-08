import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

describe("Select", () => {
  it("matches the button's pill radius and height", () => {
    render(<Select data-testid="select"><option>A</option></Select>);
    expect(screen.getByTestId("select")).toHaveClass("rounded-full", "h-[60px]");
  });
});
