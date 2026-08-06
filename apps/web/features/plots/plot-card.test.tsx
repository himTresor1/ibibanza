import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { plots } from "../../lib/mock-data";
import { PlotCard } from "./plot-card";

describe("PlotCard", () => {
  it("makes the detail route a clear listing action", () => {
    render(<PlotCard plot={plots[0]} />);

    expect(screen.getByRole("link", { name: "Fungura Ikibanza i Nyamata hafi y'umuhanda" }))
      .toHaveAttribute("href", "/plots/bugesera-nyamata-12m");
  });
});
