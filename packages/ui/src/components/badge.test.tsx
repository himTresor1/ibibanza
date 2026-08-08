import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("uses the shared pill radius", () => {
    render(<Badge data-testid="badge">Byagenzuwe</Badge>);
    expect(screen.getByTestId("badge")).toHaveClass("rounded-full");
  });
});
