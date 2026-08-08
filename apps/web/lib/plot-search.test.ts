import { describe, expect, it } from "vitest";
import { plots } from "./mock-data";
import { LAND_USE_OPTIONS, buildPlotSearchHref, filterPlots, parsePlotSearch } from "./plot-search";

describe("plot search", () => {
  it("exposes the three land-use categories in a fixed order", () => {
    expect(LAND_USE_OPTIONS).toEqual(["Guturwamo", "Ubucuruzi", "Ubuhinzi"]);
  });

  it("matches a normalized location, price ceiling, and land use", () => {
    const search = parsePlotSearch({
      location: " nyamata ",
      maxPrice: "13000000",
      landUse: "Guturwamo",
    });

    expect(filterPlots(plots, search).map((plot) => plot.slug)).toEqual(["bugesera-nyamata-12m"]);
  });

  it("creates a shareable URL from visible search fields", () => {
    expect(
      buildPlotSearchHref({
        location: "Kanombe",
        maxPrice: 40000000,
        landUse: "Guturwamo",
      }),
    ).toBe("/search?location=Kanombe&maxPrice=40000000&landUse=Guturwamo");
  });
});
