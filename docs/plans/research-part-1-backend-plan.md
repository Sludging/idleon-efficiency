# Research Part 1: backend delivery plan

**Outcome:** Players understand account growth, discoveries, actual lens production, Insight, offline gains, Papers, and Posty Notes.

**Scope:** [Part 1 — #462](https://github.com/Sludging/idleon-efficiency/issues/462), under [Research — #461](https://github.com/Sludging/idleon-efficiency/issues/461). The [product specification](research-spec-draft.md) and [delivery outcomes](research-delivery-parts-draft.md#1-account-growth-discoveries-and-lens-production) define acceptance. [Current handoff](research-research-brief.md#current-handoff) holds approvals, blockers, and execution authority.

## Outcomes and public information

| Player outcome | Backend information for the read-only UI |
|---|---|
| Account growth | Highest saved Research level, one supported saved EXP copy and same-copy requirement, discovery total, and total Observation levels. Retain character and timestamp provenance internally; the UI presents plain account Research progress. |
| Discoveries | All 43 Observations with maps, hints, study levels, roll thresholds, and found state. Separate revealed-prefix, already-discovered, exhausted-attempts, and insufficient-maximum-roll conditions. Expose study eligibility and the earliest reveal level independently through the shared visibility rule. Multiple conditions can apply. |
| Discovery allowance | Remaining attempts, daily allocation, inclusive roll bounds, failed-roll counter, current bonus, and modifiers. Allocation minus remaining is not attempts used. |
| Actual lenses | Ownership and sources, fixed kinds, saved positions, targets, assignments, and capacity. Distinguish unplaced lenses from production. |
| Insight and EXP | Each Observation's Insight level, partial progress, requirement, local effect, EXP contribution, and Insight production. Separate total-level effects and identify supporting Kaleidoscopes. |
| Online and offline gains | Total and per-Observation Research EXP per hour and actual Insight accrual per hour. Retain the game's differing displayed Insight figure internally. Offline percentage, 1% baseline, 100% cap, and contributors. Online gains are 100%. |
| Papers | Consumable inventory versus permanent purchases and offline bonuses. Explain the two-hour grant, including Minehead Currency, without Currency balances or forecasts. |
| Milestones | All 14 Posty Notes, thresholds, reached/upcoming state, and lens, capacity, rotation, Shape, and Point rewards. Show ownership-sensitive Shape context, not guaranteed pictured rewards. |

Observation names and map names support list search. All entries remain available by default. The backend does not impose a board layout.

Part 1 remains independent of Part 2. It consumes existing Grid bonuses and minimal Shape ownership inputs. Point balances, the Grid catalogue, and Shape placement or coverage remain Part 2 outcomes.

## Responsibilities

Extend the account domain already registered as `research` in [research.tsx](../../data/domain/world-7/research.tsx). Keep its existing Grid bonus API and current consumers. Do not create a second parser or Research service.

- **Research domain:** Own account progress, allowance, lens ownership/capacity, aggregate production, offline percentage, and milestone context. Prepare external inputs once.
- **Observation:** Wrap generated metadata. Own discovery and Insight state, revealed-prefix conditions, separate study requirement and eligibility, assignments, local effects, and production calculations.
- **Research lens:** Own fixed kind, saved position, and assignment. Translate unplaced targets at the boundary.
- **Posty Note:** Wrap generated metadata. Determine reached state from account level and combine reward text with prepared ownership context.
- **External producers:** Storage owns consumable inventory; Gem Store owns permanent purchases. Consume other domains' public bonuses without importing their activity progression.
- **Contributors:** Use named value records with source, value, operation, and relevant cap/gate. Derive records and totals through the same calculation. Preserve additive percentages versus separate multipliers. Optional display rewards carry intrinsic amount, operation, units or conditional basis, and acquisition state without changing effective contributions. Reuse producer base/preview APIs, metadata, and existing Research scales. Bare Grid rewards describe one level, not an attainable total.

Reuse repository-backed wrappers from [Friends](../../data/domain/friends.tsx) and [Cooking](../../data/domain/world-4/cooking.tsx). Use [Sushi](../../data/domain/world-7/sushi.tsx) for named placements, [Spelunking](../../data/domain/world-7/spelunking.tsx) for account summaries, and [Lab](../../data/domain/world-4/lab.tsx) for prepared inputs. These aspects do not require simulations or new generic frameworks.

## Required data

### Available generated data

| Source | Use |
|---|---|
| [ResearchObservationRepo](../../data/domain/data/ResearchObservationRepo.ts) | All 43 identities, map IDs, hints, study levels, and roll thresholds. Preserve generated `requiredResearchLevel`; translate its study meaning in the handwritten owner. Join map IDs to `MapInfo` records by `data.map.id`, not array position. |
| [ResearchLensRepo](../../data/domain/data/ResearchLensRepo.ts) | Magnifying Glass, Optical Monocle, and Kaleidoscope identities and descriptions. |
| [ResearchMetadataRepo](../../data/domain/data/ResearchMetadataRepo.ts) | Base roll bounds, base daily allocation, base Kaleidoscope boost, and rotation requirement. |
| [ResearchPostyNoteRepo](../../data/domain/data/ResearchPostyNoteRepo.ts) | All 14 thresholds and reward descriptions. Descriptions suffice for reward text; no new structured reward framework is required. |
| [ResearchShapeRepo](../../data/domain/data/ResearchShapeRepo.ts) | Current Shape definitions for ownership-sensitive milestone context only. |
| [ResearchGridBonusRepo](../../data/domain/data/ResearchGridBonusRepo.ts) | Existing Grid levels, effective bonuses, and secondary values required by Part 1 calculations. |
| [ItemDetailRepo](../../data/domain/data/ItemDetailRepo.ts), [GemShopRepo](../../data/domain/data/GemShopRepo.ts) | Consumable Paper description and permanent purchase metadata. |

Generated directories remain read-only. Reuse their current records instead of copying catalogues into handwritten code.

### Source-data and calculation boundary

| Data class | Responsibility and maintenance reason |
|---|---|
| Existing exported catalogues | Reuse current exported records for Observation identities, maps, hints, thresholds, lens descriptions, Posty Notes, Shapes, items, and purchases. Current exports cover these Part 1 needs. Catalogue location alone does not establish patch churn or require a new export. |
| Existing producer metadata | Each website producer consumes its exported rewards, upgrades, sets, artifacts, or other source records. Research consumes that producer's public result. A missing getter is website implementation work, not proof that an export is missing. |
| Verified unexported metadata | Keep a source-backed named value beside its responsible handwritten calculation when no concrete current maintenance reason requires a new export. This initial permission includes Hole's verified base reward below. Reuse existing exports where available. |
| Stable mechanics and formula coefficients | Keep verified rules beside their responsible website calculation. These include eight Observation columns, ownership caps, capacity rules, EXP and Insight formulas, Research-specific caps and conversions, and offline bounds. Their absence from generated metadata does not require an export. |

Observation owns the index-based EXP curve and Insight requirement formula. Research owns aggregate ownership, support, shared multipliers, and its explicit offline rule. Foreign formulas stay on their owning producers.

Use one owner for each shared rule. The adjacency calculation uses one named eight-column constant, not repeated literals. Formula coefficients stay in their calculation; they do not need a generic rule object. Reuse exported milestone thresholds and existing producer values where they express the required rule. Do not parse reward prose into calculation inputs.

The versioned 1.22 source separates discovery visibility from study. Its revealed prefix includes Big Ol Reef at Research level 70. Actor 672 rolls against the row's discovery threshold without checking its study level. Actor 741 requires level 72 before assigning a lens. Apply this distinction to every Observation; do not special-case Reef. The account view uses its existing highest-level reference context and does not guarantee an action on every character. Source references and current-live-version limits remain in the scoped handoff.

The [source-data evidence](research-research-brief.md#source-data-and-calculation-boundary) identifies verified mechanics and metadata. A new export requires a concrete current maintenance reason, not merely a missing field or catalogue location. Do not export formula coefficients or generate per-Observation production tables merely to avoid numeric literals. No metadata migration layer is needed.

### Hole's verified base reward

| Named value | Evidence and responsible use |
|---|---|
| `holeResearchExpUpgradeBasePercent = 1` | Source `../IdleonWikiBot/codefiles/idleon1.22.txt`:307037 stores reward row `13` within `RandoListo2`:307010–307039. Name row `11` at line 307031 identifies `Researchy` at zero-based index `11`. The reward is one percent per owned level. Hole keeps this named value beside its calculation, multiplies it by parsed ownership from account option `641`, and exposes the calculated public result to Research. |

The [base-reward evidence](research-research-brief.md#hole-upgrade-base-reward-evidence) records the literal and matching retained version captures. Existing export omission is nonblocking. No concrete current maintenance reason requires WikiBot for this value; matching captures do not prove future stability. Cost row `14`, a duplicate reward table, new Research rule metadata, and derived production tables are unnecessary.

### Saved-state boundary

The [planning revision evidence](research-research-brief.md#part-1-planning-revision-evidence) records source mappings and caller context. Parsing translates raw arrays into named state before calculations.

| Raw input | Named state and supported rule |
|---|---|
| `Lv0_<id>[20]` | Saved Research levels. Select the highest across characters once for account progression and level gates. |
| `Exp0_<id>[20]`, `ExpReq0_<id>[20]` | One saved EXP copy and its saved requirement. Preserve the source character and that copy's level. Do not select maximum EXP. |
| `Research[2]`, `[3]`, `[4]` | Found flags, partial Insight EXP per Observation, and Insight levels. Pending effective seconds are not partial Insight EXP. |
| `Research[5][4i..4i+3]` | Lens `x`, `y`, target Observation, and fixed kind. Kind `0` produces EXP, `1` produces Insight, and `2` supports neighbors. Target `-1` means unplaced. Preserve its coordinates but exclude it from production and support. |
| `Research[7][2]`, `[7][3]` | Remaining account discovery attempts and pending effective progress seconds. Do not apply pending seconds to saved progress in this read-only surface. |
| `OptLacc[514]` | Shared failed-roll counter. It is not attempts used today. |
| `Research[0]`, `[1]` | Existing Grid levels and active Shape input for required bonus calculations. No new Shape coverage surface. |
| `TimeAway.GlobalTime` | Source save timestamp. Non-static loads set `lastUpdated` to current time, not save time. |
| Storage inventories | `Storage.amountInStorage("Quest115")` counts Papers across chest and characters. |
| Gem Store purchases | Professional Papers use purchase number `45`, backed by `GemItemsPurchased[45]`. Consume the existing purchased-count field. |

Use one reference-character context for saved EXP and character-dependent production inputs. Default to the lowest character ID among highest-level saved copies. This is an internal selection policy, not a game rule that selects account EXP. Retain the source character and same-copy requirement in backend results. Public UI shows plain Research progress without character identity or save-copy exposition. Do not show separate character progression or aggregate EXP copies.

Reuse `Player.skills.get(SkillsIndex.Research)` for the saved level, `currentXP`, and `xpReq` after parsing. The requirement belongs to that same saved copy. Do not recompute it from a different character's level. Preserve missing save requirements as missing evidence, not zero progress.

Posty Notes use level thresholds, not claimed-state flags. Their Shape context consumes active companion bonuses, Spelunking Lore, and Event Shop ownership. See [revision evidence](research-research-brief.md#part-1-planning-revision-evidence).

### Calculations and direct inputs

The [captured Research helper](../game-snippets/research/ResearchStuff.1.22.js):43–219 identifies formulas. The [brief](research-research-brief.md#sources) records fresh v1.22 inspection. Neither establishes current website parity.

- **Rolls:** Use purchased Grid levels for minimum, maximum, and daily allocation where the caller requests levels. Maximum roll adds Sushi reward `30` and Jelly reward `12`. Daily allowance adds three attempts per Event Shop reward `35` and Sushi reward `2`. Preserve rounding, inclusive endpoints, and Smart Eye's failed-roll cap.
- **Lens ownership:** Total ownership includes all fixed kinds, not only EXP lenses. Add the base lens, Monocles, Kaleidoscopes, Minehead rewards `2/12/20`, Event Shop `34`, active companion `153`, Sushi reward `8`, and reached lens milestones. Apply the verified total cap of `80` on Research. Monocles use purchased Grid `91`; Kaleidoscopes use purchased Grid `72` plus Event Shop `33`.
- **Capacity and placement:** Capacity increases at reached levels `40`, `70`, and `120`, up to four. Preserve actual saved assignments and coordinates. The game displaces another lens to target `-1` when placement exceeds capacity. The website does not reproduce that action or derive placement from coordinates.
- **Kaleidoscopes:** Build support from target Observation indices using the verified eight-column rule. Respect row edges. Exclude self and diagonals. Use `1 + adjacent count × current base boost`. Base boost adds Grid `52/72`, Sneaking Emporium `46`, and Jelly reward `25`.
- **Research EXP:** Each Observation counts placed kind-`0` lenses. Apply its source-derived base curve, local Insight effect from Grid `93`, and Kaleidoscope support. Multiply this subtotal by the shared EXP multiplier for its final contribution. Sum only the source helper's eligible Observation range. Saved assignments outside that range remain visible but do not inflate totals.
- **Shared EXP multiplier:** Preserve the source's additive group and separate multiplicative factors. The additive group includes Farming, meals, Dancing Coral, Grid, Zenith Market, Worship Totalizer, Sailing/Slab, Spelunking epilogue, owned card levels, Arcade, the Prehistoric set, and Spelunking shop reward. Attribute the Totalizer contribution to its generated Gaming Superbit name. Separate factors cover Grid `70`, Equinox, The Button, Killroy, companions, Sushi, The Hole, Jelly, and the selected Royal Outpost contribution. Use the producer contract below rather than description arithmetic.
- **Insight:** Parse each Observation's partial EXP from `Research[3]`. Calculate its next requirement from its index and current Insight level through the source-derived requirement rule. Optical Monocles produce the base rate, modified by Grid `91/92`, Emporium `46`, Jelly `7`, and actual Kaleidoscope support. Grid `93` modifies local Research EXP; Grid `94` uses total Observation levels. Do not merge those effects.
- **Units and source discrepancy:** Both EXP and Insight accrual use hourly rates; the caller multiplies by effective seconds divided by `3600`. The original UI labels both rates per hour. Its Insight display additionally multiplies by the shared Research EXP multiplier, while accrual does not. Retain accrual and game-displayed Insight as distinct named backend results. The public UI shows actual accrual only; it does not expose the game's differing displayed figure.
- **Offline percentage:** Add percentage-point contributions to the 1% baseline, then apply the 1% floor and 100% cap. Sources are companion `28`, The Hole Gambit `15`, Minehead rewards `1/10`, Grid `71/111`, Sailing artifact `36` status capped at six, owned card `w7b11` level capped at ten, companion `153` active and level-two bonuses, Professional Papers purchases, and Sushi rewards `4/24`. Companion `153` contributes `20 × active bonus + 10 × level-two bonus`; Papers contribute two percentage points per purchase. The Research branch does not use the generic skilling AFK additions.
- **Ownership-sensitive milestones:** Reached notes follow account level. Shape milestones occur at `20/30/50/80/110`. Current Shape count adds Event Shop `36` and level-20-gated companion `54` and Spelunking Lore `7`, then caps at ten. Shapes occupy the ordered catalogue prefix up to that count. Show a Shape milestone's extra count and current external ownership context, not its illustration as a promised next reward. Do not attribute current outside rewards to an earlier note. At the cap, an upcoming Shape milestone cannot add another owned Shape.
- **Point milestone context:** From level `60`, the current Points-per-ten-level term gains an additional Point for every reached ten-level block. Grid `50` purchased level also contributes to that term. Explain this cumulative rule beside the note; Point balances remain Part 2.

Keep source-character context only where the producer uses it. Owned card levels, discoveries, Grid state, and `Dream[14]` are account inputs. Temporary equipped-set effects and the Spelunking epilogue's current-character Tome/set inputs need the reference character. Permanent set activation can remove the equipment dependence. Do not select a best character, sum character multipliers, or use the offline test target as the account's active character.

Required missing producer results belong in their owning domains within Part 1. Extend a narrow existing API when needed. Research must not read foreign raw arrays or duplicate producer formulas. Related activity panels and actions remain excluded.

### Direct-producer API and readiness contract

The following selectors identify source-boundary inputs, not player-facing labels. Use generated source names in contributor records. [Producer evidence](research-research-brief.md#part-1-planning-revision-evidence) records source selectors, APIs, and current phase locations.

| Direct input | Public result and owning-domain work | Ready for Research |
|---|---|---|
| Research Grid | `getBonusForId(id, mode)` supplies effects, purchased levels, and secondary values. Reuse its current eligible-Observation rule rather than adding another eligibility calculation. | Existing early Grid preparation. |
| Farming sticker `1`; Crop Scientist `9` | `farming.getStickerBonus(1)` and `farming.cropScientist.getBonus(CropScientistBonusText.ResearchExp)`. | After sticker and Crop Scientist updates. |
| Meal `ResearchXP` | `cooking.getMealBonusForKey("ResearchXP")`. | After Cooking. |
| Dancing Coral `4`; Zenith Market `8` | `getBonusFromIndex(4)` and `getBonusForId(8)` on their current owners. | Parsed ownership and existing getter inputs. No new update solely for Research. |
| Gaming `MSA_Bonus(10)` | Consume `worship.totalizer.getResearchExpBonus()` directly. Worship owns the calculated result from total best waves and complete ten-wave blocks above `300`. Its generated Gaming Superbit gates the result and supplies contributor attribution. Do not cache a copy on Gaming or use the Palette getter. | After existing Worship Totalizer preparation; consume during late Research preparation. |
| Sailing `SlabboBonus(7)` | Add the source-equivalent Sailing/Slab result. It uses Superbit `34`, Lab bonus `15`, the existing Slab multiplier, and complete five-item blocks above `1300`. Do not substitute an artifact bonus. | After Lab and Sailing artifact/Slab multiplier preparation. |
| Spelunking epilogue `7` | Calculate the Spelunking-owned result for the selected reference player only. Pass that player's Tome score, Grimoire bonus, and Troll set context explicitly. Epilogue ownership remains on Spelunking. `Tome.getEpilogueBonus` is a different producer and is not a substitute. | During late Research preparation, after Tome scores, Grimoire inputs, and parsed equipment and permanent set activation. No all-character cache or separate phase is needed. |
| Owned card levels | Find the account `Card` by ID and call `getLevels()`. EXP uses `w7b1/w7b4/w7a11/w7b8`; offline percentage uses `w7b11`. Do not use equipped card effects or `getBonus()`. | After card metadata/progression preparation. |
| Prehistoric set | `EquipmentSet` owns equipped armor, tool, and weapon activation. Keep `EquipmentSets.getSetBonus(name, player)` as lookup and delegation. Preserve permanent activation and the verified six-tool Prehistoric rule. | Parsed set activation and reference-player equipment; calculate on the aspect when late Research requests its bonus. |
| Arcade `63` | `arcade.bonuses[63].getBonus()`. Generic AFK Arcade `6` is not a Research offline input. | After Arcade. |
| Spelunking shop `63`; Lore `7` | `getUpgradeBonus(63)` and the tunnel record with matching index `7`'s `loreCompleted` state. Join by index, not array position. | Parsed Spelunking state. No new activity progression panel. |
| Equinox `Dream[14]` | Existing parsing maps this to upgrade index `12`'s level. Expose the named Research contribution from Equinox using that level and the verified scale beside its calculation. Do not add another raw-save read in Research. | Parsed Equinox upgrade state. |
| The Button `Button_Bonuses(0)` | `button.getBonusForIndex(0)`. The selector lives in the original Minehead helper, but the website's Button domain owns its reward. | After Button preparation. |
| Minehead `BonusQTY(1/2/10/12/20)` | `minehead.getBonusFromIndex(index)` supplies reached-opponent rewards for offline percentage and lens ownership. Do not use Minehead upgrade bonuses for these selectors. | After Minehead's early update. |
| Killroy `5` | Existing `killRoy.spelunkingExpMulti` matches the source value. Research applies its separate `/100` conversion exactly. Do not reinterpret the value or subtract its leading `1`. | Parsed Killroy state. |
| Companion bonuses and level two | Reuse `getCompanionActiveBonus` and `isCompanionLevelTwo` where they match the original active helper. Companions owns any missing Pet Bonus Token activation mapping. Owned pets and currently active bonuses are different facts. | After companion preparation, with active bonus and level-two provenance. |
| Sushi rewards `0/2/4/8/24/30` | `sushi.getBonusFromIndex(index)` supplies the source's discovered-Sushi rewards. | After Sushi; do not move Grid behind this consumer. |
| Hole Gambit `15`; Fountain `(2,16)` | `hole.gambit.getBonus(15)` and `hole.fountain.getBonus(2,16)`. Preserve Gambit's source score gate and tutorial-scene exclusion for the reference context. Its normal-world Deathnote input uses inclusive milestone ranks and the separate Eclipse Skulls condition. Exactly one billion kills remains rank ten. Leave unrelated rank consumers unchanged. | After Hole preparation, following normal-world Deathnote rank preparation. |
| Hole `Cglunko_upgBon(11)` | Add the account upgrade contribution on Hole's owning aspect. Source uses account option `641` multiplied by the verified named value `holeResearchExpUpgradeBasePercent = 1` beside Hole's calculation. Hole exposes its calculated public result to Research. | Parsed owner state and the supported base reward; prepare before late Research. |
| Jelly rewards `0/7/12/23/25/46/54` | `jellyOperator.getObstructionBonus(index)` matches completed obstruction rewards. Do not substitute Jelly upgrade quantities. | After early Jelly preparation; late Research also follows Jelly presentation. |
| Sneaking Emporium `46` | Read the Jade upgrade with matching index `46`'s `purchased` state through Sneaking. Research applies its verified Insight/Kaleidoscope conversions beside those calculations. | Parsed Jade ownership. Existing Sneaking update settles other dependent values first. |
| Event Shop `33/34/35/36` | `eventShop.isBonusOwned(index)` supplies Kaleidoscope, lens, attempt, and Shape ownership inputs. | Parsed Event Shop ownership. |
| Sailing artifact `36` | Find artifact index `36` and read its parsed `status`; round and cap as the Research AFK source requires. | Parsed artifact status, not captain traits. |
| Professional Papers `45`; consumable Papers | Find Gem Store purchase number `45` and read `pucrhased`; use `Storage.amountInStorage("Quest115")` for consumables. | Gem Store parse and prepared Storage inventory. |
| Selected Royal Outpost `1` | Add the actual Research category multiplier on the Royal Armory/Outpost owner. Keep selection and source gates. `getUpgradeBonus(79)` is not this value. | After Royal Armory's early and late inputs. |

New owner APIs must return the source helper's result, including its gates and unit. Nested inputs belong to that owner's preparation and parameter tests. Research's direct-parameter tests compare the resulting owned-card, epilogue, set, Slab, reward, and Outpost values, not unrelated bonuses with similar names.

## Integration

Use the existing init → parse → calculate pipeline in [idleonData.tsx](../../data/domain/idleonData.tsx).

1. **Init:** Create wrappers from generated repositories and initialize required domain objects.
2. **Parse:** Replace saved Observation, lens, and account state. Read only declared raw inputs and shared boundary data. Do not read other domains or calculate production here.
3. **Early calculation:** Keep existing Grid preparation in `postProcessingMap`, after Minehead, Jelly, Royal Armory, companions, and parsed Grid dependencies. It runs before Farming stickers and other consumers. Preserve this phase and the existing Grid API.
4. **Display calculation:** Append Part 1 preparation in `postPostProcessingMap`, after all existing producer updates and late Royal Armory preparation. Prepare reference-character inputs, then ownership, rolls, support, requirements, rates, offline percentage, contributors, and note context.

The current map settles Farming stickers after Grid, cards later, then Tome/Hole/Sneaking/Crop Scientist, Arcade/Cooking/Sailing, Sushi, and players. Its later map also prepares Jelly presentation and Royal Armory late inputs. Full Part 1 rates cannot run in the early Grid updater. A new producer result needed by another domain belongs before that consumer, not in Research's UI-only preparation.

Use parsed producer state directly when its getter already needs no update. Calculated producer results must wait for their owning update. The producer contract names both cases. Calculate the selected character's Spelunking epilogue and equipped-set results on their owners during late Research preparation. Consume the already prepared Worship Totalizer result directly. Do not add copy-only phases, all-character caches, repeated whole-pipeline passes, or move early Grid preparation after Sushi.

Repeated processing replaces assignments, support counts, contributors, and totals. Required initialized objects use direct access; defaults apply only to genuinely absent save data.

The later World 7 UI consumes typed results through existing account data flow. Components search names/maps without calculating effects. No new persistence, endpoint, gameplay action, or cross-domain navigation is needed.

## Delivery prerequisites

- **Producer completion:** Add source-equivalent direct outputs where existing owners lack them, including temporary equipment sets and the selected Royal Outpost bonus. Use the public API and phase contract above. These are Part 1 integration responsibilities, not missing product scope.
- **Saved EXP provenance:** The reference-copy policy supplies supported saved EXP context without inventing account EXP authority. Retain provenance in the public domain result for comparisons; omit provenance labels from rendered text.
- **Paired evidence:** Obtain original-game values matching the retained real save and reference character. Historical warmed offline outputs and source-only queries do not establish pairing or connected live-game parity.

Keep prerequisites within Part 1; do not reduce scope or create prerequisite tickets. Reset-time claims and away-time simulations are unnecessary.

## Verification

Follow [domain testing guidance](../TESTING_IMPLEMENTATION.md) and the [extraction helper guide](../../tests/helpers/README.md). Use existing harnesses.

- Load the retained real save through `loadGameDataFromSave`. Assert populated typed public results, not copied formulas.
- Add core comparisons for progress, rolls/attempts, lens ownership/capacity/support, Insight requirements/rates, EXP, offline percentage, Papers, and milestones.
- Verify saved EXP provenance and its same-copy requirement while the account headline remains the highest saved level. Compare character-dependent inputs with the same reference character. Do not treat the extraction tool's default player as a product-selection rule.
- Compare Insight partial EXP, next requirement, actual hourly accrual, and the differing game-displayed hourly figure separately. Verify that pending effective seconds do not change saved progress during website processing.
- Check offline contributor percentage points before clamping and the final capped percentage. Match the explicit Research AFK branch, including artifact/card caps and permanent Paper purchases.
- Check current outside Shape ownership, milestone count grants, the ten-Shape cap, and cumulative Point milestone meaning. Do not test note illustrations as guaranteed future Shape identities.
- Compare every directly used calculation with its extracted value, including external producers. Static metadata and trivial helpers are not parameter targets. Keep configured tolerance `0` and its shared baseline.
- Reuse [Research Grid core](../../tests/domains/research/grid-bonus.test.ts)/[parameter](../../tests/domains/research/grid-bonus-parameters.test.ts) and [Spelunking progression](../../tests/domains/spelunking/progression.test.ts)/[parameter](../../tests/domains/spelunking/progression-parameters.test.ts) patterns.
- Cover observed discovery conditions, lens kinds and placement, row edges, multiple Kaleidoscopes, local versus total Insight effects, caps, and milestone states. Record unobserved branches; do not synthesize saves or alter inputs.
- Add source-backed pure regression tests for exact normal-world Deathnote milestones and the separate Eclipse Skulls condition. These numeric boundary tests do not construct account saves.
- Preserve existing Grid and affected consumer comparisons. Check repeated processing does not stack results.
- Refresh fixtures only through an identified live server. Offline extraction cannot replace `latest.json`; offline comparisons require explicit relevant-state pairing.
- During later UI delivery, compare rendered data with backend results and metadata. Check 43 Observations, 14 notes, search, default visibility, contributors, conditions, Paper separation, and read-only behavior. Check optional filtering if included.

Backend acceptance requires passing public-result and direct-parameter comparisons. Rendered acceptance belongs to UI delivery. Report executed checks, coverage gaps, and parity limits separately.
