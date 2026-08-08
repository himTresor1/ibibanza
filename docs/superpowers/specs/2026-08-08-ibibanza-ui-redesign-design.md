# Ibibanza Airbnb-Inspired UI Redesign

## Goal

Replace Ibibanza's current visual language with one fully standardized, Airbnb-inspired design system, applied without exception across every surface: public marketplace, seller/buyer forms, and the admin console. "Standardized" means every page consumes the same token layer and the same `@ibibanza/ui` components — no page-local color, radius, spacing, or type-size decisions.

This redesign supersedes the visual constraints set in the 2026-08-06 marketplace rebuild spec (notably its 8px radius ceiling) and applies to every route the earlier plan touched, plus every admin route it left alone.

## Non-Goals

- Media upload for photos/video, and any storage/pricing model for that media. Covered by a follow-up spec once this one ships.
- Backend/API contract changes. Lead capture, plot, seller, buyer, and alert endpoints are unchanged.
- New features (favorites, accounts, map search, etc.) beyond what the visual system requires to render existing data.
- Literal pixel-for-pixel Airbnb cloning. This is Airbnb-inspired: the search-bar anatomy, card structure, spacing rhythm, and detail-page layout borrow from Airbnb's patterns; the palette, type, and content are Ibibanza's own.

## Design Decisions (confirmed)

- **Fidelity:** Airbnb-inspired, designed from established patterns — not a live extraction from airbnb.com.
- **Brand color:** new earthy green, replacing the current blue, everywhere blue appears today (CTAs, links, active states, focus rings, brand marks).
- **Scope:** everything — public marketplace pages and the admin console both move to the new system.
- **Admin density:** same tokens and components as the public site, at tighter spacing/sizing — one system, two densities, not two systems.
- **Typeface:** keep Manrope.
- **Migration approach:** token-first, single pass. Redefine the token layer and shared `@ibibanza/ui` components first, then migrate every consuming page in the same effort — not a parallel v2 library, not incremental per-page patching.

## Token Layer

All values below live in `apps/web/app/globals.css` (CSS variables) and are consumed exclusively through `packages/ui`'s `tailwind-variants` slots. No page may declare a raw hex color, arbitrary radius, or arbitrary spacing value — if a page needs a visual property, it comes from a token or a component prop.

### Color

Primitive green scale (replaces the current blue primitive scale):

| token | hex |
|---|---|
| `--green-50` | `#F0F9F1` |
| `--green-100` | `#DCF0DF` |
| `--green-200` | `#B8E0C0` |
| `--green-300` | `#8CCB9C` |
| `--green-400` | `#5FB377` |
| `--green-500` | `#3C9A5C` |
| `--green-600` (brand base) | `#2E7D48` |
| `--green-700` | `#256339` |
| `--green-800` | `#1E4F2F` |
| `--green-900` | `#163B23` |

Semantic tokens (unchanged names, re-pointed):

- `--brand` → `--green-600`, `--brand-hover` → `--green-700`, `--brand-active` → `--green-800`
- `--brand-alpha-10`, `--brand-alpha-16` → rgba equivalents of `--green-600`
- `--background` → `--bg-weak-50` (`#F7F7F5`, warm off-white, not the current cool `#f6f8fa`)
- `--foreground` → `--text-strong-950` (`#141412`, near-black, not pure black)
- `--surface` → `--bg-white-0` (`#FFFFFF`)
- `--muted` → `--bg-soft-100` (`#F0F0EE`)
- `--muted-foreground` → `--text-sub-600` (`#565650`)
- `--border` → `--stroke-soft-200` (`#E3E3DE`)
- `--danger` unchanged in role, re-tuned to `#D7263D` to sit well against the warm neutrals
- Verified/trust badges reuse `--green-500`/`--green-50` rather than introducing a separate "success" color — green already means "good" in this product.

### Radius — exactly three tokens, no exceptions

- `--radius-pill` (`999px`): search bar shell, category filter chips, badges, status pills.
- `--radius-field` (`12px`): buttons, inputs, selects, textareas, checkboxes.
- `--radius-card` (`16px`): cards, image containers, modals/panels, galleries.

Any component or page using `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-sm`, or an arbitrary `rounded-[...]` value outside these three is a defect.

### Typography

Manrope, one scale, used everywhere via component/text-style props (no arbitrary `text-[15px]` etc.):

| style | size/line-height | weight | usage |
|---|---|---|---|
| display | 36/44 (28/36 mobile) | 800 | hero headline only |
| h1 | 28/36 | 700 | page titles |
| h2 | 22/28 | 700 | section titles |
| h3 | 18/24 | 600 | card/section subtitles |
| body-lg | 16/24 | 500 | lead paragraphs, key facts |
| body | 14/20 | 400 | default UI text |
| body-sm | 13/18 | 400 | secondary/meta text |
| caption | 12/16 | 500 | labels, badges, uppercase micro-copy |

### Spacing

4px base grid: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`. Page gutters are fixed, not ad hoc: `16px` mobile, `24px` tablet, `64px` desktop.

### Shadow

- `--shadow-card`: `0 2px 8px rgba(20,20,18,0.08)` (resting)
- `--shadow-card-hover`: `0 8px 24px rgba(20,20,18,0.14)` (hover/lift)
- Focus shadows keep their current structure, recolored to `--green-600`.

## Component Standardization

`packages/ui` keeps its existing `tv()`-slot architecture (button, input, select, textarea, checkbox, card, badge, table, form-field) — that part already works. The redesign changes what the slots render, not the API:

- **Button:** existing `variant` × `mode` × `size` matrix stays; recolor to green; radius becomes `--radius-field`; add a `large` size (`h-14`) for the hero search CTA and primary marketing actions — the only new size, needed because nothing in the current scale is tall enough for an Airbnb-style hero search.
- **Input / Select / Textarea:** radius `--radius-field`, label always rendered above the field (never a placeholder-as-label), helper/error text below, focus ring in `--green-600`.
- **Checkbox:** radius `--radius-field` on the box.
- **Card:** radius `--radius-card`, no border, `--shadow-card` at rest, `--shadow-card-hover` on hover, image fills the top at a fixed aspect ratio.
- **Badge:** radius `--radius-pill`.
- **Table (admin):** unchanged structurally; row height and cell padding tighten under the admin density rule below.
- **New component — filter chip:** radius `--radius-pill`, used for the land-use category row on home/search; filled `--green-600` when active, `--stroke-soft-200` outline when inactive.
- **New component — search bar shell:** a `--radius-pill` container holding three field segments (location, budget, land use) and a circular icon-only submit button, replacing the current stacked/boxed search form.

## Layout Patterns

### Home (`/`)

- Sticky top bar: wordmark, condensed search summary (appears once scrolled past the hero search), submit-land link, call/WhatsApp button.
- Search band sits directly below the header in a `--bg-weak-50` band — not overlapping or behind imagery, carrying forward the existing "search above hero, no negative margin" rule. Headline + the pill search bar live here.
- Category filter chip row (Guturwamo, Ubucuruzi, Ubuhinzi, Bivanze) directly below the search bar, horizontally scrollable, driving the `landUse` query parameter on select.
- Featured plots grid below, using the standardized card.

### Search Results (`/search`)

- Collapsed/editable search pill at top plus results count.
- Same card grid component as home.
- Empty state: Kinyarwanda copy + direct link to `/alerts`, no dead end.

### Plot Detail (`/plots/[slug]`)

- `BackLink` first, then title/location.
- Gallery: mobile is a swipeable `--radius-card` carousel with a photo-count indicator; desktop is an asymmetric grid (one large tile + smaller thumbnails), Airbnb's gallery pattern, still `next/image` with explicit aspect ratios.
- Stat strip immediately below the gallery: price, size, land use, status badge.
- Verification/description sections below the stat strip.
- Desktop: sticky right-rail visit-request card (the Airbnb "booking widget" analog) — price, `Tegura gusura` CTA, trust note.
- Mobile: fixed bottom bar with call + request-visit actions, page content padded so nothing sits underneath it.

### Forms (`/submit-land`, `/alerts`, buyer interest)

- Single centered column, `max-w-lg`, card-contained, generous vertical rhythm from the spacing scale.
- Every field: visible label above, helper text below, inline error state — only `@ibibanza/ui` form components, no local markup.

### Admin (dashboard, plots, leads, alerts, `/admin/ui`)

- Same tokens as the public site. Density, not a different system: nav items and table rows at `32–40px` height, `small`/`xsmall` component sizes as the default (vs. `medium`/`large` on the public site), tighter card padding on stat tiles.
- Sidebar (desktop) / top tabs (mobile) shell, `--bg-white-0` surface, `--stroke-soft-200` dividers.
- Status pills reuse the badge component at `--radius-pill`.

## Standardization Rules (the enforceable part)

- No raw hex, arbitrary Tailwind color class (`text-[#...]`, `bg-[#...]`), or arbitrary radius/spacing value outside the tokens above, anywhere under `apps/web`.
- Exactly three radius values app-wide, as defined.
- Exactly one type scale; no arbitrary `text-[Npx]`.
- All interactive elements keep the existing 44px minimum tap target.
- All focus states go through the one `:focus-visible` token already defined in `globals.css` (recolored, not redefined per component).
- A grep-style QA check (e.g. `rg "text-\[#|bg-\[#|rounded-(lg|2xl|3xl|sm)\b" apps/web` returning nothing outside `packages/ui`'s own token definitions) is part of the completion checklist, the same way the marketplace rebuild plan used `rg` checks for its constraints.

## Carried-Forward Constraints

Unchanged from the existing product rules — this redesign is visual, not behavioral:

- Kinyarwanda-first copy.
- Ibibanza phone number shown publicly; seller phone never shown.
- `BackLink` visible on detail, seller, and alerts routes.
- `next/image` with explicit aspect ratios for all marketplace media.
- Two compact cards per row on mobile, no page-level horizontal scroll.
- URL parameters remain `location`, `maxPrice`, `landUse`.
- Lead capture API contracts and admin routes unchanged.

## Superseded Constraints

- The 2026-08-06 rebuild spec's "cards and forms at 8px radius or less" is replaced by the three-token radius scale above (`12px` fields, `16px` cards, pill for chips/badges/search).

## Testing Strategy

- Extend the existing Vitest suite: any test asserting a specific class (e.g. the `grid-cols-2` card-grid test) is updated to match the new tokens rather than left to rot.
- Full checkpoint before completion, same pattern as prior plans: `typecheck`, `lint`, `test`, `build`, then a route-status sweep (curl 200 checks) across `/`, `/search`, `/plots/[slug]`, `/submit-land`, `/alerts`, `/admin`, `/admin/plots`, `/admin/plots/[id]`, `/admin/leads`, `/admin/alerts`, `/admin/ui`.
- Rendered inspection at mobile (390px) and desktop (1440px) for every route above — no overlapping controls, no clipped text, no leftover blue/old-radius artifacts.

## Acceptance Criteria

- Every public and admin page renders using only `@ibibanza/ui` components and the token layer — zero raw color/radius/spacing overrides found by the grep check.
- Brand color is green everywhere blue previously appeared (CTAs, links, focus rings, active nav state, brand mark).
- Search bar, category chips, badges, and status pills all use the pill radius; buttons/inputs/selects/textareas/checkboxes all use the field radius; cards/galleries/panels all use the card radius.
- Admin and public surfaces are visually one family (same colors, same type scale, same component shapes) at two different densities.
- Typecheck, lint, tests, and production build all pass; every route in the sweep returns 200.
- Mobile and desktop screenshots of every route above show no overlap, no clipping, and no token violations.
