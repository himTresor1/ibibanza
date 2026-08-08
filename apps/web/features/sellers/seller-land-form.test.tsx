import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SellerLandForm } from "./seller-land-form";

describe("SellerLandForm", () => {
  it("renders step 1 with seller fields and a Komeza button", () => {
    render(<SellerLandForm />);

    expect(screen.getByLabelText("Amazina y'ugurisha")).toBeInTheDocument();
    expect(screen.getByLabelText("Telefone")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Komeza" })).toBeInTheDocument();
    expect(screen.queryByLabelText("Akarere")).not.toBeInTheDocument();
  });
});
