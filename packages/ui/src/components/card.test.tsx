import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./card";

describe("Card", () => {
  it("uses the compact shared surface radius", () => {
    render(<Card data-testid="card">Ibirimo</Card>);

    expect(screen.getByTestId("card")).toHaveClass("rounded-lg");
  });
});
