import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("uses a full pill radius at every size", () => {
    render(<Button data-testid="btn">Ohereza</Button>);
    expect(screen.getByTestId("btn")).toHaveClass("rounded-full");
  });

  it("supports a large size for hero CTAs", () => {
    render(<Button data-testid="btn" size="large">Shaka ibibanza</Button>);
    expect(screen.getByTestId("btn")).toHaveClass("h-[81px]", "rounded-full");
  });

  it("defaults to the filled green brand style", () => {
    render(<Button data-testid="btn">Ohereza</Button>);
    expect(screen.getByTestId("btn")).toHaveClass("bg-[var(--primary-base)]", "text-white");
  });
});
