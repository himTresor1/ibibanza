import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chip } from "./chip";

describe("Chip", () => {
  it("uses the shared pill radius", () => {
    render(<Chip data-testid="chip">Guturwamo</Chip>);
    expect(screen.getByTestId("chip")).toHaveClass("rounded-full");
  });

  it("shows a filled brand state when selected", () => {
    render(<Chip data-testid="chip" selected>Guturwamo</Chip>);
    expect(screen.getByTestId("chip")).toHaveClass("bg-[var(--primary-base)]");
  });
});
