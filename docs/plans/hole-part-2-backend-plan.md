# The Hole part 2: backend plan

## Outcomes

Provide backend information for [#442 — Schematics, Majik, and Measurements](https://github.com/Sludging/idleon-efficiency/issues/442), under the [approved specification](hole-spec-draft.md):

- Show every released schematic in game order, including locked entries. Separate Kaipu availability from construction. Provide requirements, currency, current discounted cost, stock, shortfall, and owned benefits.
- Show all three Majik trees with one point pool. Provide prerequisites, initial and enhancement levels, caps, point requirements, and current effects. Show saved Pocket Divinity gods and their effective overlap with ordinary links and Doot for each imported character.
- Show all 17 Measurements. Pair access and purchased level with the measured account statistic, units, multiplier, owned effective benefit, currency, next cost, and shortfall.

The selected [information architecture](hole-ui-information-architecture.md#upgrades) places these systems in **Upgrades → Majik / Schematics / Measurements**. This plan supplies information for browsing and useful filters, not a page layout, purchase tool, forecast, or new character-stat engine.

## Responsibilities

Extend the existing [Hole domain](../../data/domain/world-5/hole/hole.tsx) and its generated-data wrappers. Keep one account owner.

| Owner | Responsibility |
|---|---|
| **Hole** | Initialize required records. Coordinate aspect-owned parsing and ordered preparation. Supply named saved resource balances and access inputs. Preserve part 1 growth, Studies, Opals, and Lantern behavior. |
| **Schematic** | Own saved construction, availability requirement, current cost, discount, affordability, and effective benefits. Separate stable building identity from its availability slot. |
| **Majiks** | Own the shared earned, invested, and remaining point totals across all three trees. Prepare path prerequisites and the enhancement gate. |
| **CosmoUpgrade** | Own saved investment, initial versus enhancement levels, effective cap, and effects. Retain exceptional behavior such as Beeg Beeg Forge's power-of-three multiplier. |
| **PocketDivinityUpgrade** | Own saved selected gods and their canonical identities. Supply Pocket activation and its character-bound Doot All Stat contribution without duplicating god benefits. |
| **Measurement** | Own saved level, access, measured quantity and unit, normalized quantity, multiplier, base/effective benefit, next cost, and affordability. |
| **Divinity, Companions, Players, and statistic producers** | Remain authoritative for ordinary/secondary links, Doot ownership and character eligibility, character identity, and account statistics. Hole consumes their named state or calculated APIs. |

Use repository-backed wrappers and `fromBase`, as in **FriendBonus**. Use **Meal** for concept-owned effects and costs, **Worship Totalizer** for prepared inputs, and **Compass / Grimoire / Tesseract** for owner-side cost modifiers. Use **Divinity** for per-character link aggregation. These [backend patterns](../agents/backend-patterns.md) do not supply Hole formulas or require another engine, currency registry, store, or domain.

Expose player-facing descriptions only from generated static data. Materialize its existing placeholders with verified current values. Keep access, effect identities, units, and missing-input state typed. Do not add teaching prose, authored effect descriptions, or replacement descriptions when static text is absent.

## Required data and prerequisites

### Saved and static inputs

Translate raw save positions at the parsing boundary. Downstream methods consume named state.

| Input | Required meaning |
|---|---|
| Saved Kaipu, Cosmo, and Minau progression | Rescue/access and saved levels. Reuse accepted villager state, not stored EXP converted into new levels. |
| `Holes[13]` and generated building order | Construction flags keyed by stable building ID; availability slots follow the source order. |
| `Holes[9]` and `Holes[21][5]` | Shared saved currency wallets and next-construction discount stacks. Stock is not production work or an uncollected Fountain stack. |
| `Holes[4]`, `[5]`, `[6]`, and `GemItemsPurchased[4]` | Investment in all three Majik trees and purchased additional points. Count every saved investment in the shared pool, even if its placeholder is not shown as a released upgrade. |
| `Holes[11][29]`, `[30]`, Divinity, and companions | Saved Pocket selections, canonical god/bonus identity, ordinary and secondary links, and each character's effective Doot gate. |
| `Holes[22]` and `MeasurementRepo` | All 17 purchased levels, their statistic types, formulas, and resource mappings. |
| Saved cavern statistics and account producers | Gloomie and Golem kills, total Study levels, crop count, account levels, skill levels, Tome score, Death Note points, highest recorded damage, and Slab items. Verify each producer against the game's actual statistic, not a formatted display string. |
| Fountain and Lengthmeister | Prepare the direct Measurement price discount and benefit multiplier before their consumers. |

**Static-data prerequisite:** The current building export loses non-sediment currencies. For example, generated building 94, **Trench ~ Coin Synergy**, uses `SedimentTypeEnum.Gravel`; original game metadata uses currency index 31. Buildings 45, 67, and 102 also use original indices 12, 27, and 36. The generated model must preserve full Hole currency identity across sediments, Harp notes, Rupies, and Fountain currencies. Current price formulas need this same identity to select their tier.

Measurement 16's generated requirement ID 30 joins existing [Fountain currency metadata](../../data/domain/data/FountainCurrencyRepo.ts) to **Bronze Coins**. Use that identity rather than its `Unknown30` fallback name. No new currency description or static table is needed for this join.

Missing or wrong game-owned fields require a WikiBot extraction/sync prerequisite. Do not copy source currency tables into handwritten code or edit generated directories. Costs, shortfalls, availability, and prepared values are handwritten calculations, not new generated fields.

### Required mechanics

- Schematics use the source availability count, capped at 105, and its ordered building IDs. The catalogue also contains the unavailable Bee String. Exclude source-only content from the released catalogue without hiding released locked entries.
- Construction prices use literal or availability-slot-dependent rules. Apply the active Lamp discount, `max(0.01, 0.85^stacks)`, to the correctly matched currency and tier. Expose the saved discount without consuming it. Built schematics have no next purchase; ownership is not affordability.
- Schematic benefits include numeric modifiers and discrete unlocks. Expose owned effects through the same owner APIs used by consumers. Keep intrinsic rules separate from a full cavern output or transient story result.
- Majik points equal rounded Cosmo levels plus purchased points, less investment across all three trees. A first purchase and each enhancement spend the same pool. Verify preceding-node requirements through the purchase caller.
- The purchase caller allows one initial level. Further levels require **Cosmo, Enhance!** and stop at `1 + maxEnhance`. Expose the initial level, extra levels, enhancement allowance, current cap, and current effect separately. Preserve one-point purchases and nonlinear or multi-effect nodes.
- Pocket selections activate god benefits through the game's union of ordinary links, effective Doot, and Pocket activation. Preserve secondary-link rules and callers that count only primary links. Doot activates only for a character with Divinity level at least two. Its Pocket contribution is `15% × Pocket level` All Stat for that eligible character; do not add a second activation of an already active god. Imported Player main stats remain imported values.
- A Measurement's statistic type is not its row index. Use the generated row-to-type mapping. Expose the raw statistic separately from its normalized value and piecewise multiplier. Apply Lengthmeister, each row's linear or saturating base formula, and the owned level. Include Fountain's Measurement price discount in next costs.
- Compute each shortfall from the exact saved spendable currency. Provide source identities so the UI can show competing uses without a new resource-allocation model.

Verify static names, descriptions, row mappings, caps, and resource identities against the delivered version. Original source and metadata establish rules; matched game outputs establish personalized parity. A genuinely missing optional save input makes only dependent values unavailable. Retain independent progression and known zeroes. Treat initialized required records as required.

## Integration

- Retain Hole's `init → parse → calculate` registration in [idleonData.tsx](../../data/domain/idleonData.tsx). Put aspect parsing and preparation on the responsible classes rather than enlarging one parent update.
- Remove camp calculations from parsing, including Measurement access, summed Study levels, and Lengthmeister preparation. Parsing only translates saved state.
- Prepare shared effects in `postProcessingMap` after their required producers and before consumers. Preserve early Study/schematic preparation. Keep Measurement benefits ready for existing Hole growth/Gambit consumers, and Majik ready for Divinity, Votes, Equinox, and other existing consumers. Reading another domain's parsed state does not require its update to run first.
- Use the existing late Hole preparation in `postPostProcessingMap` for display-only prices, shortfalls, pool inspection, prerequisite/cap details, and character-bound Pocket overlap records. Do not feed late inspection fields back into shared calculations.
- Read numeric account/skill/statistic APIs rather than parsing UI-formatted text. Check the game's account statistic against the existing producer before changing that producer. Trace Tome-dependent preparation explicitly; do not create a dependency cycle or move all Hole work late.
- Migrate affected consumers when a semantic API changes. Keep ordinary links separate from prepared effective links. Repeated parsing/calculation must replace derived selections, totals, contributors, and character records, not retain another account's state or stack effects.
- Supply stable record, currency, statistic, and character identities for the approved UI information. Preserve the existing three-tab shell, Studies, five villagers, and 18 cavern identities. No UI implementation or navigation redesign belongs to this backend plan.

## Verification

Use the [domain testing guide](../TESTING_IMPLEMENTATION.md) and [extraction helper](../../tests/helpers/README.md). Extend existing `tests/domains/hole/` core/parameter suites and `tests/configs/hole-*.json`. Keep expected values paired with their same-version originating real save.

- Compare schematic availability/order, construction state, each price formula branch, active discount, matched resource balance, shortfall, and owned numeric/discrete effects. Exercise observed locked, built, unbuilt, affordable, and insufficient-stock records. Do not use catalog base costs as game-output oracles.
- Compare the one Majik pool, released tree coverage, path requirements, initial/enhancement levels and caps, and representative linear, power-of-three, and multi-effect outputs. Verify placeholder filtering without dropping their saved investments from point totals.
- Compare saved Pocket identities, ordinary/secondary-link overlap, effective Doot eligibility, non-duplicated activation, and Pocket's All Stat contribution in each genuinely captured character context. Preserve primary-link-only consumers. Report below-level-two, absent-Doot, or alternate-selection branches not exercised by the paired save.
- Compare all 17 Measurements' raw statistic, normalized quantity, multiplier, base/effective benefit, access, purchased level, price, currency, and shortfall. Cover observed linear/saturating bonuses and both multiplier branches. Compare every directly used calculated parameter, including Lengthmeister, Fountain discount, and required account-statistic results.
- Assert typed public outputs with `toMatchLiveGameWithDetails` for core values and `toMatchLiveGame` for direct parameters, configured tolerance `0`. Do not manufacture saves, expected values, or branch states. Do not replace meaningful results with call-order, object-layout, or exact-prose assertions.
- Exercise fresh and repeated normal imports of the paired save. Check unchanged saved progression, stable results, correct character binding, and affected Hole/Divinity/Companion/Votes/Equinox consumers. Run changed suites and relevant existing Hole/Tome regressions after the backend edits land.
- Record actual commands, observed branches, unavailable captures, and remaining prerequisite limits. Source inspection is not runtime parity. Later UI work must demonstrate these three upgrade systems using the accepted backend; backend tests do not prove rendered usability.

Current evidence, unresolved prerequisites, approvals, and execution authority belong in the [current handoff](hole-research-brief.md#current-handoff). This plan describes delivery and verification; it reports no implementation or executed checks.
