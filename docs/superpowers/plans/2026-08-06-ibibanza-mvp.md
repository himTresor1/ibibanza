# Ibibanza MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build **Ibibanza**, a Kinyarwanda-first, mobile-heavy land lead platform that lists plots, captures seller submissions and buyer interest, gives admins a working lead desk, and supports manual WhatsApp land alerts.

**Architecture:** Use `/Users/peaam/ibibanza` as the product root and build the two-app monorepo inside it, with `apps/web` for Next.js and `apps/api` for NestJS. Use PostgreSQL with Prisma in the API app, shared Zod/type definitions in `packages/shared`, and copy/import the relevant `asssembly-ui` package patterns into `packages/ui` so the frontend uses the existing design system with a blue theme.

**Tech Stack:** Next.js 16, React 19, NestJS, Prisma, PostgreSQL, Zod, React Hook Form, Tailwind CSS v4, asssembly-ui components, Vitest/Jest, Playwright.

## Global Constraints

- Keep the platform Kinyarwanda-first; English can exist only as internal code names or later i18n fallback.
- Product name is `Ibibanza`.
- All implementation files live under `/Users/peaam/ibibanza`.
- Public listing pages show only the platform call/WhatsApp number, never seller phone numbers.
- The app drives sales but does not handle land transfer, notary work, government services, or payments in MVP.
- WhatsApp is manual for MVP: generate segmented recipient lists and message drafts, then liaison sends outside the system.
- Buyer forms must preserve user input after API errors.
- Input validation happens on blur or submit, not per keystroke.
- Every form field must have a visible label; placeholders are helper examples only.
- Use PostgreSQL and Prisma, not SQLite.
- Use `asssembly-ui` design system source from `https://github.com/himTresor1/asssembly-ui`, especially its `packages/ui` components and semantic Tailwind token style.
- Theme direction is calm blue, practical, trustworthy, and mobile responsive.
- Build small, working slices. Do not add seller accounts, payments, automated WhatsApp sending, government transfer flows, or public seller contact exposure in this MVP.

---

## File Structure

- `package.json` - product root npm workspaces and scripts for web, api, shared, ui, lint, test, build, dev.
- `apps/web/` - Next.js frontend.
- `apps/web/app/(public)/page.tsx` - landing/listing homepage.
- `apps/web/app/(public)/plots/[slug]/page.tsx` - public plot detail screen.
- `apps/web/app/(public)/submit-land/page.tsx` - seller submission screen.
- `apps/web/app/(public)/alerts/page.tsx` - buyer WhatsApp alert opt-in screen.
- `apps/web/app/admin/*` - admin lead desk screens.
- `apps/web/features/*` - screen-specific components and API clients.
- `apps/web/lib/api-client.ts` - typed HTTP client for Nest API.
- `apps/api/` - NestJS API app.
- `apps/api/prisma/schema.prisma` - PostgreSQL schema.
- `apps/api/src/modules/plots/*` - public/admin plot APIs.
- `apps/api/src/modules/sellers/*` - seller submission APIs.
- `apps/api/src/modules/buyers/*` - alert opt-in and buyer profile APIs.
- `apps/api/src/modules/leads/*` - buyer interest and visit request APIs.
- `apps/api/src/modules/alerts/*` - segment matching and WhatsApp draft APIs.
- `apps/api/src/modules/admin/*` - admin auth guard and dashboard APIs.
- `apps/api/src/modules/notifications/*` - browser push subscription storage and notification stubs.
- `packages/shared/` - Zod schemas, enums, DTO types, Kinyarwanda constants.
- `packages/ui/` - copied/adapted asssembly-ui primitives needed for MVP plus blue theme tokens.
- `docs/api/openapi.md` - human-readable API docs generated from controllers/DTOs.

---

### Task 1: Monorepo Foundation

**Files:**
- Create: `package.json`
- Create: `apps/web/package.json`
- Create: `apps/api/package.json`
- Create: `packages/shared/package.json`
- Create: `packages/ui/package.json`
- Create: `apps/web/app`, `apps/web/public`, `apps/web/next.config.ts`, `apps/web/postcss.config.mjs`, `apps/web/eslint.config.mjs`, `apps/web/tsconfig.json`.

**Interfaces:**
- Produces root scripts: `npm run dev`, `npm run dev:web`, `npm run dev:api`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
- Produces workspace package aliases: `@ibibanza/shared`, `@ibibanza/ui`.

- [ ] Create the product root with npm workspaces `apps/*` and `packages/*`.
- [ ] Scaffold a clean Next app inside `apps/web`.
- [ ] Add `apps/api` NestJS package scaffold.
- [ ] Add `packages/shared` and `packages/ui` package manifests.
- [ ] Verify `npm install` completes.
- [ ] Verify `npm run dev:web` starts the current Next page.
- [ ] Commit: `chore: set up ibibanza monorepo`.

### Task 2: asssembly-ui Blue Design System Slice

**Files:**
- Create: `packages/ui/src/index.ts`
- Create: `packages/ui/src/lib/cn.ts`
- Create: `packages/ui/src/components/button.tsx`
- Create: `packages/ui/src/components/input.tsx`
- Create: `packages/ui/src/components/textarea.tsx`
- Create: `packages/ui/src/components/select.tsx`
- Create: `packages/ui/src/components/checkbox.tsx`
- Create: `packages/ui/src/components/card.tsx`
- Create: `packages/ui/src/components/badge.tsx`
- Create: `packages/ui/src/components/table.tsx`
- Create: `packages/ui/src/components/form-field.tsx`
- Modify: `apps/web/app/globals.css`

**Interfaces:**
- Produces UI imports from `@ibibanza/ui`: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Card`, `Badge`, `Table`, `FormField`, `cn`.
- Consumes asssembly-ui conventions: semantic tokens, shadcn/Radix style, visible form labels, field-level errors.

- [ ] Copy only the MVP-needed primitives from `asssembly-ui/packages/ui`, keeping source attribution in package README.
- [ ] Define blue theme tokens: `--background`, `--foreground`, `--brand`, `--brand-foreground`, `--surface`, `--muted`, `--border`, `--danger`.
- [ ] Style fields with clear labels, 44px minimum mobile tap height, strong focus ring, and no placeholder-as-label pattern.
- [ ] Create a Story/Test page at `/admin/ui` showing all form states: empty, focused, filled, error, disabled.
- [ ] Verify no form text overflows at 360px mobile width.
- [ ] Commit: `feat: add blue assembly UI foundation`.

### Task 3: Shared Domain Schemas

**Files:**
- Create: `packages/shared/src/enums.ts`
- Create: `packages/shared/src/plot.schema.ts`
- Create: `packages/shared/src/seller.schema.ts`
- Create: `packages/shared/src/buyer.schema.ts`
- Create: `packages/shared/src/lead.schema.ts`
- Create: `packages/shared/src/alert.schema.ts`
- Create: `packages/shared/src/kinyarwanda.ts`
- Create: `packages/shared/src/index.ts`

**Interfaces:**
- Produces Zod schemas: `CreatePlotSchema`, `SellerSubmissionSchema`, `BuyerPreferenceSchema`, `BuyerInterestSchema`, `AlertDraftSchema`.
- Produces enums: `LandUse`, `PlotStatus`, `LeadStatus`, `BuyerUrgency`, `BuyerType`, `PreferredLanguage`.

- [ ] Define land use values: `residential`, `commercial`, `farming`, `mixed`, `unknown`.
- [ ] Define plot statuses: `draft`, `pending_review`, `published`, `reserved`, `sold`, `archived`.
- [ ] Define lead statuses: `new`, `called`, `visit_scheduled`, `visited`, `negotiating`, `won`, `lost`.
- [ ] Add Kinyarwanda labels for locations, budget, land use, urgency, buyer type, and CTA copy.
- [ ] Add unit tests for valid/invalid phone numbers, missing labels, budgets, and consent.
- [ ] Commit: `feat: define shared land schemas`.

### Task 4: PostgreSQL + Prisma Data Model

**Files:**
- Create: `apps/api/prisma/schema.prisma`
- Create: `apps/api/prisma/seed.ts`
- Create: `apps/api/src/prisma/prisma.module.ts`
- Create: `apps/api/src/prisma/prisma.service.ts`
- Create: `apps/api/.env.example`

**Interfaces:**
- Produces Prisma models: `Seller`, `Plot`, `PlotImage`, `Buyer`, `Lead`, `AlertDraft`, `AlertRecipient`, `PushSubscription`, `AdminUser`, `AuditLog`.
- Consumes `DATABASE_URL`.

- [ ] Model `Seller` with private name/phone fields.
- [ ] Model `Plot` with public fields, private verification notes, seller relation, status, slug, and admin-only exact location fields.
- [ ] Model `Buyer` with WhatsApp consent, phone, location interests, budget range, land uses, urgency, buyer type, language.
- [ ] Model `Lead` linking buyer/contact info to plot and status history.
- [ ] Model `AlertDraft` and `AlertRecipient` for manual WhatsApp alert preparation.
- [ ] Model `PushSubscription` for browser notification opt-in.
- [ ] Add seed data for 4 plots, 6 buyers, and 3 leads using realistic Rwanda examples.
- [ ] Run `npx prisma migrate dev --name init`.
- [ ] Run `npx prisma db seed`.
- [ ] Commit: `feat: add prisma postgres data model`.

### Task 5: NestJS API Foundation and Documentation

**Files:**
- Create: `apps/api/src/main.ts`
- Create: `apps/api/src/app.module.ts`
- Create: `apps/api/src/common/validation/zod-validation.pipe.ts`
- Create: `apps/api/src/common/errors/http-error.filter.ts`
- Create: `apps/api/src/common/security/admin-api-key.guard.ts`
- Create: `apps/api/src/common/openapi/swagger.ts`
- Create: `docs/api/openapi.md`

**Interfaces:**
- Produces API base path `/api/v1`.
- Produces Swagger/OpenAPI at `/docs`.
- Requires `ADMIN_API_KEY`, `WEB_ORIGIN`.

- [ ] Enable CORS only for `WEB_ORIGIN`.
- [ ] Add request validation using shared Zod schemas.
- [ ] Add admin API key guard for `/admin/*` endpoints.
- [ ] Add global error response format: `{ message, code, fieldErrors? }`.
- [ ] Add Swagger docs with examples in Kinyarwanda-facing payload names where relevant.
- [ ] Add health endpoint `GET /api/v1/health`.
- [ ] Test health endpoint and validation failure shape.
- [ ] Commit: `feat: add nest api foundation`.

### Task 6: Plot Listing APIs

**Files:**
- Create: `apps/api/src/modules/plots/plots.module.ts`
- Create: `apps/api/src/modules/plots/plots.controller.ts`
- Create: `apps/api/src/modules/plots/plots.service.ts`
- Create: `apps/api/src/modules/plots/dto.ts`
- Create: `apps/api/src/modules/plots/plots.service.spec.ts`

**Interfaces:**
- Produces public endpoints:
  - `GET /api/v1/plots?location=&minPrice=&maxPrice=&landUse=`
  - `GET /api/v1/plots/:slug`
- Produces admin endpoints:
  - `POST /api/v1/admin/plots`
  - `PATCH /api/v1/admin/plots/:id`
  - `PATCH /api/v1/admin/plots/:id/status`

- [ ] Public list returns only published/reserved plots and hides seller contact.
- [ ] Public detail hides seller contact, private notes, exact UPI/document fields.
- [ ] Admin create/update supports verification badges and status changes.
- [ ] Unit test confirms public responses never include `sellerPhone`.
- [ ] Commit: `feat: add plot listing api`.

### Task 7: Seller Submission API

**Files:**
- Create: `apps/api/src/modules/sellers/sellers.module.ts`
- Create: `apps/api/src/modules/sellers/sellers.controller.ts`
- Create: `apps/api/src/modules/sellers/sellers.service.ts`
- Create: `apps/api/src/modules/sellers/sellers.service.spec.ts`

**Interfaces:**
- Produces `POST /api/v1/seller-submissions`.
- Returns `{ id, status: "pending_review" }`.

- [ ] Accept seller name, seller phone, district/sector, plot size, price, land use, photos as URLs for MVP, and seller notes.
- [ ] Create seller if phone is new; reuse seller if phone exists.
- [ ] Create plot with `pending_review` status.
- [ ] Add audit log entry `seller_submission_created`.
- [ ] Test duplicate seller phone reuses seller record.
- [ ] Commit: `feat: add seller submission api`.

### Task 8: Buyer Leads and Alert Opt-In APIs

**Files:**
- Create: `apps/api/src/modules/buyers/buyers.module.ts`
- Create: `apps/api/src/modules/buyers/buyers.controller.ts`
- Create: `apps/api/src/modules/buyers/buyers.service.ts`
- Create: `apps/api/src/modules/leads/leads.module.ts`
- Create: `apps/api/src/modules/leads/leads.controller.ts`
- Create: `apps/api/src/modules/leads/leads.service.ts`
- Create: `apps/api/src/modules/buyers/buyers.service.spec.ts`
- Create: `apps/api/src/modules/leads/leads.service.spec.ts`

**Interfaces:**
- Produces:
  - `POST /api/v1/buyers/alert-opt-in`
  - `POST /api/v1/plots/:plotId/interests`
  - `GET /api/v1/admin/leads`
  - `PATCH /api/v1/admin/leads/:id/status`

- [ ] Upsert buyer by phone when they opt into alerts.
- [ ] Require `consentWhatsapp = true` before a buyer can receive WhatsApp alert drafts.
- [ ] Create lead from plot interest with buyer contact and preferred callback time.
- [ ] Notify admin dashboard through persisted `new` lead status; no external automation yet.
- [ ] Test buyer input is preserved by returning field errors without deleting saved buyer on partial failure.
- [ ] Commit: `feat: add buyer lead and alert opt-in api`.

### Task 9: Manual WhatsApp Alert Engine

**Files:**
- Create: `apps/api/src/modules/alerts/alerts.module.ts`
- Create: `apps/api/src/modules/alerts/alerts.controller.ts`
- Create: `apps/api/src/modules/alerts/alerts.service.ts`
- Create: `apps/api/src/modules/alerts/whatsapp-message-builder.ts`
- Create: `apps/api/src/modules/alerts/alerts.service.spec.ts`

**Interfaces:**
- Produces:
  - `POST /api/v1/admin/alerts/draft-for-plot/:plotId`
  - `GET /api/v1/admin/alerts/:id`
  - `POST /api/v1/admin/alerts/:id/mark-sent`
- Produces helper `buildWhatsappMessage(plot, countRemaining, language): string`.

- [ ] Match buyers where `consentWhatsapp = true`, location matches, land use matches, and max budget is at least plot price or empty.
- [ ] Rank recipients by urgency: `now`, `this_month`, `later`.
- [ ] Generate Kinyarwanda alert copy with one action: call/WhatsApp platform number.
- [ ] Include remaining plots/site urgency fields when admin supplies them.
- [ ] Save recipients as `pending`; never auto-send.
- [ ] Provide copyable phone list and copyable message body.
- [ ] Test that buyers without consent are excluded.
- [ ] Test that seller phone never appears in alert copy.
- [ ] Commit: `feat: add manual whatsapp alert drafts`.

### Task 10: Browser Notification Subscription Stub

**Files:**
- Create: `apps/api/src/modules/notifications/notifications.module.ts`
- Create: `apps/api/src/modules/notifications/notifications.controller.ts`
- Create: `apps/api/src/modules/notifications/notifications.service.ts`
- Create: `apps/web/features/notifications/notification-opt-in.tsx`

**Interfaces:**
- Produces:
  - `POST /api/v1/notifications/subscribe`
  - `DELETE /api/v1/notifications/subscribe`

- [ ] Add browser notification opt-in UI as secondary CTA after WhatsApp opt-in.
- [ ] Store browser push subscription payloads.
- [ ] Do not send web push in MVP unless VAPID keys are configured.
- [ ] Show clear Kinyarwanda copy that WhatsApp alerts are primary.
- [ ] Commit: `feat: store browser notification subscriptions`.

### Task 11: Public Homepage and Listings Screen

**Files:**
- Create: `apps/web/app/(public)/page.tsx`
- Create: `apps/web/features/plots/plot-card.tsx`
- Create: `apps/web/features/plots/plot-filters.tsx`
- Create: `apps/web/features/plots/plot-list.tsx`
- Create: `apps/web/lib/api-client.ts`

**Screen Requirements:**
- Mobile first.
- Above the fold: brand, promise, call button, WhatsApp button, quick filters.
- Primary copy in Kinyarwanda.
- Plot cards show image, district/sector, price, size, land use, remaining/reserved hint, and trust badges.
- CTA on every card: `Hamagara ubu` and `Saba gusura ikibanza`.

- [ ] Build responsive listing screen using `@ibibanza/ui` Card, Badge, Button, Select, Input.
- [ ] Filters: location, budget, land use.
- [ ] Empty state says no matching plots and invites user to request alerts.
- [ ] Ensure phone number links use platform number only.
- [ ] Add Playwright mobile screenshot test for 390px width.
- [ ] Commit: `feat: build public plot listings screen`.

### Task 12: Plot Detail and Buyer Interest Form

**Files:**
- Create: `apps/web/app/(public)/plots/[slug]/page.tsx`
- Create: `apps/web/features/leads/buyer-interest-form.tsx`
- Create: `apps/web/features/plots/plot-detail-gallery.tsx`
- Create: `apps/web/features/plots/trust-checklist.tsx`

**Screen Requirements:**
- Images first on mobile.
- Sticky bottom action bar on mobile with call and request visit.
- Form labels visible, field errors inline, values preserved after server errors.
- Required fields: name, phone, preferred visit time, buyer note.

- [ ] Build gallery with stable aspect ratio.
- [ ] Add trust checklist: photos checked, location confirmed, viewing available, documents pending/checked.
- [ ] Add buyer interest form with React Hook Form + shared schema.
- [ ] On success, show confirmation and platform phone number.
- [ ] Add test that seller phone is absent from rendered HTML.
- [ ] Commit: `feat: build plot detail and buyer interest form`.

### Task 13: Seller Submit Land Screen

**Files:**
- Create: `apps/web/app/(public)/submit-land/page.tsx`
- Create: `apps/web/features/sellers/seller-land-form.tsx`
- Create: `apps/web/features/sellers/photo-url-list-input.tsx`

**Screen Requirements:**
- Kinyarwanda-first seller guidance.
- Explain: listing is reviewed before publishing; seller contact stays private; platform calls interested buyers.
- Inputs: seller name, seller phone, district, sector, price, size, land use, photo URLs, access notes, seller notes.

- [ ] Build seller form with visible labels and helper text.
- [ ] Validate phone, price, size, location, and at least one contact method.
- [ ] Preserve all inputs if API rejects submission.
- [ ] Success screen tells seller the team will call to confirm details.
- [ ] Commit: `feat: build seller land submission screen`.

### Task 14: Buyer Alert Opt-In Screen

**Files:**
- Create: `apps/web/app/(public)/alerts/page.tsx`
- Create: `apps/web/features/buyers/alert-opt-in-form.tsx`
- Create: `apps/web/features/buyers/budget-range-fields.tsx`
- Create: `apps/web/features/buyers/location-multi-select.tsx`

**Screen Requirements:**
- This is the WhatsApp growth engine.
- Ask only what improves relevance: phone, locations, budget, land use, urgency, diaspora/local, language, WhatsApp consent.
- CTA: `Ohereza ubutaka bushya kuri WhatsApp`.

- [ ] Build opt-in form with segmented controls/check boxes for preferences.
- [ ] Add consent checkbox with clear copy.
- [ ] After submit, show “save our number” prompt and a WhatsApp click-to-chat link.
- [ ] Add tests for no consent = no opt-in submit.
- [ ] Commit: `feat: build whatsapp alert opt-in screen`.

### Task 15: Admin Shell and Dashboard

**Files:**
- Create: `apps/web/app/admin/layout.tsx`
- Create: `apps/web/app/admin/page.tsx`
- Create: `apps/web/features/admin/admin-nav.tsx`
- Create: `apps/web/features/admin/admin-stat-card.tsx`

**Screen Requirements:**
- Dense, practical admin UI.
- Show counts: published plots, pending submissions, new leads, visit scheduled, alert recipients.
- Protect admin API calls with `ADMIN_API_KEY` entered in local-only admin session storage for MVP.

- [ ] Build admin layout with sidebar on desktop and tab nav on mobile.
- [ ] Add dashboard stats and latest leads table.
- [ ] Add API key gate screen.
- [ ] Commit: `feat: build admin dashboard shell`.

### Task 16: Admin Plot Management

**Files:**
- Create: `apps/web/app/admin/plots/page.tsx`
- Create: `apps/web/app/admin/plots/[id]/page.tsx`
- Create: `apps/web/features/admin/plots/admin-plot-table.tsx`
- Create: `apps/web/features/admin/plots/admin-plot-form.tsx`

**Screen Requirements:**
- Admin can approve seller submissions, edit fields, publish/archive/reserve/sold.
- Admin-only fields include seller contact, internal notes, exact location, UPI/document status.

- [ ] Build plot table with status filters.
- [ ] Build admin plot edit form with private seller section clearly separated.
- [ ] Add status transition buttons.
- [ ] Add warning before publishing plots without photos.
- [ ] Commit: `feat: build admin plot management`.

### Task 17: Admin Leads Desk

**Files:**
- Create: `apps/web/app/admin/leads/page.tsx`
- Create: `apps/web/features/admin/leads/lead-table.tsx`
- Create: `apps/web/features/admin/leads/lead-status-board.tsx`
- Create: `apps/web/features/admin/leads/lead-detail-panel.tsx`

**Screen Requirements:**
- This is the liaison workspace.
- Show buyer phone, plot, budget, urgency, last status, next action.
- Quick actions: call link, WhatsApp link, update status.

- [ ] Build mobile-friendly lead cards and desktop table.
- [ ] Add filters by status and urgency.
- [ ] Add status update flow.
- [ ] Add “call now” and “WhatsApp buyer” links.
- [ ] Commit: `feat: build admin leads desk`.

### Task 18: Admin WhatsApp Alert Composer

**Files:**
- Create: `apps/web/app/admin/alerts/page.tsx`
- Create: `apps/web/app/admin/alerts/[id]/page.tsx`
- Create: `apps/web/features/admin/alerts/alert-composer.tsx`
- Create: `apps/web/features/admin/alerts/recipient-preview.tsx`
- Create: `apps/web/features/admin/alerts/message-preview.tsx`

**Screen Requirements:**
- Admin selects a plot, enters remaining plot count/visit window, generates matching recipients and Kinyarwanda message.
- Admin copies phone list and message manually.
- No automatic WhatsApp sending.

- [ ] Build plot selector and alert inputs.
- [ ] Show recipient count by urgency/location/budget.
- [ ] Show excluded count for no consent.
- [ ] Generate copyable Kinyarwanda message.
- [ ] Add mark-as-sent button after manual send.
- [ ] Commit: `feat: build manual whatsapp alert composer`.

### Task 19: Security, Abuse, and Data Protection Pass

**Files:**
- Modify: `apps/api/src/common/security/*`
- Modify: `apps/api/src/modules/*`
- Modify: `apps/web/features/*`
- Create: `docs/security-mvp.md`

**Requirements:**
- Seller phone never public.
- Admin routes require API key.
- CORS locked to frontend origin.
- Inputs validated server-side.
- Audit log for admin mutations.

- [ ] Add server-side redaction tests for public plot endpoints.
- [ ] Add rate limit middleware for public lead/submission endpoints.
- [ ] Add audit logs for admin plot edits, lead status changes, alert draft creation, mark sent.
- [ ] Document MVP security model and known limits.
- [ ] Commit: `chore: harden mvp security`.

### Task 20: End-to-End Verification

**Files:**
- Create: `apps/web/e2e/public-flow.spec.ts`
- Create: `apps/web/e2e/admin-flow.spec.ts`
- Modify: root `package.json`

**Verification Paths:**
- Seller submits land.
- Admin approves/publishes plot.
- Buyer sees plot and requests visit.
- Buyer opts into WhatsApp alerts.
- Admin generates alert draft.
- Admin marks alert sent.

- [ ] Add Playwright tests for public seller and buyer flows.
- [ ] Add Playwright test for admin alert composer.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run test`.
- [ ] Run `npm run build`.
- [ ] Start both servers and manually verify mobile at 390px and desktop at 1440px.
- [ ] Commit: `test: verify land lead mvp flows`.

---

## WhatsApp Alert Design

The MVP does not send WhatsApp automatically. It prepares clean, segmented alert work for the liaison.

**Buyer segmentation fields:**
- Locations: district/sector interest.
- Budget: min and max.
- Land use: residential, commercial, farming, mixed.
- Urgency: now, this month, later.
- Buyer type: local, diaspora.
- Preferred language: Kinyarwanda, English, French.
- WhatsApp consent: required.

**Matching rule for MVP:**

```ts
const locationMatch = buyer.locations.includes(plot.district) || buyer.locations.includes(plot.sector)
const useMatch = buyer.landUses.includes(plot.landUse)
const budgetMatch = buyer.maxBudget == null || plot.price <= buyer.maxBudget
const consentMatch = buyer.consentWhatsapp === true

return locationMatch && useMatch && budgetMatch && consentMatch
```

**Kinyarwanda message shape:**

```text
IBIBANZA BISHYA - {district}

Hasigaye ibibanza {remainingCount}.
Igiciro gitangirira kuri {price} RWF.
Ingano: {size}
Icyiciro: {landUse}
Gusura: {visitWindow}

Ushaka kugisura cyangwa kubaza amakuru, duhamagare:
{platformPhone}

Reba amafoto n'ibisobanuro:
{plotUrl}
```

**Why manual first:** it avoids WhatsApp API template approval, opt-in complexity, pricing setup, quality-rating risk, and accidental spam while the business is still validating whether alerts create real calls.

## Self-Review

- Spec coverage: monorepo, Next frontend, Nest backend, PostgreSQL/Prisma, Kinyarwanda, admin, alerts, browser notification storage, security, and API docs are covered.
- Placeholder scan: no placeholder markers remain.
- Type consistency: plot, buyer, lead, alert, and status names are consistent across tasks.
