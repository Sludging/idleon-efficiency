# Menagerie mission backend coverage audit

**Scope:** Matching v1.23 `Luminous_Menagerie` native mission inputs, catalog labels, and IE parse/calculation state for IDs 0–32. This is a source comparison, not numerical parity validation.

## Source and classification

Native `MissionProg` dispatch: `../IdleonWikiBot/codefiles/idleon1.23.txt:118907-118980`. Labels and thresholds: `data/domain/data/MenagerieMissionRepo.ts:7-241`. IE references below point to inspected domain implementations; detailed background and related candidates are in the [backend map](menagerie-mission-backend-map.md).

- **C:** IE already computes the corresponding metric; native numerical equivalence still needs paired validation.
- **C5:** Related calculation exists but has a known semantic mismatch; it is not an equivalent mission input.
- **R:** Saved/named input exists or native input is a small transform/aggregation; no new mechanic is needed, but the mission metric still needs an accessor/transform.
- **M:** A genuinely missing mechanic/calculation is confirmed.
- **U:** Source mapping or representation remains unresolved. A missing getter alone does not imply M.

| ID | Catalog label | Native expression | IE mapping and evidence | Class |
|---:|---|---|---|:---:|
| 0 | Account LV | `AccountLV` | `Tome.totalAccountLevel`, sum of player levels (`data/domain/world-4/tome.tsx:496-497,697-699`) | C |
| 1 | Sneaking Mastery | `OptLacc[232]` | Raw account option; add named parse/accessor if no owner field exists | R |
| 2 | Total Depths, including Manic | `AllDepthTOT` | `Spelunking.bestDepthTotal` plus `Spelunking.manic.totalDepth` (`data/domain/world-7/spelunking.tsx:678-680,1074-1093`); native-compatible sum/rounding needs parity | R |
| 3 | Crops Discovered | `round(mapCount(FarmCrop))` | Farming crop state and discovered-key count (`data/domain/world-6/farming.tsx:645-660`); key semantics and round need parity | R |
| 4 | Victories | `OptLacc[319]` | Raw account option; add named parse/accessor if no owner field exists | R |
| 5 | Best Waves | `TotalMSAwaves` | `Tome.totalBestWorshipWaves`, sum of totem max waves (`data/domain/world-4/tome.tsx:520-521,828-830`) | C |
| 6 | God Ranks | `round(Divinity[25] - 10)` | Divinity source state is consumed (`data/domain/world-3/construction/atomCollider.tsx:169-173`); index and offset are a small named transform | R |
| 7 | Turkey Meal LVs | `Meals[0][0]` | Cooking/Tome aggregate exists, but mission needs the specific Turkey meal (`data/domain/world-4/tome.tsx:561-563`); use meal domain record | R |
| 8 | Worker Class | `OptLacc[464]` | Raw account option; add named parse/accessor if no owner field exists | R |
| 9 | Minehead wins | `Research[7][4]` | Research grid parsed (`data/domain/world-7/research.tsx:938-949`); map exact cell to its named value | R |
| 10 | Sushi Types Cooked | `UniqueSushi` | `Sushi.uniqueSushi` counts unlocked entries (`data/domain/world-7/sushi.tsx:206-210,304-305`) | C |
| 11 | Successful Operations | `Research[7][9]` | Research grid parsed (`data/domain/world-7/research.tsx:938-949`); map exact cell to its named value | R |
| 12 | Opals Earned | `TotalOpalsEarned` | `Hole.opalLedger.earned` tracks cavern and external lifetime earnings, separate from balance (`data/domain/world-5/hole/hole.tsx:1617-1626,1855-1876`) | C |
| 13 | Glimbo Trades | `GlimboTotalTrades` | Glimbo trade counts parsed; Research consumes `glimbo.totalTrades` (`data/domain/world-7/glimbo.tsx:18-20`; `research.tsx:1293-1296`); confirm native aggregation | R |
| 14 | Button Presses | `OptLacc[594]` | Tome reads `optionListAccount[594]` (`data/domain/world-4/tome.tsx:1150-1153`); semantic comment remains TODO | R |
| 15 | Farming Stickers | `TotalStickers` | Farming computes and exposes total sticker count (`data/domain/world-6/farming.tsx:675-677,755-757`) | C |
| 16 | Tome Score | `PixelHelperActor[4].ActorEvents_229._GenInfo[84]` | Native Tome actor derives account total from `DNSM.TomeQTYtot` or sums `TomePTS(i)` across `TomeQTY` (`idleon1.23.txt:131097-131110`). IE `Tome.getHighestScore()` sums Tome line player scores and picks maximum (`data/domain/world-4/tome.tsx:359-374`); current paired value differs. See focused evidence below. | C* |
| 17 | Rat King Crowns | `Research[11].length` | Gaming maps array length to `reclaimedCrownCount` (`data/domain/world-5/gaming.tsx:90-91`) | C |
| 18 | Artifact Findings | `TotalArtifactsFound` | Native sums `max(0, asNumber(Sailing[3][i]))` over all artifact-status entries, then rounds (`idleon1.23.txt:240328-240334`). IE parses `Sailing[3]` into each artifact's status (`data/domain/world-5/sailing/sailing.tsx:355-373`); Tome's weighted artifact-status progression is not equivalent (`data/domain/world-4/tome.tsx:576-585,922-924`). | R |
| 19 | Slab Items | `Cards[1].length` | Card state is represented as `Card[]`; Tome iterates card state (`data/domain/cards.tsx`; `data/domain/world-4/tome.tsx:490-492`); count matching collection | R |
| 20 | Copper Sample Digits | Copper sample: `ceil(getLOG(sample))`, else 0 | Printer owns sample state; exact Copper sample/log transform not established (`data/domain/world-3/construction/printer.tsx`) | R |
| 21 | Greenstacks | `round(GreenStacks.length)` | Tome's `optionListAccount[224]` is a maximum, not distinct Greenstack count (`data/domain/world-4/tome.tsx:855-857`); use inventory/Slab state | R |
| 22 | Emperor Showdown | `OptLacc[369]` | Emperor parser reads the option list (`data/domain/world-6/emperor.tsx:50-60`); raw input needs named mapping | R |
| 23 | Cavern Layer Removals | `round(Holes[11][1]+[3]+[5]+[7])` | Hole owns parsed data; sum named layer/removal fields from those indices | R |
| 24 | Gaming Bits owned | `floor(getLOG(Gaming[0]))` | Gaming owns `bits` (`data/domain/world-5/gaming.tsx:21-22`); mission applies a small log/floor transform | R |
| 25 | Fractal Megafeathers | `round(OptLacc[262] - 9)` | Orion parses this option as `ownedMegafeathers` (`data/domain/world-1/orion.tsx:74-84`); apply native offset/round | R |
| 26 | Eclectic Megafish | `round(OptLacc[279] - 11)` | Poppy parses option as `ownedMegafishes` (`data/domain/world-2/poppy.tsx:112-120`); apply native offset/round | R |
| 27 | Chromatic Megaflesh | `round(Bubba[1][8] - 11)` | Bubba parses nested save and computes `ownedMegaflesh` (`data/domain/world-3/bubba.tsx:132-166`); verify raw level identity before offset | R |
| 28 | Palette LVs | `round(TotalPaletteLV)` | `Gaming.palette.totalLevels` sums palette color levels (`data/domain/world-5/gaming/palette.ts:247-249`) | C |
| 29 | Summoning Boss Kills | `round(SumStoneBossTOT)` | Summoning parses stone-boss victories; Tome sums them (`data/domain/world-6/summoning.tsx:412-413,501-503`; `data/domain/world-4/tome.tsx:622-623`) | C |
| 30 | Deathnote Boss PTS | `OverkillQTY(7)` | Native sums `DeathNoteRank(Ninja[105][i], 7842)` over `CustomLists.NinjaInfo[30].length` (`idleon1.23.txt:173001-173047`). The `7842` branch uses thresholds 100, 250, 1,000, 5,000, 25,000, 100,000, and 1,000,000, then rank 10 (`172898-172914`). `Ninja[105]` is saved, but IE `getTotalWorldRank()` aggregates all ordinary Deathnote mob ranks (`data/domain/world-3/construction/deathnote.tsx:179-193`); it is not equivalent. | R |
| 31 | Sigil LVs | `round(SigilLvTOT)` | Tome sums effective Sigil levels (`data/domain/world-4/tome.tsx:517-518,776-778`) | C |
| 32 | total Killroy Prime kills | `PrimeKillroyTOT` | Native helper sums numeric values of all `KRbest.h` entries except keys containing `"SummzTrz"`, then rounds (`idleon1.23.txt:240387-240391`). IE `world-2/killroy.tsx:27-40` currently parses option-derived Killroy bonuses, not this aggregate; inspected IE parser has no `KRbest` accessor. This is raw saved state plus bounded filter/sum/round transform, not a new game mechanic. Add raw-key parsing and named aggregation; parity remains unverified. | R |

## Focused evidence: mismatches 16, 18, and 30

All native citations below refer to matching v1.23 source at `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt`. Mission dispatch is `118907-118980`; its exact expressions are `118940-118945` and `118974-118975`.

### ID 16 — Tome Score

Native mission progress reads `PixelHelperActor[4]`, behavior `ActorEvents_229`, `_GenInfo[84]` (`118940-118942`). The Tome actor assigns that field from account-level total Tome points: if cached `DNSM.TomeQTYtot` exists, it uses that; otherwise it loops over `DNSM.TomeQTY`, sums `Summoning.TomePTS(i)`, then caches the total (`131097-131110`). The update path also sets that field from `_DummyNumber3`, either the same cached total or a sum of `TomePTS` over `TomeQTY` (`130796-130813`). This is account-level Tome Score, not a saved `TomeQTYtot` mission field.

IE `Tome.updateHighestScore` resets the maximum, iterates every character's score, and records the top one (`data/domain/world-4/tome.tsx:359-370`). `getPlayerTotalScore` sums IE Tome lines (`372-374`). Those semantics do not explain the paired fresh-server mismatch: native `44531`, IE `44042` (offline v1.23, server 3196, player 3 Sludgev4; supplied by caller, fixture aligned and unmodified). Therefore, **do not map ID 16 to the current IE getter as exact parity**. Smallest source-backed route is inspect/align IE's Tome point inputs and `TomePTS` per line, then use its account total only once parity matches; adding a synthetic actor-state parser is not supported because `_GenInfo[84]` is runtime-derived. Save-derived Tome line inputs are modeled in IE, but this evidence does not isolate which line causes the 489-point gap.
### Tome rows 122–123 — Menagerie

Matching v1.23 source assigns `DNSM.TomeQTY[122]` directly from `Menagerie[0][2]` (`../IdleonWikiBot/codefiles/idleon1.23.txt:130789-130791`). This is saved Menagerie array index `[0][2]`, the current Menagerie rank value. It does not transform or aggregate the value.

The next assignment computes row 123 by iterating `Menagerie[3].length` and adding `asNumber(Menagerie[3][r])` for every index from zero through length minus one (`130791-130796`). Thus row 123 is the unrounded, unclamped sum of every saved bonus-level entry in `Menagerie[3]`; source does not filter by bonus type or count only unlocked entries.

The Tome actor then totals Tome points by summing `TomePTS(r)` for each index in `DNSM.TomeQTY` (`130796-130800`, `131106-131110`); cached `DNSM.TomeQTYtot` bypasses recomputation. `TomePTS` is `ceil(TomePCT * CustomLists.Tome[index][3])` per brief/source mapping. Therefore each Menagerie input contributes a rounded-up weighted score, not its raw rank or level sum directly.

**Conclusion:** The candidate mapping matches exactly: row 122 consumes saved Menagerie rank `[0][2]`; row 123 consumes the sum of all saved bonus levels `[3][*]`. It is not merely an inference from Tome catalog labels. Static source identifies both producer inputs and aggregation; this research did not independently inspect save values or validate numerical output.


### ID 18 — Artifact Findings

Mission calls `Stuff2("TotalArtifactsFound",0,0)` (`118944-118946`). That helper initializes zero, loops through `Sailing[3]`, adds `max(0, asNumber(status))` for each entry, then returns `round(sum)` (`240328-240334`). The source does not weight higher artifact tiers more heavily: an artifact at status 1 or 6 contributes its numeric status, while nonpositive states contribute zero.

`Sailing` is account-level raw save input in IE (`data/domain/world-5/sailing/sailing.tsx:329-334`). The parser reads `sailingData[3]` and calls `Artifact.updateStatus` for each catalog artifact (`355-373`); artifact status values 1–6 become Obtained through Transcendent (`data/domain/world-5/sailing/artifacts.tsx:16-23,71-90`). Menagerie reads those parsed statuses, sums `max(0, status)`, and rounds. This uses the native unweighted count, not Tome's weighted progression. Paired native output is 227; the previous Tome reuse returned 0.

### ID 30 — Deathnote Boss PTS

Mission calls `WorkbenchStuff("OverkillQTY",7,0)` (`118974-118976`). `OverkillQTY` iterates the length of `CustomLists.NinjaInfo[30]`, reads `Ninja[105][index]`, and sums `DeathNoteRank(value,7842)` (`173001-173014`, `173016-173047`). The special `7842` branch maps kill totals below 100 to 0, below 250 to 1, below 1,000 to 2, below 5,000 to 3, below 25,000 to 4, below 100,000 to 5, below 1,000,000 to 7, and all remaining values to 10 (`172898-172914`). No round or additional boss-page filter occurs after that sum.

The `Ninja` save field is present in the canonical fixture (`tests/fixtures/saves/latest.json`, JSON key `Ninja`); extraction did not mutate it. Native `OverkillQTY(7)` iterates `CustomLists.NinjaInfo[30].length` and uses the same index for `Ninja[105]` (`173001-173014`). Menagerie translates that saved row at parse time with the source-backed `DeathNoteRank(...,7842)` thresholds, then uses the named total. It does not substitute `Deathnote.getTotalWorldRank()`. The paired native and IE results are 16; the ordinary Deathnote world-rank result was 2070.

### Evidence boundary

Runtime context: offline v1.23 server 3196, player 3 Sludgev4; canonical save matches fixture. No live server, save mutation, fixture refresh, or new runtime query was used. The public mission test now verifies IDs 18 and 30 against paired extracted values. ID 16's Tome mismatch remains unresolved.

ID 16 remains unresolved. IDs 18 and 30 are classified R because each uses a source-mapped transform over named parsed input.

## Coverage result and limits

- **C — existing corresponding calculation:** 9 IDs: 0, 5, 10, 12, 15, 17, 28, 29, and 31.
- **C* — corresponding/candidate calculation with observed mismatch:** 1 ID (16). Do not claim parity until the Tome-score gap is resolved.
- **R — raw state or bounded transform/aggregation:** 23 IDs, including ID 18's Sailing-status sum and ID 30's Ninja boss-rank sum.
- **M — confirmed missing mechanic/calculation:** 0 established.
- **U — unresolved representation:** 0. The native source input and corresponding save container are identified.

- Native expressions and catalog labels map all 33 IDs. Classes describe source coverage, not numerical parity. The focused paired test confirms ID 18's status sum and ID 30's boss-rank sum. ID 16 retains a measured 489-point gap. ID 32's source formula is resolved, but IE-versus-game equality is not established. A prior HTTP 500 was a tool request failure; local v1.23 source was readable and used here.

The focused mission-progress test verifies paired values for IDs 18 and 30. ID 16 still differs by 489 points. No save mutation, fixture refresh, full suite, build, lint, or formatter ran.
