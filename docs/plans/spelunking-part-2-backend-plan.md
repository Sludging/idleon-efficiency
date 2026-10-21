# Spelunking Part 2: stamina-recharge contributors

## Outcomes

Extend [Part 2 (#436)](https://github.com/Sludging/idleon-efficiency/issues/436) with truthful contributors for the shared stamina-recharge tooltip.
Show the base hourly rate, six additive percentage contributions, and four independent multipliers.
Keep current recharge, character stamina, refill estimates, Journal effects, pages, and daily reads numerically unchanged.

Expose source identities and numeric contributions, not UI-formatted rows or authored descriptions.
Use existing owner names and generated text. Do not add explanation strings, copied descriptions, or a new bonus framework.

## Responsibilities and API

**Spelunking owns the breakdown.** Its current updater calculates the rate but discards the contributing values.
`hourlyRecharge` alone cannot recover the ten contributions or their grouping.
Reading producer domains again in the component would duplicate the formula and bypass the prepared owner contract.

Add only these members to the existing `Spelunking` owner:

- `readonly baseHourlyRecharge: number = 5`, naming the existing source-verified base, not a new static value.
- `additiveRechargeContributors: RechargeContributor[]`, containing percentages in existing summation order.
- `rechargeMultiplierContributors: RechargeContributor[]`, containing applied factors in existing multiplication order.
- A local `RechargeContributor` value shape with only `source: string` and `value: number`.

The two collections define the operation. Do not duplicate operation fields, formatted units, availability forecasts, or obtainable rewards.
Keep zero contributions and neutral factors so the tooltip can identify inactive sources without inventing future bonuses.
The UI owns category labels, numeric formatting, and neutral-entry styling.

Prepare both collections in `updateSpelunkingPresentation`, where the current inputs already settle.
Use those same values to calculate `hourlyRecharge`; do not maintain a second independently calculated breakdown.
Preserve left-to-right additive order and multiply sequentially from the base in the current factor order.
Reset the collections during initialization and replace them on each preparation pass.
Reuse the existing upgrade-5 value already shared with maximum-stamina preparation.

Selected [backend patterns](../agents/backend-patterns.md): Research owns numeric contributors used by its totals; Totalizer prepares settled producer inputs; FriendBonus/Meal retain static identity on existing owners.
Reuse these aspects only. Do not import Research's feature-specific types, private helpers, reward structures, or authored gate strings into Spelunking.

## Required data and source identity

All inputs already exist. No new save fields, extraction tables, or producer calculations are needed.
Use each producer API below, not a fresh implementation of its bonus.
Names in this table explain identity; implementation reads owner metadata rather than copying these strings.

| Group, in calculation order | Existing input | Source identity for details | Paired result |
|---|---|---|---|
| Additive 1 | `spelunking.getUpgradeBonus(5)` | Upgrade 5 `data.name`: Stamina Resurgence | `95` |
| Additive 2 | `alchemy.getBubbleBonusForKey("Y11")` | Matching bubble `data.name`: Faster Nrg | `19.380037197768132` |
| Additive 3 | `spelunking.chapters[2].bonuses[1].getBonus()` | Chapter Three `pageItem.displayName`; intrinsic `data.bonus` remains available | `10.670731707317074` |
| Additive 4 | `spelunking.chapters[5].bonuses[2].getBonus()` | Chapter Six `pageItem.displayName`; intrinsic `data.bonus` remains available | `0` |
| Additive 5 | `mastery.getSkillBonus(SkillsIndex.Spelunking, 5)` | Existing `SkillMastery.name`; UI identifies its Spelunking context | `10` |
| Additive 6 | `Math.min(2 * nativeCardLevel, 20)` | Card `w7a10` `displayName`: Spearfish | `2` from native level `1` |
| Multiplier 1 | `1 + meritocracy.getCurrentBonus(17) / 100` | Bonus 17 generated `data.text`; it has no name field | `1` from `0%` |
| Multiplier 2 | `1 + legendTalents.getBonusFromIndex(30) / 100` | Talent 30 `data.name`: Lightning Fast Naps | `1.5` from `50%` |
| Multiplier 3 | `Math.max(1, royalArmory.getSpelunkingRechargeOutpostMultiplier())` | Upgrade 79 `data.name`: Compounding Outposting | `1` |
| Multiplier 4 | `1 + sushi.getBonusFromIndex(11) / 100` | Sushi 11 `data.name`: Toro Nigiri | `1.25` from `25%` |

Find the Alchemy identity through `bubble.data.bonusKey`, as its public calculation does.
The current export has one matching bubble. Do not hardcode its cauldron position or recalculate its bonus.
Keep the complete mastery reward; multiplying its returned `10` by ten would count it twice.
Keep native card scaling and the cap; `Card.getBonus()` includes boosts that this mechanic does not use.
Keep Royal Armory's selected-category behavior. Do not use Research's doubled Outpost scaling or preview reward.
Do not substitute maximum-stamina contributors for recharge contributors.

The unchanged grouping is:

```text
baseHourlyRecharge
* meritocracyFactor * legendTalentFactor * royalOutpostFactor * sushiFactor
* (1 + sum(additiveRechargeContributors) / 100)
```

The retained paired extraction gives `22.223509584851737` stamina/hour.
This rate remains account-wide; character level is not an input.

## Integration and UI contract

Keep the existing pipeline registration at [idleonData.tsx:404–411](../../data/domain/idleonData.tsx#L404-L411).
Preparation remains after late Royal Armory and Meritocracy inputs in `postPostProcessingMap`.
Do not add a domain, processing hook, store, dependency order change, or Royal Armory API.
Descriptions stay on their existing owners. The new `source` strings identify those owners; they do not describe new mechanics.
If intrinsic Meritocracy text is displayed, the UI substitutes its existing multiplier placeholder using the applied factor.
Do not use Rift's handwritten `getBonusText` override as a new generated description.

The later UI phase reads the two collections and base beside `hourlyRecharge`.
Follow Research's current-gains tooltip: separate additive bonuses from multipliers, format numbers in UI, and dim neutral entries.
Research's `Contributions` and `SourceValue` are private components; their reuse does not require exporting a shared framework.
The other seven presentation requests need no backend change. Their exact requests and owner mapping remain in the handoff.

## Prerequisites and verification

Required producer APIs, static identities, and paired results are present.
After separate implementation authorization, extend the existing Part 2 tests under [domain testing guidance](../TESTING_IMPLEMENTATION.md):

1. Compare each exposed additive value and multiplier with the matching extraction in `tests/results/spelunking-part-2-data.json`. Keep configured tolerance `0`.
2. Retain the core `hourlyRecharge` comparison and every direct producer comparison. Assert the prepared public breakdown, not an expected value calculated from the implementation.
3. Check intrinsic source identities, both distinct chapter sources, native card conversion, six additive entries, and four multipliers. Keep zero and neutral entries.
4. Exercise fresh normal-account factories and repeated processing through `part-2-pipeline.test.ts`. Confirm contributors do not duplicate or stack.
5. Run focused Part 2 and existing Spelunking regressions after implementation. Preserve saved amounts, maxima, refill, Journal, reads, and page locations.
6. Later UI verification opens the actual recharge tooltip and reconciles its values and groups with the prepared owner. Verify the seven presentation requests there, not during backend work.

Reuse the unchanged real-save/result pair. A changed config or missing expected value requires pairing before comparison.
Current evidence observes a neutral Royal multiplier, inactive Meritocracy, and zero Chapter Six recharge.
It does not prove enhanced Royal recharge, active Meritocracy, card-cap boundaries, positive refill, or connected live-game parity.
Record uncovered states rather than manufacturing saves.
Shared runtime errors and the historical unrelated TS18047 remain failed and unwaived; this work does not fix them.

## Evidence references

- Original v1.22 `StaminaRegenRate`: [Spelunk.1.22.js:8](../game-snippets/spelunking/Spelunk.1.22.js#L8), retained accessor `idleon.allScripts.ActorEvents_579._customBlock_Spelunk.toString()`.
- Current preparation and loss of individual inputs: [spelunking.tsx:569–625](../../data/domain/world-7/spelunking.tsx#L569-L625).
- Royal selection/scaling: [royalArmory.ts:182–214](../../data/domain/world-6/royalArmory/royalArmory.ts#L182-L214).
- Research ownership: [research.tsx:434–445,1128–1133,1278–1293](../../data/domain/world-7/research.tsx#L434-L445). Tooltip grouping: [researchContent.tsx:41–71,187–190](../../components/world-7/research/researchContent.tsx#L41-L71).
- Existing comparisons: [part-2-parameters.test.ts:46–104](../../tests/domains/spelunking/part-2-parameters.test.ts#L46-L104), [part-2-test-helpers.ts:95–115](../../tests/domains/spelunking/part-2-test-helpers.ts#L95-L115), and [extraction config](../../tests/configs/spelunking-part-2.json).
- [Wiki Spelunking](https://idleon.wiki/wiki/Spelunking) supplies player vocabulary, not the formula oracle.
