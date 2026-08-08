import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LandUseFilterChips } from "./land-use-filter-chips";

afterEach(cleanup);

describe("LandUseFilterChips", () => {
  it("links each category to a filtered search while preserving location", () => {
    render(<LandUseFilterChips search={{ location: "Nyamata" }} />);

    expect(screen.getByRole("link", { name: "Guturwamo" }))
      .toHaveAttribute("href", "/search?location=Nyamata&landUse=Guturwamo");
  });

  it("links the all-categories chip back to an unfiltered search", () => {
    render(<LandUseFilterChips search={{ location: "Nyamata", landUse: "Ubucuruzi" }} />);

    expect(screen.getByRole("link", { name: "Ibyiciro byose" }))
      .toHaveAttribute("href", "/search?location=Nyamata");
  });
});
