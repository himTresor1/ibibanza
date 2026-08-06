import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BackLink } from "./back-link";

describe("BackLink", () => {
  it("renders a clear route back to the marketplace", () => {
    render(<BackLink href="/" />);

    expect(screen.getByRole("link", { name: "Subira ku bibanza" })).toHaveAttribute("href", "/");
  });
});
