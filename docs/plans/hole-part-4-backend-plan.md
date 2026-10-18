# The Hole part 4: backend plan

**Status:** Part 4 was directly accepted by the human on 2026-10-19, who reported successful smoke tests. Recorded project check limits remain in the [current handoff](hole-research-brief.md#current-handoff); no additional verification ran during closeout.

Provide backend information for [#444 — Well, Bell, Harp, and Lamp progression](https://github.com/Sludging/idleon-efficiency/issues/444), under the [approved specification](hole-spec-draft.md).

## Outcomes

- **Well:** Show saved bucket assignments and rates, grouped rates, obstruction separately from spendable sediment and capacity, expansion gates/counts, gold-bucket effects, and next Opal cost.
- **Bell:** Show selected mode and its rate/requirement, each saved charge bank, six improvement methods/costs, current Clean odds/failures, seven bonus families, and exact Renew retention.
- **Harp:** Show power, tune/layout/slots, ten notes with access/balances/next costs, and owned string EXP/levels/passives, including unassigned strings.
- **Lamp:** Show wish stock/daily gain, wish access/effects, currencies/costs, discounts on next schematics, and category-specific reset consequences.

Keep these as read-only imported-state inspection and verified current-state calculations. Do not extrapolate offline production, reconstruct transient state, simulate rewards, or add forecasts. Expose only descriptions supplied by static data.

## v1.23 mechanics evidence

The assigned source is `../IdleonWikiBot/codefiles/idleon1.23.txt`; references below are source-only, not runtime results.

**Well:** `Holes[10][bucket]` assigns a sediment type. Each owned bucket adds `BucketFillRate × elapsed hours` to that type's shared stock; its group rate is the sum of assigned bucket rates (263560–579, 265588–604). Stock clamps to `SedimentMax`; overflow can convert to mined amount only with `Holes[11][10]` and its level/upgrade checks. Negative mapped stock renders `|` and blocks reassignment (261631–45, 263560–79). Source does not explain its cause or player-facing mechanic; display it as unavailable, not as spendable stock or a known obstruction cause. Capacity is `100 × 1.5^level × (1 + capacityFactorPercent / 100)`. Bucket count is one plus owned upgrades 3–11. The generated `SedimentRepo` is in sediment-index order; `data.unlockRequirement` is the capacity percentage despite its field name, with values `0, 50, 500, 9000, 125000, 1500000, 20000000, 100000000, 500000000, 2000000000`. Consume these existing values directly; do not export or rename generated data (240749–59).
The first `HolezBucketGoldOwned` bucket indices receive the gold multiplier. Hole's Fountain bonus index 15 and Hole upgrade 104 own those inputs; this is not a saved bucket assignment. Game descriptions identify the first and possible second golden bucket (240760–79, 241420–21, 308681, 312474). Well expansion spends Hole Opals `Holes[9][0]`, increments `Holes[11][9]` and `[7][0]`, then creates an Opal; levels 1 and 2 have special costs (240780–95, 263580–89). Bucket-count purchase/currency behavior is outside approved read-only outcomes.
**Bell:** UI names Ringing, Pinging, Cleaning, and Renewing. The saved mode is bounded by `BellTypesOwned`; four labels do not prove a save has unlocked all modes (240947, 264217–41). XP banks use even `Holes[18][2×mode]`; odd entries track improvement progress outside Clean. Ring spends mode XP and adds levels to a random bonus; Ping creates an Opal; Renew consumes mode-3 XP, resets mode-0 XP and all 12 bonus levels, and retains methods and Opals (262024–57, 269053–125). Rate is mode-specific, with mode 3 falling back to 10 (240979–93). Clean odds are `min(0.9, (0.6 / max(1, 0.8 × Holes[18][5] + 1)) × (1 + B_UPG(43,25) × Holes[11][31] / 100))`; success increments the method count and clears pity, while failure increments pity (240971–976, 269107–10). Hole upgrades own its B_UPG modifier. Six improvement methods use `HolesInfo[42]` base costs and method-specific exponents; costs and wallets come from existing method and Hole currency records (240948–968). The existing `BellImprovementRepo` provides `quantityCoefficient` in method order `5, 10, 8, 13, 12, 15`; calculate quantity as `2 × saved method level × max(1, B_UPG(45, 0) × quantityCoefficient)`. Hole upgrade 45 owns the modifier and clamp remains calculation logic (240977–978). Twelve saved bonus indices select seven families through existing `BellBonusRepo`; use its indexed records, not a duplicate export (240969, 262070–113).
**Harp:** Saved power `Holes[11][22]` accrues after six caverns at `HarpPOWperHR`; at 100% it resets and each assigned string claims once (261860–90, 265615–20, 268037–42). The saved tune/note count and selected note are `[11][20]` and `[11][21]`; slot assignments are `[20]`; seven string types have ownership, level, and EXP state in `[19]`. Up to 15 slots depend on Cosmo and five upgrades; layout spacing changes at 7, 8, and 12 slots (241003–30). The UI says string level bonuses are permanent and active at all times; owned unassigned strings still provide passives, while assignments control trigger rewards (261980–96, 264267–301). Note purchases require fewer than nine notes and use Hole currency records for wallets `[9][10+n]` (241032–37, 264247–66). Trigger rewards follow assigned-string order: type 1 may award an Opal; type 4 grants EXP to other owned strings (268043–108). Harp calculations consume Hole-owned B_UPG, string, Lamp, Bell, Gambit, Monument, Measurement, Study, Jar, Fountain, and Schematic bonuses; external owners remain authoritative for Cavern-resource stamps, Gaming Cglunko, and the saved Gem Shop purchase input. Prepare these producers before Harp; do not duplicate their formulas. Note production applies modifiers then divides by `4^type`; Opal odds cap at 1; EXP has a 1% Study branch (241038–92). This is current-state backend work, not a reward forecast.
**Lamp:** Wish stock `Holes[11][25]` is compared with exact `LampWishCost`; the game purchase increments the selected saved level (269729–37). Wish 5, **A Moderate Discount**, applies `max(0.01, 0.85^Holes[21][5])` to schematic cost. The game purchase path then deducts the selected wallet and clears that level after success (240577–604, 265397–435); website parsing and calculation remain read-only. Do not apply `LampBonuses` or Zenith Market to this schematic price. Other Wish effects are executable branches using embedded coefficients and Zenith Market input (241113–19); `LampWishRepo` already supplies static wish names, `x1`–`x3`, and descriptions. Wish 0 expands slots; Wish 1 exposes the four source-named reset choices; Wish 2 creates an Opal; Wish 3 adds 12 hours to the selected Monument (269738–70). Source shows Wish 1's exact writes but runtime execution would mutate state; the backend only exposes parsed current levels and source-backed reset consequences.
The selected information architecture places these systems in the existing Caverns area; it does not prescribe part-specific layout. See [the canonical Hole information architecture](hole-ui-information-architecture.md#caverns).
#### Wish 1 reset choices

The v1.23 UI names four selectable Wish 1 resets. Its handler changes only the selected category branch, then completes the game purchase; other categories remain unchanged by that handler (261793–804, 269743–65).

| Game category | Source mapping and exact change | What remains |
|---|---|---|
| **All Opals Invested** | The handler clears all eight backing entries to zero (`Holes[3][0..7]`). | Other reset categories remain unchanged. |
| **Conjuror PTS Invested** | The handler clears every entry in three backing arrays (`Holes[4]`, `[5]`, and `[6]`). | Other reset categories remain unchanged. |
| **Jar Collectible Enchantment LVs** | The handler caps every backing entry at 1 (`Holes[24]`); values at or below 1 stay unchanged. | Other reset categories remain unchanged. |
| **All Summoning Doublers** | The handler sets every backing entry to -1 (`Holes[28]`). | Other reset categories remain unchanged. |

These names come from the v1.23 Wish UI text, not inferred from array indices. The mapping between each named category and its backing save field is source-confirmed; do not display raw array indices as player-facing categories.

Keep one account-level [Hole domain](../../data/domain/world-5/hole/hole.tsx). Hole initializes required static records, parses shared save inputs, and coordinates ordered preparation. Each aspect owns named state, parsing, repeated-processing behavior, and game-specific calculations.

| Owner | Responsibility |
|---|---|
| **Well** | Own bucket assignments, sediment stock/capacity, rates, expansion, gold-bucket effects, and next Opal cost. `SedimentRepo.data.unlockRequirement` supplies the per-sediment capacity percentage; preserve repository order. Negative stock is a separate unavailable marker, not a spendable quantity; source does not identify its cause. |
| **Bell** | Own selected mode/banks, rates and requirements, improvement method state/cost/quantity, Clean inputs and odds, seven bonus-family levels/effects, and Renew clear/retain results. Use `BellImprovementRepo.quantityCoefficient` directly. Mode access remains gated by `BellTypesOwned`. |
| **Harp** | Own power, tune/layout/slots, note balances/access/costs, and seven string ownership/EXP/level/passive records, including unassigned owned strings. Assignments determine strum rewards, not permanent level passives. |
| **Lamp** | Own wish stock/levels, daily gain, permanent effects, Wish 5 discount factor, reset categories, and costs. Wish 5 game purchase consumption/reset is source context only; website reads imported state and never mutates it. |
| **Existing producers and consumers** | Remain authoritative for cross-domain inputs and effects. Hole's Fountain, B_UPG, Bell bonus, Study, Measurement, Monument, Gambit, Jar, Schematic, and Lamp APIs own Hole-local modifiers. Stamp owns Cavern-resource stamp effects; Gaming owns Cglunko; the saved Gem Shop purchase input remains its existing account input. Prepare each producer before consumers; keep shared effects on their owner APIs. |

Use repository-backed wrappers for static records with account state or behavior, following existing `fromBase` aspects such as Schematic, Measurement, Wish, or FriendBonus. Use named typed records for save-defined relationships such as bucket assignments and Harp layout. Do not force saved settings into repository-backed classes or add a purchase planner.

## Required data and prerequisites

Translate raw save fields into named state at parse time. Keep unknown distinct from zero, persistent state distinct from transient progress, and wallet balances distinct. The current approved outcomes require these inputs and calculated values:

| System | Required state and calculated information |
|---|---|
| **Well** | Bucket assignment/settings; stock and unavailable marker; capacity using generated SedimentRepo percentages; per-bucket/group rates; expansion level/gates; gold-bucket state/effects; next Opal cost. Hole owns Fountain and B_UPG modifiers. |
| **Bell** | Selected mode and unlock bound; even-index XP banks and odd-index improvement progress; mode rates/requirements; Clean pity/odds; six method levels, method-indexed quantity coefficients, wallets/costs; seven saved bonus families at indices 0–6; all 12 saved bonus slots in Renew's clear snapshot; Renew-cleared and retained fields. |
| **Harp** | Saved power/tune/layout/slots; ten note levels, balances, access/costs; seven string ownership/EXP/levels and active/passive effects, including unassigned owned strings. Include the named Hole, Stamp, Gaming, and saved Gem Shop inputs used by the source formulas. |
| **Lamp** | Wish levels/stock/daily gain/access/effects/current costs; Wish 5 discount level/factor for schematic cost; source-named Wish 1 reset categories and current imported reset-target values. |

## Static data and prerequisites

### Available v1.23 generated inputs

The supplied v1.23 generated exports already satisfy all three lookup needs. No WikiBot request or generated-file edit is required or allowed:

- **Well capacity — `SedimentRepo`:** `initSedimentRepo()` source order is sediment index 0–9. `sediments[bucketIndex].data.unlockRequirement` stores the capacity percentage despite its name; use it directly in `100 × 1.5^bucketLevel × (1 + percent/100)`. Values are `0, 50, 500, 9000, 125000, 1500000, 20000000, 100000000, 500000000, 2000000000`. Do not add a second capacity table.
- **Schematic-to-building mapping — `HoleBuildingRepo`:** preserve `buildings` generated source order. Resolve `buildingRowIndex = buildings[schematicIndex].data.order`, then read `building = buildings[buildingRowIndex].data`. `data.order` is the complete 106-entry `HolesInfo[40]` mapping, not presentation order to sort. Schematic index 2 maps to row 58, **Loadin' some 'Lode**. Do not sort by `.order`, build duplicate mapping data, or confuse schematic-slot index with target repository-row index.
- **Bell method quantities — `BellImprovementRepo`:** each method record's `data.quantityCoefficient` is in method index order 0–5: `5, 10, 8, 13, 12, 15`. Use it with the formula and Hole upgrade modifier in the mechanics section. Do not add a parallel coefficient export.

### Existing static coverage; no duplicate requests

- `BellImprovementRepo` records 0–5 already match the six consumed `HolesInfo[42]` base costs (`15000000000`, `100`, `1000000`, `300`, `150`, `1500`); trailing six `1`s have no consumer in this six-method range. Cost exponents and wallet selection remain formula branches (idleon1.23.txt:240963–968, 308438).
- Seven `BellBonusRepo` records represent `HolesInfo[59]`; seven `HarpStringsRepo` multiplier records represent `HolesInfo[47]`. Use existing indexed records (240969, 241075, 308445, 308459).
- `LampBonuses` and schematic prices are executable formula branches, not missing catalogues. `LampWishRepo` supplies static wish metadata; `HoleCurrencyRepo` supplies currency identities; `HoleBuildingRepo` supplies building metadata. Do not request coefficient matrices, dynamic prices, duplicate buildings, or currency IDs.

The only remaining external implementation prerequisite is a paired, applicable v1.23 save and same-save game output for parity checks. Static data is already present. Source declarations and generated inputs do not by themselves prove runtime parity. Historical v1.19–1.22 observations remain historical.
**Runtime route:** default to offline extraction. Check `GET /status` on the same `GAME_SERVER_URL`; require `source:"offline"` and `cdpConnected`, `injected`, and `gameReady` true. Check `GET /game-version` and use v1.23 assets. Read-only expressions may query saved inputs and game outputs; keep any result output outside fixtures unless explicitly intended. For parity, identify the save version and active character and compare game outputs from that same save. The inspected offline server was ready at `http://127.0.0.1:3101` and reported `Luminous_Menagerie` 1.23, but its selected character had no Hole state, so it supplies no part-4 parity result. Do not refresh `latest.json` or mutate saves for Wish reset checks. Live access is justified only for current real-game behavior unavailable offline; verify live source/readiness before use.

Negative-stock player meaning and per-save Bell mode availability are unresolved observations, not missing source data or implementation prerequisites. Source already defines the `|` marker, selector bound, and Wish 1 writes. Do not block implementation on unneeded negative-stock causation or a save with every Bell mode. No part-4 implementation or runtime parity is claimed by this plan.



## Integration

- Retain Hole's existing `init → parse → calculate` registration. Parse only saved input; do not read other domains or calculate there.
- Keep state and rules on each Well, Bell, Harp, and Lamp aspect. Let Hole coordinate aspect parsing and updates. Replace parsed/derived collections on repeated imports or calculations.
- Preserve existing ordered `postProcessingMap` stages: `holeStudyEffects` prepares Study access and Schematic study bonuses; `holeUpgradeEffects` prepares Measurement Camp effects and Harp slot count; `hole` prepares Measurement, Lamp's Zenith Market input, Gambit, and Resource Caverns. They currently run in that order before downstream Hole consumers. Keep required producers before these stages: parsed Hole upgrades/Fountain and external Stamp, Gaming, and Gem Shop inputs must be settled before aspect calculations that consume them. Within Hole's update, prepare Lamp's Zenith Market input and Bell bonuses before Harp results that consume them; keep each shared formula on its existing owner API.
- Existing `postPostProcessingMap.holePresentation` runs after account, Player, Statue, Storage, Compass, Grimoire, Tesseract, and Emperor inputs settle. Keep only inspection/presentation derivations there; no value consumed by another domain belongs in this late stage.
- Preserve existing consumer APIs and migrate every caller only if an approved semantic API changes. Existing consumers include Tome's Well getter, shared Schematic getters used by player damage/experience/skilling/imports/cooking, and Lamp bonuses used by Cooking and Gaming Garden. Do not introduce speculative ordering edges for excluded purchase-planner behavior.
- Keep effects, requirements, and costs typed. Expose original static descriptions only; do not generate user-facing copy in domain code.

## Verification

Follow the repository's [domain testing guide](../TESTING_IMPLEMENTATION.md) and [testing skill](../../skills/testing/SKILL.md). Extend existing `tests/domains/hole/` suites and `tests/configs/hole-*.json`. Use public aspect APIs and same-version values from the same save with matching active character; no synthetic saves or implementation-derived oracles.

- Compare Well assignments, grouped/bucket rates, capacity factors, unavailable stock marker, expansion/gates, gold effects, and each observed Opal-cost branch.
- Compare Bell selector/unlock state, saved banks, rates/requirements, six method costs and quantity coefficients, Clean pity/odds, seven effects, and source-backed Renew clear/retain results. Do not claim all modes are runtime-tested unless the paired save exposes them.
- Compare Harp power/rate, saved layout/tune/slots, ten note access/balance/costs, and all seven strings' ownership, EXP, levels, passive effects, including unassigned owned types.
- Compare Lamp stock/daily gain, wish access/levels/effects/costs, Wish 5 schematic discount, and current parsed reset targets. Confirm Wish 1 write semantics from source; do not execute a save-mutating reset solely for verification.
- Add parameter comparisons for directly consumed cross-domain calculations. Use `toMatchLiveGame` for parameters and `toMatchLiveGameWithDetails` for core results, with configured tolerance `0`.
- Exercise fresh and repeated normal imports; assert stable derived records and unchanged saved inputs. Report branches not exercised by the paired save instead of inventing test cases.

Recorded backend implementation and focused test evidence are summarized in the [current handoff](hole-research-brief.md#current-handoff). Source review does not substitute for paired runtime parity; the recorded results remain scoped and do not establish whole-game or all-branch parity. The human accepted part 4 as complete and reported successful smoke tests.