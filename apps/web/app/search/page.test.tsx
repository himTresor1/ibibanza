import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("../../lib/plots-api", () => ({
  fetchPlots: vi.fn().mockResolvedValue([]),
}));

describe("SearchPage", () => {
  it("offers WhatsApp alerts when there are no matching plots", async () => {
    render(await SearchPage({ searchParams: Promise.resolve({ location: "Musanze" }) }));

    expect(screen.getByRole("link", { name: "Akira alerts kuri WhatsApp" })).toHaveAttribute("href", "/alerts");
  });
});
