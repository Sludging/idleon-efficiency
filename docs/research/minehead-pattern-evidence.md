# Minehead backend and UI pattern evidence

## Scope and source limits

This is pattern research, not an approved design, delivery plan, or Emperor review. Scope follows the human-provided parity inventory: Overview / Upgrades / Opponents; Mine Currency, daily tries, damage, lives, currency gain rate; upgrades with level/effect/cost/Research requirement; opponent progression, HP, Depth Charges, rewards. No extra actions, calculations, fields, or authored descriptions are supported.

`docs/research/minehead-game-evidence.md:5-7,30-35,39-55,63-69` records the accepted #390 backend, current 1.23 offline scalar observations, and limits. The current dispatcher is attributed to `scripts.ActorEvents_579`, but its captured source was truncated; offline values do not establish all saved-field meanings, persistence, currency/hour rate, or reset behavior. Historical formula snippet is version 1.21 only (`minehead-game-evidence.md:13-28`). Do not treat current version outputs or historical formulas as broader proof.

Competitor scope is prior audit evidence, not current rendered UI. The requested start route returned Profile Not Found; `docs/research/minehead-game-evidence.md:61` records the audit's missing Minehead view and field inventory. Audit JSON `docs/audits/idleontoolbox-coverage-data.json` gap entry for domain `Minehead` says Minehead reward feed exists but no view; it lists exactly the three parity groups and URL `/account/world-7/minehead`. Fresh populated competitor values and supported interactions are unavailable. Current feature/UI screenshots were not available for inspection, so rendered composition evidence is a gap.

## Mandatory rules

- `CODING_STANDARDS.md:17-25,33-39,41-43,49-53` require concept ownership, translating raw save state at parse boundary, broad reuse research, dependency-ordered calculations, direct access to guaranteed domains, and scope restraint.
- `docs/agents/backend-patterns.md:22-34,42-52` describes generated static records wrapped by handwritten domain entities, named state, init/parse/calculate lifecycle, dependency preparation, and idempotent recalculation. It is guidance, not a requirement to create extra abstractions.
- `docs/agents/ui-patterns.md:17-40,44-68,70-140` requires task-driven composition and matching only named reference aspects; formulas belong in backend, view formatting/filtering in UI. New upgrade lists show real non-filler entries, with hide-locked/maxed off by default. Routes keep metadata/server wrapper in `page.tsx`, client hooks in content, and shared app data uses `useShallow` plus `lastUpdated` when reading mutable domain maps.
- `docs/insights/ui-feedback.md:3-18` directs dense readable hierarchy, aligned effects/requirements/progress, verified icons, useful game descriptions, and avoiding controls without meaningful differences.

## Existing backend surface and ownership

`data/domain/world-7/minehead.tsx:11-27` has `MineheadOpponent` wrappers over generated `MineheadOpponentModel`; `getBaseBonus()` is preview data, while `getBonus()` gates earned reward on defeated progression. `:30-73` has `MineheadUpgrade` state for level/unlocked/cost modifiers/doubling, plus `getBonus`, `getRequiredLevel`, `nextLevelCost`, unlock, and max APIs. `:75-125` owns `Minehead` account state, initializes generated opponent/upgrade repositories, parses currency/progression/upgrade levels, and assigns account unlocks using player 0 Research. `:139-162` exposes opponent count, bonus/upgrade lookup, affordability and purchase eligibility. This already supplies reusable outputs for most upgrade/opponent content; UI should call those APIs rather than recalculate formulas.

`data/domain/idleonData.tsx:176-177,276-297` registers this domain as `minehead`, runs `updateMinehead` after prepared Menagerie state, and separately prepares Research-dependent trade drop rate later. `:367-372` places Gallery, Hat Rack, Sushi consumers after Minehead. Preserve this order if adding calculated outputs; existing consumers must not move. `Minehead.getRawKeys()` and `ResearchGrid.getRawKeys()` mark `Research` `perPlayer:false`; `HandleRawDataKey` loads it once as a single account key. Research skill `Lv0_i` is per-player. Thus Minehead's saved currency, progression, upgrade levels, and Research Grid mode-1 level inputs use account `Minehead`; no selected-player context is appropriate for these outputs. Player 0 Research skill remains only the existing shop-unlock context (`minehead.tsx:90-95,108-125`; `base/domain.tsx:48-62`).

Verified production-only consumers (`data/domain` handwritten caller search; static descriptions and tests excluded): `data/domain/world-3/bubba.tsx:320` reads Minehead bonus index 5; `data/domain/world-4/tome.tsx:462,1123-1124` reads defeated count; `data/domain/player-damage-multiplier.ts:77,232-233` reads bonus indices 4 and 0; `data/domain/player-stats.ts:843,613,616` reads bonus 0 and trade-drop multiplier; `data/domain/world-7/hatRack.tsx:110,116` reads bonus 21; `data/domain/world-7/research.tsx:1334,1394-1399` reads opponent/base reward and earned bonus; `data/domain/world-7/sushi.tsx:286,297` reads bonus 11. `data/domain/menagerie.tsx:744-753` invokes Minehead's Menagerie-doubler preparation, not a reward getter. Lifecycle/ordering is separately managed in `data/domain/idleonData.tsx:63,177,285-297,369-372` and `data/domain/world-7/minehead.tsx:164-195`. Preserve all these APIs and dependency order.

**Public domain surface:** reuse account `Minehead` and existing `MineheadUpgrade` / `MineheadOpponent`. Current APIs already cover upgrade levels/effects/requirements/costs, earned/preview rewards, progression, currency, and account unlock state. Add only parity-backed summary and opponent outputs. Direct formula inputs, existing APIs, and phase placement are specified in `docs/plans/minehead-delivery-parts-draft.md:23-39`. Several source terms currently lack handwritten accessors; the plan names the missing raw value and owner instead of assuming or inventing an API. Existing static catalogs supply opponent names/rewards and upgrade records; no missing static prerequisite is proven.

## UI reuse and composition

No Minehead route currently exists in `app/world-7` listing; `components/navigation.tsx:72-84` shows W7 route links and no Minehead entry. Existing account route example `app/account/tome/page.tsx:1-15` keeps title metadata and a Suspense-wrapped client content component. World 7 sibling `app/world-7/jelly-operator/page.tsx:1-15` follows same wrapper; content `:15-39` reads shared store with `useShallow`, guards missing domain, renders heading/overview and ordinary `ContentTabs` with caller-owned selected state. `app/world-7/sushi/content.tsx:15-45` provides a second example of overview above tabs and separate content components.

Applicable UI aspects: follow `app/world-7/sushi/content.tsx:15-45` to keep shared `sushiOverview` above optional ordinary `ContentTabs`, with tab selection owned by client content. `components/world-7/sushi/sushiOverview.tsx:22-38,63-` is the compact account-summary composition. Use `DataRow`'s identity/artwork plus aligned labeled fields for both upgrade and opponent rows (`components/base/DataRow.tsx:8-21,68-`); `components/world-3/construction/atomCollider.tsx:53-` shows repeated domain rows. Do not reuse UpgradeTable search/sort/filter controls for Minehead; no extra UI controls are approved.

These references specify reusable aspects, not exact Minehead labels or a visual redesign. No screenshot/rendered example was inspected; spacing, responsiveness, and image placement remain unverified.

Navigation recommendation: if account route is approved, add it under World 7 navigation in `components/navigation.tsx` alongside other World 7 features. Existing listing is the public discoverability path; no account-specific Minehead route or feature consumer exists in current app route listing.

## Tests and coverage gaps

Existing tests establish useful backend seams, not page coverage:

- `tests/domains/minehead/upgrades.test.ts:90-158` compares upgrade quantity, requirements, cost, affordability, and unlock state against paired game extraction across selected records.
- `tests/domains/minehead/upgrades-parameters.test.ts:1-57` checks direct Sushi discounts, upgrade discount, selected costs, and requirements.
- `tests/domains/minehead/opponent-bonuses.test.ts:1-100` compares earned rewards and preview base values across selected progression boundaries.
- Downstream parameters above verify selected Minehead consumers.

No dedicated Minehead parser/summary/UI test was found. Existing downstream parameter suites cover Bubba (`tests/domains/world-3/bubba-global-bonus-progression-parameters.test.ts:30-34`), Tome (`tests/domains/tome/score-parameters.test.ts:29-33`), Hat Rack (`tests/domains/hat-rack/premium-hat-bonuses-parameters.test.ts:24-28`), Research (`tests/domains/research/account-progress-parameters.test.ts:419-447`), Sushi (`tests/domains/world-7/sushi-station-calculations-parameters.test.ts:65-67`), player damage (`tests/domains/player-damage-multiplier-parameters.test.ts:90-98`), and drop rate (`tests/domains/player/drop-rate-source-owners.test.ts:31-40`, `tests/domains/player/drop-rate-parameters.test.ts:106-108`). Current core coverage does not verify requested summary values, HP, Depth Charges, or display progression; no route/component hydration coverage was found. Later domain tests should compare public values to independent current-version native outputs with matching parameters and boundary cases. Keep existing downstream tests as regression coverage.

## Recommendations and limits

Reuse the existing registered Minehead domain and its repository wrappers. Keep source parsing and calculations in owning domain APIs; expose stable public values to UI. Preserve account-wide Minehead behavior and calculation order. Use the established page/client-content/store pattern; shared summary above optional content tabs and DataRow rows fit the audited field groups. Do not add controls, descriptions, or fields beyond approved scope.

No design approval is implied. Native source establishes `/hr` and account Research ownership/mode-1 context as documented in the evidence section. Daily-try reset timing and competitor interactions remain unverified; add none.