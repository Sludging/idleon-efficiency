# Spelunking Part 3: backend delivery plan

## Outcomes

Deliver data for approved Part 3, #437, and the newly selected backend outcomes:

- Preserve existing account Amber and shop-upgrade state, intrinsic static descriptions, levels, caps, prerequisites, and effects. Keep real upgrade information visible for locked rows; do not replace it with lock boilerplate or hide spoiler content.
- Provide verified current next-purchase Amber cost and affordability, finite cost-to-max, and next-10 total bounded by the remaining cap. Keep price, affordability, visibility, and purchase eligibility distinct.
- Preserve existing Elixir ownership, equipment, memorization, limits, descriptions, and resolved quantities; retain approved Manic, Overstim, Trackometer, and Amber behavior.
- Preserve accepted Part 1 Amber denomination/formatting and Part 2 stamina, recharge, and Trackometer maximum-stamina behavior.

This is backend data only. UI placement, opacity, typography, summary composition, and display colors belong to the later UI phase. Add no authored player-facing descriptions, purchase simulator, or separate Amber/shop owner.

## Responsibilities

Keep `Spelunking` in `data/domain/world-7/spelunking.tsx` as account coordinator, repository initializer, raw-save boundary, and integration owner. Follow the existing owner model: each concept parses and interprets its own fields; the parent delegates. Keep parsing free of cross-domain reads and make derived updates replace prior values on repeated processing.

**Upgrade:** Keep existing `Upgrade` as owner of saved level, cap, prerequisites, owned/effective bonus, generated metadata, prepared price inputs, and quote fields. Preserve exact repository description and effect values for locked rows. Keep owned totals separate from potential per-level source values; saved level `-1` has zero owned bonus. The purchase from `-1` to `0` unlocks the upgrade but does not grant the level-1 effect; the next purchase is quoted at saved level `0`. Upgrade 4's effect depends on each character's Spelunking skill level.

**Price inputs and quotes:** Prepare required shared discounts once after all producers are ready. `Upgrade.prepareCostQuotes(inputs)` requires `SpelunkingUpgradeCostInputs`; it prepares numeric `nextCost` and `costNext10` quotes, plus numeric `costToMax` for finite upgrades. Only genuinely unbounded upgrades have undefined `costToMax`. Add `Upgrade.getCost(level = this.level)`, `getCostToMax()`, `getCostForNextNLevels(10)`, and finite `remainingCap`. `getCost` returns one source-equivalent next purchase quote; cost, affordability, visibility, max level, and buyability stay separate. `Spelunking.canAffordUpgrade(upgrade, cost?)` compares account Amber with the supplied quote only.

**Bulk quotes:** Saved level is the source's saved index: `-1` quotes the first purchase, then `0` quotes purchase to level 1. For finite `maxLevel`, `remainingCap = max(0, maxLevel - level)` and max quote sums saved levels `[level, maxLevel)`. Next-10 sums `[level, min(level + 10, maxLevel))`. At cap it sums zero purchases. Repository `maxLevel === 99,999` is unbounded: expose no finite `remainingCap` or cost-to-max and never iterate to the sentinel. Hold all current inputs fixed; do not simulate purchases or unlocks.

**Existing Part 3 state:** Preserve existing tool metadata/API support without implying actor-local selections. Keep Elixir saved equipment, memorization, ownership, limits, descriptions, and resolved quantities separate. Retain Manic, Overstim, and Trackometer saved progression and existing calculations. Use existing approved Elixir description resolution and its sole authorized quantity table; add no copied static values or generated-data edits.

## Required data and prerequisites

Use generated `SpelunkingUpgradeRepo` metadata for upgrade identity, description, `costBase`, `costIncrement`, `maxLevel`, `bonusPerLevel`, tier coordinates, requirements, and effect fields. These source values provide the truthful potential effect for locked rows. Preserve exact intrinsic descriptions and potential effect values beside separate zero-owned/effective totals; do not imply that buying from saved level `-1` immediately grants the level-1 effect.

The Jelly_Operator v1.22 `ShopUpgCost` source formula is captured at `docs/game-snippets/spelunking/Spelunk.1.22.js:8`. It uses `factor = talentDiscount * mealDiscount * (10 + savedLevel) * costBase * retention * 9.5^column * 6.3^row`, then multiplies by `10^7` for index ≥52 and by another `10^9` for index ≥66. `talentDiscount = 1 / (1 + max(0, getbonus2(1, 235, -1) * CalcTalentMAP[235]) / 100)`. `mealDiscount = 1 / (1 + SplkUpg * min(2, max(1, 1 + floor(firstUsernameSkillLevel / 50))) / 100)`. `retention = max(0.1, 1 - (max(Sushi6, Sushi27) + Jelly22) / 100)`. Saved level `-1` returns `factor`; levels `0+` return `.25 * factor * costIncrement^savedLevel + savedLevel^2 + 5 * savedLevel`. Preserve factor and calculation order.
Source inputs and website producer equivalence are now verified for the selected offline account. Native `getbonus2(1,235,-1)` evaluates Talent 235 for every saved username and returns their maximum; native `CalcTalentMAP[235]` scales that bonus. The normal website account factory prepares each player's `finalTalentInputs`; evaluate `Player.getTalentBonusAtInputs(235, player.finalTalentInputs)` for every player and select the maximum. This save's native result and website maximum both equal `0.24875621890547264`; only `Sludgev4` has that nonzero website result. Native and website meal `SplkUpg` both equal `61.426807484784`; Sushi 6/27 both equal `30`/`50`; completed Jelly 22 both equal `0`. The first saved username is `Sludgadin`; match `charNames[0]` to `playerName`, not the sorted `players[0]`. The matching player has ID 0 and Spelunking level 165. `CalcTalentMAP[235] = 2`; saved Amber is `4.610006779952582e+32`. Native and website source multipliers give meal scale 2 and Sushi/Jelly retention `0.5`.
Source metadata comes from runtime `CustomLists.SpelunkUpg` fields `[1,2,3,7,8]` for base, increment, cap, 9.5 exponent, and 6.3 exponent; field `[6]` is not the price exponent. The selected account's source saved levels at indices 0/51/52/65/66 are 175/100/5/-1/-1. Source `ShopUpgCost` writes only numeric `DNSM.h.SpelunkyDN` scratch in its selected branch. Its Talent 235 callee writes account-max scratch fields under DNSM; Sushi 6/27 and completed Jelly 22 branches only read game attributes. The read-only `/cloud-save` response has no `DNSM` field and retains `Spelunk`; after native helper calls, levels, Amber, first username, and skill level were unchanged. This is offline Jelly_Operator 1.22 evidence, not connected-game proof.
Original `ShopUpgCost` output matches an isolated evaluator using prepared website producer values and runtime metadata exactly on this account:

| Index | Saved level | Native and isolated next cost | Cost to max | Next 10 | Amber affordability |
|---|---:|---:|---:|---:|---|
| 0 | 175 | `4.731241546291606e+30` | unbounded | `5.5699180460683645e+32` | yes |
| 51 | 100 | `9.51942414477217e+28` | unbounded | `2.0314892613403756e+30` | yes |
| 52 | 5 | `5.186263648010394e+30` | `5.140192404098864e+36` | `5.140192404098864e+36` (five remaining) | yes |
| 65 | -1 | `2.2513410263693443e+37` | `3.746822746510951e+107` (301 purchases) | `1.7714114890492712e+39` | no |
| 66 | -1 | `6.842790275590997e+36` | unbounded | `8.23477563875874e+37` | no |

All native next-cost comparisons have exact numeric equality with the frozen-input evaluator. The evaluator preserves source factor order and saved level `-1`, uses fixed inputs, and sums at most ten purchases or to a finite cap. Bulk totals are derived projections, not native aggregate outputs. The finite 65 cap includes the `-1` first purchase plus saved levels 0–299; unbounded sentinel `99,999` yields no cost-to-max. Full inputs, failure history, and source/runtime references remain in `.omp/research/spelunking-shop-price-parity-followup.md`.
Price factor order remains source-owned: Talent discount, meal discount, `(10 + savedLevel)`, retention, base, `9.5^field[7]`, `6.3^field[8]`, then threshold multipliers `10^7` at index 52 and `10^9` at index 66. `-1` returns factor; levels 0+ use `.25 * factor * increment^savedLevel + savedLevel^2 + 5 * savedLevel`. Keep single-level arithmetic in source order.
For finite cost-to-max, no suitable existing numeric utility exists: the repository range helper allocates an array, and existing upgrade patterns repeatedly quote each level. Use a small pure aggregate without a `99,999` loop: include the special `-1` first-purchase term, then sum `.25 * D * (10 + L) * r^L + L^2 + 5L` over finite saved levels `L >= 0` with fixed inputs, where `D` is all discounts, base, retention, column/row factors, and tier multipliers, and `r = costIncrement`. Use a stable geometric-sum calculation with an exact `r === 1` branch and a cancellation-safe near-one branch. Keep single-level `getCost` arithmetic and comparisons in source order. Compare aggregates with bounded sequential source-formula references in tests; no purchase simulation or generic price engine.

## Integration
Keep existing initialization, save key, account registration, and domain interfaces. Parse saved upgrade state through `Upgrade`; keep static cost metadata distinct from prepared dynamic quote data. Current account post-processing order is Jelly, Cooking, Sushi, then player talent contexts; Spelunking presentation runs later in postPostProcessing. Prepare Spelunking price inputs and quotes at its existing late step, after all these producers. Match `charNames[0]` to `Player.playerName` explicitly; do not assume sorted `players[0]` means first saved username. Use Spelunking's saved Amber balance for affordability.

Follow the shared `EfficiencyUpgradeTable` contract used by Compass, Grimoire, and Tesseract. Rows consume prepared `nextCost`, one `goalCost`, locked/maxed state, and an affordability callback. The shared table's locked-next-cost and unlock-goal behavior does not define Spelunking's quote semantics. Keep `costToMax` and `costNext10` separate in the existing domain owner; add no speculative UI options. Reuse cost-owner aspects from Grimoire/Compass, not Royal Armory's unrelated formula.

Keep raw numeric costs and affordability in the domain; UI owns affordability colors and text formatting. Keep UI-only layout and calculation outside this backend.

## Verification

- Source-vs-website producer inputs and original helper outputs were independently compared for one selected offline account: ordinary index 0, `-1`, 51/52 and 65/66 boundaries, finite-cap aggregates, next-10, and Amber affordability. Results and limits are recorded above; they prove this saved context only, not connected-game or other-account parity.
- Test exact saved-level semantics, source factor order, one purchase per `getCost`, finite `remainingCap`, first-purchase `-1`, and maxed/locked affordability separately from buyability. Keep named observed source/website prices paired with the selected offline account.
- Compare finite-max aggregates with bounded sequential source-formula references. Verify next-10 stops at `min(10, remainingCap)`, cost-to-max has no finite result for sentinel `99,999`, and fixed-input projections do not mutate state. Exercise increment exactly 1 and near 1.
- Verify first saved username maps by name to its required website player; do not select a fallback. Repeated account processing must replace prepared inputs and quote state.
- Verify locked rows retain exact generated descriptions/effect values and zero-owned totals. Show potential source values separately; do not claim the `-1` to `0` purchase grants a level-1 effect. Run focused Spelunking tests and normal account-factory processing after implementation; these do not establish source parity or UI behavior.

## References

- Issue [#437](https://github.com/Sludging/idleon-efficiency/issues/437) and approved revised Part 3 UI plan: `spelunking-part-3-ui-plan.md`.
- Original v1.22 mechanic source: `../game-snippets/spelunking/Spelunk.1.22.js`; detailed price semantics and evidence limits: `spelunking-research-brief.md#shop-purchase-semantics-and-dynamic-price-scope` and `#shop-next-price-and-affordability`.
- Generated upgrade source: `data/domain/data/SpelunkingUpgradeRepo.ts`.
- Pricing owner and integration: `data/domain/world-6/royalArmory/upgrades.ts`, `data/domain/grimoire.tsx`, `data/domain/compass.tsx`, and `data/domain/idleonData.tsx`.
- Table contract: `components/account/shared/EfficiencyUpgradeTable.tsx` and `components/account/shared/useUpgradeTableData.ts`; the table consumes prepared domain quote data and affordability.
- Calculation ordering and domain ownership: `docs/agents/backend-patterns.md`.
