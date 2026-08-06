import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlotGallery } from "./plot-gallery";

describe("PlotGallery", () => {
  it("labels the gallery with the listing name and image count", () => {
    render(
      <PlotGallery
        title="Ikibanza i Nyamata"
        images={[
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ]}
      />,
    );

    expect(screen.getByLabelText("Amafoto 2 ya Ikibanza i Nyamata")).toBeInTheDocument();
  });
});
