/**
 * @vitest-environment node
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const css = readFileSync(fileURLToPath(new URL("./globals.css", import.meta.url)), "utf-8");

describe("design tokens", () => {
  it("uses the green brand palette, not the old blue", () => {
    expect(css).toContain("--primary-base: #2e7d48;");
    expect(css).not.toContain("#335cff");
  });

  it("defines card elevation tokens", () => {
    expect(css).toContain("--shadow-card:");
    expect(css).toContain("--shadow-card-hover:");
  });
});
