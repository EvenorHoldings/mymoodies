# Moodies Launch-Readiness Refinement

## Goal
Bring every customer-facing Moodies page into one polished premium retail system built around **“Taste Your Mood”**, while preserving the existing cart, order, authentication, and admin behaviour.

## Priority 1 — Repair the visual foundation
- Fix the broken editorial asset delivery currently leaving the homepage photography blank.
- Standardise image framing, intrinsic sizing, lazy loading, focal points, and restrained zoom behaviour across homepage, catalog, product, and cart views.
- Consolidate spacing, typography, radii, shadows, focus states, and motion timing into reusable design tokens.

## Priority 2 — Shared navigation and trust
- Refine the header for clear desktop navigation and a complete, accessible mobile menu.
- Make cart, account, orders, and admin access readable at narrow widths without crowding.
- Reorganise the footer into clear Shop, Help, Company, and Legal groups; retain Evenor Holdings registration, CIPC, B-BBEE, responsible-use, delivery, and contact information.
- Carry the brand promise “Taste Your Mood” through shared chrome and key conversion moments.

## Priority 3 — Homepage and catalog storytelling
- Polish the new conversion-led homepage sequence and ensure each section has one clear action.
- Improve hierarchy, whitespace, trust cues, mood storytelling, and mobile pacing without adding clutter.
- Refine shop filters with clear selected states, result context, touch-friendly controls, and an elegant empty state.
- Upgrade product cards and detail pages with consistent pricing, mood cues, specifications, responsible-use messaging, delivery reassurance, and accessible cart feedback.

## Priority 4 — Cart, checkout, and account experience
- Improve cart readability and mobile quantity controls while keeping calculations unchanged.
- Clarify the checkout sequence, field states, validation feedback, order summary, privacy, delivery, and 18+ confirmation.
- Remove any misleading payment presentation while payments remain deferred; keep the currently supported order methods and backend submission unchanged.
- Refine sign-in, confirmation, order history, and admin presentation to match the same system.

## Priority 5 — Content pages, accessibility, and SEO
- Bring About, Contact, Legal, errors, and empty states into the editorial design language with clearer information architecture.
- Address labels, focus visibility, status announcements, tap targets, landmarks, heading order, keyboard access, reduced motion, and contrast.
- Add complete unique route metadata, canonical URLs, Open Graph fields, Twitter cards, and suitable structured data while keeping private transactional pages out of search.

## Verification
- Check every public and authenticated route for build/runtime errors.
- Exercise age gate, mobile navigation, filters, product selection, cart updates, checkout submission states, authentication entry points, and confirmation states.
- Visually verify representative pages at desktop and mobile widths, including overflow and text fitting.
- Recheck the project roadmap and report any item blocked by unavailable real payment processing or missing business content.

## Scope guardrails
- No change to prices, catalog IDs, cart calculations, backend order persistence, authentication rules, or admin permissions.
- No real payment integration in this phase.
- Existing legal and business claims remain unchanged unless they conflict with the deferred-payment state.