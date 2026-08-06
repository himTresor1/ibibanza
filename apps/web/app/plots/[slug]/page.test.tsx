import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PlotDetailPage from "./page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("PlotDetailPage", () => {
  it("provides a clear jump to the visit request", async () => {
    render(await PlotDetailPage({ params: Promise.resolve({ slug: "bugesera-nyamata-12m" }) }));

    expect(screen.getByRole("link", { name: "Tegura gusura" })).toHaveAttribute("href", "#visit-request");
  });
});
