# Ibibanza Marketplace Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Rebuild Ibibanza's public buyer flow into a clear, mobile-first land marketplace with visible Airbnb-style search, compact cards, usable plot details, and dependable back navigation.

**Architecture:** Keep App Router pages thin. Put query parsing and deterministic filtering in apps/web/lib/plot-search.ts; put reusable public navigation, search controls, cards, and gallery in apps/web/features; retain mock data as the MVP source behind that contract. Leave NestJS and admin routes unchanged.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, local @ibibanza/ui components, Remix Icon, Vitest, Testing Library.

## Global Constraints

- Keep buyer-facing copy Kinyarwanda-first.
- Show the Ibibanza phone number, never a seller phone number.
- Put the search surface above the hero image; no negative margin or overlay positioning.
- Use two compact cards per row on mobile without horizontal page scrolling.
- Keep shared cards and forms at 8px radius or less.
- Use URL parameters named location, maxPrice, and landUse.
- Use next/image with explicit aspect ratios for marketplace media.
- Detail, seller, and alerts routes must show a visible BackLink.
- Do not change lead capture API contracts or admin routes.
- Complete typecheck, lint, tests, build, route checks, and rendered desktop/mobile inspection before completion.

---

## File Structure

- apps/web/lib/plot-search.ts: typed query parsing, URL generation, and filtering.
- apps/web/lib/plot-search.test.ts: unit tests for query/filter behavior.
- apps/web/features/navigation/back-link.tsx: public secondary-page navigation.
- apps/web/features/plots/plot-search-form.tsx: visible three-field search control.
- apps/web/features/plots/plot-card.tsx: compact listing card.
- apps/web/features/plots/plot-gallery.tsx: responsive detail gallery.
- apps/web/app/page.tsx: landing/search/featured plots.
- apps/web/app/search/page.tsx: URL-driven results and empty state.
- apps/web/app/plots/[slug]/page.tsx: detail information hierarchy and visit CTA.
- apps/web/app/submit-land/page.tsx and apps/web/app/alerts/page.tsx: forms with back navigation.
- apps/web/features/leads/buyer-interest-form.tsx: visit form and mobile request CTA target.
- apps/web/app/globals.css and packages/ui/src/components/card.tsx: tokens and shared compact surface.
- apps/web/next.config.ts: approved Unsplash remote images.
- apps/web/package.json, apps/web/vitest.config.ts, apps/web/test/setup.ts: frontend test runner.

---

### Task 1: Add Search Contracts and Shared Navigation

**Files:**
- Create: apps/web/lib/plot-search.ts
- Create: apps/web/lib/plot-search.test.ts
- Create: apps/web/features/navigation/back-link.tsx
- Modify: apps/web/package.json
- Create: apps/web/vitest.config.ts
- Create: apps/web/test/setup.ts
- Modify: packages/ui/src/components/card.tsx
- Modify: apps/web/app/globals.css

**Interfaces:**
- Produces type PlotSearch = { location: string; maxPrice?: number; landUse: string }.
- Produces parsePlotSearch, buildPlotSearchHref, and filterPlots.
- Produces BackLink({ href, children? }).

- [ ] **Step 1: Write the failing search test**

    import { describe, expect, it } from "vitest";
    import { filterPlots, parsePlotSearch } from "./plot-search";
    import { plots } from "./mock-data";

    describe("plot search", () => {
      it("matches normalized location, price ceiling, and use", () => {
        const search = parsePlotSearch({ location: " nyamata ", maxPrice: "13000000", landUse: "Guturwamo" });
        expect(filterPlots(plots, search).map((plot) => plot.slug)).toEqual(["bugesera-nyamata-12m"]);
      });
    });

- [ ] **Step 2: Run the focused test**

Run: npm -w apps/web run test -- plot-search.test.ts

Expected: failure because plot-search.ts has not been created.

- [ ] **Step 3: Implement the test runner, search contract, and BackLink**

    export function parsePlotSearch(input: Record<string, string | string[] | undefined>): PlotSearch {
      const rawPrice = Array.isArray(input.maxPrice) ? input.maxPrice[0] : input.maxPrice;
      const maxPrice = Number(rawPrice);
      return {
        location: String(Array.isArray(input.location) ? input.location[0] : input.location ?? "").trim(),
        maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
        landUse: String(Array.isArray(input.landUse) ? input.landUse[0] : input.landUse ?? "").trim(),
      };
    }

    export function filterPlots<T extends { district: string; sector: string; priceRwf: number; landUse: string }>(
      source: T[], search: PlotSearch,
    ) {
      const location = search.location.toLocaleLowerCase();
      return source.filter((plot) =>
        (!location || (plot.sector + " " + plot.district).toLocaleLowerCase().includes(location)) &&
        (!search.maxPrice || plot.priceRwf <= search.maxPrice) &&
        (!search.landUse || plot.landUse === search.landUse),
      );
    }

Configure Vitest with jsdom in apps/web. Add an accessible Next Link with RiArrowLeftLine, 44px minimum touch size, and visible focus styling. Change Card from rounded-2xl to rounded-lg; reinforce high-contrast semantic input surface/text tokens.

- [ ] **Step 4: Verify the contract**

Run: npm -w apps/web run test -- plot-search.test.ts && npm run test

Expected: focused test, shared tests, and UI tests pass.

- [ ] **Step 5: Commit**

    git add apps/web/lib/plot-search.ts apps/web/lib/plot-search.test.ts apps/web/features/navigation/back-link.tsx apps/web/package.json apps/web/vitest.config.ts apps/web/test/setup.ts packages/ui/src/components/card.tsx apps/web/app/globals.css package-lock.json
    git commit -m "feat: add marketplace search primitives"

### Task 2: Build Standalone Search and Compact Cards

**Files:**
- Create: apps/web/features/plots/plot-search-form.tsx
- Modify: apps/web/features/plots/plot-card.tsx
- Modify: apps/web/app/page.tsx
- Modify: apps/web/next.config.ts
- Modify: apps/web/lib/mock-data.ts
- Modify: apps/web/lib/plot-search.ts
- Modify: apps/web/lib/plot-search.test.ts

**Interfaces:**
- Consumes PlotSearch, buildPlotSearchHref, plots, and formatRwf.
- Produces PlotSearchForm({ initialSearch? }) and compact PlotCard({ plot }).

- [ ] **Step 1: Write the failing URL-builder test**

    import { expect, it } from "vitest";
    import { buildPlotSearchHref } from "./plot-search";

    it("creates a shareable URL from visible fields", () => {
      expect(buildPlotSearchHref({ location: "Kanombe", maxPrice: 40000000, landUse: "Guturwamo" }))
        .toBe("/search?location=Kanombe&maxPrice=40000000&landUse=Guturwamo");
    });

- [ ] **Step 2: Run the test**

Run: npm -w apps/web run test -- plot-search.test.ts

Expected: failure because buildPlotSearchHref is missing.

- [ ] **Step 3: Implement the search form and compact media card**

    export function buildPlotSearchHref(search: PlotSearch) {
      const params = new URLSearchParams();
      if (search.location) params.set("location", search.location);
      if (search.maxPrice) params.set("maxPrice", String(search.maxPrice));
      if (search.landUse) params.set("landUse", search.landUse);
      return "/search?" + params.toString();
    }

Build a client form with visible labels Aho ushaka, Budget, and Icyiciro, then navigate to buildPlotSearchHref on submit. Render that search form before hero media in app/page.tsx, with no negative margin. Replace raw image tags with next/image; card media is aspect-[4/3] and horizontally scrollable. Place a 44px arrow link over the image and make title/price a clear second detail link. Remove the two full-width card buttons. Render a grid with grid-cols-2, md:grid-cols-3, and xl:grid-cols-4. Configure images.remotePatterns for images.unsplash.com.

- [ ] **Step 4: Verify source behavior**

Run: npm -w apps/web run typecheck && rg -n "<img|\\-mt|href=\"/alerts\"" apps/web/app/page.tsx apps/web/features/plots/plot-card.tsx

Expected: TypeScript passes; no raw marketplace image, negative search margin, or search redirect to alerts remains.

- [ ] **Step 5: Commit**

    git add apps/web/features/plots/plot-search-form.tsx apps/web/features/plots/plot-card.tsx apps/web/app/page.tsx apps/web/next.config.ts apps/web/lib/mock-data.ts apps/web/lib/plot-search.ts apps/web/lib/plot-search.test.ts
    git commit -m "feat: rebuild marketplace search and cards"

### Task 3: Add Search Results and Form Back Navigation

**Files:**
- Create: apps/web/app/search/page.tsx
- Modify: apps/web/app/submit-land/page.tsx
- Modify: apps/web/app/alerts/page.tsx
- Modify: apps/web/lib/plot-search.test.ts

**Interfaces:**
- Consumes parsePlotSearch, filterPlots, PlotSearchForm, PlotCard, and BackLink.
- Produces /search with query parameters as its source of truth.

- [ ] **Step 1: Write the no-results filtering test**

    it("returns no listings when a price ceiling excludes all plots", () => {
      expect(filterPlots(plots, { location: "", maxPrice: 1, landUse: "" })).toEqual([]);
    });

- [ ] **Step 2: Run the test**

Run: npm -w apps/web run test -- plot-search.test.ts

Expected: pass only when price filtering works; otherwise repair filterPlots before route implementation.

- [ ] **Step 3: Build results and add BackLink to forms**

Create an async /search App Router page. It converts searchParams with parsePlotSearch, displays BackLink href="/", keeps the populated search form visible, and maps filtered plots through PlotCard. For no results, present Kinyarwanda copy and a direct /alerts link. Add BackLink href="/" before the headings on seller submission and alert pages without changing their fields or API payloads.

- [ ] **Step 4: Verify pages**

Run: npm -w apps/web run build && curl -sS -o /dev/null -w "%{http_code}\\n" "http://localhost:3004/search?location=Nyamata&maxPrice=13000000&landUse=Guturwamo"

Expected: build succeeds and development route returns 200.

- [ ] **Step 5: Commit**

    git add apps/web/app/search/page.tsx apps/web/app/submit-land/page.tsx apps/web/app/alerts/page.tsx apps/web/lib/plot-search.test.ts
    git commit -m "feat: add marketplace search results"

### Task 4: Rebuild Detail Gallery and Visit Request

**Files:**
- Create: apps/web/features/plots/plot-gallery.tsx
- Create: apps/web/features/plots/plot-gallery.test.tsx
- Modify: apps/web/app/plots/[slug]/page.tsx
- Modify: apps/web/features/leads/buyer-interest-form.tsx

**Interfaces:**
- Produces PlotGallery({ images, title }).
- Detail page exposes #visit-request for its CTA.
- BuyerInterestForm owns the visit-request section and status feedback.

- [ ] **Step 1: Write the failing gallery accessibility test**

    import { render, screen } from "@testing-library/react";
    import { expect, it } from "vitest";
    import { PlotGallery } from "./plot-gallery";

    it("labels the gallery with listing name and count", () => {
      render(<PlotGallery title="Ikibanza i Nyamata" images={["https://images.unsplash.com/a", "https://images.unsplash.com/b"]} />);
      expect(screen.getByLabelText("Amafoto 2 ya Ikibanza i Nyamata")).toBeInTheDocument();
    });

- [ ] **Step 2: Run the test**

Run: npm -w apps/web run test -- plot-gallery.test.tsx

Expected: failure because PlotGallery is missing.

- [ ] **Step 3: Build responsive gallery and clear hierarchy**

Use next/image in PlotGallery. Mobile uses an aspect-[4/3] horizontal scroll-snap gallery with image count; desktop uses a balanced gallery grid. Detail starts with BackLink href="/", then title/location, gallery, immediate fact grid, verification sections, and a clear Tegura gusura Link to #visit-request. BuyerInterestForm gets id="visit-request", role="status" feedback, explicit call alternative, a sticky desktop rail, and a mobile fixed request bar with page padding so content is never obscured.

- [ ] **Step 4: Verify detail behavior**

Run: npm -w apps/web run test -- plot-gallery.test.tsx && npm -w apps/web run typecheck && npm -w apps/web run lint

Expected: gallery test, types, and lint pass without public raw-img warnings.

- [ ] **Step 5: Commit**

    git add apps/web/features/plots/plot-gallery.tsx apps/web/features/plots/plot-gallery.test.tsx apps/web/app/plots/[slug]/page.tsx apps/web/features/leads/buyer-interest-form.tsx
    git commit -m "feat: rebuild plot detail experience"

### Task 5: QA the Mobile and Desktop Buyer Flow

**Files:**
- Modify: only the files from Tasks 1-4 for concrete defects confirmed by tests or rendered browser evidence.

**Interfaces:**
- Verifies home, search, detail, seller submission, and alerts at desktop and mobile sizes.

- [ ] **Step 1: Capture route evidence at mobile and desktop widths**

Use rendered browser screenshots for /, /search?location=Nyamata, /plots/bugesera-nyamata-12m, /submit-land, and /alerts. Check that all input text, cards, back actions, image controls, and CTAs are visible without page-level horizontal overflow.

- [ ] **Step 2: Write a regression test only for an observed failure**

    expect(screen.getByTestId("plot-grid")).toHaveClass("grid-cols-2");

- [ ] **Step 3: Make the narrowest correction**

Use semantic tokens and existing @ibibanza/ui primitives. Preserve two-column mobile grid, 44px control targets, visible focus treatment, and a no-overlap search layout.

- [ ] **Step 4: Run full verification**

    npm run typecheck
    npm run lint
    npm run test
    npm run build
    curl -sS -o /dev/null -w "%{http_code}\\n" http://localhost:3004/
    curl -sS -o /dev/null -w "%{http_code}\\n" "http://localhost:3004/search?location=Nyamata"
    curl -sS -o /dev/null -w "%{http_code}\\n" http://localhost:3004/plots/bugesera-nyamata-12m
    curl -sS -o /dev/null -w "%{http_code}\\n" http://localhost:3004/submit-land
    curl -sS -o /dev/null -w "%{http_code}\\n" http://localhost:3004/alerts

Expected: all checks pass and every public route returns 200.

- [ ] **Step 5: Commit QA-driven correction**

    git add apps/web/app apps/web/features apps/web/lib apps/web/next.config.ts apps/web/app/globals.css packages/ui/src/components/card.tsx
    git commit -m "fix: polish marketplace responsiveness"

## Plan Self-Review

- Spec coverage: Task 1 establishes tokens/navigation/search contracts; Task 2 makes search visible and cards compact; Task 3 builds results and form back actions; Task 4 completes gallery/detail/visit behavior; Task 5 verifies responsive quality.
- Placeholder scan: the only generic QA correction is intentionally constrained to observed defects, so no speculative code is requested.
- Type consistency: PlotSearch, parsePlotSearch, buildPlotSearchHref, filterPlots, PlotSearchForm, PlotCard, PlotGallery, and BackLink are defined before their consumers.
