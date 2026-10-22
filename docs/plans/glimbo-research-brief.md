# Glimbo (World 7): research brief

**Status:** Backend and UI implementation complete; fresh independent Glimbo panel final review found no findings. Ready for user final review.

## Current handoff

- **Issue:** No Glimbo- or Swap Meet-specific issue found. Search returned only closed Research issues #459 and #463, which assign Glimbo to its own workstream and describe it as an external activity boundary.
- **Plan/handoff:** This brief records the approved backend phase and implementation handoff below.
- **Current evidence boundary:** Offline runtime reports version 1.23, “Luminous_Menagerie,” ready on regular-save player index 3 (`Sludgev4`). Native extraction read current total trades, Drop Rate multiplier, selected trade counts/costs/caps, and next-cap gains. No live client, save refresh, mutation, reload, or game action occurred. Offline assets do not establish latest online release.
- **Competitor:** The rendered public guest Glimbo route loaded at `https://idleontoolbox.com/account/world-7/glimbo` without profile parameters. It showed page labels and guest placeholder values; those values are not game evidence. No competitor implementation source is used as evidence.
- **Ownership:** Backend domains, pipeline, and extraction evidence belong to the backend phase. The Glimbo route and its navigation link are complete; the existing Gallery link remains. No generated static-data directories changed. No WikiBot changes were needed.
- **Current phase:** Seven reviewed outcomes are delivered: Total Trades and Drop Rate summaries; all 22 trades shown by default; shared UpgradeTable panel with six columns; combined material and `notateNumber` cost; current Vault level/current cap/next `+N`; row affordability and sequential affordable count; and default-off “Maintain greenstacks” checkbox that refreshes the same budget, affordability colors, and counts.
- **Fresh independent panel review:** No findings; confidence 0.92. Reviewer checked all seven requirements against actual source and both off/on screenshots. The reviewer confirmed per-render derived rows and `lastUpdated` subscription support mutable-map refresh, and neutral static initialization without save data. User visual approval remains pending.

## Player task and mechanic

Glimbo's Swap Meet lets players trade resources to raise the maximum levels of selected Upgrade Vault upgrades. The official IdleOn Wiki places Glimbo in Pirate Upper Deck, Shimmerfin Deep; access requires Research tile J5, “Glimbo Linguistics.” Its table maps each material to a Vault upgrade and flags trades eligible for the Glimbo BOGO Offer. Players make trades in the game; the website should only show trade progression and effects.

The current 1.23 transaction consumes one material cost and increments the selected trade count by one. The game UI previews the resulting “Max LV” cap and next-trade gain. This is a maximum-level cap, not the player's current Upgrade Vault level. The current source does not establish a separate cap-write path.

The Wiki describes Insider Trading Secrets as a gated Drop Rate TRUE Multi bonus per 100 trades, BOGO as retroactive extra levels on some trades, and Glimbo Coupon as a 25% cost reduction. Source code confirms current trade costs and previews; these descriptions establish player-facing terminology.

## Competitor parity checklist

The public guest route [IdleonToolbox Glimbo](https://idleontoolbox.com/account/world-7/glimbo) rendered without a profile. It visibly showed **Total Trades** and **Drop Rate Bonus**, then repeated trade rows with material, cost, traded count, target Upgrade Vault upgrade, **Max LV**, and **Next: +N Max LV**. No trade controls or additional summary fields appeared. The guest page states “Browsing as a guest”; its displayed zero counts, `1.00x`, costs, and caps are placeholders, not player or game values.

## Existing application support

- `data/domain/world-7/glimbo.tsx:4-30` parses `Research[12]` into `tradeCounts` and exposes `totalTrades` using cumulative rounding. This is reusable total state, not a trade catalogue or material/cost view.
- `data/domain/world-7/research.tsx:350-366,1233-1245` supplies Glimbo totals to Research square 168 and calculates the bonus per complete 100-trade block. The audit's “Drop Rate bonus” gap is partly covered by this existing calculation; no page displays it.
- `data/domain/world-4/tome.tsx:666-668,1143-1145` and `data/domain/menagerie.tsx:720` consume the total. Preserve these callers.
- `data/domain/upgradeVault.tsx:8-41,105-136` provides Vault upgrade records, images, current level, maximum, next cost, and cost-to-max APIs. It does not model Glimbo's trade-to-upgrade relationship or post-trade maximum.
- `data/domain/data/UpgradeVaultRepo.ts` provides Vault upgrade static records. No handwritten player-facing Glimbo view or typed trade mapping was found.

## Evidence and static prerequisites

The selected offline asset version is 1.23. Its source establishes Glimbo's cost and displayed maximum-level preview. The runtime version does not identify the latest online release. The inspected trade handler consumes the item, increments the trade counter, refreshes Post Office, and recalculates total trades; it does not establish a separate persistent Vault-cap write path.

The typed export `data/domain/data/GlimboTradeRepo.ts` now contains 22 ordered rows. `GlimboTradeModel` supplies named fields for each aligned target Vault upgrade, material item, cost base, and BOGO flag. A read-only native runtime query confirmed generated rows align by index with source lists `CustomLists.h.Research[26]`–`[29]` and saved counts `Research[12]`. No static-data changes or WikiBot work were needed.

**Current cost:** With count `r = Research[12][n]` and cost base `b = Research[28][n]`, base cost is `(1 + r + 1.5*r) * b^r`. Event Shop 38 multiplies cost by `max(0.1, 1 - 25*x/100)`, where `x` is its owned value. Companion 57 then multiplies by `max(0.2, 1 - companionValue/100)` below the pre-companion `1e9` threshold, followed by `floor(max(1, cost))`; at or above `1e9`, it uses `max(0.01, 1 - companionValue/100)` and keeps fractions. Affordability checks owned quantity of Item ID `Research[27][n]` against cost. Source: `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt:244287-310`.

**Target maximum and next gain:** Let `p = UpgradeVault[id][4] + max(0, min(10, 10 * BundlesReceived.bon_u))`. Let `d = 1 + Research Grid 169 mode 1 + Event Shop 40` for a flagged trade (`Research[29][n] == 1`), otherwise `d = 1`. The “Max LV of N” preview is `p + d * (count + 1)`; its next-trade cap is `p + d * (count + 2)`. The displayed next gain is the difference. Source: `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt:290901-928`. This source establishes the cap preview, not a separate cap-write path.

**Trade interaction:** The inspected handler consumes one material cost, increments that trade's saved count by one, refreshes Post Office, and recalculates total trades. It does not grant extra trades or write a Vault upgrade level. Source: `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt:295696-713`.

**Drop Rate:** Current `GlimboDRmulti` returns `1 + Research Grid 168 mode 2 / 100` when square 168 is unlocked, otherwise `1`. Research 168 mode 2 is the per-100-trade bonus multiplied by complete blocks. Source: `docs/game-snippets/minehead/Minehead.1.23.js:8`; `data/domain/world-7/research.tsx:350-365`.

**Other inputs:** `BundlesReceived.bon_u` affects the base Vault maximum (`idleon1.23.txt:290901-928`); existing parser precedent is `data/domain/world-5/hole/hole.tsx:1935-1973`. Companion 57 and Event Shop 38 already have typed data/APIs (`data/domain/data/CompanionRepo.ts:807-819`; `data/domain/data/EventShopBonusRepo.ts:191-204`). `UpgradeVaultModel` and `UpgradeVaultRepo` already provide Vault metadata. Do not edit generated directories or hard-code Wiki rows.

## Proposed API boundary and patterns

Keep Glimbo’s numeric/state API in its domain: trade counts, total trades, Drop Rate multiplier, per-trade cost, and current/next maximum-level previews. Parse `BundlesReceived.bon_u` at Glimbo's raw-data boundary into named bundle ownership state; keep formulas out of React. Reuse `UpgradeVault`, Item, Research 168/169, Event Shop, and Companion. Preserve current Research, Tome, and Menagerie consumers. UI renders domain values and owns no game calculations.

Pattern references: static-backed upgrade state and public cost APIs in `data/domain/world-7/zenithShop.tsx:14-55`; Vault upgrade state, costs, and `UpgVault` parsing in `data/domain/upgradeVault.tsx:8-41,105-136,163-194`; account bundle input parsing in `data/domain/world-5/hole/hole.tsx:1935-1973`; store-backed page access and dense cards in `app/world-7/zenith-market/content.tsx:17-33,35-95`; resource image/quantity display in `components/account/shared/ResourceDisplay.tsx:9-44`. These examples show backend/UI aspects only; Glimbo's one-card-per-trade surface follows the competitor's information need, not its implementation.

## Minimum verification plan for later approved work

- Core tests cover the Glimbo public numeric/state API: total trades, Drop Rate multiplier, per-trade counts, costs, and maximum-level previews. Compare against current-version game evidence from the same retained regular save. Do not test calculated parameters directly; test their effect through the public API. Never synthesize account states or use the public profile for game validation.
- Basic page smoke with the user's regular local save checks summaries and trade rows. The page stays read-only; no trade actions are expected.
- Independent review follows after the supervisor approves the completed backend phase. The implementation handoff records focused extraction and test results.

## Backend implementation handoff

The supervisor approved backend implementation after `GlimboTradeRepo` became available. The repo contains 22 ordered rows, indices 0–21. Its typed fields map to target Vault upgrade, material item, cost base, and enhanced-maximum eligibility. A read-only native runtime query confirmed all four ordered lists align with generated data. No generated files changed.

`Glimbo` exposes `trades`, `tradeCounts`, `totalTrades`, `dropRateBonusMultiplier`, and parsed `bundleUpgradeCount`. Each `GlimboTrade` exposes its catalog data, completed `count`, `material` Item, target `upgrade`, numeric `cost`, current `maximumLevel`, next `nextMaximumLevel`, and `nextMaximumLevelGain`. `updateGlimbo` prepares these values after Research from existing Vault, Research 168/169, Event Shop, Companion, and Glimbo's own parsed bundle state. Costs use native discount order and threshold. Cap previews round both current and next maximum levels. Existing cumulative total rounding remains unchanged.

Selected review finding addressed: Glimbo previously read `hole.villagerBundleBonus`, sourced from `BundlesReceived.bun_u`. Glimbo caps require distinct `BundlesReceived.bon_u`; Hole remains unchanged. Glimbo now requests `BundlesReceived`, parses `bon_u` into `bundleUpgradeCount`, and uses that state for the same clamped cap bonus. Removed Glimbo's Hole import, update parameter, and caller plumbing. Count, cost, cap, and drop-rate semantics otherwise remain unchanged.

Changed files: `data/domain/world-7/glimbo.tsx`, `data/domain/idleonData.tsx`, `tests/configs/glimbo-trades.json`, `tests/results/glimbo-trades-data.json`, `tests/domains/glimbo/glimbo-trades.test.ts`, and this brief.

Verification after the ownership fix: `yarn test tests/domains/glimbo/glimbo-trades.test.ts` passed: one suite, four tests, using the regular fixture's target player 3, `Sludgev4`. The native cap comparisons exercise the changed extraction-to-state path with the save's current `bon_u` ownership; observed native caps matched 542, 123, and 316. Existing native extraction read 14 values without errors. Positive bundle ownership remains unexercised by this account.

The core test was not run red before backend edits; implementation edits preceded test creation. The passing run is green evidence only. The regular save does not exercise the cost-over-1e9 branch or a positive bundle maximum bonus. No native live-client observation or other account was used.

Historical backend-phase status: independent review remained. This was superseded by later backend acceptance and UI work recorded below.
### Affordability backend update

`GlimboTrade.getCostAtCount(count)` now owns both current and hypothetical prices, preserving native discount order, floor, and `1e9` branch. `GlimboTrade.canAfford(resourceBudget, count)` and `getAffordableTradeCount(resourceBudget)` evaluate current and sequential prices without changing saved counts. `Glimbo.getResourceBudget(index, maintainGreenstacks)` reports read-only account stock. Each trade row computes independently; counts do not reserve materials for other rows.

Stock uses `Storage.amountInStorage`, which includes shared chest, all character bags, and refinery. This is an account-wide planner balance, not a claim that stock in another character's bag is instantly available to the active character. With greenstack maintenance enabled, reserve `min(chest stock, 10,000,000)` from bank stock only; keep bag and refinery stock spendable. This follows greenstack's chest-only meaning and allows existing carry stock to fund trades. The checkbox defaults off in UI work. Native v1.23 checks `_ItemsAndStorageOWNED`; `removeitems` consumes ordinary items from inventory then chest, and Refinery materials from refinery then chest (`idleon1.23.txt:117293-343,135211-270,295698-713`). The catalogue includes Refinery3, Refinery4, and Refinery9. Repository patterns: `Storage.amountInStorage` (`data/domain/storage.tsx:13-20`), greenstack threshold (`data/domain/world-4/lab.tsx:653`; `data/domain/data/TomeRepo.ts:406-413`).

`GlimboTrade.currentVaultLevel` exposes parsed `UpgradeVault` level separately from cap previews. Initialization sets static trade metadata, neutral prices, level zero, and zero stock before a save update.

Core test-first result: the initial focused run failed on missing new APIs and the pre-existing invalid `trade.upgrade.id` assertion. The corrected test compares the existing trade name contract. After implementation, `yarn test tests/domains/glimbo/glimbo-trades.test.ts` passed: one suite, 13 tests. It retained native total, Drop Rate, cost, and cap comparisons; added regular-save current Vault levels, sequential cost boundaries, affordability, all 22 budgets, and no-save initialization.

Limits: selected regular save does not exercise the `1e9` cost branch or every bank-reserve boundary. No account-wide multi-row resource reservation is claimed. No UI smoke, review, or commit was run in this backend-only phase.



## Glimbo UI implementation handoff

The backend supervisor accepted the current trade and resource-budget APIs; independent backend review returned no actionable findings. The Glimbo UI uses those APIs without backend changes.

`/world-7/glimbo` uses the existing `UpgradeTable` with `variant="panel"` and its `additionalFilters` toolbar. It preserves the Total Trades and Drop Rate Bonus summaries and shows all 22 rows by default. The material column groups material image/name with `notateNumber` cost; cost text uses the same per-row budget as `canAfford` and `getAffordableTradeCount`. The checkbox label is “Maintain greenstacks” and defaults off. It recalculates budget, affordability color, and sequential affordable count when toggled. Rows show current Vault level / current maximum and next gain as `+N`; no trade controls or purchase-plan actions were added.

Updated path: `app/world-7/glimbo/content.tsx`. Gallery, navigation, backend, generated data, and unrelated UI remain unchanged.

Verification: `yarn ui:status` reported the private Docker app and browser ready. `yarn ui:run .ui-verification/glimbo-panel-ui-smoke.cjs` passed against the configured regular local save. The scenario asserted 22 rows, all six table headings, checkbox default-off state, and toggled state. Screenshots inspected: `.ui-verification/runs/2026-10-22T09-10-34-673Z-29191/glimbo-off.png` and `glimbo-on.png`; visible affordable-trade counts changed after reserving greenstacks. The screenshots show the combined material/cost cell, current/max level, compact `+N`, and panel toolbar. `result.json` reports passed; `errors.json` has only the existing shell hydration warning, third-party `browsingTopics` error, and external CORS, failed-resource, and 403 errors. `impeccable detect --json app/world-7/glimbo/content.tsx` returned `[]`.

At the time of this UI implementation handoff, no separate UI no-save browser run or independent UI review had occurred. Subsequent independent final review is recorded below.

## Final audit review handoff

Fresh review confirmed the resolved-gap defect; the report reader retains entries even when `missing` is empty.

Fix: removed only the Glimbo gap record from `docs/audits/idleontoolbox-coverage-data.json` and embedded HTML data. Competitor Glimbo inventory and renderer remain unchanged.

The actual report was opened at `http://127.0.0.1:8765/idleontoolbox-coverage.html` in Chromium and filtered to World 7 → Missing domains. After removing both resolved Gallery and Glimbo records, report showed 0 of 89 gaps; neither domain appeared. The JSON and embedded HTML data contain neither gap record.

## Final review and acceptance

Backend phase remains accepted after independent review found no actionable findings. Backend tests passed: one suite, 13 tests, including no-save static initialization. Native cap comparisons matched 542, 123, and 316 for the exercised regular-save values.

Fresh independent Glimbo panel final review found no findings (confidence 0.92), checking all seven requirements against source and both screenshots. The user approved this work after review and regular-save panel smoke; local commit is authorized.

Reviewed behavior: the existing `UpgradeTable` panel presents all 22 trade rows, six columns, material plus notated cost, current Vault level/current and next maximum, and next gain. The greenstack checkbox defaults off; toggling it changes the shared budget, affordability color, and sequential affordable count. Review confirmed same-budget calculations, per-render derived rows, and `lastUpdated` subscription refresh behavior. Static initialization remains neutral and valid without save data.

Actual regular-save UI smoke: `yarn ui:status`; `yarn ui:run .ui-verification/glimbo-panel-ui-smoke.cjs` passed. Screenshots: [greenstacks off](../.ui-verification/runs/2026-10-22T09-10-34-673Z-29191/glimbo-off.png) and [greenstacks on](../.ui-verification/runs/2026-10-22T09-10-34-673Z-29191/glimbo-on.png). Observed Coral32 changing from green 65 to red 0; DivinityPearl219 to 30; MonsterTax540/542 with +2; summaries 498 trades and 1.05x.

Actual focused core suite: `yarn test tests/domains/glimbo/glimbo-trades.test.ts` passed one suite, 13 tests. It retained native values/cap comparisons 542, 123, and 316. This is evidence for the retained regular-save fixture, not all 22 native-independent claims.

Limits: source/game evidence uses offline v1.23 and regular-save player 3 only; no live-client check or public-account validation. Positive bundle ownership, cost at/above `1e9`, all reserve boundaries, and positive-bundle branch were not exercised natively. No separate no-save UI browser run, broad tests, build, lint, formatter, or push occurred. Accountwide budget includes chest, all bags, and refinery; other-character bag stock may require transfer. Greenstack reserve is `min(chest stock, 10,000,000)`; only chest stock is reserved. Rows calculate independently, not as a joint plan. Shared-shell hydration warning and third-party `browsingTopics`, CORS, failed-resource, and 403 errors were observed; they were not Glimbo errors.

## Sources

- Audit acceptance inventory: `docs/audits/idleontoolbox-coverage.html:1472-1491`.
- Existing related Research handoff/issues: [#459](https://github.com/Sludging/idleon-efficiency/issues/459) and [#463](https://github.com/Sludging/idleon-efficiency/issues/463); both are closed Research work, not Glimbo feature work.
- Official player-facing mechanic, unlock, trade pairs, and bonuses: [Glimbo's Swap Meet — IdleOn Wiki](https://idleon.wiki/wiki/Glimbo%27s_Swap_Meet), modified 2026-10-12.
- Competitor guest page: [IdleonToolbox Glimbo](https://idleontoolbox.com/account/world-7/glimbo), rendered without profile parameters; visible fields are recorded above. Guest defaults were not used as game evidence. No competitor UI source was inspected or used.
- Typed Glimbo trade catalog: `data/domain/data/GlimboTradeRepo.ts` and `data/domain/model/glimboTradeModel.ts`; the 22-row alignment was checked against current native `CustomLists.h.Research[26]`–`[29]`.
- Current local game evidence: shared offline runtime `/status` and `/game-version` report source offline, 1.23 `Luminous_Menagerie`, ready on target player index 3 (`Sludgev4`). Current source: `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt:244287-310,290901-928,295696-713`; helper `docs/game-snippets/minehead/Minehead.1.23.js:3-8`. This local version does not establish latest online release. Regular-save values were extracted without refreshing or mutating the fixture.
- Local Glimbo logic and existing consumers: `data/domain/world-7/glimbo.tsx:4-30`; `data/domain/world-7/research.tsx:350-366,1233-1245`; `data/domain/world-4/tome.tsx:666-668,1143-1145`; `data/domain/menagerie.tsx:720`.
- Existing material, Vault, Research, companion, and Event Shop data/APIs: `data/domain/items.tsx:1-3`; `data/domain/data/ItemRepo.ts`; `data/domain/upgradeVault.tsx:8-41,105-136,163-194`; `data/domain/data/UpgradeVaultRepo.ts`; `data/domain/model/upgradeVaultModel.ts:3-16`; `data/domain/data/ResearchGridBonusRepo.ts:1522-1537`; `data/domain/data/EventShopBonusRepo.ts:191-204`; `data/domain/data/CompanionRepo.ts:807-819`; `data/domain/companions.tsx:14-56`.
- Shared integration points: `components/navigation.tsx:72-87`; `data/domain/idleonData.tsx:65,179`.
- Project constraints and patterns: `AGENTS.md:148-159`; `docs/agents/backend-patterns.md:5-16,22-34,50-68`; `docs/agents/ui-patterns.md:17-27,46-67,100-150`; `docs/TESTING_IMPLEMENTATION.md:9-42`; `tests/helpers/README.md:3-17`.
