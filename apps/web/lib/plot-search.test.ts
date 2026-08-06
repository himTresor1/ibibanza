import { describe, expect, it } from "vitest";
import { plots } from "./mock-data";
import { buildPlotSearchHref, filterPlots, parsePlotSearch } from "./plot-search";

describe("plot search", () => {
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
