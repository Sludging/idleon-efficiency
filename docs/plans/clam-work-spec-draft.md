# Clam Work: product specification draft

**Status:** Approved for delivery with the user's latest UI scope. Implementation is complete; acceptance remains pending.

**Scope source:** [Approved research brief](clam-work-research-brief.md). **Delivery detail:** [One proposed delivery part](clam-work-delivery-parts-draft.md).

**Related issue:** [#490 — Clamworks calculation correctness](https://github.com/Sludging/idleon-efficiency/issues/490). This open Menagerie-update correctness issue is not a Clam Work feature issue and does not authorize this page.

## Problem

Players have no Clam Work view in IdleOn Efficiency. They cannot inspect shared pearl balance, Worker Class, promotion details, and compensation progress together.

## Solution

Add one read-only Clam Work experience backed by account-owned Clamworks and Menagerie data. Show Worker Class, promotion chance, promotion pearl cost, and owned pearl balance, followed by all compensation rewards without tabs or interaction controls.

## User stories

1. As a player, I want to inspect my shared pearl balance, Worker Class, promotion cost, and chance, so I can understand my current Clam Work account state.
2. As a player, I want to see every generated Worker’s Comp reward and whether my Worker Class has earned it, so I can understand the complete promotion reward progression.

## Product decisions

- **Ownership:** Pearls and Worker Class are account-owned. Keep Scurge state under account-wide Menagerie ownership. Do not present account state as character-owned.
- **Read-only:** Report imported state. Add no promotion, reset, claim, attack, upgrade, or purchase controls; no forecasting or what-if inputs.
- **Pearl value:** Keep existing backend pearl calculations and public outputs. Do not display base pearl value or pure/Black Pearl multiplier in this view.
- **Scurge calculations:** Keep existing Menagerie state, Clamworks calculations, and public outputs. Do not display Scurge progression or EXP-per-kill content in this view.
- **Promotion rewards:** Use generated source-owned compensation metadata from `ClamworksRewardRepo`; generated `requiredWorkerClassLevel` is canonical for reward labels and earned state. Use native index order and preserve existing `isBonusUnlocked(index)` semantics and callers.
- **No upgrade catalog:** Do not display individual Clam or Scurge upgrade rows, costs, or effects; do not add optimizer or efficiency calculator.
- **No character context selection:** Do not add a character selector, manual combat/stat input, or map-aware Multikill engine.
- **Art and copy:** Use verified normal pearl art and generated source-owned reward descriptions only. No guessed reward icons, authored tutorials, or invented descriptions.
- **Presentation:** Show Worker Class, promotion chance, promotion pearl cost, and owned pearl balance in the account summary, followed by all generated Worker’s Comp rewards. In Worker Class, use the heading `Worker Class`, the saved class as the large primary value with `Class` below, then smaller promotion chance and pearl-cost values with labels below, alongside. In Pearls, show the owned balance as the large primary value with `Owned` below. Match the actual Sushi Bucks summary hierarchy and spacing using existing primitives. Retain pearl icons, grey reward-first card headers, concise `Worker Class N` labels without `Required`, earned and pending readability, first-pending gold emphasis, and lower opacity for locked rewards. Do not add a duplicate Worker Class/latest-earned/next-promotion summary.
- **Formatting:** Format promotion cost with native large-number notation (`10B` for `10,000,000,000`); show native promotion chance rounded upward to a whole percent. Preserve passive affordability colors and normal pearl art.
- **Existing behavior:** Preserve Clamworks account parsing, calculation outputs, public APIs, and tests, including interfaces used by Legend Talents, Meritocracy, Coral Reef, Gallery, and Menagerie. Keep Scurge account state in Menagerie; the UI does not reparse save fields.

## Implementation decisions

- **Clamworks owner/API:** Keep `Clamworks` (`data/domain/world-7/clamworks.tsx`) as owner of `OptLacc[454–465]`, promotion formulas, pearl bonus calculations, and Clam combat outputs. Preserve `promoLevel`, `pearlsOwned`, `workBonuses`, `getPromoChance`, `getClamBonus`, `getClamBonusText`, `getPearlRequirement`, `getClamCost`, `getPromoTryCost`, `isBonusUnlocked`, and `getPromoBonusText`; Legend Talents, Meritocracy, Coral Reef, Gallery, and Menagerie continue using existing `isBonusUnlocked` semantics. Preserve all existing and newly implemented calculation fields, including fields not rendered in this UI.
- **Clamworks derived outputs:** Preserve existing public outputs, including `basePearlValue`, `blackPearlValue`, `clamCount`, `clamHP`, `clamRespawnSeconds`, and `scurgePointsRemaining`. Keep their existing calculation ownership and downstream behavior unchanged; this UI does not display them.
- **Compensation owner/API:** Replace handwritten `promoBonuses` / `ClamPromoBonus` records with generated `initClamworksRewardRepo()` records. Use generated `requiredWorkerClassLevel` as canonical metadata for record display and earned threshold; values 1–12 match native `promoLevel > index`. Native index defines order. Preserve existing `isBonusUnlocked(index)` behavior and callers; tests cover boundary transitions against native evidence rather than copied catalog arrays. Expose ordered reward records, earned flags, and first-pending record from `Clamworks`.
- **Menagerie owner/API:** Keep saved Scurge state under `Menagerie`, parsing `Menagerie[0][7]` EXP, `[0][8]` level, `[5][0..8]` spent levels, and unlock index 4 in existing `parse`. Preserve `scurgeExp`, `scurgeLevel`, `scurgeSpentLevels`, `scurgeUnlocked`, and next-requirement behavior. Do not expose an upgrade catalog. Keep existing Clamworks Scurge-derived outputs and APIs unchanged; the UI does not display them.
- **Calculation ownership and phase:** Preserve existing Clamworks calculations and Scurge-derived outputs, including `scurgeExpPerKill`; retain their current Menagerie inputs, coefficients, update phase, and public API. Do not change backend behavior to match omitted UI content.
- **Pipeline dependency:** Keep existing calculation ordering and processing behavior unchanged. No pipeline change is required for this UI revision.
- **Route/UI:** Keep the World 7 Clam Work route and existing store integration. Render the four approved account summary values followed directly by always-visible Compensations; add no tabs.
- **Generated-data prerequisite:** `data/domain/data/ClamworksRewardRepo.ts` and `data/domain/model/clamworksRewardModel.ts` provide twelve generated records through `initClamworksRewardRepo()`. Use index for native order and generated `requiredWorkerClassLevel` for UI/class labels and earned thresholds; do not edit generated data.

## Testing decisions

- Add focused `Clamworks` core and direct-parameter suites using existing repository patterns. Preserve existing tests for public calculation outputs, saved-state parsing, reward semantics, replacement behavior, and legacy bonus consumers.
- Preserve existing Menagerie and Clamworks tests for Scurge fields, native calculations, lock state, and input parameters. UI omissions do not remove backend/API/test coverage requirements.
- **Historical pearl oracle:** The earlier offline v1.23 query normalized to `412.5` on map 324, Molten Edge, not Clamworks. This historical result is calculation evidence only; the UI does not display base pearl value.
- **Original-save provenance:** Read-only `/cloud-save` canonical sorted JSON SHA-256 is `4192b0b37728606c0a1bc24c19289d665f8c0335572ba1386f559680d9e0eaf6`, matching canonical `tests/fixtures/saves/latest.json` hash recorded for the same fixture. Fixture `OptLacc[454]` is `577093307.3126311`; assert parsed initial balance against this original cell, never runtime-accrued balance. Do not refresh or mutate the save.
- **Historical Scurge oracle:** The earlier native query returned locked zero-level state only. This historical result does not define current UI scope or establish unlocked gain parity; backend calculations and tests remain unchanged.
- **UI outcomes:** Show only Worker Class, promotion chance, native-formatted promotion pearl cost, and owned pearl balance in the summary. Match Sushi’s rendered hierarchy: saved class as the large primary value with `Class` below; smaller chance and cost alongside with labels below; and large owned balance with `Owned` below. Preserve pearl icons and passive affordability coloring. Render all generated compensation records in native index order with generated class labels and earned state. Keep earned and pending cards readable, emphasize the first pending reward in gold, and reduce locked-card opacity. Omit base/pure pearl values, the Clams metrics group, Scurge content, tabs, and duplicate promotion summaries.
- **Units/format:** Use native large-number notation for promotion cost, native upward whole-percent chance display, normal pearl art, and passive affordability colors. Use generated `Worker Class N` requirement labels without `Required`; do not author descriptions.
- **Images:** Keep verified normal pearl art and generated source-owned reward text. Do not add Clam actor images, pure pearl images, reward/class icons, or native backgrounds to the page.
- Do not test copied production arrays, helper-only outputs, labels, or wording as substitutes for visible behavior. Do not refresh save fixtures or use public-account validation.
- **Focused UI proof:** Use an unchanged local save to check the summary, all generated rewards and their order/state styling, decoded normal pearl art, no tabs, and scoped browser errors. Do not claim fresh native affordable-state coverage when only the saved unaffordable state is available.

## Out of scope

- Individual Clam/Scurge upgrades, upgrade catalogs, costs/effects, calculators, optimizers, or upgrade sequencing.
- Character selector, manual Multikill/combat input, map-aware Multikill engine, or account-wide inferred character maximum.
- Promotion simulation, reset/claim actions, drop or AFK projections, multiplayer model, or what-if controls.
- New system/module framework, authored mechanics guide, unsupported reward/icon mappings, and unrelated changes to issue #490 or downstream consumers.

## Further notes

- The research brief's current handoff records the selected UI scope, implementation and smoke evidence, verification limits, and pending acceptance.
- Existing Sushi/Jelly captures are historical composition references only; they do not define Clam Work content or values.
- The latest UI scope supersedes earlier display requirements in this document. Implementation is complete and remains unaccepted and uncommitted; see the current handoff for status and evidence. No commit or acceptance is implied here.
