import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const css = readFileSync(join(__dirname, "globals.css"), "utf-8");

describe("design tokens", () => {
  it("uses the green brand palette, not the old blue", () => {
    expect(css).toContain("--primary-base: #2E7D48;");
    expect(css).not.toContain("#335cff");
  });

  it("defines card elevation tokens", () => {
    expect(css).toContain("--shadow-card:");
    expect(css).toContain("--shadow-card-hover:");
  });
});
