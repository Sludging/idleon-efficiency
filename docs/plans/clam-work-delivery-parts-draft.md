# Clam Work: proposed delivery parts

**Status:** Part 1 (`singlePart1`) was implemented and exercised under the user's authorization. Latest UI requirements are reconciled below; acceptance remains pending. See the [current handoff](clam-work-research-brief.md#current-handoff).

**Scope sources:** [Approved research brief](clam-work-research-brief.md), [specification draft](clam-work-spec-draft.md), and [source evidence for rewards](../research/clamworks-promotion-rewards.md) and Multikill ownership [multikill evidence](../research/clamworks-multikill-ownership.md).

**Related issue:** [#490](https://github.com/Sludging/idleon-efficiency/issues/490) tracks Clamworks calculation correctness for the Menagerie update. It is not a Clam Work feature issue. Do not modify or repurpose it.

One vertical part delivers the complete requested feature through account-owned backend data and usable UI. Internal research, implementation, data mapping, testing, and integration belong inside this part, not separate tickets. The supplied generated compensation catalog is an existing source dependency, not a separate delivery part.

## Part 1 — Clam Work account and promotion progression

**Outcome:** Players inspect shared Clam Work account state and promotion rewards in one read-only World 7 experience. Existing Scurge and other calculation outputs remain available through unchanged backend APIs, but are not displayed on this page.

**Blocked by:** No unresolved data prerequisite. Generated compensation metadata is present. Part 1 was selected and implemented; current delivery status and verification are recorded in the [current handoff](clam-work-research-brief.md#current-handoff).

### Backend data and UI information needs

- **Clamworks owner/API:** Preserve existing `Clamworks` parse ownership of `OptLacc[454–465]` and public APIs, including `promoLevel`, `pearlsOwned`, existing getters, and `isBonusUnlocked(index)` used by Legend Talents, Meritocracy, Coral Reef, Gallery, and Menagerie. Preserve all implemented calculation outputs, including `basePearlValue`, `blackPearlValue`, `clamCount`, `clamHP`, `clamRespawnSeconds`, `scurgePointsRemaining`, and `scurgeExpPerKill`; their omission from the UI does not remove backend behavior or tests.
- **Compensation records:** Use generated `initClamworksRewardRepo()` from `data/domain/data/ClamworksRewardRepo.ts`, twelve ordered records and source descriptions. Use generated `requiredWorkerClassLevel` as canonical metadata for record display and earned threshold; native index order defines display order, and native predicate `promoLevel > index` defines unlock semantics. Preserve existing `isBonusUnlocked(index)` behavior and callers. Test boundary transitions against native evidence, not copied catalog arrays.
- **Menagerie/Scurge owner/API:** Preserve Menagerie ownership and existing parsing, public fields, and next-requirement behavior for Scurge state. Do not move state or expose individual upgrade records in the UI.
- **Calculation and phase:** Preserve existing Clamworks calculation outputs, APIs, inputs, and update phase. UI omissions do not change calculation behavior or test contracts.
- **Historical Scurge evidence:** Prior native source evidence describes locked zero-level state only. It does not establish unlocked gain parity and does not define current UI scope.
- **Historical calculation evidence:** Prior native queries recorded pearl normalization and original-save balance provenance. These support backend calculation evidence only and do not add removed UI fields to current acceptance scope.
- **Tests:** Preserve existing Clamworks core and direct-parameter suites, Menagerie tests, and downstream consumer coverage. UI simplifications do not remove backend or API/test contracts.
- **UI information:** Show Worker Class, promotion chance, promotion pearl cost, and owned pearl balance in the account summary. Match Sushi’s Bucks summary hierarchy: show the saved Worker Class as the large primary value with `Class` below, then smaller chance and pearl-cost values with labels below, alongside. In Pearls, show the owned balance as the large primary value with `Owned` below. Preserve pearl icons, native large-number cost formatting (`10B` for `10,000,000,000`), native upward whole-percent chance, normal pearl art, and passive affordability colors. Do not display base pearl or pure/Black Pearl values, the Clams metrics group, Scurge content, or duplicate current/latest/next promotion summaries.
- **Compensations:** Show all twelve generated rewards directly after the summary, always visible without tabs. Preserve native ordering, generated source descriptions, and earned state. Display required class as `Worker Class N` without `Required`; keep earned and pending cards readable, first pending gold-emphasized, and locked cards at lower opacity.
- **Backend and tests:** Keep Clamworks and Menagerie calculation fields, public APIs, downstream consumers, and existing domain tests unchanged, including contracts for calculations whose fields are no longer displayed.

### Acceptance outcomes

- [ ] Show Worker Class, promotion chance, native-formatted promotion cost, and owned pearl balance. Match Sushi’s rendered hierarchy: saved class as the large primary value with `Class` below; smaller chance and cost alongside with labels below; and large owned balance with `Owned` below. Keep pearl art and passive affordability colors; cost `10,000,000,000` displays as `10B`.
- [ ] Omit base pearl value, pure/Black Pearl multiplier, the Clams metrics group, Scurge content, tabs, and duplicate Worker Class/latest-earned/next-promotion summaries.
- [ ] Show all twelve generated compensation records in native index order with source descriptions, canonical `Worker Class N` labels without `Required`, and correct earned states.
- [ ] Keep Compensations visible without interaction; retain readable earned/pending cards, gold emphasis for first pending, and lower opacity for locked cards.
- [ ] Preserve existing Clamworks and Menagerie fields, calculations, public APIs, downstream consumers, and test contracts. Do not change backend behavior to match UI omissions.
- Human acceptance remains pending; current implementation status, smoke evidence, and limits are recorded in the handoff.

### Dependency and stop conditions

- The provided generated source catalog `data/domain/data/ClamworksRewardRepo.ts` supplies twelve compensation records and resolves the external metadata prerequisite. Do not modify generated data; use index for native ordering and generated `requiredWorkerClassLevel` for UI/class labels and earned thresholds.
- **Historical oracle limits:** Map 324 is Molten Edge, not Clamworks; do not report its full pearl value as Clamworks-context evidence. Prior Scurge native output covers locked zero-level state only and does not prove unlocked parity. These evidence limits do not add Scurge UI requirements.
- Human approval and Part 1 selection are recorded in the current handoff. The latest selected UI scope supersedes earlier presentation requirements here.

## Current handoff

- The approved implementation requirements are reconciled to the latest UI scope above. Backend calculation outputs and APIs remain unchanged even when the page omits them.
- Implementation, smoke evidence, independent review, and verification limits are recorded in the [current handoff](clam-work-research-brief.md#current-handoff).
- Acceptance and commit remain pending; see the handoff for current status. No commit is made by this plan update.
