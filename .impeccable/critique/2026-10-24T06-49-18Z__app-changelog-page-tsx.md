---
target: app/changelog/page.tsx
total_score: 20
max_score: 32
na_heuristics: 5,9
p0_count: 0
p1_count: 1
target_identity: "file:/home/sludge/Development/idleon-efficiency/app/changelog/page.tsx"
target_fingerprint: "sha256:a1107c7c0da9234a30fdee5d8325bbbe1333397c51adee4c011867f02a361c8a"
target_path: /home/sludge/Development/idleon-efficiency/app/changelog/page.tsx
timestamp: 2026-10-24T06-49-18Z
slug: app-changelog-page-tsx
closed: true
---
Method: dual-agent (A: DesignReview · B: BrowserEvidence)

# Changelog visual critique

Keep sections. Make the changelog read like a compact release ledger, not a stack of oversized announcements.

## Evidence and specificity

Inspected current changelog, Sushi Station, Jelly Operator, Spelunking, and Menagerie at 1440×1000 using the shared Docker runtime and local fixture. Rubik, charcoal surfaces, and neutral text already fit the product. Typography, indentation, and hierarchy cause the mismatch. References reserve large type for important balances and keep supporting content compact.

## Proposed typography

| Role | Current | Proposed |
|---|---|---|
| Page title | 50/56px, 600 | 34/40px, 400 |
| Release title | 34/40px, 600 | 22/28px, 500 |
| Section heading | 22/28px, 600 | 14/20px, 700 |
| Change text | 18/24px, 400 | 14/20px, 400 |
| Date | 14/20px, 400 | 12/18px, secondary |

These are scoped desktop proposals, not global theme changes.

## Strengths

Named sections support topic recognition. Version/title/date establish chronology. Neutral colors keep attention on changes.

## Priority issues

1. [P1] Body text dominates. Bare Grommet Text renders bullets at 18px despite 14px app-root typography. Use explicit named sizes locally; do not change global theme. Source: app/changelog/page.tsx:44. Suggested command: /impeccable typeset.
2. [P2] Heading hierarchy is too loud. Use proposed page/release/section ladder, retaining semantic h1/h2/h3. Keep title/date together. Optional panel treatment: one Jelly Operator-style grey header per release, not per section. Source: components/changelog/changelogEntry.tsx:27. Suggested command: /impeccable typeset.
3. [P2] Native list spacing compounds explicit spacing. Left margin 24px plus native padding 40px produces 64px inset. Use one 24px list inset, reset native vertical margins, preserve release padding, and control section gaps. Source: app/changelog/page.tsx:38-44. Suggested command: /impeccable layout.
4. [P2] Long lines weaken tracking. Trial internal prose measure around 100–110ch, left aligned. Preserve shared wrapper and one-column chronology. Suggested command: /impeccable layout.

Do not add decorative icons, category badges, tabs, or separate cards per section. Preserve factual copy; introduction shortening requires copy scope. Archive collapsing is optional, not prerequisite for core visual fix.

## Cognitive load, personas, and emotional journey

Moderate cognitive load: oversized hierarchy, long groups, and expanded history compete for attention. Reading items are not decision options; do not infer need for accordions from bullet counts. Returning readers scan too much equally weighted text. New readers benefit from section labels but need game familiarity. Low-vision readers need retained contrast and semantic headings; zoom and assistive technology were not tested. Initial clear orientation gives way to long equally emphasized lists. Inference: compact type and controlled hierarchy reduce perceived reading effort.

## Nielsen scores

| # | Heuristic | Score | Observation |
|---|---|---|---|
| 1 | System status | 3 | Version/date context |
| 2 | Real-world match | 3 | Familiar game terms |
| 3 | User control | 3 | Unrestricted reading |
| 4 | Consistency | 2 | Typography differs |
| 5 | Error prevention | n/a | No input workflow |
| 6 | Recognition | 3 | Sections/features help |
| 7 | Efficiency | 2 | Long scanning path |
| 8 | Minimalism | 2 | Oversized hierarchy |
| 9 | Error recovery | n/a | No recovery workflow examined |
| 10 | Documentation | 2 | Useful content, weak reading structure |
| | Total | 20/32 | Acceptable |

## Detector and verification

Source scan ran once over app/changelog/page.tsx and components/changelog/changelogEntry.tsx. Output []: zero findings, no triggered rules, no false positives to assess. Clean scan does not establish visual quality. Mutable browser preflight passed; host live-server injection failed with net::ERR_CONNECTION_REFUSED because Docker browser localhost differs from host localhost. No browser detector overlay available. Owned live servers stopped; shared runtime left running. Observed unrelated navigation hydration and third-party advertising/CORS errors; no unrelated fixes.

Fresh screenshot evidence: .ui-verification/assessment-a-{changelog,sushi,jelly,spelunking,menagerie}.png and .ui-verification/runs/2026-10-24T06-45-37-575Z-84096/. Desktop only. No production changes.

## Questions to consider

Prefer open release panels, or subtle grey release-header bars? Keep all history expanded, or collapse older releases while leaving latest open? Core recommendation: compact type and corrected spacing first, no copy or archive-behavior changes without approval.
