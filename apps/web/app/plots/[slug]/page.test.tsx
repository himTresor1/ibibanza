import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PlotDetailPage from "./page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

vi.mock("../../../lib/plots-api", () => ({
  fetchPlotBySlug: vi.fn().mockResolvedValue({
    id: "plot_1",
    slug: "bugesera-nyamata-12m",
    title: "Ikibanza i Nyamata hafi y'umuhanda",
    district: "Bugesera",
    sector: "Nyamata",
    cell: "Rilima",
    village: "Kayenzi",
    priceRwf: 12000000,
    sizeSqm: 300,
    landUse: "Guturwamo",
    remainingCount: 8,
    imageUrls: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    ],
    badges: ["Amafoto yagenzuwe", "Aho kiri hemejwe"],
    tags: ["Metero 300 uvuye ku muhanda"],
  }),
}));

describe("PlotDetailPage", () => {
  it("provides a clear jump to the visit request", async () => {
    render(await PlotDetailPage({ params: Promise.resolve({ slug: "bugesera-nyamata-12m" }) }));

    expect(screen.getByRole("link", { name: "Tegura gusura" })).toHaveAttribute("href", "#visit-request");
  });
});
