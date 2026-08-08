import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("uses the shared field radius at every size", () => {
    render(<Button data-testid="btn">Ohereza</Button>);
    expect(screen.getByTestId("btn")).toHaveClass("rounded-xl");
  });

  it("supports a large size for hero CTAs", () => {
    render(<Button data-testid="btn" size="large">Shaka ibibanza</Button>);
    expect(screen.getByTestId("btn")).toHaveClass("h-14", "rounded-xl");
  });
});
