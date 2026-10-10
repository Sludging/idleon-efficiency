# Royal Armory domain implementation plan

Status: owner-first limited Outposts refactor plus independent node maximum/available quantities, scalar connection range and saved OutpostKind implemented, locally verified and independently reviewed PASS, with disclosed broader test/browser limits. The human-authorized narrow Spelunking purchased-bonus dependency is also implemented/verified with fresh independent PASS, without a separate case. Authorized five-rank XP/hour/timing, target eligibility, exhausted-link alternatives and fuller Outposts UI remain BLOCKED only on NonAFK map-ID membership export/sync, which the human is handling. #421/#425 remain OPEN; no whole-Stage4 completion is claimed. Stop before Royal Statues; basic Royal Statue handling MUST precede ANY efficiency-target discussion.

## 1. Goal and scope

Make the existing Royal Armory domain follow the approved backend patterns. Give each game concept named state, clear ownership, and the agreed calculations and image metadata. Preserve existing behavior except for the explicitly agreed Orblet level-preservation fix and newly agreed outputs; do not make automatic formula corrections.

This plan covers:

- Typed map states, built outposts, ranks, unit roles, assignments, and movable units.
- Outpost-owned connections, connection range, and eligible targets.
- Resource stockpiles and nodes, including grade, capacity, available quantity, and depletion.
- Royal Statues: marble, parchment, attempt cost, success chance, affordability, and bonus.
- Entity-owned image metadata, including explicit TODOs for unavailable artwork.
- Migration of affected callers and existing real-save core/direct-parameter comparisons.

This remains a domain direction plan, not approval to implement every listed calculation. The first #425 delivery includes named saved state, existing ranks/points/rates and the limited Outposts tab. The latest human direction now authorizes rank XP/hour and next-rank timing, source-defined connection range/eligibility, node maximum/available quantities and factual exhausted-link status, and the fuller Outposts UI with production/resource totals, roles, connections and saved glorified status. Preserve the six owning modules and current domain approach; stop before Royal Statues. See the exact authorization quote in [the feature plan](ROYAL_ARMORY_FEATURE_PLAN.md#current-authorization-and-mandatory-stage-order). No Statues/targets/efficiency implementation is authorized by this pass.

The user has already fixed late updater registration and the old Tome consumers. Treat those fixes as the starting point, not open work to repeat.

New backend and test/config work remains subject to the selected-scope static-data gate and pause rule in section4. The original map-coordinate gap was subsequently resolved by the human's Stage1 sync (#422); do not treat that historical preflight as a current blocker. The image inventory records prepared assets, independently of future calculation prerequisites.

## 2. Required patterns

Read [repository guidance](../AGENTS.md), [implementation patterns](agents/implementation-patterns.md), [backend patterns](agents/backend-patterns.md), [architecture](../skills/architecture/SKILL.md), and [testing guidance](TESTING_IMPLEMENTATION.md) before implementation.

Use only these aspects of the approved examples:

| Example | Applicable aspect |
| --- | --- |
| `FriendBonus`, `Meal`, `MainframeBonus` | Website-owned wrappers and `fromBase` for existing generated records. |
| `Kitchen`, Sushi slot records | Meaningful save-defined entities; named records for data-only relationships. |
| Sailing and Sushi parsing | Decode positional fields and sentinels during parsing. |
| `Totalizer` | Prepare inputs before getters use them. |
| `Meal` | Reuse one bonus formula for current or proposed level, without changing saved level. |
| `Item.getImageData`, `Sneaking.getJadeImageData` | Entity image ownership; domain ownership only for feature-wide artwork. |

The approved owner-first layout is [royalArmory/royalArmory.ts](../data/domain/world-6/royalArmory/royalArmory.ts), [outposts.ts](../data/domain/world-6/royalArmory/outposts.ts), [units.ts](../data/domain/world-6/royalArmory/units.ts), [resourceNodes.ts](../data/domain/world-6/royalArmory/resourceNodes.ts), [upgrades.ts](../data/domain/world-6/royalArmory/upgrades.ts) and [orblets.tsx](../data/domain/world-6/royalArmory/orblets.tsx). Follow Hole: the root coordinates entity parsing and keeps account update functions; entities decode their own save state and own local calculations. The obsolete monolith is removed, without aliases/barrels or separate save/update/utils modules. Do not add generic entity frameworks, classes for every raw array or subclasses for every role.

The generated directories `data/domain/data/`, `data/domain/enum/` and `data/domain/model/` remain read-only. Royal Statue static definitions and the Stage1 map-ID x/y export are available. Future selected connection/range/quantity calculations still require confirming their own source-defined inputs.

## 3. Model and ownership contracts

The current named contracts below are implemented where explicitly marked. Remaining Stage4 calculations are now authorized work, not claims of delivery; proposed APIs below are direction rather than finalized continuation interfaces. Royal Statue calculations remain future scope. Use catalog IDs for identity rather than numeric selectors for unrelated mechanics.

### Account domain

`RoyalArmory` currently owns upgrade/Orblet catalogs, `mapStates: Map<number, RoyalMapSource>`, `resources: Map<number, RoyalResource>`, `resourceNodes: RoyalResourceNodes`, `units: RoyalUnits` and saved Royal Statue levels. Royal Statue entity/attempt behavior remains future scope.

The old `getTotalStat(index)` dispatcher is replaced by the prepared numeric fields `totalResourceGrade`, `totalOutpostUpgradeLevels`, `purifiedOutpostCount`, `resourceQuantityLogTotal` and `builtOutpostCount`. They retain total saved grades, built upgrade levels, first-Purity-rank count, stockpile logarithm sum and built count, respectively. `getTotalRoyalStatueLevels()` remains unchanged. Shared collection inputs belong to `resourceCollectionBonuses`; local rate/rank/unit behavior belongs to the map owners.

Late account preparation chooses `selectedRoyalGuardian` once from eligible `ClassIndex.Royal_Guardian` characters by calculated collection rate; account-facing `getOutpostResourceRate(mapId)` uses it. Independent all-player talent maxima225/226/230 remain separate. Explicit paired comparisons call `map.getResourceCollectionRate(armory.resourceCollectionBonuses, getRoyalGuardianContribution(player, alchemy))`. Character level/W14 is passed as a named contribution; no persistent per-player W14 map or getter-time reselection remains.

### Maps and built outposts

A map is not automatically a built outpost. Preserve unbuilt-map cleared-monster progress separately from built-outpost state. The same saved position can have different meanings before and after construction; decode it before calculations use it.

Implemented map/outpost state:

- `RoyalMapSource` owns map identity, cleared-monster progress on unbuilt maps, stable `OutpostRankProgress` records for Trading/Intel/Command/Military/Purity, rank-derived purification, `OutpostUnits`, incoming support count and the existing local collection-rate equation.
- `Outpost extends RoyalMapSource` adds Expanded Barracks, Advanced Logistics and Greater Education levels, separate saved glorification, two typed outgoing connections, numeric unused points, prepared `connectionRange` and owned `OutpostKind`. Kind parses saved slot10 independently of empty links: ResourceDepot0, SupportCamp1, SavageStronghold2. Support-link decoding uses `kind === SupportCamp`, not a transient flag.
- One `OutpostRank` enum and `OUTPOST_RANKS` list serve every caller. Parse decodes totalXP; calculate fills level/currentXP/requiredXP/previousThreshold/nextThreshold on stable owned records.
- Each entity parses the fields it owns; there are no retained positional rows, status/outpost wrappers or legacy accessors.

Affected map/outpost numeric outputs start/reset to0. Parse/reparse and early-only collection reads remain0 until genuine late account bonuses exist; the owner formula retains literal125, without an artificial `baseRate` readiness field or scratch rate row. Existing operation order and uncommon partial-save semantics are preserved, including unbuilt cleared progress and numeric0 partial Military progress. Do not introduce validation guesses or change zero into unavailable output.

Scalar connection range and saved kind are implemented; target eligibility, final five-rank XP/hour/timing, exhausted-link alternatives and fuller outpost image/display requirements remain authorized but BLOCKED. Saved glorification is owned now, but no separate glorification display was added.

### Roles, assignments, and movable units

Use explicit role groups:

| Group | Roles |
| --- | --- |
| Stationary | Worker, Trader, Guard, Surveyor |
| Movable | Militia, Commander, Knight, Priest |

`RoyalUnitRoleDefinition` currently owns name, effect meaning/unit, prepared effect and image metadata, obtained through `armory.units.getRole(RoyalUnitRole.Worker)` and the other named roles. Worker effect is collection percent; Guard is range in pixels; Militia is monsters/hour. The other five effects are rank-XP bonus percentages, not final XP/hour.

`OutpostUnits` currently owns nine stationary slot records (`slotIndex`, role or `undefined`) and named-role assigned/passive/total count getters. Parsing discards digit encoding; rank-derived passive units do not create fictional roster entries. New placement/available-slot eligibility calculations remain future scope.

`RoyalUnits.roster` currently contains `RoyalMovableUnit` records with `world`, `rosterIndex`, `role` and `stationedMapId`, parsed from paired saved arrays. `(world, rosterIndex)` is saved-slot identity, not an invented UUID. Militia may be stationed on an unbuilt map; no new placement-eligibility engine was added.

### Connections and range

Each outpost currently owns exactly two ordinal connection slots. Empty slots are `undefined`; `OutpostConnection` is `{ kind: "resource", resourceId } | { kind: "support", mapId }`. Parse decodes empty-1, ordinary node IDs and Support Camp's1000+mapId encoding into named records.

The account currently prepares incoming supports from typed saved map-ID destinations. It counts slots rather than unique source outposts, preserving duplicates; it does not add a new resolved-target/connection-management engine.

Implemented scalar range: `outpost.connectionRange` starts/resets0; `updateConnectionRange(orbletBonus, guardEffect, militaryUpgradeBonus)` preserves the source250 Advanced Logistics fraction, grouped Guard and Military contribution,999 cap and floor. The existing early Royal updater prepares Orblet8/Guard effect/upgrade74 once after ranks/units/Orblets/role effects and updates built owners; no new cache/helper/registration. This scalar does not depend on `HasOutpost` or establish target eligibility.

Authorized eligibility questions remain BLOCKED on source-defined membership inputs:
- `outpost.canConnectToResourceNode(node)` applies node-target rules.
- `outpost.canConnectToOutpost(target)` applies outpost-target rules.
- `royalArmory.getResourceNodesInRange(outpost)` enumerates real nodes in the correct world.

Range includes base range, Orblet bonus, Advanced Logistics, Guards, and Military-rank contribution. Geometric range is not the full connection rule: the captured node check uses a `+15` allowance, while the outpost check uses `+8`, with specific coordinate anchors. Confirm those caller expressions, kind restrictions, and coordinate inputs before implementation. Do not substitute a generic `distance <= range` check.

Connections are named relationship records. A separate connection-management domain is unnecessary.

### Resources and nodes

A resource stockpile entry owns its resource-type identity, owned quantity, and resource image metadata. Royal Armory resources are not automatically inventory `Item` objects.

`RoyalResourceNode` owns static node identity/world/order/position/resource type/base capacity, parsed grade, normalized removed quantity, depleted state and node-grade image metadata. `RoyalResourceNodes.getNode(nodeId)` resolves real catalog nodes; filler `nodeType === -1` rows are excluded. These quantity methods are implemented, locally verified and independently reviewed PASS in the independent Stage4 slice:

- `getMaximumQuantity()`.
- `getAvailableQuantity()`.

Available quantity is maximum minus removed quantity unless depleted, with no extra clamp. Saved -1 is depleted and gives0 availability; the existing parser records `depleted: true` and normalizes `removedQuantity` to0 for that sentinel. Saved0 means untouched. Maximum/available results are now implemented; the current tests/runtime/review status is recorded in section4.

Node availability is separate from owned stockpile quantity. Preserve all saved grade contributions used by account totals, even where generated node metadata is incomplete. Do not discard those grades or invent node definitions/positions for uncovered IDs. Catalog filler rows are not real connectable nodes.

Authorized factual exhausted-link status: an outpost has a resource-node link with zero availability, while another eligible in-range node has positive availability. Use availability, not merely the parsed depleted flag, with source-defined connection rules. This is not optimization, automatic reconnection or forecasting, and was not implemented by the first delivery.

### Royal Statues

Future `RoyalStatue` entity: identity, level, bonus definition, unlock marble, upgrade parchment, prepared Royal Reverence multiplier/owned materials and statue image metadata. Current Royal Armory retains saved statue levels and their total only; these entity/attempt results are not implemented by #425.

**Mandatory sequence:** implement basic Royal Statue domain handling before ANY efficiency-target discussion, unconditionally. Basic handling means at least owned saved levels and verified bonuses/basic data behavior, not necessarily finished cards/UI or a complete attempt engine. The current authorization ends before this section's implementation; Stage5 needs its own scope. The current saved-level total alone is not evidence that this basic milestone has been delivered and verified.

Required behavior:

- `getAttemptCost()` returns the material and quantity required for the current attempt.
- `getAttemptSuccessChance()` returns the current attempt probability.
- `canAffordAttempt()` uses prepared inventory quantities.
- `getBonus(level = this.level)` uses one formula without changing saved level.

At level zero, restoration uses the statue's `RGshard{statueId}` marble. At positive levels, upgrading uses `RGenh`, Parchment of Enchantment. Captured cost is one item per attempt, not one item per successful level. Keep success chance beside cost. Expected material consumption, guaranteed cost to a level, and purchase simulation are outside scope.

Bonus is zero at level zero. Positive-level bonus uses statue-specific base/growth values and Royal Reverence. This is separate from ordinary Statues and Statue Flair.

The generated `RoyalStatueRepo` and model define all eight statues and their complete numeric/item inputs:

| ID | Description | Base bonus | Bonus per level | Unlock marble | Unlock denominator | Upgrade item | Attempt cost |
| --- | --- | ---: | ---: | --- | ---: | --- | ---: |
| 0 | `}千 TOTAL DAMAGE` | 200 | 15 | `RGshard0` | 25 | `RGenh` | 1 |
| 1 | `}千 DROP RATE` | 50 | 5 | `RGshard1` | 50 | `RGenh` | 1 |
| 2 | `}千 EXTRA KILLS` | 30 | 3 | `RGshard2` | 100 | `RGenh` | 1 |
| 3 | `}千 CLASS EXP` | 300 | 20 | `RGshard3` | 250 | `RGenh` | 1 |
| 4 | `4` | 10 | 3 | `RGshard4` | 500 | `RGenh` | 1 |
| 5 | `5` | 10 | 3 | `RGshard5` | 1,000 | `RGenh` | 1 |
| 6 | `6` | 10 | 3 | `RGshard6` | 2,500 | `RGenh` | 1 |
| 7 | `7` | 10 | 3 | `RGshard7` | 10,000 | `RGenh` | 1 |

IDs 4–7 retain the upstream description labels `"4"`–`"7"`; do not infer effect names from their numeric values or replace those labels with invented meanings. Keep existing marble/parchment Item records as material references. The Royal Statue catalog gap is cleared.

### Orblet bonuses and parsing

Accepted #429 preserves parsed `RoyalG[23]` levels during `updateBonus()`; its current cached raw bonus, prices and presentation behavior remain unchanged in this ownership pass. The earlier proposal to remove that cache is superseded by the accepted implementation, not an open lifecycle defect. Upgrade/Orblet owners now expose their own parse methods; do not repeat the accepted level-preservation fix or add unnecessary shared abstractions.

Decode save fields once with their actual field semantics. Consolidate duplicated numeric conversion within Royal Armory or reuse an existing helper only if its semantics match. The stationary-assignment digit encoding needs its own decoding. Zero-valued upgrades and save fields are real progression, not evidence of misalignment.

## 4. Pipeline and pre-implementation data gate

Before a future selected backend/test/config calculation, verify the static inputs needed by its actual-save outputs and source callers. **Historical gate resolved:** the original preflight found no map anchor export; the human subsequently supplied the synced Stage1 `MapDataRepo` → `MapDataModel` map-ID x/y contract with sentinels, and #422 is CLOSED/completed. Do not reopen that historical gap. Royal Statue definitions are also present. Connection callers still need their own source-defined coordinate anchors/kind/world/geometry rules confirmed before their new calculations are implemented.

**Current missing static input:** game `HasOutpost` (`RoyalG.1.22.js:116–121`) requires own membership in `CustomMaps.NonAFKscreens` in addition to fixed exclusions, `mapId % 50` and x9999. The existing map-ID coordinate export does not include equivalent NonAFK membership. Scout searches in `data/domain`, `docs/game-snippets`, `tests`, `scripts/sub-projects` and `docs` found no equivalent. WikiBot must export a map-ID-keyed boolean membership fact and sync it; no generated-file edits, hardcoded lists or coordinate heuristics substitute for that input. Authorized map-dependent Stage4 behavior and dependent UI are BLOCKED, not removed from scope.

The human explicitly authorized the narrow Spelunking `Upgrade.getBonus()` and top-level `Spelunking.getUpgradeBonus(index)` now, without a separate correctness case, while handling the NonAFK WikiBot import. Both owner APIs are implemented, verified and independently reviewed PASS. The purchased `ShopUpgBonus(index, 1)` contract is `data.bonusPerLevel * Math.max(0, level)`; the top-level API delegates and returns undefined for missing indices. Effective mode0 modifies other indices but not65, so this supplies existing Shop65's actual bonus without duplicate Outposts arithmetic. Primary source is `../IdleonWikiBot/codefiles/idleon1.22.txt:241559–241628`; exact proof and fresh `SpelunkBonusReview` PASS are in [the current #425 plan](../.omp/plans/correctness-425.md#spelunking-purchased-bonus-dependency--completed-and-reviewed). **Shop77 absence is intentional game data:** actual1.22 catalog length68 has no77; cached bonus is undefined and `BarExpRate_Base`'s `1 <= undefined` guard stays inactive. No77 export or guessed0 fallback. Slot17 Militia selects highest rank level, first encountered on ties; earlier lowest-raw-XP interpretation is superseded.

**Independent node quantity implemented, locally verified and independently reviewed PASS:** `RoyalResourceNode.getMaximumQuantity()` is `5 * baseCapacity * Math.pow(1.5, grade) * Math.pow(5, world)`; `getAvailableQuantity()` is depleted?0:maximum-minus-removed, without a new clamp. No new metadata, parse/cache/root/UI changes. Tests-before-source RED: six explicit missing-API failures,5.026s/wall6.04s (`artifact://327`). GREEN: one typed suite,6/6 comparisons,5.26s/wall6.47s. Node LSP OK; source lint zero errors/warnings, but the combined command ignored the test path with a warning, not proof of linted tests.

Actual `yarn tsx .omp/armory-node-quantity-smoke.ts` passed11.63s with two independent full real-save pipeline passes: exact extracted quantities `[5000000, 648731.689453125, 75000000, 5000000, 0, 413962.4771524342]`, unchanged node grade/removed/depleted and80 stockpiles under quantity reads, exact five-total baseline and map1 rate `14172.103655435938`. First smoke failed because Node lacked `localStorage`; a process-local browser-storage adapter repaired only the harness before PASS, not product fallback/cache behavior. Harness removed. Fresh `ArmoryNodeQuantityReview` returned formal **PASS, no findings**, scoped only to node quantity; independent source/catalog world decoding and six exact typed comparisons required no new exception/parameter. Reviewer confirmed tests-before-source and accepted the observed parent factory-smoke receipt without reruns. This is not whole-Stage4 completion.

Node paired batch17.61s:76 configs/1400 successful expressions/0 expression failures, but exit1 from sole unrelated Talents required-player0/shared-target3 mismatch: NOT full-batch success. Standing #425/#421 permission applies to six successful selected node outputs, errors `{}`, unchanged fixture RoyalG+RoyalMaps hash `8bcbf99ac2c136c5f52afa009851531311bd6157221019214f26798be832c280`; no save refresh/mutation or target changes. Node quantity, scalar range, saved kind and the narrow Spelunking purchased-bonus dependency are implemented/verified/reviewed; XP/hour/timing, target eligibility, exhausted-link status and fuller UI remain BLOCKED only on NonAFK membership export/sync. Absent77 is inactive/undefined, not a static prerequisite. No UI source change/fresh browser proof; historical UI receipts are not continuation proof. #425/#421 stay OPEN with human acceptance pending; stop before Statues.

The only remaining external prerequisite is WikiBot export/sync of map-ID NonAFK membership; the human is handling the import. The Spelunking purchased-bonus API is complete, without a separate dependency case or second approval. Its parent-observed proof includes two missing-API RED comparisons; exact paired purchased59=3/65=0; final4 suites/17 exact comparisons PASS (Jest20.629s/wall23.01s); normal genuine-account two-pass smoke PASS16.36s with pure owned/top-level reads, missing77/negative index undefined and unchanged shop levels/fixture; source lint0/no output5.33s/LSP OK; fresh independent `SpelunkBonusReview` PASS/findings[]. Batch78 configs/1411 successful expressions/0 expression errors in5.6s exited1 solely for the standing unrelated Talents mismatch, not full-batch PASS. Full pairing/provenance and exact command are in the linked #425 plan. No Shop77 export is needed. All four authorized slices remain in scope; these completed dependencies do not complete/close Stage4 or authorize Statues/efficiency.

**Final scalar range + saved-kind receipt:** range RED (`artifact://367`) had three explicit missing-API core failures/six direct parameters PASS,8.796s/wall9.91s. Range batch77 configs/1409 successful expressions/0 expression failures,5.65s, exit1 sole permitted unrelated Talents mismatch; nine selected outputs errors `{}`, unchanged paired fixture/no save refresh, not full-batch success. Combined GREEN initially3 suites/15 comparisons,13.46s/wall14.87s. Final post-kind exact range core/direct-parameter/node command passed3 suites/15 comparisons,13.248s/wall14.53s. Prior node formal PASS remains, including six final regression comparisons.

Actual `yarn tsx .omp/armory-range-smoke.ts` PASS12.84s: two independently initialized normal real-save account passes, all38 ranges exact against fresh game outputs, parse0 → existing early exact restore/repeated-early idempotence, preserved38 points/80 stockpiles/five totals/map1 rate `14172.103655435938`. Range1/6/51=96/94/124. Final `yarn tsx .omp/armory-kind-smoke.ts` PASS7.37s:38 saved kinds/old links exact through reparse, all38 early-restored ranges, five totals/map1 rate unchanged. Current genuine save has38 kind0 outposts; kind1/2 are source-only, not runtime-exercised. Owned scripts/copied private range expectation JSON removed. Range owners LSP OK/source lint0 no output3.13s; final Outposts LSP OK/source lint0 no output2.24s.

Fresh `ArmoryOutpostRangeReview` returned final **combined range + saved-kind PASS, no findings or approval questions**, superseding earlier range-only review scope. Detailed command/provenance is in [the feature plan](ROYAL_ARMORY_FEATURE_PLAN.md#current-continuation-checkpoint--node-quantities-scalar-range-and-saved-kind-verified-remainder-blocked). No UI implementation/browser proof, new cases, automatic closure or Statues/efficiency work is claimed.

The user reported the prepared CDN assets published, and the authorized additional sync of the prepared assets completed with exit status 0. The parent fetched and observed three representative CDN images: `RoyalStatue7.png` (130×170), `RoyalArmoryWorker.png` (29×32), and `RoyalArmoryOutpostKind1.png` (56×17). This does not verify all 196 CDN objects or establish an upload count. Do not repeat login or publish checks.

Pause selected backend/test/config work if a required non-image input is genuinely missing; present that specific prerequisite to the human. Prepared images and user-reported CDN publication are independent of calculation prerequisites. Stay within the four authorized Stage4 slices while waiting; no Statues or efficiency-target work.

If behavior is unexpected, evidence conflicts, any non-image prerequisite is missing, or scope would change, pause and notify the user before deciding or proceeding. Do not turn surprises into inferred rules or automatic corrections.

After the gate is cleared:

1. **Init:** create catalogs/entities from available static definitions and existing items.
2. **Parse:** replace account state from `RoyalG` and `RoyalMaps`; decode named fields, role/location pairs, targets, and sentinels. No cross-domain reads or derived game calculations.
3. **Calculate:** resolve relationships, prepare role/upgrade and cross-domain inputs, calculate ranks/counts/supports, and settle production inputs in dependency order.

Keep the existing early/late preparation where dependencies require it. Consumer getters use prepared state and may perform the final formula. They do not search other domains or reselect account-best characters.

Repeated processing overwrites derived state rather than stacking bonuses or connections. No new repeat-run framework or standalone/lifecycle harness is in scope.

Before changing exported methods, find their references with the language server. Migrate every affected caller and test. Remove obsolete positional row caches, public selector methods, and compatibility aliases after the cutover.

Use the existing [ImageData](../data/domain/imageData.tsx) shape and [IconImage](../components/base/IconImage.tsx). `width` and `height` describe the display box; they do not identify PNG intrinsic size or a crop rectangle. `IconImage` accepts an empty location, which is the first-pass convention for genuinely unavailable artwork.

Put `getImageData()` or equivalent named image metadata on the owning entity. Role definitions own role icons, not every movable instance. Material images use [Item.getImageData](../data/domain/items.tsx). Only feature-wide graphics, such as the verified shared Orblet currency icon, belong on `RoyalArmory`, following [getJadeImageData](../data/domain/world-6/sneaking.tsx). Available files should use the verified mappings and dimensions below. Keep explicit empty-location/TODO contracts only for source-transparent files or the undeclared covered frame; do not mark available images as missing.

### Prepared asset inventory

The 196 prepared PNGs are in `data/icons/assets/data/`. A combined decoded-image smoke reopened all 196 with expected dimensions and recorded alpha visibility; representative asset contact sheets were visually inspected. Names below are local basenames; listed sizes are measured intrinsic PNG dimensions, not required display-box sizes.

| Family | Prepared local names | Intrinsic size |
| --- | --- | --- |
| Resource icons | `RGres0.png`–`RGres5.png`, `RGres10.png`–`RGres15.png`, `RGres20.png`–`RGres26.png`, `RGres30.png`–`RGres37.png` (27 visible resource-type keys) | 28×28 |
| Resource-grade markers | `RGresB0.png`–`RGresB49.png` | 56×56 |
| Statue marble and parchment | `RGshard0.png`–`RGshard7.png`, `RGenh.png` | 72×72 |
| Armory upgrades | `RAupg0.png`–`RAupg82.png` | 48×48 |
| Stationary-role icons | `RoyalArmoryWorker.png`, `RoyalArmoryTrader.png`, `RoyalArmoryGuard.png`, `RoyalArmorySurveyor.png` | 29×32 |
| Movable-role icons | `RoyalArmoryMilitia.png`, `RoyalArmoryCommander.png`, `RoyalArmoryKnight.png`, `RoyalArmoryPriest.png` | 16×17 |
| Statue frames | `RoyalStatue0.png`–`RoyalStatue7.png`, `RoyalStatueCovered0.png`–`RoyalStatueCovered6.png` | 130×170 |
| Outpost-kind glyphs | `RoyalArmoryOutpostKind0.png`–`RoyalArmoryOutpostKind2.png` | 56×17 |
| Shared currency icon | `Orblet.png` | 72×72 |

The role mappings are font 784 glyphs Worker 123, Trader 125, Guard 91, Surveyor 93; movable marker glyphs Militia 61, Commander 59, Knight 39, Priest 47. Outpost-kind glyphs use font 106: kind 0 / glyph `脾` (U+813E), kind 1 / `뭘` (U+BB58), kind 2 / `얼` (U+C5BC). The game selects these kinds through `RoyalMaps[map][10]`. The `RAupg` catalog image is selected by `RAupg{Research43[pageIndex]}`; its index matches `ArmoryUpg` value/catalog ID 0–82, not display order.

The Orblet market entries use text and a shared decorative offer frame, not individual bonus icons. `Orblet.png` is the verified shared currency/item artwork; do not assign invented per-entry bonus images.

Four files are fully transparent in the game source: `RGshard6.png`, `RGshard7.png`, `RAupg34.png`, and `RAupg54.png`. Do not substitute differently named variants or imply those source images contain visible artwork. The covered-statue animation declares frames 0–6 only; `RoyalStatueCovered7.png` does not exist and must not be fabricated.

For reproducible extraction and source mappings, use the [game icon extraction runbook](runbooks/extract-game-icons.md), [extractor](../data/extract-icon.js), and [font and asset research](FONT_ASSET_RESEARCH.md). The extractor supports font-glyph crops and explicit sprite-sheet rectangles; standalone source files use the existing copy process. The user-reported CDN publication and authorized additional sync are complete; three representative CDN images were observed, not all 196 objects.

`RGmapB{index}.png` in the inspected caller is map-tab artwork, not proof of an outpost icon. Page backgrounds, map-tab replication, and decorative UI assets are outside this domain plan.

Image availability is not a reason to block the backend first pass. Use the prepared image mappings above, and use empty image locations/TODOs only for the four source-transparent exceptions and the nonexistent covered frame 7. Do not guess dimensions or filenames. No page, gallery, or harness for image verification is in scope.

## 6. Evidence and comparison requirements

Use [the existing testing guide](TESTING_IMPLEMENTATION.md) and [extraction helper guide](../tests/helpers/README.md). Keep current real-save core/direct-parameter conventions:

- A core comparison checks the public result against its matching game extraction.
- Parameter comparisons cover directly used calculations, including same-domain parameters.
- Static catalogs, image filenames, and copied save fields are not parameter calculations.
- Use only the real save paired with agreed versioned game evidence. Do not alter saves to simulate branches or derive expected values from website code.
- Use zero tolerance for normal completion. Completion with a non-zero bound requires the [testing guide's source-backed human-accepted exception](TESTING_IMPLEMENTATION.md#documented-non-zero-tolerances), independent review, and exception closure rather than ordinary `PASS`/normal completion; a supervisor cannot waive this gate. Report branches not observed in actual evidence; do not manufacture fixtures.

Migrate existing Royal Armory suites and preserve explicit-character paired rate comparisons. The owner-first pass removed four static constant-dispatcher assertions and one constant-only parameter row, and added one actual-roster eligible/maximal-rate invariant; fixtures/configs/extracted expected values are unchanged. The fixture has only one eligible Royal Guardian, so this is not multiple-candidate/unequal-winner game parity. New range/eligibility, node quantity and Royal Statue comparisons require separate selected-scope approval and existing paired evidence/config conventions.

The earlier resource-log-total discrepancy is not permission for an automatic formula fix or changing fixture expectations/tolerance. Preserve existing behavior unless the user agrees a change based on matching versioned game evidence and directly used values. A selected existing correctness case follows the [calculation-correctness workflow](../skills/calculation-correctness/SKILL.md).

Run affected comparisons and consumers after integration using the existing save-loading path. Review only agreed behavior and evidence: core/direct-parameter mappings, migrated callers, preserved Orblet levels, and actual observed branches. Do not add synthetic/altered saves, unsupported-state modeling, new validators/fallbacks, duplicate checks, standalone/lifecycle harnesses, broad dependency audits, or automatic formula changes. Report genuinely unobserved branches; do not manufacture evidence.

## 7. Assignable work packages

One integration owner owns the grouped root/account pipeline and caller cutover; entity owners own agreed modules. Independent agents use explicit shared interfaces and skip builds/lint/tests/formatters mid-flight; the coordinator runs applicable final checks after integration. The current owner-first pass is implemented, not an open monolith split.

### A. Static-data preflight and calculation evidence

**Owns:** relevant captured evidence, Royal Armory extraction configs, and core/direct-parameter comparisons under `tests/`. No domain edits.

- Perform the read-only static-data preflight described in section 4 using actual saved state and agreed versioned game evidence.
- After the gate clears, reuse existing source findings and comparisons; prepare only changed or missing calculations through the normal workflow.
- Confirm map construction/state semantics, role placement, exact connection geometry, node depletion, and statue behavior using the agreed evidence.

**Done when:** the section 4 preflight is complete; changed calculations have source/caller evidence, comparison mappings, usable paired results or a specific external prerequisite, and stated coverage boundaries.

### B. Domain model and calculation cutover

**Owns:** the grouped Royal Armory modules; integration ownership includes necessary `idleonData.tsx` and callers. Future new calculations depend on A's selected-scope static-data/user gate and evidence; the completed named-state/rate cutover is not to be repeated.

- Implement only newly selected and human-approved future calculations in sections3/4; named saved-state ownership and existing local rate cutover are already implemented.
- Preserve progression, explicit character context, operation order and the approved numeric0 lifecycle for affected map/outpost results; do not restore obsolete unavailable/readiness branches.
- Preserve accepted #429 Orblet level-preservation behavior and the current save-number conversion semantics.
- Add entity-owned image metadata from known mappings; unavailable images use empty locations and TODOs.
- Migrate all references and remove obsolete methods/caches without compatibility shims.

**Done when:** agreed behaviors are implemented end to end, every affected caller uses the new model, and required static inputs are available for the approved scope. Missing images may remain empty with explicit TODOs.

### C. Integrated verification and independent review

**Owns:** final applicable comparison execution and review; review is read-only. Depends on B and the cleared static-data/user gate.

- Run the affected core/direct-parameter comparisons and consumer tests after integration.
- Review agreed formulas, operation order, caller conditions, ownership, and direct-parameter mappings against versioned game evidence.
- Check caller migration, preserved Orblet levels, prepared getters, and image ownership. Report branches not observed in the available real-save evidence.
- Apply the pause rule in section 4 when needed.

**Done when:** no unresolved in-scope findings remain; required calculations and callers are verified against available agreed evidence; and no unreported prerequisite or scaffolding remains. Unavailable artwork is represented by empty locations and explicit TODOs, not treated as a blocker.

## 8. Starting references

- [Current root](../data/domain/world-6/royalArmory/royalArmory.ts), the five entity modules linked in section2 and [account pipeline](../data/domain/idleonData.tsx).
- Read-only [upgrade catalog](../data/domain/data/RoyalArmoryUpgradeRepo.ts), [Orblet catalog](../data/domain/data/OrbletMarketBonusRepo.ts), and [resource-node catalog](../data/domain/data/RoyalResourceRepo.ts).
- [Royal material item definitions](../data/domain/data/SpecificItemRepo.ts).
- [RoyalG v1.22](game-snippets/equinox/RoyalG.1.22.js): `OutpostRange`, `ResNodeQTYmax`, `Statue_Cost`, `StatueUpgOdds`, `StatueBon`, unit effects, ranks, and account totals.
- Delivered full source: `../IdleonWikiBot/codefiles/idleon1.22.txt`, relative to the repository root. Use bounded searches, not a full-file context dump. Image anchors are `"RGres"` near character 9,940,236, `"RGresB"` near 9,938,959, `"RGstatBG0.png"` near 26,811,272, and actor animation `"RGstat"` near 24,746,493. Offsets are navigation aids, not stable references across versions.
- [Resource-rate core test](../tests/domains/world-6/royal-armory-resource-rate.test.ts), [direct parameters](../tests/domains/world-6/royal-armory-resource-rate-parameters.test.ts), and [extraction config](../tests/configs/royal-armory-resource-rate.json).
- [Existing Royal Armory suites](../tests/domains/world-6/) and [extraction configurations](../tests/configs/).

## 9. Current owner-first evidence and limits

The human approved this bounded pass with “ok let's give this a go”; that is plan approval, not final result acceptance. Actual latest-save baseline7.08s / integrated smoke16.80s preserved400 maps,4400 explicit-character rates, all ranks/points and totals `[214, 185, 0, 14.148519736922665, 38]`. Two parse/reparse/early cycles returned0 for all4400 explicit and400 account rates, then late processing restored them exactly; identity/idempotence held.

The fixture's only eligible RG is player3/class16, level1383, W14 `19.757134183363693`; map1 account rate `14172.103655435938`. No multiple-candidate game-best selection parity is claimed. Fresh `ArmoryOwnerCorrectnessReview` and `ArmoryOwnerMaintainabilityReview` PASS/no findings; six-module LSP no issues. Targeted ESLint exited0 with0 errors and one untouched `player.tsx:46:37` unused `SkillMastery` warning, not a zero-warning result.

Expanded affected verification initially failed43 suites (39pass/4fail),392 tests (391pass/1fail),178.846s (`artifact://249`). The missing shared XP helper caused3 load failures; its exact original1381-byte/hash10F2 payload was restored without changing approved bounds/math/expectations, then those3 suites passed55 tests in9.695s, with fresh restoration review PASS/LSP no issues. Cause of absence is unestablished. All33 Royal/map suites and changed-consumer comparisons passed across both runs;446 comparisons succeeded and one broader Tome AlchemyStrength/player0 exact comparison remains failed. This is not all447/whole-command PASS.

Remaining mismatch: expected `878.5365807022079`, actual `878.536580702208`, delta `1.1368683772161603e-13`. Separate cached pre-cutover/current-root ordered pipelines both returned that actual W8 immediately after processing before extra probes and after4400 rate queries (`artifact://268`), while exactly preserving400 maps/4400 rates/five totals and1178 talents. The Royal cutover did not introduce the paired-fixture discrepancy; the zero-tolerance failure is visible and outside this math scope. No Alchemy fix, tolerance/expected/config changes or waiver.

Fresh authorized `yarn ui:run .ui-verification/royal-armory-owner-firstpass-20261010-a73f.cjs` PASS,17.052s scenario/18.32s wrapper; private `.ui-verification/runs/2026-10-10T00-34-41-034Z-6932/result.json` passedtrue/errornull. Latest-fixture69 upgrades/10 Orblets/38 exact built IDs, selected maps1/51's ranks/XP/savedXP/points10/15, filters/search/empty/sort/defaults, class-backed same-Map replacement and same-entity timestamp refresh, reload defaults and inspected viewport/card visuals passed.

UI proof retains10 unsuppressed events (6console/4pageerror):2 attribute-hydration warnings,2 RoyalArmory resource TipDisplay text-hydration failures,2 NitroPay removed-`browsingTopics` exceptions,2 HTTP403,1 rlcdn CORS,1 `ERR_FAILED`. No error-free/hydration fix or blanket-preexisting attribution. Initial wrapper unavailable-stack failure was followed by read-only absent-container diagnosis and Main-authorized supported `yarn ui:up`; then only the authorized wrapper executed the browser. No Recovery/context/unrelated service/cache mutations or custom Docker exec/direct runner. Own scenario removed, artifacts retained and canonical stack left running.

The human-approved XP exception remains narrow: one representable threshold step and only propagated currentXP/requiredXP subtraction bounds. Saved XP, levels, points and other inputs remain exact; no formula/global matcher change. No hydration fix, new runtime game-state coverage, commit/push/deployment or full Stage4 completion is claimed. #425/#421 remain OPEN with human result acceptance pending.
