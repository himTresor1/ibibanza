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

  it("includes a minimum price in the shareable URL when set", () => {
    expect(
      buildPlotSearchHref({
        location: "Kanombe",
        minPrice: 10000000,
        maxPrice: 40000000,
        landUse: "Guturwamo",
      }),
    ).toBe("/search?location=Kanombe&minPrice=10000000&maxPrice=40000000&landUse=Guturwamo");
  });

  it("filters plots below a minimum price out of range", () => {
    const search = parsePlotSearch({ minPrice: "20000000" });
    expect(filterPlots(plots, search).map((plot) => plot.slug)).not.toContain("bugesera-nyamata-12m");
  });
});
