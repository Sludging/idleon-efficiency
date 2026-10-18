# Menagerie Part 1 remaining backend audit

Scope: source audit of Part 1 outcomes beyond mission progress and ID 16 Tome pairing. Source is matching local v1.23 `Luminous_Menagerie` at `../IdleonWikiBot/codefiles/idleon1.23.txt`. The initial audit was source-only; later implementation, runtime, and test evidence appears below.

## Supported answers

### Claims, task, availability

Save `Menagerie[1][missionIndex]` stores completed claims; `Menagerie[0][1]` stores current Shells. Claim increments both by one only when current progress meets cost. Task threshold is mission cost for current claim count; task progress is recomputed from current game/account values. Mission availability count is rounded `min(CustomLists.Research[52].length, 1 + BoostQTY(0) + Research Grid_Bonus(164,1) + Ninja EmporiumBonus(47,0) + 3*Thingies Have_ban_k(0))`. A mission is ready only if available and its current requirement is met. Sources: `118691-118700`, `118743-118748`, `118759-118763`, `118907-118980`, claim mutation `297327-297336`.

### Saved Shell, rank, Lumi; unlock state

`Menagerie[0][0]` is Lumi balance; `[0][1]` Shell balance; `[0][2]` saved Lumi rank; `[1][i]` mission claims; `[2][i]` unlock ownership; `[3][i]` repeatable bonus levels. Lumi rate returns zero at rank zero. Positive rank produces hourly rate; a periodic actor adds it to saved balance. Do not extrapolate offline accrual. Shell threshold is rank-derived and capped at 15; equality means current rank readiness, not an IE rank-up. Native delayed transition subtracts threshold and increments rank. Sources: `118706-118741`, `297040-297064`, `297388-297399`, `297432-297451`.

Unlock availability: first unlock list has five rows and `UpgUnlocked(1)` is rank-derived: `min(7,rank)+floor(max(0,rank-7)/2)`, rounded. Second bonus list similarly has five rows and `min(6,rank)+floor(max(0,rank-6)/2)`. Ownership is `Menagerie[2][i] >= 1`. Unlock purchase requires Lumi >= cost and unowned; sets ownership and spends Lumi. Sources: `118702-118705`, `118759-118770`, `118804`, `297193-297241`, `297200-297211`, `297255-297300`, `297342-297360`. Menu access has no rank/research gate in inspected open paths (`118742`, `435637-435639`, `457343-457344`).

### Bonus levels, effects, costs, affordability

Each active level is saved in `[3][i]`; effect quantity is `CustomLists.Research[58][i] * level`. Next cost for category 2 is `3*level + level^1.5 + (5+i^1.5)*max(1.45,2.25-0.15*i/4)^i*CostExponent(i)^level`. `CostExponent`: 35 for IDs 8,10,12; 22.8 for 17,5,2; 3.5 for 6; 2.1 for 0,1,7; otherwise 1.3. Affordability is current saved Lumi >= next cost. Bonus purchase increments `[3][i]` and subtracts cost. Sources: `118752-118758`, `118764-118770`, `118805`, `297255-297279`, `297350-297360`.

All 25 catalog rows, with generated text shown here only as identification (not verified player-facing copy), are in `data/domain/data/MenagerieBonusRepo.ts:9-158`. Source-backed effect and recipient inventory per approved plan (`docs/plans/menagerie-part1-backend-plan.md:43-67`):

| ID | Catalog effect identification; per-level | Current approved recipient/output |
|---:|---|---|
| 0 | Mission availability +1 | availability formula above |
| 1 | Lumi/hr +25% per rank | Lumi rate multiplier; own factor |
| 2 | Gaming Palette Black Stars +1 | Gaming Palette Black Star resource |
| 3 | Research EXP x10 | Research experience |
| 4 | Cooking speed x500 | Cooking speed |
| 5 | Shrine max level +10 | Existing Construction Shrine `Building.maxLvl` cap, including dependent maximum-level costs |
| 6 | Organic Labels +1 | Farming Exotic Market resource |
| 7 | Summoning upgrade cost reduction, +100% quantity | Summoning upgrade costs |
| 8 | Minehead doublers +1 | Minehead resource |
| 9 | Sailing treasure x20 | Sailing treasure value |
| 10 | Sushi Station doublers +1 | Sushi Station resource |
| 11 | Forge speed +75 | Forge speed |
| 12 | Jelly Operator doublers +1 | Jelly Operator resource |
| 13 | Shiny Critter value +100 | Trapping rare-bonus-on-open multiplier; IE has no matching calculated reward output. Display-only; not Breeding shiny-level progress. |
| 14 | Summoning Essence +25 | Summoning Essence gain |
| 15 | Slow Roast Wiz +600 seconds | Worship active-wave start timer; IE has no timer output. Display-only. |
| 16 | Orion first upgrade cost +500 | Orion first-upgrade cost |
| 17 | Atom maximum levels +1 | Atom Collider max levels |
| 18 | Poppy first upgrade cost +400 | Poppy first-upgrade cost |
| 19 | Farming Land Rank EXP +50 | Farming Land Rank experience |
| 20 | Bubba first upgrade cost +300 | Bubba first-upgrade cost |
| 21 | Cooking Mastery EXP +1 | Cooking Mastery experience |
| 22 | Spelunking POW +25 | Spelunking POW |
| 23 | Class EXP +5 | No existing class-experience gain output identified; display only, no new recipient |
| 24 | Drop Rate +1 | Character Drop Rate |

Catalog “bonusPerLevel” values are generated records, while native actual effect is source multiplier times saved level. The labels’ percent/multiplier units are not independently verified from in-game tooltip text here. Static repo records are not authoritative copy. Use native expressions/callers for units and rounding. Recipients are exactly the approved table; do not add recipient models.

### Resource balances

Native computed resources are: Black Stars `round(BoostQTY(2)+4*Have_ban_m)`; Organic Labels `round(BoostQTY(6))`; Minehead doublers `round(BoostQTY(8)+3*Have_ban_l)`, usable remaining subtracts `Spelunk[51].length`; Sushi `round(BoostQTY(10)+3*Have_ban_l)`, remaining subtracts `[52].length`; Jelly Operator `round(BoostQTY(12)+3*Have_ban_l)`, remaining subtracts `[53].length`. Sources `118771-118778`. Show current usable/remaining counts, not owned totals as spendable. Native source does not clamp negative remaining values in these expressions.

### Lumi factors and inputs

For rank > 0, source multiplies in order: `10`; `1+CoralKidUpgBonus(10)/100`; `1+min(.25,SuperBitType(69))`; `1+ArcadeBonus(73)/100`; `1+10*Ninja.EmporiumBonus(47,0)/100`; `1+MenagerieBoost(1)*rank/100`; `1+Research.Grid_Bonus(165,0)/100`; `1+Have_ban_k`; `1+2*Have_ban_l`; `1+2*Have_ban_m`; final `1+additivePool/100`. Pool: PinkJellyBonus(0) + 25*ClamWorkBonus(8) + 10*PetArenaCrucBonus("0",4) + 25*PetArenaCrucBonus("0",14) + ConstBuildBONUSES(3,0) + AtomBonuses(16) + ZenithMarketBonus(11) + DancingCoralBonus(6) + AlchVials["7lumiadd"] + Research.Grid_Bonus(164,0) + min(5*CardLv("w7b10"),50). Exact native expression/order: `118717-118741`. Pink/Purple path and Yellow Construction input therefore matter; replacing either with zero is invalid. Source caller map is not inferred from a selector name; each input is traced below.

#### Remaining factor-source mapping / editable IE status

Matching offline source capture: ready service `http://127.0.0.1:3199`, source offline, gameReady/injected/CDP connected, active player 3 `Sludgev4`; `/game-version` returned `Luminous_Menagerie` 1.23. Capture called only `idleon.findFunction(owner, selector)` and `idleon.allScripts[actor]._customBlock_<Owner>.toString()`. No native selector values, save state, or fixture data were queried; no save refresh or mutation occurred. Each snippet stores the whole captured owner function at line 8.

The outer Lumi formula remains source `../IdleonWikiBot/codefiles/idleon1.23.txt:118717-118741`. The entries below distinguish direct inputs from calculated runtime helpers. Snippets are source evidence, not production code.

| Native input | Native helper body and direct inputs | Editable IE mapping and limit |
|---|---|---|
| `CoralKidUpgBonus(10)` | `Thingies` / `ActorEvents_579` reads `OptionsListAccount[620]` and returns `round(5*value)`. Captured `docs/game-snippets/thingies/Thingies.1.23.js:8`. | `CoralKid.parse()` translates option 620 to `lumiUpgradeLevel`, and `getLumiGenerationBonus()` returns the native rounded value (`data/domain/world-7/coralKid.tsx:54-85`). |
| `SuperBitType(69)` | `GamingStatType` / `ActorEvents_579` checks whether `Number2Letter[69]` occurs in saved `Gaming[12]`. Captured `docs/game-snippets/gaming/GamingStatType.1.23.js:8`. | `Gaming.parse()` sets `superbit69Purchased` from `Gaming[12]`; `isSuperbitPurchased(69)` exposes this named Boolean (`data/domain/world-5/gaming.tsx:37-45,95-102`). |
| `ArcadeBonus(73)` | `ArcadeBonus` / `ActorEvents_345` reads `ArcadeUpg[73]` and `CustomLists.ArcadeShopInfo[73]`, then passes metadata and level to pure `ArbitraryCode5Inputs`; level 101 multiplies by 2, level 102 by 6. Active `Companions(27)` multiplies by 2. Captured `docs/game-snippets/arcade/ArcadeBonus.1.23.js:8`, `arcade/ArbitraryCode5Inputs.1.23.js:8`, `companions/Companions.1.23.js:8`. | IE parses the same level and metadata; `ArcadeBonus.getBonus()` now handles both native 101 and 102 branches and Companion 27 (`data/domain/world-2/arcade.tsx:41-76,149-175`). The paired account compares `ArcadeBonus(73)` directly; level 102 is not exercised by this save. |
| `Ninja.EmporiumBonus(47,0)` | `Ninja` / `ActorEvents_579` checks whether `Number2Letter[47]` occurs in `Ninja[102][9]`. Captured `docs/game-snippets/sneaking/Ninja.1.23.js:8`. | Sneaking translates the purchase string into `jadeUpgrades[].purchased`; Menagerie reads Jade upgrade 47 from this named state (`data/domain/world-6/sneaking.tsx:399-405,415-421,474-483`). |
| `Research.Grid_Bonus(164,0)` / `(165,0)` | `ResearchStuff` / `ActorEvents_579` uses `Research[0][index]`, `CustomLists.ResGridSquares[index][2]`, optional assigned shape from `Research[1][index]`, and `Grid_Bonus_Allmulti`. Captured `docs/game-snippets/research/ResearchStuff.1.23.js:8`. | IE parses `Research[0]`; `getBonusForId(index)` applies per-level catalog data, shape multiplier, and all-bonus multiplier (`data/domain/world-7/research.tsx:914-940,1007-1021`). Paired native parameters cover 164 and 165. |
| `Have_ban_k/l/m` | `Thingies` / `ActorEvents_579` returns `1` iff `BundlesReceived.h.ban_k`, `.ban_l`, or `.ban_m` equals 1. Captured `docs/game-snippets/thingies/Thingies.1.23.js:8`. | `Account.parse()` reads raw `BundlesReceived` and exposes `hasBankBundle`, `hasBundleL`, and `hasBundleM` (`data/domain/account.tsx:239-249`). These are exact named Boolean inputs. |
| `PinkJellyBonus(0)` | `MenagerieStuff` / `ActorEvents_189` returns `Menagerie[0][4]`. Captured `docs/game-snippets/menagerie/MenagerieStuff.1.23.js:8`. | `Menagerie.parse()` stores this as `purpleJellyBonus`; `getLumiSaveInputs()` exposes it (`data/domain/menagerie.tsx:160-170,277-290`). Exact saved input is modeled. |
| `ClamWorkBonus(8)` | `Thingies` / `ActorEvents_579` returns `1` iff `OptionsListAccount[464] > 8`. Captured `docs/game-snippets/thingies/Thingies.1.23.js:8`. | `Clamworks.parse()` stores option 464 as `promoLevel` and sets promo index 8 active iff `8 < promoLevel` (`data/domain/world-7/clamworks.tsx:52-83,134-136`). `isBonusUnlocked(8)` represents this flag. This is not `getClamBonus(8)`, which reads a different work-bonus catalog (`clamworks.tsx:89-91`). |
| `PetArenaCrucBonus("0",4)` / `(...,14)` | `Breeding` / `ActorEvents_345` returns `1` iff runtime `DNSM.CalcTalentMAP.h.arenaCruc > index`. Captured `docs/game-snippets/breeding/Breeding.1.23.js:8`. | IE derives arena level from saved `OptLacc[628]`, Menagerie unlock 8, and RandoList thresholds; `getLumiSaveInputs()` returns `Number(level > 4)` and `Number(level > 14)` (`data/domain/menagerie.tsx:152-157,176-177,277-290`). Direct saved/runtime inputs are modeled as thresholded Booleans. |
| `ConstBuildBONUSES(3,0)` | `MenagerieStuff` / `ActorEvents_189` returns `3 * Menagerie[0][14]`; multiplier table is `[25,15,10,3]`. Captured `docs/game-snippets/menagerie/MenagerieStuff.1.23.js:8`. | `Menagerie.parse()` stores `3 * Menagerie[0][14]` as `yellowConstructionBonus`; `getLumiSaveInputs()` exposes it (`data/domain/menagerie.tsx:160-170,277-290`). Despite its name, this selector reads Menagerie Yellow progression, not Construction state. |
| `AtomBonuses(16)` | `AtomCollider` / `ActorEvents_579` returns zero in Tutorial; otherwise base is `Atoms[16] * CustomLists.AtomInfo[16][4]`. It initializes cached tower/meal summaries, but those only alter indexes 5 and 8; index 16 has no special transform. Captured `docs/game-snippets/atom-collider/AtomCollider.1.23.js:8`. | IE parses account `Atoms[16]` into `collider.atoms[16].level`; `Atom.getBonus()` multiplies level by `data.bonusPerLv` (`data/domain/world-3/construction/atomCollider.tsx:18-45,144-177`). Catalog row 16 is Chlorine, `bonusPerLv: 2` (`data/domain/data/AtomColliderRepo.ts:137-144`), matching source's `AtomInfo[16][4]` role. IE does not expose native Tutorial-scene status. |
| `ZenithMarketBonus(11)` | `Thingies` / `ActorEvents_579` returns `floor(CustomLists.ZenithMarket[11][4] * Spelunk[45][11])`. Captured `docs/game-snippets/thingies/Thingies.1.23.js:8`. | `ZenithMarket.parse()` maps `Spelunk[45][index]` to `bonuses[index].level`; `getBonusForId(11)` floors catalog `bonusPerLevel * level` (`data/domain/world-7/zenithShop.tsx:14-24,74-96`). Exact saved input and public API exist. |
| `DancingCoralBonus(6)` | `Thingies` / `ActorEvents_579` returns `CustomLists.Spelunky[24][6] * max(0,TowerInfo[24]-200)`; this branch has no purchase-state check. Captured `docs/game-snippets/thingies/Thingies.1.23.js:8`. | `DancingCoral.getLumiBonusFromIndex(6)` uses the parsed Tower level and catalog coefficient without the separate purchased gate (`data/domain/world-7/dancingCoral.tsx:6-21,42-84`). The paired save's factor is compared; its native value is zero. |
| `AlchVials["7lumiadd"]` | Outer formula reads this derived `DNSM.AlchVials` key (`idleon1.23.txt:118738-118739`). Captured `CauldronStats` does not identify its producer (`docs/game-snippets/alchemy/CauldronStats.1.23.js:8`). | IE uses `Alchemy.getVialBonusForKey("7lumiadd")`, which computes matching saved vial levels through `Vial.getBonus()` (`data/domain/world-2/alchemy/alchemy.tsx:374-407,658-672,749-798,863-874`). The paired factor compares as zero; native nonzero producer/formula parity remains unverified. |
| `CardLv("w7b10")` | `RunCodeOfTypeXforThingY` / `ActorEvents_12` reads `Cards[0].h["w7b10"]` and derives level from owned count, thresholds, and 5-/6-star unlock helpers. Captured `docs/game-snippets/cards/RunCodeOfTypeXforThingY.1.23.js:8`. | IE reads the same card ID; `Card.getLevels()` accounts for ownership and cardifiers, with star thresholds prepared from Rift and Spelunking (`data/domain/cards.tsx:17-18,68-79,227-250,257-275`). The paired native parameter returns level 1 and matches; star-unlock branches are not exercised by this save. |

#### Mapping outcome

All 20 ordered factor inputs now map to named IE values and feed the native-order rate. `CoralKidUpgBonus(10)` uses parsed Coral Kid option 620; `SuperBitType(69)` uses Gaming's named purchase state. The paired public rate matches native `12.30075`, and each factor has a direct native comparison. This save meaningfully exercises Jade 47, Research 165, and card level 1; most other factors, including both Crucible indices, are zero. Outstanding source limits are the untraced native `AlchVials["7lumiadd"]` producer, Atom's Tutorial-scene guard, and nonzero/unlocked factor branches absent from this save. No unknown factor falls back to zero in the Lumi calculation; the mapped IE owner API supplies each value.

#### Capture record and evidence boundary

Captured owner bodies came from exact `findFunction(owner, selector)` actor results and `.toString()` calls: Thingies (ActorEvents_579), GamingStatType (ActorEvents_579), ArcadeBonus (ActorEvents_345), ArbitraryCode5Inputs (ActorEvents_12), Companions (ActorEvents_579), Ninja (ActorEvents_579), ResearchStuff (ActorEvents_579), MenagerieStuff (ActorEvents_189), Breeding (ActorEvents_345), AtomCollider (ActorEvents_579), RunCodeOfTypeXforThingY (ActorEvents_12), and CauldronStats (ActorEvents_189). All versioned snippets are under `docs/game-snippets/`; no native values or save contents were queried. Source establishes helper inputs and branches only, not personalized parity.

### Runtime evidence and limits

The source-only capture used ready offline v1.23 assets at `http://127.0.0.1:3199`, active player 3 `Sludgev4`. Captures called only `findFunction` and owner `.toString()`; no values or save data were queried. Capture records and source paths are listed above. Existing runtime failures reported in the handoff do not invalidate these source captures.

## Remaining evidence limits

The paired v1.23 account and Menagerie core limits remain as recorded in the handoff. IDs 3, 4, 9, 11, 22, and 24 now have existing receiver wiring; source-exact contributions are verified, while full-output parity limits appear below. IDs 14, 19, and 21 are display-only because IE does not model their gain outputs. Other outgoing recipients remain pending.

## Recipient integration status

These are approved existing recipient targets from the [backend plan](../plans/menagerie-part1-backend-plan.md#integration-and-dependency-order). The supervisor accepts all 17 modeled external receivers as the backend layer only. This does not mean whole Part 1 acceptance. IDs 13, 14, 15, 19, 21, and 23 remain display-only because IE has no matching output; IDs 0/1 are internal.

| Bonus ID(s) | Approved receiver | Current status |
|---:|---|---|
| 2 | Gaming Palette Black Stars | Implemented — reviewed and accepted for bounded resource slice; `Gaming.palette.blackStarsAvailable` uses source-rounded grant plus four per owned Bank Bundle M. |
| 3 | Research experience | Implemented — independently reviewed and accepted for bounded rate/stat slice; receiver is wired, but full-output parity remains unresolved. |
| 4 | Cooking speed | Implemented — independently reviewed and accepted for bounded rate/stat slice; paired speed output passes. |
| 5 | Construction Shrine maximum levels | Implemented — independently reviewed and accepted. Adds prepared Menagerie bonus 5 to the existing Shrine `Building.maxLvl` calculation. |
| 6 | Farming Exotic Market Organic Labels | Implemented — reviewed and accepted for bounded resource slice; `Farming.organicLabelsAvailable` is the source-rounded Menagerie grant. |
| 7 | Summoning upgrade costs | Implemented — independently reviewed and accepted. Per-upgrade reduction uses current-level tiers of 50. |
| 14 | No existing Summoning Essence gain output | Display-only; saved quantity is modeled, gain is not. |
| 8 | Minehead upgrade doublers | Implemented — reviewed and accepted for bounded resource slice; owned/remaining resources are exposed, and selected IDs double `MineheadUpgrade.getBonus()`. |
| 9 | Sailing treasure value | Implemented — independently reviewed and accepted for bounded rate/stat slice; full boat parity remains outside this slice. |
| 10 | Sushi Station upgrade doublers | Implemented — reviewed and accepted for bounded resource slice; owned/remaining resources are exposed, and selected IDs double `SushiUpgrade.getBonus()`. |
| 11 | Forge speed | Implemented — independently reviewed and accepted for bounded rate/stat slice; existing Godshard card input limits full-output parity. |
| 12 | Jelly Operator upgrade doublers | Implemented — reviewed and accepted for bounded resource slice; owned/remaining resources are exposed, and selected IDs double `JellyOperatorUpgrade.getQuantity()`. |
| 13 | Shiny Critter value | Display-only — native effect multiplies Trapping rare-bonus-on-open; IE has no calculated reward output (`idleon1.23.txt:172296-172315`). |
| 15 | Worship Slow Roast Wiz | Display-only — native effect adjusts active-wave start timer; IE has no wave-duration output (`idleon1.23.txt:169751-169762`). |
| 16 | Orion first-upgrade cost | Implemented — independently reviewed and accepted. Only upgrade index 0 receives the native reciprocal cost factor. |
| 17 | Atom Collider maximum levels | Implemented — independently reviewed and accepted. Existing `Atom.getMaxLevel()` adds prepared Menagerie levels. |
| 18 | Poppy first-upgrade cost | Implemented — independently reviewed and accepted. Only upgrade index 0 receives the native reciprocal cost factor. |
| 19 | No existing Farming Land Rank EXP gain output | Display-only; IE exposes saved progress and next-rank threshold only. |
| 20 | Bubba first-upgrade cost | Implemented — independently reviewed and accepted. Only upgrade index 0 receives the native reciprocal cost factor. |
| 21 | No existing Cooking Mastery EXP gain output | Display-only; IE tracks mastery state, not its EXP gain rate. |
| 22 | Spelunking POW | Implemented — independently reviewed and accepted for bounded rate/stat slice; full-output parity is limited by existing source/input differences. |
| 23 | No existing class-experience gain output | Display-only; no receiver. |
| 24 | Character Drop Rate | Implemented — independently reviewed and accepted for bounded rate/stat slice; current selector is cached and stored expected data is v1.22. |

### Existing output and display-only findings

Native source defines `BoostQTY(id)` as the saved-level quantity at `118805`. IDs 14, 19, and 21 affect live gain calculations, but IE does not calculate those outputs:

- **ID 14 — Summoning Essence gain:** Native `SummRockEssGen` builds its multiplier with Menagerie at `239573-239592`, then applies it to per-colour Essence generation at `239593-239604`. IE `SummonEssence` exposes saved `quantity`, victories, and unlock/display state only (`data/domain/world-6/summoning.tsx:208-215,496-571`); it has no gain-rate result.
- **ID 19 — Farming Land Rank EXP:** Native `PlotRankGain` multiplies Land Rank EXP gain by Menagerie at `237407-237418`. IE parses saved plot `landExp` (`data/domain/world-6/farming.tsx:743-748`) and exposes the next-rank requirement (`:409-411`); `updateFarmingLandRankBonuses` prepares existing upgrade bonuses (`:1034-1038`), not an EXP-gain result.
- **ID 21 — Cooking Mastery EXP:** Native `ExpRateCook` includes Menagerie in its mastery EXP-rate product at `239455-239469`. IE tracks mastery level for meal bonuses (`data/domain/world-4/cooking.tsx:130-133`) and mastery unlock state (`:445-447`), but no mastery EXP-gain output.

All 25 catalog bonus values remain visible. Only the listed effects are display-only because no matching existing output is modeled; no orphan fields or new subsystems were added.

### ID 5 existing Construction receiver

Source for ID 5 confirms the existing receiver: `ExtraMaxLvAtom` adds `BoostQTY(5)` to the `t == 100` building cap with Construction Mastery and existing cap inputs (`idleon1.23.txt:172892-172894`). Native callers compare current building level with the base `TowerInfo` cap plus this result (`191587-191592`). IE's `updateConstruction` now applies prepared bonus 5 to existing Shrine `Building.maxLvl`; `Building.getMaxLevelCosts()` reads this cap. This does not add a Shrine-activity-level or Tower-cap model.

### Source-confirmed display-only outputs

ID 13's native `TrappingStuffs("RareBonusOnOpenMULTI", ...)` multiplies rare-bonus-on-open by `1 + BoostQTY(13)/100` (`idleon1.23.txt:172296-172315`). IE `Traps` exposes saved trap rewards and trap benefits, not calculated open-reward output (`data/domain/world-3/traps.tsx:17-94,97-158`). This is not `Pet.calculateShinyLevel`; keep ID 13 display-only.

ID 15's Worship actor increments `_GenINFO[85]` per second and, while an active wave is running, raises it to `BoostQTY(15)` up to 14,400 seconds (`idleon1.23.txt:169751-169762`). IE `Worship` exposes wave counts, charge, charge rate, max charge, and charge overflow, but no wave-start duration (`data/domain/world-3/worship.tsx:144-195,212-223,272-328`). Keep ID 15 display-only; do not add a timer.

These caller checks used the complete matching local v1.23 source file, not a runtime query. The previously attempted owned service at `http://127.0.0.1:3199` refused `/status`; no service was restarted and no runtime/save values were queried.

Menagerie mission availability and Lumi calculations are internal/core behavior, not outgoing recipient integrations. Incoming/direct-input support already present includes Tome lines 122/123, Wellstock, Coral Kid option 620, Arcade level 102, Dancing Coral's Lumi input, and Crucible factors. These do not complete any pending receiver above.



## Recipient source follow-up: approved bonuses 2–12

Source excerpts and conclusions from prior audit remain retained; see preceding version before this source-input update for recipient-specific lines 71–94.
## Completed receiver slice: resources and effects 2, 6, 8, 10, 12

Menagerie grants now feed existing owner outputs. Palette receives its resource after Menagerie preparation through `updateGaming`; Farming through `updateFarmingLevel`; Minehead through `updateMinehead`; Jelly Operator through `updateJellyOperator`; Sushi Station through `updateSushiStation`.

Native v1.23 grant formulas at `../IdleonWikiBot/codefiles/idleon1.23.txt:118771-118778` define Black Stars as `round(BoostQTY(2) + 4 * Have_ban_m)`, Organic Labels as `round(BoostQTY(6))`, and each doubler grant as `round(BoostQTY(id) + 3 * Have_ban_l)`. Remaining doubler counts subtract saved selection-array lengths from `Spelunk[51]`, `[52]`, and `[53]`. Native Minehead, Sushi, and Jelly Operator receiver formulas double ongoing per-level quantity for each selected upgrade: `244276-244279`, `244509-244512`, and `118500-118503`. These are persistent current-effect multipliers, not purchase-only boosts. Related calculated outcomes include Minehead `244173-244184`, Sushi `244555-244589`, and Jelly `118518-118567,118599-118664`.

`Menagerie.parse()` translates saved selected IDs into named sets. The early `prepareMenagerie` stage derives grants from parsed Menagerie levels and Bank Bundle L/M, then asks each owner to prepare its selection multipliers before any relevant consumer calculation. Owners apply those multipliers to existing upgrade quantities; no simulator or purchase action was added.

The existing paired `usable_resources` output in `tests/results/menagerie-account-state-data.json` matches all five public resource outputs on the unchanged real fixture. Every result is zero, so this fixture does not exercise nonzero grants, bundle contributions, saved selections, or doubled upgrade effects. Source proves those branches; personalized native parity remains untested.
## Bounded resource-slice review and acceptance

Fresh independent review of IDs 2, 6, 8, 10, and 12 found zero confirmed standards or specification findings (confidence 0.85). Supervisor accepts these five resource recipients as a bounded slice only; this is not acceptance of the whole backend or Part 1.

The unchanged real fixture yields zero for all five grants and has no selected doubler IDs. Nonzero grants, bundle contributions, selections, and doubled effects were not runtime-exercised. Source confirms the resource formulas and persistent selected-effect behavior; personalized nonzero parity remains untested.

Selected test results were 133/144 passing, including account-state, Farming, and Jelly suites. The 11 Gaming/Sushi failures are 1.22 expected-output comparisons against current v1.23 data. Diagnosis shows this slice is neutral for those values; these are unpaired comparisons, not proven old bugs or latest-version parity. Exact failure values and provenance remain in [the diagnosis](#selected-suite-failure-diagnosis). No expectations or unrelated behavior were changed.

Fresh independent review found no concrete defects in IDs 7, 16, 17, 18, and 20; supervisor acceptance remains pending. ID 5 is now wired and fresh review found no issues; acceptance remains pending. IDs 0/1 are internal core behavior; IDs 13, 14, 15, 19, 21, and 23 are display-only for source-confirmed receiver gaps. Part 1 remains incomplete.
IDs 5, 7, 16, 17, 18, and 20 are wired to existing cap/cost APIs. The unchanged paired save has level zero for all these bonuses; positive effects and nonzero cost arithmetic remain unexercised.

Native source: `../IdleonWikiBot/codefiles/idleon1.23.txt:118779-118782,118805-118806,239014-239031,239241-239258,238821-238838,243570-243581,236515-236520`. ID 7 applies the exact per-upgrade reciprocal after upgrade 72 and before upgrade 75, using `floor(currentUpgradeLevel/50)` tiers and divisor floor 1. IDs 16, 18, and 20 multiply only upgrade index 0 by `1/(1+BoostQTY(id)/100)`, at each native caller's source position. ID 17 is `round(20 + 10*SuperBitType(23) + CompassBonus(53) + 20*EventShopOwned(28) + BoostQTY(17))`; IE adds the prepared bonus to existing Atom max-level inputs and rounds the result.

Changed owner outputs: `SummonUpgrade.nextLevelCost()` (`data/domain/world-6/summoning.tsx`), `Orion.getUpgradeCost(0)` (`data/domain/world-1/orion.tsx`), `Poppy.getUpgradeCost(0)` (`data/domain/world-2/poppy.tsx`), `Bubba.getUpgradeCost(0)` (`data/domain/world-3/bubba.tsx`), and `Atom.getMaxLevel()` (`data/domain/world-3/construction/atomCollider.tsx`). No central registration or caller signatures changed.

Focused command: `yarn test --runInBand tests/domains/menagerie tests/domains/world-1/orion-global-bonus-progression.test.ts tests/domains/world-1/orion-global-bonus-progression-parameters.test.ts tests/domains/world-2/poppy-global-bonus-progression.test.ts tests/domains/world-2/poppy-global-bonus-progression-parameters.test.ts tests/domains/world-3/bubba-global-bonus-progression.test.ts tests/domains/world-3/bubba-global-bonus-progression-parameters.test.ts tests/domains/world-3/construction/atomcollider-cost-and-maxlevel.test.ts tests/domains/world-3/construction/atomcollider-cost-and-maxlevel-parameters.test.ts tests/domains/world-6/summoning-class-experience-parameters.test.ts` — 14 suites passed, 83 tests passed. The unchanged fixture has selected levels zero, so cost effects are neutral; Atom max-level parity passed at ID 17 zero. Nonzero selected-effect parity is unexercised.

### Bounded rate/stat receiver slice: IDs 3, 4, 9, 11, 22, 24

The shared prepared API is `Menagerie.getBonusMultiplier(id)`, using `1 + effect / 100`. Native `BoostQTY(id)` is quantity derived from saved level (`idleon1.23.txt:118805`); raw `boostQTY` and current/next UI text remain unchanged. `prepareMenagerie` runs early in the owner pipeline (`data/domain/idleonData.tsx:283-284`). Captured helper bodies: existing `menagerie/MenagerieStuff.1.23.js`, `research/ResearchStuff.1.23.js`, plus `forge/ForgeStats.1.23.js`, `forge/ForgeSpeeed.1.23.js`, and `players/TotalStats.1.23.js`.

| ID | Existing public output; native source unit/order | IE receiver placement |
|---:|---|---|
| 3 | Research EXP multiplier and hourly EXP. `ResearchStuff` applies `1 + BoostQTY(3)/100` after the four JellyOperation factors and before Royal Armory Outpost (`243899-243900`). | `ResearchGrid.production` adds the prepared multiplier after Jelly factors, before Outpost (`data/domain/world-7/research.tsx:1321-1324,1535-1565`). |
| 4 | Final Cooking speed. `CookingR` applies `1 + BoostQTY(4)/100` after Summoning `WinBonus(15)` and before Hole factors (`174581-174584`). | `Kitchen.getMealSpeed` applies the required multiplier at the same boundary; `updateCooking` prepares displayed kitchen outputs (`data/domain/world-4/cooking.tsx:310-377,677-801`). |
| 9 | Sailing treasure `BoatValue`. `LootMulti` applies Menagerie as its final multiplier after Sigil, artifact, Arcade, Summoning, Hole, Companion, Sushi, and Fountain factors (`235062-235085`). | `Boat.getLootValue` applies the prepared multiplier as its final product factor (`data/domain/world-5/sailing/sailing.tsx:192-204,421-476`). The known captain LOOT discrepancy remains out of scope. |
| 11 | Forge speed. `ForgeStats(2)` multiplies by `1 + BoostQTY(11)/100`; `ForgeSpeeed` rounds this value, divides by 100, then applies active SpeedForge oil, Brimstone, and the final 0.25 factor (`97277`, `97293-97312`). Native source gives no named unit. | `ForgeSlot.getSpeed` multiplies upgrade input before `Math.round(...)/100`, then applies oil, Brimstone, and 0.25 (`data/domain/world-1/forge.tsx:10-14,46-53,206-214`; `data/domain/idleonData.tsx:359`). Existing IE `ForgeUpgrade.getStat()` omits source's `30*CardLv("Godshard")`; whole-output parity is not claimed. |
| 22 | Spelunking `POW_multi`; source inserts `1 + BoostQTY(22)/100` after Clamwork/Arena factors and before two Jelly factors (`242563-242573`). Unit is POW multiplier. | `getPersistentSpelunkingPower` places the prepared multiplier after existing Sushi and before Jelly factors (`data/domain/world-7/spelunkingPower.ts:25-108`), feeding Button task 50 (`data/domain/world-7/buttonTaskProgress.ts:240-241`). IE does not model the native Clamwork/Arena inputs here; full-output parity is not claimed. |
| 24 | Character `Drop_Rarity` multiplier. `TotalStats("Drop_Rarity")` applies Menagerie after Arcane Map and RoyalG Statue, before Card 101 and later products (`98496-98503`, complete helper at `players/TotalStats.1.23.js`). | `PlayerStats.updateDropRate` applies the prepared factor after Royal Armory Statue and before Card 101 (`data/domain/player-stats.ts:521-628,811-852`). Public output is `dropRateMultiplier`. `TotalStats` returns cached `TotStatMAP` values when present; query may be stale. |

All six receiver factors consume prepared state by assignment/recalculation, not cumulative multiplication: Research rebuilds production; Cooking assigns speed from fresh parameters; Sailing and Forge replace each stored Menagerie multiplier; Spelunking calculates with local products; Drop Rate clears and rebuilds `preparedDropRateMultiplier`. The account-state test reprocesses these owners twice and compares public outputs. The unchanged paired player-3 save has level/effect zero for all selected IDs 3, 4, 9, 11, 22, and 24; no nonzero save or synthetic input was created. Source proves nonzero formulas, but this account does not exercise them.

Read-only native checks used only ready offline v1.23 runtime `http://127.0.0.1:3220`, player 3, with matching canonical save hash `4192b0b37728606c0a1bc24c19289d665f8c0335572ba1386f559680d9e0eaf6`. Native outputs: Research `ResearchEXPmulti` `3745.418667577039` (repeated once) and `ResearchEXPrateTOT` `89560952.24752302`; Cooking `CookingSPEED(0)` `3.9884956123870965e149`; Sailing `BoatValue(0)` `518147558758.6702`; Forge `ForgeSpeeed(0)` `2.625`; Drop `TotalStats("Drop_Rarity")` `5086.359233227054`. Spelunking uses the existing paired v1.23 `Button_uHave(50,0)` result `3.9330872379112775e25`.

Focused command: `yarn test --runInBand tests/domains/menagerie tests/domains/research/account-progress.test.ts tests/domains/cooking/meal-speed.test.ts tests/domains/sailing/speed.test.ts tests/domains/player/drop-rate.test.ts tests/domains/button/spelunking-power.test.ts` — 7 suites passed, 3 failed; 294 passed, 26 failed. Menagerie/account-state, Cooking, Sailing speed, and core Menagerie checks passed; account-state includes the normal fixture load and repeated-owner output comparison. Research tests still disagree with their paired expected result: IE shared multiplier `3629.9082512595455` vs expected `3745.3440264312276`; current runtime native repeated `ResearchEXPmulti` returned `3745.418667577039`. Do not repin values or widen tolerance; full Research output parity remains unresolved. Spelunking IE output `3.8732577116131e25` differs from paired expected `3.9330872379112775e25` by 1.52%; no full output parity claim. Drop Rate test expects `4908.593644547015` from a dataset marked game 1.22, while current IE and the possibly cached v1.23 selector both return `5086.359233227054`; no version-paired parity claim. No unrelated formula changes were made.

The execution owner also restored the pre-existing `research` variable in `updateResearchDisplay` and the already-declared `holeSchematic56` Cooking parameter after focused tests exposed block-replacement omissions. The final run passed those receiver paths; these were required to keep existing account processing and Cooking speed usable.


## Selected-suite failure diagnosis

No failure implicates the resource recipient changes. The account's five Menagerie resource results are all zero, and saved Minehead/Sushi/Jelly selected-ID arrays are empty. `blackStarsAvailable` and `organicLabelsAvailable` are output-only fields in these calculations; the doubler flags therefore stay false, making the new quantity multiplier exactly 1. The slice is behavior-neutral for every failed output.

One diagnostic Jest run captured 11 assertions. Gaming failures were squirrel acorns expected 8/received 7; Palette Luck 157.72453197848367/157.56548461077497 (also repeated by lifecycle); Palette level chance 0 0.03154490639569674/0.031513096922154996, level chance 3 0.0059194011953790406/0.005913432148162814, unlock chance 3 0.0026287421996413944/0.002626091410179583, level chance 18 0.00618118709053144/0.006174954061821626, combined Sprout multiplier 1.4667210244374236e55/1.4632366580414045e55, and standard harvest 1.3424263976083607e79/1.3392373075557723e79. Sushi failures were Fuel/hour and shaker-use Fuel, both expected 112811756.56534709/received 307976095.4233975.

The Gaming comparison config documents source extraction from Idleon 1.22, as does the Sushi comparison config. The current Menagerie resource comparison uses paired v1.23 native outputs. Thus the failing expected outputs are not version-paired with current source/account state. Classify them as stale/unpaired baseline comparisons, not proven pre-existing domain regressions. No expected values changed; no Gaming/Sushi subsystem was modified. Exact current-version native parity remains unverified for these outputs.

Focused command after test correction: `yarn test tests/domains/menagerie/account-state.test.ts tests/domains/gaming/mechanics.test.ts tests/domains/gaming/lifecycle.test.ts tests/domains/farming/exotic-market.test.ts tests/domains/world-7/jelly-operator.test.ts tests/domains/world-7/sushi-station-calculations.test.ts` — 3 suites passed, 3 failed; 133 passed, 11 failed. Account-state verifies public resource outputs against native paired expected values and reprocesses all five owner updates twice. The fixture still does not exercise nonzero grants or saved selected-ID effects.
## ID 5 Construction Shrine cap receiver

ID 5 feeds the existing Construction Shrine cap. `updateConstruction` rebuilds each cap from `Building.baseMaxLvl`, preserving Construction Mastery, Carbon Atom, and Dancing Coral inputs without stacking them on repeat processing. Shrine caps use the native rounding stage and include prepared `Menagerie.getBonusValue(5)`. `Building.getMaxLevelCosts()` consumes the updated cap without a separate cost model.

Native v1.23 evidence: `ExtraMaxLvAtom` adds `BoostQTY(5)` to the `t == 100` building cap with existing terms and rounds the result (`../IdleonWikiBot/codefiles/idleon1.23.txt:172892-172894`); callers compare building levels with base `TowerInfo` caps plus this result (`191587-191592`).

Root cause: the static `BuildingRepo` defines `lvlUpReq` for every Shrine (`data/domain/data/BuildingRepo.ts:190-277`), but the `Building` constructor did not copy `data.lvlUpReq` to each instance (`data/domain/world-3/construction/buildings.tsx:31-41`). Consequently, normal account processing reached `Building.getLevelCosts()` and failed on `.forEach` (`buildings.tsx:65-86`); the post-processing catch concealed the Construction-stage abort. This was an object-initialization omission, not missing game data or valid max-level behavior. The minimal fix copies the existing static requirement list. No static data, fallback requirement, or synthetic save was added.

Verification: the final combined command `yarn test --runInBand tests/domains/menagerie tests/domains/tome/native-line-score-parameters.test.ts tests/domains/world-1/orion-global-bonus-progression.test.ts tests/domains/world-1/orion-global-bonus-progression-parameters.test.ts tests/domains/world-2/poppy-global-bonus-progression.test.ts tests/domains/world-2/poppy-global-bonus-progression-parameters.test.ts tests/domains/world-3/bubba-global-bonus-progression.test.ts tests/domains/world-3/bubba-global-bonus-progression-parameters.test.ts tests/domains/world-3/construction/atomcollider-cost-and-maxlevel.test.ts tests/domains/world-3/construction/atomcollider-cost-and-maxlevel-parameters.test.ts tests/domains/world-6/summoning-class-experience-parameters.test.ts` passed 15 suites and 209 tests. It includes all 14 suites/83 tests from the prior receiver manifest, current Menagerie core/account state, Tome account score, and native Tome line-score comparisons. The additional suite is `tests/domains/menagerie/tome-account-score.test.ts`, already selected by the Menagerie directory.

`node .menagerie-final-smoke.cjs` loaded `latest` through `loadGameDataFromSave` and production `updateIdleonData`; it emitted no construction-abort log. It read all 33 mission states, 25 unlocks, 25 bonuses, availability counts, saved progression, Lumi rate, resource balances, and receiver outputs. Results: 11 players; saved Lumi `7.0364065553751525`, rank 7, 0 Shells, threshold 3, rate `12.30075`, mission/unlock/bonus availability 3/7/6. Resource grants and all doubler balances were zero. All nine Shrines had names, levels at caps (300 for indices 18–22; 200 for 23–26), and empty `getMaxLevelCosts()` lists. All 17 Atom caps were 50. Repeating Construction, resource, rate/stat, and Drop Rate owner updates preserved the complete captured Menagerie and receiver snapshot exactly.
Follow-up Building-identity smoke used the same production loader: `construction.buildings.find(building => building.name === "Atom Collider")` returned name `"Atom Collider"` and level 200. `updateAtomCollider` copied this level into Atom's `colliderBuildingLevel`; Hydrogen Atom cost used nonzero level 200, with current-level cost `28384388.388493948` and unlock cost `1.0889410537297861`. Thus restored identity feeds the real nonzero cost discount input; this is current-save behavior, not native comparison. Temporary identity script was removed after the output.

The smoke output was observed, not a native personalized parity comparison. Current owner outputs included Research EXP/hour `86798851.71936098`, Spelunking POW `3.8732577116131e25`, Drop Rate for player 3 `5086.359233227054`, Cooking kitchen 0 speed `3.9884956123870965e149`, Sailing boat 0 treasure `401575405.3863335`, Forge slot 0 speed `2.0625`, and costs for Summoning/Orion/Poppy/Bubba first upgrades `336330934453182.7` / `5.544414210857352e29` / `104393613137989570000` / `21485748707.03035`. The unpaired Research, Spelunking, and Drop Rate comparisons remain unresolved as described above; these outputs do not establish new native parity. All receiver bonus levels are zero in this save, so nonzero effects are not runtime-tested. Empty Shrine max-cost lists are the expected capped boundary, not positive-cost arithmetic coverage.

Fixture provenance: `tests/fixtures/saves/latest.json` SHA-256 `aab7f516047fc5b86096350e92864faeeccf303e9c72def20b51130507416555`; retained native pairing metadata identifies canonical save hash `4192b0b37728606c0a1bc24c19289d665f8c0335572ba1386f559680d9e0eaf6`, player 3, v1.23. Saved Lumi remains the fixture value; the paired native extraction had advanced Lumi to `7.039823430375153`, so no balance parity claim is made.

Final `yarn tsc --noEmit` cleared feature-owned Menagerie (`totalMenagerieBonusLevels` and Spelunking depth reductions now specify numeric accumulators; mission 29's parsed Summoning boss-kill total is declared), Construction (restore `bonus`; validate and copy real `lvlUpReq` item/quantity records), and Menagerie UI errors (use Grommet `Select` without unsupported type arguments and narrow its selected option). Remaining diagnostics are outside this revision: `app/world-5/hole/content.tsx:282` (`unavailableReason`/`contributors` on `never`, implicit `any` contributor); `components/base/RoundedShadowBox.tsx:6` (`DefaultTheme.global`); `components/world-5/hole/part4Caverns.tsx:185-198` and `data/domain/world-5/hole/hole.tsx:1524-1893` (`Harp.slotCount`, nullable highest …

After the fixes, `yarn tsc --noEmit` reported only those unrelated diagnostics. Focused verification `yarn test --runInBand tests/domains/menagerie/account-state.test.ts tests/domains/world-3/construction/atomcollider-cost-and-maxlevel.test.ts` passed 2 suites/17 tests. The real `latest` save flows through production `loadGameDataFromSave`; Construction requirement records initialize and reach existing cost/cap processing, and Menagerie account-state comparisons pass. No new UI browser run was needed: the `Select` option narrowing preserves all three valid filter behaviors. Previous combined backend verification remains 15 suites/209 tests.

Known limits retained: earlier resource run 133/144 (11 unpaired Gaming/Sushi assertions use v1.22 expected outputs); rate/stat run 294/320 (26 unresolved Research/Spelunking/Drop comparisons). Final backend acceptance records 15 suites/209 tests, stable production-account smoke, and 2 suites/17 tests after type repairs; it accepts the backend only. Nonzero receiver effects and uncapped Shrine maximum-cost arithmetic were not runtime-exercised. Full repo TypeScript still has unrelated working-tree diagnostics; their age is unknown. No expected values or fixtures changed. No temporary scripts remain.
## Resource availability semantics follow-up

Scope: native v1.23 source audit for `{available}/{total}` on the five existing Menagerie resources. This extends the prior summary in “Resource balances” and “Completed receiver slice”; it does not change implementation or claim personalized runtime parity.

### Native owned totals and available quantities

All five grants are integer-rounded **totals**. Resource-specific remaining helpers subtract allocations exactly as follows:

| Resource | Native total / owned helper | Native available helper | Allocations and interpretation |
|---|---|---|---|
| Black Stars | `MenagerieStuff("BlackStarsOwned")` = `round(BoostQTY(2) + 4*Have_ban_m)` | `GamingStatType("BlackStarsLEFT")` sums `Spelunk[49][0..36]` numerically, then returns `round(owned - sum)` | Palette entries are per-palette saved numeric selection states. UI writes `0→1→2`; state `1` is selected once, `2` is selected twice. Palette effect uses `max(1, 1 + (state + floor(state/2)))`, so 1 means 2× and 2 means 4×. Available is total minus consumed uses, not selected-entry count. Sources `118771`, `235791-235795`, `226130-226139`, `235773`. |
| Organic Labels | `MenagerieStuff("OrganicLabelOwned")` = `round(BoostQTY(6))` | `FarmingStuffs("ExoticOrganicsLEFT")` = `round(owned - Spelunk[50].length)` | Each entry is a selected Exotic Market upgrade ID. UI appends selected ID only when absent (`247269-247271`); market lookup uses membership (`237574-237578`). One selected upgrade consumes one label. |
| Minehead Doublers | `MenagerieStuff("MineheadDoublersOwned")` = `round(BoostQTY(8) + 3*Have_ban_l)` | `MenagerieStuff("MineheadDoublersLEFT")` = `round(owned - Spelunk[51].length)` | Entries are selected Minehead upgrade IDs, appended only if absent. Selection doubles that upgrade's quantity (`244276-244279`). |
| Sushi Station Doublers | `MenagerieStuff("SushiDoublersOwned")` = `round(BoostQTY(10) + 3*Have_ban_l)` | `MenagerieStuff("SushiDoublersLEFT")` = `round(owned - Spelunk[52].length)` | Entries are selected upgrade IDs, appended only if absent; callers gate selection on catalog eligibility (`292010-292021`). Membership doubles quantity (`244509-244512`). |
| Jelly Operator Doublers | `MenagerieStuff("JellyOpDoublersOwned")` = `round(BoostQTY(12) + 3*Have_ban_l)` | `MenagerieStuff("JellyOpDoublersLEFT")` = `round(owned - Spelunk[53].length)` | Entries are selected upgrade IDs, appended only if absent and after membership in selected/buyable research lists (`293895-293909`). Membership doubles quantity (`118500-118503`). |

Exact common helper source: `idleon1.23.txt:118771-118778`; totals and available are separately rounded by native source. Bundle helpers `Have_ban_m` and `Have_ban_l` are booleans (1 iff matching bundle field equals 1); therefore bank bundle contributes +4 Black Stars for bundle M, and +3 to each doubler total for bundle L. No bundle contribution enters Organic Labels. Formula source and bundle mapping: `118771-118778`, `240194-240196`.

### Negative and rounding behavior

Native does **not** clamp available values to zero. Each helper directly computes `Math.round(total - use)`. If allocations exceed total, output can be negative. Allocation counts are integer for Label/doubler list lengths and summed Black Star numeric states; total is already rounded. JS `Math.round` applies to the difference, including any fractional Black Star state sum; do not replace with `max(0,...)`, clamp, or round allocation separately.

Useful source-regression boundaries:

- Black Stars: allocated palette states `0`, `1`, `2`; compare state `1` use of one with state `2` use of two. Include mixed states, e.g. `1+2=3`; raw number of nonzero palette entries would incorrectly count this as two.
- Each list-backed resource: empty list, one eligible selected ID, and more selections than owned total. Confirm one unique ID consumes one unit; repeated selection does not append a duplicate.
- All resources: total zero with no allocations gives zero; allocations above total must preserve negative result. Bank bundle values 0/1 verify exact +4 or +3 grants before availability subtraction. For fractional Menagerie bonus quantities, test native `Math.round` at a half boundary if valid save/catalog state can produce it; source establishes rounding but available fractional allocation path is only relevant to Black Stars.

### Evidence limits

This is matching local v1.23 source, with prior captured helper body in `docs/game-snippets/menagerie/MenagerieStuff.1.23.js:8`. Source defines Black Star consumption summing all 37 palette slot states; it does not establish a behavior for malformed values outside the UI's 0/1/2 cycle. The audited native source did not show a removal path for selection arrays; available semantics follow native current save-array lengths, not inferred gameplay history. Existing paired account-state evidence is all-zero and does not exercise grants, allocations, bundle bonuses, or negative balances; do not claim nonzero runtime parity.

Player-facing interpretation: total means all granted resource units, including verified bank-bundle grants; available means total minus native consumed selections. For Black Stars, consumption counts uses (state values), not palettes. For other four, each unique selected entry consumes one unit. This supports rendering native available/total in that order without changing recipient calculations, which continue to use owned totals and selection membership.

### Implemented presentation and regression evidence

`MenagerieProgression` now exposes `blackStarsAvailable` and `organicLabelsAvailable` alongside unchanged owned totals. Black Star use sums numeric Spelunking slots 0–36, so state `2` consumes two; Organic Label use counts selected IDs, including ID `0`. Both available values preserve native `Math.round(total - use)` behavior without a negative clamp. Minehead, Sushi Station, and Jelly Operator pair values remain unchanged.

`tests/domains/menagerie/account-state.test.ts` verifies valid domain-unit inputs: Black Stars total `5`, uses `1 + 2`, available `2`; Organic Labels total `1`, selected ID `0`, available `0`. Exact command: `yarn test --runInBand tests/domains/menagerie/account-state.test.ts` — 1 suite, 12 tests passed. This controlled regression is not personalized native parity.

`yarn ui:run .ui-verification/menagerie-resource-pairs-20261018.cjs` passed on the real unchanged latest profile at 1440×1000. All five pairs rendered `0/0` with existing icons and layout; the parent inspected `.ui-verification/runs/2026-10-18T04-51-46-658Z-44008/final.png`. Zero fixture grants and allocations mean nonzero consumption was not visually verified. Fresh source-only UI review found zero findings (confidence 0.94). No full suite, build, or typecheck was run.
## Chromatic Megaflesh negative progress

Mission 27 (Chromatic Megaflesh) uses native `Math.round(Bubba[1][8] - 11)` (`../IdleonWikiBot/codefiles/idleon1.23.txt:118968-118970`). A production `yarn tsx` diagnostic loaded unchanged `latest` with `loadGameDataFromSave`: upgrade 8 `level1=6`, `level2=0`, `realLevel=6`, `bonus=6`, `ownedMegaflesh=6`; mission progress was `-5`, requirement `1`, remaining `6`, and unavailable. The retained extraction in `tests/results/menagerie-mission-progress-data.json:30` also records `-5`; it is not a fresh native-runtime query.

With an in-memory `level1` increase of 1 followed by `Menagerie.update`, both native-equivalent calculation and actual mission progress became `-4`. The fixture remained unchanged. These observations do not establish a mapper bug for this account state.

Native source traces `MegafleshOwned` to Bubba upgrade 8 (`idleon1.23.txt:243707-243712`) and displays its rewards (`:282924-282939`): the first Chromatic reward is at counter 12, after 11 earlier rewards. The inspected sources do not explain why the offset is 11. Counter 6 is not six Chromatic rewards.

No code or UI clamp changed or was approved. No fresh native-runtime extraction was performed for this diagnosis.
