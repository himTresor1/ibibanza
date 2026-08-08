import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("matches the button's pill radius and height", () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveClass("rounded-full", "h-[60px]");
  });
});
