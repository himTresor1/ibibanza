import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PlotSearchForm } from "./plot-search-form";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("PlotSearchForm", () => {
  beforeEach(() => {
    push.mockReset();
  });

  it("sends visible location, budget, and land-use values to search results", () => {
    render(<PlotSearchForm />);

    fireEvent.change(screen.getByLabelText("Aho ushaka"), { target: { value: "Nyamata" } });
    fireEvent.change(screen.getByLabelText("Budget yawe"), { target: { value: "13000000" } });
    fireEvent.change(screen.getByLabelText("Icyiciro"), { target: { value: "Guturwamo" } });
    fireEvent.click(screen.getByRole("button", { name: "Shaka ibibanza" }));

    expect(push).toHaveBeenCalledWith("/search?location=Nyamata&maxPrice=13000000&landUse=Guturwamo");
  });
});
