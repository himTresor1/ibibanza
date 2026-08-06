# Ibibanza Marketplace Rebuild

## Goal

Make the buyer-facing Ibibanza experience clear, mobile-first, and ready to ship. A buyer must be able to discover a plot, understand its essential facts, request a visit, and return to the previous screen without friction.

The platform remains a lead-generation service. It does not try to complete land transfer, payment, or sale inside the product.

## Primary Buyer Flow

1. A buyer lands on the marketplace home page.
2. They use a prominent Airbnb-style search control above the hero imagery to set location, budget, and land use.
3. Search opens a dedicated results page with the matching plots and clear active filters.
4. Tapping a compact listing card opens its detail page. Media can still be swiped independently on the card.
5. The detail page shows a usable image gallery, price, size, location, availability, verification signals, and a clear request-a-visit action.
6. The buyer submits a request or calls the Ibibanza liaison. The sale continues outside the platform.

## Information Architecture

### Public routes

- `/`: marketplace landing and search entry point.
- `/search`: filterable results using URL query parameters for location, budget, and land use.
- `/plots/[slug]`: listing details and visit request.
- `/submit-land`: seller land-submission form.
- `/alerts`: buyer WhatsApp alert preference form.

All public form and detail routes include a clear back affordance. The home page acts as the root, so it does not need one.

## Layout and Responsive Behavior

### Home

- A compact top bar contains the Ibibanza wordmark, alerts, seller entry, and call action.
- The search control is a standalone surface above the hero image. It must never overlap or sit behind imagery.
- Desktop search has three readable field groups and a direct search button.
- Mobile search remains a visible stacked control with the same labels and values; it does not collapse into invisible plain inputs.
- The hero image follows the search surface and provides short brand context only.
- Plot cards use a two-column grid from compact mobile widths upward, with dense metadata and no oversized action area. Desktop expands to three or four columns where space permits.

### Cards

- A 4:3 swipeable image frame reserves its size before images load.
- The card body is compact: location, title, price, size, remaining plots, and verification signal.
- The title/body and a visible arrow affordance link to details. The card no longer relies on a small low-priority text button for the main route.
- Card controls have at least 44px touch targets, while content remains dense enough for two cards per mobile row.

### Search Results

- A back link leads home.
- The active search fields stay visible and editable above the results.
- Empty results explain that there are no current matches and offer the WhatsApp alert route.
- Result cards use the same component as the home page.

### Plot Detail

- A persistent top back control is visible before the title.
- Mobile uses a horizontally swipeable image gallery with count and detail affordances; desktop uses a balanced gallery grid.
- Core facts are immediately visible: price, plot size, location, use, and remaining count.
- Verification and buying-process information follow in scannable sections.
- The visit request is anchored from the primary CTA. On mobile, the CTA is persistent at the bottom; on desktop, the form remains in a sticky right rail.

### Forms

- Seller submission, WhatsApp alerts, and visit request forms have clear labels, legible input text, focused/error/loading/success states, and a back control when opened as a standalone route.
- Form fields stay full-width on mobile, with sensible grouping only when there is enough horizontal space.

## Visual System

- Use the project’s AlignUI-inspired `@ibibanza/ui` components and semantic tokens; remove one-off layout treatment that makes controls disappear.
- Use Manrope consistently with a restrained blue primary, dark ink, and high-contrast white surfaces.
- Keep cards and form surfaces at an 8px radius or less; hero media may use a larger radius because it is a page-level image treatment.
- Use Remix icons consistently for navigation, search, map, gallery, call, and share actions.
- Avoid gradients, decorative cards within cards, and text placed over busy imagery without sufficient contrast.

## Interaction and States

- Search maps form values to URL parameters and filters local data now; the same contract can later consume API results.
- Media controls use native horizontal scrolling with scroll snap and no layout shift.
- Buttons, inputs, and filters provide hover, focus, active, disabled, and loading feedback.
- Use `next/image` for marketplace media, with defined aspect ratios and remote image configuration.
- Respect reduced-motion preferences.

## Technical Boundaries

- Reuse the existing mock data as the public search data source for this MVP.
- Keep lead capture API contracts unchanged.
- Add small, focused frontend tests for search query handling and the reusable back-navigation component where practical.
- Preserve the existing NestJS API and admin routes; this rebuild is primarily the buyer-facing Next.js surface.

## Acceptance Criteria

- Every plot card makes the detail route visibly discoverable and the route returns 200.
- Search fields are visibly usable and are positioned above, not over, the hero image.
- Search results respond to location, budget, and land-use inputs.
- Mobile shows two compact cards per row without clipped text or horizontal page scrolling.
- Detail, seller, and alerts routes offer a visible way back.
- Desktop and mobile screenshots show no overlapping controls, hidden input values, or unreadable overlay text.
- Typecheck, lint, tests, production build, and route smoke checks pass.
