# Ibibanza Airbnb-Inspired UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Ibibanza's visual language with one fully standardized, Airbnb-inspired design system — a green brand palette, a three-value radius scale, one type scale — applied without exception across the public marketplace and the admin console.

**Architecture:** Repoint the existing token layer (`apps/web/app/globals.css`) in place — keep every CSS variable name the same, change only the hex/rgba values — so every component and page that already reads `var(--primary-base)`, `var(--text-strong-950)`, etc. picks up the new palette automatically. Then standardize radius by converging every component onto exactly three Tailwind radius utilities (`rounded-xl` for fields, `rounded-2xl` for cards, `rounded-full` for pills), add two new small `packages/ui` primitives (`Chip`, and a `large` `Button` size), then migrate every public and admin page to use only tokens and `@ibibanza/ui` components — no page-local hex, no off-scale radius.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, `@ibibanza/ui` (`tailwind-variants`), Remix Icon, Vitest, Testing Library.

## Global Constraints

- No raw hex color or arbitrary Tailwind color class (`text-[#...]`, `bg-[#...]`) anywhere under `apps/web`, outside `packages/ui`'s own token definitions.
- Exactly three radius values app-wide: `rounded-xl` (12px, fields), `rounded-2xl` (16px, cards), `rounded-full` (pills/chips/badges/search bar). No `rounded-lg`, `rounded-md`, `rounded-[Npx]`.
- Brand color is green (`--primary-base` family) everywhere blue previously appeared: CTAs, links, active states, focus rings.
- Keep Manrope. Keep Kinyarwanda-first copy. Keep the Ibibanza phone number public; never show seller phone numbers.
- `BackLink` stays visible on detail, seller, and alerts routes. `next/image` keeps explicit aspect ratios for marketplace media.
- Two compact cards per row on mobile, no page-level horizontal scroll. URL parameters stay `location`, `maxPrice`, `landUse`.
- Lead capture API contracts and route behavior are unchanged — this is a visual migration only.
- This plan supersedes the 2026-08-06 marketplace rebuild plan's "8px radius or less" constraint.
- Complete typecheck, lint, tests, build, the token-violation grep, and a route-status sweep before completion (Task 14).

---

## File Structure

- `apps/web/app/globals.css` — token values (Task 1).
- `apps/web/app/globals.test.ts` — regression test asserting the new palette/shadow tokens are present (Task 1).
- `packages/ui/src/components/button.tsx`, `input.tsx` — radius + new `large` button size (Task 2).
- `packages/ui/src/components/select.tsx`, `textarea.tsx`, `checkbox.tsx` (+ new `select.test.tsx`, `textarea.test.tsx`, `checkbox.test.tsx`) — field radius (Task 3).
- `packages/ui/src/components/card.tsx`, `card.test.tsx`, `badge.tsx` (+ new `badge.test.tsx`) — card/pill radius and shadow tokens (Task 4).
- `packages/ui/src/components/chip.tsx`, `chip.test.tsx`, `packages/ui/src/index.ts` — new `Chip` primitive (Task 5).
- `apps/web/lib/plot-search.ts`, `plot-search.test.ts` — `LAND_USE_OPTIONS` constant (Task 6).
- `apps/web/features/plots/land-use-filter-chips.tsx`, `land-use-filter-chips.test.tsx` — new category filter row (Task 6).
- `apps/web/features/plots/plot-search-form.tsx` — rebuilt as an Airbnb-style pill search bar (Task 7).
- `apps/web/app/page.tsx` — home page hero/search/chip integration and radius cleanup (Task 8).
- `apps/web/features/plots/plot-card.tsx` — card radius inheritance, shadow tokens, pill photo-count badge (Task 9).
- `apps/web/app/search/page.tsx` — chip row integration, `Button`-based empty-state CTA (Task 10).
- `apps/web/app/plots/[slug]/page.tsx` — sticky CTA bar shadow token (Task 11).
- `apps/web/features/navigation/back-link.tsx`, `back-link.test.tsx` — radius fix + verification pass over the three forms (Task 12).
- `apps/web/app/admin/layout.tsx` (new), `apps/web/features/admin/admin-nav.tsx` (new) — shared admin shell (Task 13).
- `apps/web/app/admin/page.tsx`, `admin/plots/page.tsx`, `admin/leads/page.tsx`, `admin/alerts/page.tsx`, `admin/ui/page.tsx` — migrated onto the shell at admin density (Task 13).
- Task 14 touches no new files; it verifies everything above.

---

### Task 1: Repoint Global Tokens to the Green Palette

**Files:**
- Modify: `apps/web/app/globals.css`
- Create: `apps/web/app/globals.test.ts`

**Interfaces:**
- Every existing consumer of `var(--primary-base)`, `var(--brand)`, `var(--bg-weak-50)`, `var(--text-strong-950)`, etc. is unaffected at the call site — only the values change.
- Produces two new tokens: `--shadow-card`, `--shadow-card-hover`.

- [ ] **Step 1: Write the failing token regression test**

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("./globals.css", import.meta.url), "utf-8");

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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm -w apps/web run test -- globals.test.ts`
Expected: FAIL — `--primary-base: #2E7D48;` is not in the file yet.

- [ ] **Step 3: Repoint every value in `:root`**

Replace the entire `:root { ... }` block in `apps/web/app/globals.css` with:

```css
:root {
  --bg-white-0: #ffffff;
  --bg-weak-50: #f7f7f5;
  --bg-soft-100: #f0f0ee;
  --bg-surface-800: #2b2b28;
  --bg-strong-950: #141412;
  --text-white-0: #ffffff;
  --text-strong-950: #141412;
  --text-sub-600: #565650;
  --text-soft-400: #8a8a82;
  --text-disabled-300: #c7c7c0;
  --stroke-soft-200: #e3e3de;
  --stroke-sub-300: #cfcfc8;
  --primary-base: #2e7d48;
  --primary-darker: #256339;
  --primary-dark: #1e4f2f;
  --primary-alpha-10: rgba(46, 125, 72, 0.1);
  --primary-alpha-16: rgba(46, 125, 72, 0.16);
  --green-50: #f0f9f1;
  --green-500: #3c9a5c;
  --error-base: #d7263d;
  --red-alpha-10: rgba(215, 38, 61, 0.1);
  --shadow-regular-xs: 0 1px 2px rgba(20, 20, 18, 0.06);
  --shadow-button-primary-focus: 0 0 0 2px rgba(46, 125, 72, 0.18);
  --shadow-button-important-focus: 0 0 0 2px rgba(20, 20, 18, 0.12);
  --shadow-button-error-focus: 0 0 0 2px rgba(215, 38, 61, 0.18);
  --shadow-card: 0 2px 8px rgba(20, 20, 18, 0.08);
  --shadow-card-hover: 0 8px 24px rgba(20, 20, 18, 0.14);
  --background: var(--bg-weak-50);
  --foreground: var(--text-strong-950);
  --brand: var(--primary-base);
  --brand-foreground: var(--text-white-0);
  --surface: var(--bg-white-0);
  --muted: var(--bg-soft-100);
  --muted-foreground: var(--text-sub-600);
  --border: var(--stroke-soft-200);
  --danger: var(--error-base);
  --focus: var(--primary-alpha-16);
}
```

Do not change anything outside this block (the `*`, `html`, `body`, `h1,h2,h3`, `p`, `button,input,select,textarea`, `:focus-visible` rules stay as they are).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm -w apps/web run test -- globals.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/globals.css apps/web/app/globals.test.ts
git commit -m "feat: repoint design tokens to the green brand palette"
```

---

### Task 2: Standardize Button and Input Radius, Add a Large Button Size

**Files:**
- Modify: `packages/ui/src/components/button.tsx`
- Create: `packages/ui/src/components/button.test.tsx`
- Modify: `packages/ui/src/components/input.tsx`

**Interfaces:**
- `buttonVariants` gains a `size: "large"` option (`h-14`), joining the existing `medium | small | xsmall`.
- Every button/input radius becomes `rounded-xl`.

- [ ] **Step 1: Write the failing size/radius test**

```tsx
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("uses the shared field radius at every size", () => {
    render(<Button data-testid="btn">Ohereza</Button>);
    expect(screen.getByTestId("btn")).toHaveClass("rounded-xl");
  });

  it("supports a large size for hero CTAs", () => {
    render(<Button data-testid="btn" size="large">Shaka ibibanza</Button>);
    expect(screen.getByTestId("btn")).toHaveClass("h-14", "rounded-xl");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm -w packages/ui run test -- button.test.tsx`
Expected: FAIL — `size="large"` is not a valid variant yet, and the medium button still renders `rounded-[10px]`.

- [ ] **Step 3: Update the button size variants**

In `packages/ui/src/components/button.tsx`, replace the `size` block inside `buttonVariants`:

```ts
    size: {
      large: "h-14 gap-3 rounded-xl px-6 text-base font-semibold",
      medium: "h-10 gap-3 rounded-xl px-3.5 text-sm font-semibold",
      small: "h-9 gap-3 rounded-xl px-3 text-sm font-semibold",
      xsmall: "h-8 gap-2.5 rounded-xl px-2.5 text-sm font-semibold",
    },
```

`defaultVariants` stays `size: "medium"`.

In `packages/ui/src/components/input.tsx`, replace the `size` block inside `inputVariants`:

```ts
  variants: {
    size: {
      medium: { root: "rounded-xl", wrapper: "gap-2 px-3", input: "h-10" },
      small: { root: "rounded-xl", wrapper: "gap-2 px-2.5", input: "h-9" },
      xsmall: { root: "rounded-xl", wrapper: "gap-1.5 px-2", input: "h-8" },
    },
    hasError: {
      true: { root: "before:ring-[var(--error-base)] has-[input:focus]:shadow-[var(--shadow-button-error-focus)] has-[input:focus]:before:ring-[var(--error-base)]" },
    },
  },
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm -w packages/ui run test -- button.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/ui/src/components/button.tsx packages/ui/src/components/button.test.tsx packages/ui/src/components/input.tsx
git commit -m "feat: standardize button/input radius and add a large button size"
```

---

### Task 3: Standardize Field Radius on Select, Textarea, and Checkbox

**Files:**
- Modify: `packages/ui/src/components/select.tsx`
- Create: `packages/ui/src/components/select.test.tsx`
- Modify: `packages/ui/src/components/textarea.tsx`
- Create: `packages/ui/src/components/textarea.test.tsx`
- Modify: `packages/ui/src/components/checkbox.tsx`
- Create: `packages/ui/src/components/checkbox.test.tsx`

**Interfaces:**
- No prop changes — same `SelectProps`, `TextareaProps`, `CheckboxProps`.

- [ ] **Step 1: Write the three failing radius tests**

```tsx
// select.test.tsx
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

describe("Select", () => {
  it("uses the shared field radius", () => {
    render(<Select data-testid="select"><option>A</option></Select>);
    expect(screen.getByTestId("select")).toHaveClass("rounded-xl");
  });
});
```

```tsx
// textarea.test.tsx
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("uses the shared field radius", () => {
    render(<Textarea data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveClass("rounded-xl");
  });
});
```

```tsx
// checkbox.test.tsx
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("uses the shared field radius", () => {
    render(<Checkbox data-testid="checkbox" />);
    expect(screen.getByTestId("checkbox")).toHaveClass("rounded-xl");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm -w packages/ui run test -- select.test.tsx textarea.test.tsx checkbox.test.tsx`
Expected: FAIL — all three still render `rounded-lg` (checkbox renders the browser default `rounded`).

- [ ] **Step 3: Change `rounded-lg`/`rounded` to `rounded-xl`**

In `select.tsx` and `textarea.tsx`, change `rounded-lg` to `rounded-xl` in the single class string each component renders. In `checkbox.tsx`, change `rounded` to `rounded-xl`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm -w packages/ui run test -- select.test.tsx textarea.test.tsx checkbox.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/ui/src/components/select.tsx packages/ui/src/components/select.test.tsx packages/ui/src/components/textarea.tsx packages/ui/src/components/textarea.test.tsx packages/ui/src/components/checkbox.tsx packages/ui/src/components/checkbox.test.tsx
git commit -m "feat: standardize select/textarea/checkbox field radius"
```

---

### Task 4: Standardize Card and Badge Radius and Shadow Tokens

**Files:**
- Modify: `packages/ui/src/components/card.tsx`
- Modify: `packages/ui/src/components/card.test.tsx` (existing file, expectation changes)
- Modify: `packages/ui/src/components/badge.tsx`
- Create: `packages/ui/src/components/badge.test.tsx`

**Interfaces:**
- No prop changes.

- [ ] **Step 1: Update the existing Card test to expect the card radius**

Replace the assertion in `packages/ui/src/components/card.test.tsx`:

```tsx
    expect(screen.getByTestId("card")).toHaveClass("rounded-2xl");
```

Add a failing Badge test in a new `badge.test.tsx`:

```tsx
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("uses the shared pill radius", () => {
    render(<Badge data-testid="badge">Byagenzuwe</Badge>);
    expect(screen.getByTestId("badge")).toHaveClass("rounded-full");
  });
});
```

- [ ] **Step 2: Run both tests to verify they fail**

Run: `npm -w packages/ui run test -- card.test.tsx badge.test.tsx`
Expected: FAIL — `Card` still renders `rounded-lg`, `Badge` still renders `rounded-md`.

- [ ] **Step 3: Implement**

`card.tsx` — change the class string to use the card radius and shadow token:

```tsx
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--stroke-soft-200)] bg-white shadow-[var(--shadow-card)]",
        className,
      )}
      {...props}
    />
  );
}
```

`badge.tsx` — change `rounded-md` to `rounded-full`:

```tsx
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full bg-[var(--bg-weak-50)] px-2 text-xs font-medium text-[var(--text-sub-600)] ring-1 ring-inset ring-[var(--stroke-soft-200)]",
        className,
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Run both tests to verify they pass**

Run: `npm -w packages/ui run test -- card.test.tsx badge.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/ui/src/components/card.tsx packages/ui/src/components/card.test.tsx packages/ui/src/components/badge.tsx packages/ui/src/components/badge.test.tsx
git commit -m "feat: standardize card and badge radius and shadow tokens"
```

---

### Task 5: Add the Chip Primitive

**Files:**
- Create: `packages/ui/src/components/chip.tsx`
- Create: `packages/ui/src/components/chip.test.tsx`
- Modify: `packages/ui/src/index.ts`

**Interfaces:**
- Produces `Chip({ selected?: boolean } & HTMLAttributes<HTMLSpanElement>)`, exported from `@ibibanza/ui`.

- [ ] **Step 1: Write the failing tests**

```tsx
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chip } from "./chip";

describe("Chip", () => {
  it("uses the shared pill radius", () => {
    render(<Chip data-testid="chip">Guturwamo</Chip>);
    expect(screen.getByTestId("chip")).toHaveClass("rounded-full");
  });

  it("shows a filled brand state when selected", () => {
    render(<Chip data-testid="chip" selected>Guturwamo</Chip>);
    expect(screen.getByTestId("chip")).toHaveClass("bg-[var(--primary-base)]");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm -w packages/ui run test -- chip.test.tsx`
Expected: FAIL — `chip.tsx` does not exist.

- [ ] **Step 3: Implement**

```tsx
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
}

export function Chip({ className, selected, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex h-9 shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold transition",
        selected
          ? "bg-[var(--primary-base)] text-white"
          : "bg-[var(--bg-white-0)] text-[var(--text-sub-600)] ring-1 ring-inset ring-[var(--stroke-soft-200)] hover:bg-[var(--bg-weak-50)] hover:text-[var(--text-strong-950)]",
        className,
      )}
      {...props}
    />
  );
}
```

Add to `packages/ui/src/index.ts`:

```ts
export { Chip } from "./components/chip";
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm -w packages/ui run test -- chip.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/ui/src/components/chip.tsx packages/ui/src/components/chip.test.tsx packages/ui/src/index.ts
git commit -m "feat: add chip primitive for category filters"
```

---

### Task 6: Add Land-Use Options Constant and the Filter Chip Row

**Files:**
- Modify: `apps/web/lib/plot-search.ts`
- Modify: `apps/web/lib/plot-search.test.ts`
- Create: `apps/web/features/plots/land-use-filter-chips.tsx`
- Create: `apps/web/features/plots/land-use-filter-chips.test.tsx`

**Interfaces:**
- Produces `LAND_USE_OPTIONS: readonly ["Guturwamo", "Ubucuruzi", "Ubuhinzi"]` from `apps/web/lib/plot-search.ts`.
- Produces `LandUseFilterChips({ search: Partial<PlotSearch> })`.
- Consumes `Chip` from `@ibibanza/ui` and `buildPlotSearchHref` from `../../lib/plot-search`.

- [ ] **Step 1: Write the failing constant test**

Add to `apps/web/lib/plot-search.test.ts`:

```ts
import { LAND_USE_OPTIONS } from "./plot-search";

it("exposes the three land-use categories in a fixed order", () => {
  expect(LAND_USE_OPTIONS).toEqual(["Guturwamo", "Ubucuruzi", "Ubuhinzi"]);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm -w apps/web run test -- plot-search.test.ts`
Expected: FAIL — `LAND_USE_OPTIONS` is not exported yet.

- [ ] **Step 3: Add the constant**

Add to `apps/web/lib/plot-search.ts`, above `parsePlotSearch`:

```ts
export const LAND_USE_OPTIONS = ["Guturwamo", "Ubucuruzi", "Ubuhinzi"] as const;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm -w apps/web run test -- plot-search.test.ts`
Expected: PASS.

- [ ] **Step 5: Write the failing chip-row test**

```tsx
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LandUseFilterChips } from "./land-use-filter-chips";

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
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npm -w apps/web run test -- land-use-filter-chips.test.tsx`
Expected: FAIL — `land-use-filter-chips.tsx` does not exist.

- [ ] **Step 7: Implement**

```tsx
import Link from "next/link";
import { Chip } from "@ibibanza/ui";
import { LAND_USE_OPTIONS, buildPlotSearchHref, type PlotSearch } from "../../lib/plot-search";

interface LandUseFilterChipsProps {
  search: Partial<PlotSearch>;
}

export function LandUseFilterChips({ search }: LandUseFilterChipsProps) {
  const base = { location: search.location ?? "", maxPrice: search.maxPrice };

  return (
    <div
      role="group"
      aria-label="Hitamo icyiciro"
      className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <Link href={buildPlotSearchHref({ ...base, landUse: "" })}>
        <Chip selected={!search.landUse}>Ibyiciro byose</Chip>
      </Link>
      {LAND_USE_OPTIONS.map((option) => (
        <Link key={option} href={buildPlotSearchHref({ ...base, landUse: option })}>
          <Chip selected={search.landUse === option}>{option}</Chip>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npm -w apps/web run test -- land-use-filter-chips.test.tsx`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add apps/web/lib/plot-search.ts apps/web/lib/plot-search.test.ts apps/web/features/plots/land-use-filter-chips.tsx apps/web/features/plots/land-use-filter-chips.test.tsx
git commit -m "feat: add land-use filter chip row"
```

---

### Task 7: Rebuild the Search Form as an Airbnb-Style Pill Search Bar

**Files:**
- Modify: `apps/web/features/plots/plot-search-form.tsx`

**Interfaces:**
- Same props (`initialSearch?: Partial<PlotSearch>`), same field labels (`Aho ushaka`, `Budget yawe`, `Icyiciro`), same submit behavior — `apps/web/features/plots/plot-search-form.test.tsx` must keep passing unmodified.
- Consumes `LAND_USE_OPTIONS` from Task 6 instead of hardcoding the three options.

- [ ] **Step 1: Run the existing test to confirm current behavior**

Run: `npm -w apps/web run test -- plot-search-form.test.tsx`
Expected: PASS (baseline, before this task's changes — this test defines the contract we must not break).

- [ ] **Step 2: Rebuild the component**

Replace the full contents of `apps/web/features/plots/plot-search-form.tsx`:

```tsx
"use client";

import { Button, Input, Select } from "@ibibanza/ui";
import { RiSearchLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LAND_USE_OPTIONS, buildPlotSearchHref, type PlotSearch } from "../../lib/plot-search";

interface PlotSearchFormProps {
  initialSearch?: Partial<PlotSearch>;
}

const segmentField = "h-full w-full border-0 bg-transparent px-0 shadow-none focus:ring-0";

export function PlotSearchForm({ initialSearch }: PlotSearchFormProps) {
  const router = useRouter();
  const [location, setLocation] = useState(initialSearch?.location ?? "");
  const [maxPrice, setMaxPrice] = useState(initialSearch?.maxPrice ? String(initialSearch.maxPrice) : "");
  const [landUse, setLandUse] = useState(initialSearch?.landUse ?? "");

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const numericPrice = Number(maxPrice.replace(/[^\d]/g, ""));

    router.push(
      buildPlotSearchHref({
        location: location.trim(),
        maxPrice: Number.isFinite(numericPrice) && numericPrice > 0 ? numericPrice : undefined,
        landUse,
      }),
    );
  }

  return (
    <form onSubmit={submitSearch} aria-label="Shakisha ibibanza">
      <div className="flex flex-col gap-2 rounded-2xl bg-[var(--bg-white-0)] p-2 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-1.5 sm:ring-1 sm:ring-inset sm:ring-[var(--stroke-soft-200)]">
        <div className="min-w-0 flex-1 rounded-xl px-4 py-2 transition hover:bg-[var(--bg-weak-50)] sm:rounded-full">
          <label htmlFor="search-location" className="block text-xs font-semibold text-[var(--text-strong-950)]">
            Aho ushaka
          </label>
          <Input
            id="search-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Nyamata, Kanombe..."
            className={segmentField}
          />
        </div>
        <div className="hidden h-8 w-px shrink-0 self-center bg-[var(--stroke-soft-200)] sm:block" />
        <div className="min-w-0 flex-1 rounded-xl px-4 py-2 transition hover:bg-[var(--bg-weak-50)] sm:rounded-full">
          <label htmlFor="search-budget" className="block text-xs font-semibold text-[var(--text-strong-950)]">
            Budget yawe
          </label>
          <Input
            id="search-budget"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            inputMode="numeric"
            placeholder="Urugero: 20,000,000"
            className={segmentField}
          />
        </div>
        <div className="hidden h-8 w-px shrink-0 self-center bg-[var(--stroke-soft-200)] sm:block" />
        <div className="min-w-0 flex-1 rounded-xl px-4 py-2 transition hover:bg-[var(--bg-weak-50)] sm:rounded-full">
          <label htmlFor="search-land-use" className="block text-xs font-semibold text-[var(--text-strong-950)]">
            Icyiciro
          </label>
          <Select
            id="search-land-use"
            value={landUse}
            onChange={(event) => setLandUse(event.target.value)}
            className={segmentField}
          >
            <option value="">Ibyiciro byose</option>
            {LAND_USE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </Select>
        </div>
        <Button type="submit" className="mt-1 h-12 w-full shrink-0 gap-2 rounded-full sm:mt-0 sm:w-auto sm:px-6">
          <RiSearchLine className="size-5" />
          Shaka ibibanza
        </Button>
      </div>
    </form>
  );
}
```

- [ ] **Step 3: Run the existing test to verify it still passes**

Run: `npm -w apps/web run test -- plot-search-form.test.tsx`
Expected: PASS — labels, submit behavior, and the built URL are unchanged.

- [ ] **Step 4: Visually verify the pill layout**

Run: `npm -w apps/web run dev` and open `http://localhost:3000/`. Confirm at 390px width the three fields stack with visible labels and a full-width submit button, and at 1440px width the fields sit in one pill row with a compact submit button on the right and no visual overlap.

- [ ] **Step 5: Commit**

```bash
git add apps/web/features/plots/plot-search-form.tsx
git commit -m "feat: rebuild search form as an airbnb-style pill search bar"
```

---

### Task 8: Migrate the Home Page

**Files:**
- Modify: `apps/web/app/page.tsx`

**Interfaces:**
- Consumes `LandUseFilterChips` from Task 6.
- Keeps `data-testid="plot-grid"` and its `grid-cols-2 sm:grid-cols-3 xl:grid-cols-4` classes untouched (no existing test covers it directly, but Task 14's rendered check verifies the two-column mobile rule).

- [ ] **Step 1: Change the three off-scale nav/CTA radii**

In `apps/web/app/page.tsx`, change `rounded-lg` to `rounded-xl` in:
- the `/alerts` nav link (line ~21)
- the `/submit-land` nav link (line ~29)
- the hero "Reba ibibanza" link (line ~56)

- [ ] **Step 2: Insert the category filter row below the search form**

Change:

```tsx
        <div className="mt-6 sm:mt-8">
          <PlotSearchForm />
        </div>
```

to:

```tsx
        <div className="mt-6 sm:mt-8">
          <PlotSearchForm />
          <div className="mt-4">
            <LandUseFilterChips search={{}} />
          </div>
        </div>
```

Add the import:

```tsx
import { LandUseFilterChips } from "../features/plots/land-use-filter-chips";
```

- [ ] **Step 3: Run typecheck**

Run: `npm -w apps/web run typecheck`
Expected: no errors.

- [ ] **Step 4: Verify no off-scale radius remains on this page**

Run: `rg -n "rounded-lg|rounded-md" apps/web/app/page.tsx`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/page.tsx
git commit -m "feat: add category filter chips to the home page search"
```

---

### Task 9: Migrate the Plot Card

**Files:**
- Modify: `apps/web/features/plots/plot-card.tsx`

**Interfaces:**
- No prop changes — `PlotCardProps` is unchanged, and the existing `plot-card.test.tsx` (checks the `Fungura ...` link) must keep passing.

- [ ] **Step 1: Run the existing test to confirm baseline**

Run: `npm -w apps/web run test -- plot-card.test.tsx`
Expected: PASS.

- [ ] **Step 2: Replace stale shadow values and the photo-count badge radius**

In `apps/web/features/plots/plot-card.tsx`:
- Change the `Card` hover shadow from `hover:shadow-[0_10px_24px_rgba(14,18,27,0.08)]` to `hover:shadow-[var(--shadow-card-hover)]`.
- Change the photo-count badge (`Amafoto {n}`) from `rounded-md` to `rounded-full`.
- Change the circular arrow-link shadow from `shadow-[0_2px_10px_rgba(14,18,27,0.16)]` to `shadow-[var(--shadow-card)]`.

The `Card` component itself already renders `rounded-2xl` from Task 4 — no radius change needed on the `<Card>` element in this file.

- [ ] **Step 3: Run the test and confirm no stale shadows remain**

Run: `npm -w apps/web run test -- plot-card.test.tsx`
Expected: PASS.

Run: `rg -n "rgba\(14, ?18, ?27" apps/web/features/plots/plot-card.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add apps/web/features/plots/plot-card.tsx
git commit -m "feat: migrate plot card to card/pill tokens"
```

---

### Task 10: Migrate the Search Results Page

**Files:**
- Modify: `apps/web/app/search/page.tsx`

**Interfaces:**
- Consumes `LandUseFilterChips` from Task 6.
- The existing `search/page.test.tsx` (checks the `/alerts` link in the empty state) must keep passing.

- [ ] **Step 1: Run the existing test to confirm baseline**

Run: `npm -w apps/web run test -- page.test.tsx` (from `apps/web/app/search/`, or `npm -w apps/web run test -- app/search/page.test.tsx` from the repo root)
Expected: PASS.

- [ ] **Step 2: Insert the chip row and replace the hand-rolled CTA with `Button`**

Change:

```tsx
        <div className="mt-5">
          <PlotSearchForm initialSearch={search} />
        </div>
```

to:

```tsx
        <div className="mt-5">
          <PlotSearchForm initialSearch={search} />
          <div className="mt-4">
            <LandUseFilterChips search={search} />
          </div>
        </div>
```

Change the empty-state CTA from a hand-styled `<Link>` to the shared `Button`:

```tsx
            <Button asChild className="mt-5 w-fit">
              <Link href="/alerts" aria-label="Akira alerts kuri WhatsApp">
                Akira alerts kuri WhatsApp
              </Link>
            </Button>
```

Update the imports at the top of the file:

```tsx
import { Button, Card } from "@ibibanza/ui";
import Link from "next/link";
import { BackLink } from "../../features/navigation/back-link";
import { LandUseFilterChips } from "../../features/plots/land-use-filter-chips";
import { PlotCard } from "../../features/plots/plot-card";
import { PlotSearchForm } from "../../features/plots/plot-search-form";
import { plots } from "../../lib/mock-data";
import { filterPlots, parsePlotSearch } from "../../lib/plot-search";
```

- [ ] **Step 3: Run the test and typecheck**

Run: `npm -w apps/web run test -- app/search/page.test.tsx && npm -w apps/web run typecheck`
Expected: PASS, no type errors.

- [ ] **Step 4: Verify no off-scale radius remains**

Run: `rg -n "rounded-lg|rounded-md" apps/web/app/search/page.tsx`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/search/page.tsx
git commit -m "feat: migrate search results page to shared chips and button"
```

---

### Task 11: Migrate the Plot Detail Page

**Files:**
- Modify: `apps/web/app/plots/[slug]/page.tsx`

**Interfaces:**
- No structural changes — `app/plots/[slug]/page.test.tsx` (checks the `#visit-request` link) must keep passing.

- [ ] **Step 1: Run the existing test to confirm baseline**

Run: `npm -w apps/web run test -- "app/plots/\[slug\]/page.test.tsx"`
Expected: PASS.

- [ ] **Step 2: Replace the stale sticky-bar shadow color**

Change the fixed mobile CTA bar's shadow from `shadow-[0_-8px_24px_rgba(14,18,27,0.08)]` to `shadow-[0_-8px_24px_rgba(20,20,18,0.08)]` (matching the new warm-neutral shadow color; this bar keeps its own upward-facing direction, so it is not merged into `--shadow-card-hover`, which points down).

- [ ] **Step 3: Run the test to verify it still passes**

Run: `npm -w apps/web run test -- "app/plots/\[slug\]/page.test.tsx"`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add "apps/web/app/plots/[slug]/page.tsx"
git commit -m "fix: match plot detail sticky bar shadow to the new neutral palette"
```

---

### Task 12: Verify Forms and Fix BackLink Radius

**Files:**
- Modify: `apps/web/features/navigation/back-link.tsx`

**Interfaces:**
- `apps/web/features/navigation/back-link.test.tsx` must keep passing unmodified.
- `BuyerInterestForm`, `SellerLandForm`, `AlertOptInForm` are verified, not modified — they already compose only `Card`, `Input`, `Select`, `Textarea`, `Checkbox`, `Button`, `FormField`, all of which inherit the new tokens automatically from Tasks 1–4.

- [ ] **Step 1: Change the BackLink radius**

In `apps/web/features/navigation/back-link.tsx`, change `rounded-lg` to `rounded-xl`.

- [ ] **Step 2: Run the BackLink test**

Run: `npm -w apps/web run test -- back-link.test.tsx`
Expected: PASS.

- [ ] **Step 3: Confirm the three forms have no local color/radius overrides**

Run:

```bash
rg -n "rounded-lg|rounded-md|text-\[#|bg-\[#" \
  apps/web/features/leads/buyer-interest-form.tsx \
  apps/web/features/sellers/seller-land-form.tsx \
  apps/web/features/buyers/alert-opt-in-form.tsx
```

Expected: no output — confirms these three forms need no changes because they only compose already-migrated `@ibibanza/ui` components.

- [ ] **Step 4: Run the full frontend suite**

Run: `npm -w apps/web run test`
Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add apps/web/features/navigation/back-link.tsx
git commit -m "fix: standardize back-link radius"
```

---

### Task 13: Build the Admin Shell and Migrate Admin Pages to Admin Density

**Files:**
- Create: `apps/web/features/admin/admin-nav.tsx`
- Create: `apps/web/app/admin/layout.tsx`
- Modify: `apps/web/app/admin/page.tsx`
- Modify: `apps/web/app/admin/plots/page.tsx`
- Modify: `apps/web/app/admin/leads/page.tsx`
- Modify: `apps/web/app/admin/alerts/page.tsx`
- Modify: `apps/web/app/admin/ui/page.tsx`

**Interfaces:**
- Produces `AdminNav()` — a client component rendering a desktop sidebar (`lg:flex`) and a mobile top tab bar (`lg:hidden`), both from a single `ADMIN_NAV_ITEMS` list.
- `AdminLayout({ children })` wraps every `/admin/*` route with `AdminNav` plus a shared `<main>` container, so individual pages no longer repeat `min-h-screen bg-[var(--background)] px-4 py-8` wrappers.
- Admin pages use `Button`/`Card` at `small`/default sizing with tighter padding — "admin density," same tokens as the public site.

- [ ] **Step 1: Create the admin nav component**

```tsx
"use client";

import { cn } from "@ibibanza/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardLine, RiMap2Line, RiTeamLine, RiWhatsappLine, type RemixiconComponentType } from "@remixicon/react";

const ADMIN_NAV_ITEMS: { href: string; label: string; icon: RemixiconComponentType }[] = [
  { href: "/admin", label: "Ihuriro", icon: RiDashboardLine },
  { href: "/admin/plots", label: "Ibibanza", icon: RiMap2Line },
  { href: "/admin/leads", label: "Leads desk", icon: RiTeamLine },
  { href: "/admin/alerts", label: "WhatsApp alerts", icon: RiWhatsappLine },
];

function AdminNavLink({ href, label, icon: Icon, active }: { href: string; label: string; icon: RemixiconComponentType; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)]",
        active
          ? "bg-[var(--primary-alpha-10)] text-[var(--primary-base)]"
          : "text-[var(--text-sub-600)] hover:bg-[var(--bg-soft-100)] hover:text-[var(--text-strong-950)]",
      )}
    >
      <Icon className="size-5 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-56 shrink-0 flex-col gap-1 border-r border-[var(--stroke-soft-200)] bg-[var(--bg-white-0)] px-3 py-6 lg:flex">
        <Link href="/admin" className="mb-4 px-3 text-lg font-bold text-[var(--text-strong-950)]">
          Ibibanza admin
        </Link>
        {ADMIN_NAV_ITEMS.map((item) => (
          <AdminNavLink key={item.href} {...item} active={pathname === item.href} />
        ))}
      </aside>
      <nav className="flex gap-1 overflow-x-auto border-b border-[var(--stroke-soft-200)] bg-[var(--bg-white-0)] px-3 py-2 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ADMIN_NAV_ITEMS.map((item) => (
          <AdminNavLink key={item.href} {...item} active={pathname === item.href} />
        ))}
      </nav>
    </>
  );
}
```

- [ ] **Step 2: Create the admin layout**

```tsx
import type { ReactNode } from "react";
import { AdminNav } from "../../features/admin/admin-nav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] lg:flex">
      <AdminNav />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">{children}</main>
    </div>
  );
}
```

- [ ] **Step 3: Simplify each admin page to drop the duplicated wrapper and tighten density**

Replace `apps/web/app/admin/page.tsx`:

```tsx
import { Badge, Card } from "@ibibanza/ui";
import Link from "next/link";
import { leads, plots } from "../../lib/mock-data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">Ihuriro rya admin</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4"><p className="text-sm text-[var(--muted-foreground)]">Ibibanza</p><strong className="text-2xl">{plots.length}</strong></Card>
        <Card className="p-4"><p className="text-sm text-[var(--muted-foreground)]">Leads nshya</p><strong className="text-2xl">{leads.length}</strong></Card>
        <Card className="p-4"><p className="text-sm text-[var(--muted-foreground)]">Alerts</p><strong className="text-2xl">Manual</strong></Card>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/plots"><Badge>Manage plots</Badge></Link>
        <Link href="/admin/leads"><Badge>Leads desk</Badge></Link>
        <Link href="/admin/alerts"><Badge>WhatsApp alerts</Badge></Link>
      </div>
    </div>
  );
}
```

Replace `apps/web/app/admin/plots/page.tsx`:

```tsx
import { Badge, Card, Table, TableCell, TableHead } from "@ibibanza/ui";
import { formatRwf, plots } from "../../../lib/mock-data";

export default function AdminPlotsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">Ibibanza byose</h1>
      <Card className="overflow-x-auto p-0">
        <Table>
          <thead><tr><TableHead>Ikibanza</TableHead><TableHead>Igiciro</TableHead><TableHead>Status</TableHead><TableHead>Hasigaye</TableHead></tr></thead>
          <tbody>{plots.map((plot) => <tr key={plot.slug}><TableCell>{plot.title}</TableCell><TableCell>{formatRwf(plot.priceRwf)}</TableCell><TableCell><Badge>{plot.status}</Badge></TableCell><TableCell>{plot.remainingCount}</TableCell></tr>)}</tbody>
        </Table>
      </Card>
    </div>
  );
}
```

Replace `apps/web/app/admin/leads/page.tsx`:

```tsx
import { Button, Card } from "@ibibanza/ui";
import { leads, platformPhone } from "../../../lib/mock-data";

export default function AdminLeadsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">Leads desk</h1>
      {leads.map((lead) => (
        <Card key={lead.id} className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div><strong>{lead.buyerName}</strong><p>{lead.buyerPhone} - {lead.plot.title}</p><p className="text-sm text-[var(--muted-foreground)]">{lead.status}</p></div>
          <div className="flex gap-2">
            <a href={`tel:${lead.buyerPhone}`}><Button size="small">Call</Button></a>
            <a href={`https://wa.me/${platformPhone.replace("+", "")}`}><Button size="small" variant="neutral" mode="stroke">WhatsApp</Button></a>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

Replace `apps/web/app/admin/alerts/page.tsx`:

```tsx
import { Button, Card, FormField, Input, Select, Textarea } from "@ibibanza/ui";
import { formatRwf, platformPhone, plots } from "../../../lib/mock-data";

export default function AdminAlertsPage() {
  const plot = plots[0];
  const message = `IBIBANZA BISHYA - ${plot.district}\n\nHasigaye ibibanza ${plot.remainingCount}.\nIgiciro: ${formatRwf(plot.priceRwf)}\nIngano: ${plot.sizeSqm} sqm\n\nUshaka kugisura, duhamagare:\n${platformPhone}`;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">WhatsApp alert composer</h1>
      <Card className="grid gap-4 p-4">
        <FormField id="plot" label="Hitamo ikibanza"><Select>{plots.map((item) => <option key={item.slug}>{item.title}</option>)}</Select></FormField>
        <FormField id="remaining" label="Ibisigaye"><Input defaultValue={plot.remainingCount} /></FormField>
        <FormField id="message" label="Message ya WhatsApp"><Textarea defaultValue={message} className="min-h-56 font-mono" /></FormField>
        <p className="text-sm text-[var(--muted-foreground)]">Recipients bazatoranywa hashingiwe kuri location, budget, land use, urgency na consentWhatsapp.</p>
        <Button size="small" className="w-fit">Copy message / mark sent manually</Button>
      </Card>
    </div>
  );
}
```

In `apps/web/app/admin/ui/page.tsx`, remove the outer `<main className="min-h-screen ...">`/`<div className="mx-auto max-w-4xl space-y-6">` wrapper (keep only its children, wrapped in a single `<div className="space-y-6">`), matching the pattern above.

- [ ] **Step 4: Run typecheck, lint, and tests**

Run: `npm -w apps/web run typecheck && npm -w apps/web run lint && npm -w apps/web run test`
Expected: all pass.

- [ ] **Step 5: Verify no off-scale radius remains in admin**

Run: `rg -n "rounded-lg|rounded-md" apps/web/app/admin apps/web/features/admin`
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add apps/web/features/admin/admin-nav.tsx apps/web/app/admin/layout.tsx apps/web/app/admin/page.tsx apps/web/app/admin/plots/page.tsx apps/web/app/admin/leads/page.tsx apps/web/app/admin/alerts/page.tsx apps/web/app/admin/ui/page.tsx
git commit -m "feat: build admin shell and migrate admin console to shared tokens"
```

---

### Task 14: Full Verification Sweep

**Files:**
- Modify: only files from Tasks 1–13, for concrete defects confirmed by the checks below.

**Interfaces:**
- Verifies every public and admin route against the Global Constraints.

- [ ] **Step 1: Run the token-violation grep across the whole frontend**

```bash
rg -n "text-\[#|bg-\[#|border-\[#|ring-\[#|shadow-\[#|rounded-(lg|md|2xl|3xl|sm)\b" apps/web packages/ui -g '!*.test.*' -g '!node_modules'
```

Expected: no output. (`rounded-2xl` is intentionally excluded from this grep on `packages/ui/src/components/card.tsx` and `apps/web/features/plots/plot-gallery.tsx` since `rounded-2xl` *is* the approved card token — if the grep flags anything outside those two known, approved uses, fix it.)

- [ ] **Step 2: Run full verification**

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Expected: all pass.

- [ ] **Step 3: Route-status sweep**

Start the dev server (`npm run dev:web`) and in another shell:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -sS -o /dev/null -w "%{http_code}\n" "http://localhost:3000/search?location=Nyamata"
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/plots/bugesera-nyamata-12m
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/submit-land
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/alerts
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin/plots
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin/leads
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin/alerts
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin/ui
```

Expected: every line prints `200`.

- [ ] **Step 4: Rendered inspection at mobile and desktop widths**

Use rendered browser screenshots at 390px and 1440px for every route in Step 3. Confirm: green brand color throughout (no blue remaining), consistent pill/field/card radius, two-column mobile plot grid with no horizontal scroll, no overlapping controls, no clipped text, admin sidebar on desktop / top tabs on mobile.

- [ ] **Step 5: Fix any concrete defect found in Step 4**

Write a regression test only for an observed failure (matching the pattern from the 2026-08-06 marketplace rebuild plan's QA task), then make the narrowest correction using existing tokens and `@ibibanza/ui` primitives — do not introduce new one-off styling.

- [ ] **Step 6: Commit**

```bash
git add apps/web packages/ui
git commit -m "fix: polish airbnb-inspired redesign after full verification sweep"
```

---

## Plan Self-Review

- **Spec coverage:** Token repoint (Task 1) covers the Color/Shadow sections; Tasks 2–5 cover every `packages/ui` component in the spec's Component Standardization section plus the new `Chip` and `large` `Button` size; Tasks 6–7 cover the new search-bar and filter-chip layout patterns; Tasks 8–12 cover every public route in the spec's Layout Patterns section; Task 13 covers the Admin section (shell + density); Task 14 covers the Testing Strategy and Acceptance Criteria sections verbatim, including the token-violation grep.
- **Route sweep correction:** the spec's Testing Strategy lists `/admin/plots/[id]` in its route sweep, but no such page exists in the repository (the `app/admin/plots/[id]` directory is empty — not a real route, and building it is out of scope for a visual migration). Task 14's sweep uses the actual existing admin routes instead: `/admin`, `/admin/plots`, `/admin/leads`, `/admin/alerts`, `/admin/ui`.
- **Deliberate scope decision — search bar shell:** the spec calls for a "new component — search bar shell." Since `PlotSearchForm` is its only consumer (home and search pages both reuse the same component), Task 7 implements the pill shell directly inside `plot-search-form.tsx` rather than adding a redundant intermediate component, per the codebase's YAGNI convention already visible in the existing plans.
- **Checkbox radius risk:** Task 3 applies `rounded-xl` (12px) to the 20px checkbox box, following the spec literally. Task 14's rendered inspection explicitly checks this — if it reads as over-rounded at that size, Step 5's narrowest-correction pattern applies (e.g., dropping to a smaller radius) without reopening the rest of the token work.
- **Placeholder scan:** no "TBD", "add appropriate styling", or unshown code remains — every step that changes code shows the exact before/after strings or full file content.
- **Type consistency:** `PlotSearch`, `LAND_USE_OPTIONS`, `buildPlotSearchHref`, `Chip`, `ChipProps` are defined in the task that introduces them and referenced with the same names and signatures in every later task that consumes them.
