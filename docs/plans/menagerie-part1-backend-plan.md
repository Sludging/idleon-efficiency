# Menagerie Part 1: backend delivery plan

**Scope:** Deliver trusted backend information for Part 1, “Understand Menagerie progression and Lumi” ([issue #467](https://github.com/Sludging/idleon-efficiency/issues/467)). This plan covers imported-account data and derived values only. It does not authorize implementation or Part 2 panel UI.

## Outcomes

- Keep the menu ungated; inspected v1.23 open paths show no rank or Research gate. Do not invent a locked state or separate availability flag.
- For all 33 missions, expose saved claims, the next unclaimed task threshold, and current account-stat progress separately. Derive Ready from availability and the current threshold only.
- Expose saved Shell total, displayed Shell threshold, saved Lumi rank, Lumi balance, and verified Lumi/hour as separate values. Shells at threshold indicate current-account rank readiness; never advance rank or consume Shells in IE.
- Expose one-time unlock ownership and all 25 repeatable bonus entries. Distinguish rank/unlock availability, current level/effect, valid next effect/cost, and affordability.
- Expose currently usable resources, not historical owned/spent totals as a substitute.
- Apply confirmed effects once to named, already-modeled recipients. Add no new recipient system.
- Expose only verified in-game text from static game data; do not compose mechanic descriptions.

## Responsibilities and input mapping

- **Menagerie domain:** Own named save state and public results through handwritten `MenagerieMission`, `MenagerieUnlock`, and `MenagerieBonus` concepts backed by the generated repositories. Each aspect owns its state, parsing/update boundary, and game-specific behavior: mission claims/progress/availability, unlock ownership/availability/cost, and bonus levels/effects/costs/resources. The parent coordinates aspects and exposes typed public results; it must not mutate every aspect in one large function. Avoid a UI-shaped aggregate DTO.
- **Mission inputs:** Use exact v1.23 native expressions and per-row IE representation in the [coverage inventory](../research/menagerie-mission-coverage.md). Reuse matching named calculations; otherwise read named values at the parse boundary or add a small domain-owned calculation. Do not retain raw save or index arrays in consumers. `AllDepthTOT` combines Spelunking `bestDepthTotal` and `manic.totalDepth`; crop discovery counts discovered crop keys; Tome Score uses `Tome.getHighestScore()`; Palette LVs use `Gaming.palette.totalLevels`. ID 32 translates `KRbest` keys at the boundary and sums numeric values except keys containing `SummzTrz`, then rounds. Other inputs are enumerated in the audit.
- **Static records:** Use generated mission, unlock, bonus, and currency repositories for source-backed records and text. Generated labels are not verified player-facing copy. Never modify generated directories.
- **Boundary translation:** Parse only saved fields in `Menagerie.parse` and the owned aspects' parse methods. Raw-key defaults make outer `Menagerie` and `FarmCrop` required; preserve defaults for optional nested save rows and slots. Translate save positions into named state there. No cross-domain reads or calculations in parse. Use direct access for initialized domain objects; guard only genuinely optional save fields. Do not retain raw save structures downstream.
- **Effect ownership:** Prepare Menagerie account inputs once, then let each existing recipient domain consume prepared values. Do not implement a generic recipient registry or structural unlock effects. Lumi calculation may read source-verified saved inputs from incoming systems without rebuilding their full features or UI; never substitute zero for an input that the imported account models.

## Mechanics established from v1.23 source

- Mission availability is `min(missionCatalogLength, round(1 + MenagerieBoost(0) + ResearchGridBonus(164,1) + NinjaEmporiumBonus(47,0) + 3 * ThingiesHaveBank(0))`. Source provides account-wide contributors, not a per-player list. `LilTownJellyUnlocked` always returns one, and both inspected menu-open paths show no rank or Research gate.
- Claiming an available mission increments its saved claim count and total Shells by one. `ShellEXPreq` caps the displayed threshold at 15. At threshold, the delayed Shell animation transition subtracts that threshold and increments Lumi rank. The website reports only imported Shells, threshold, and rank; it never simulates the transition or consumes Shells.
- Lumi/hour is zero at rank zero. At positive rank, start at 10 and multiply source factors in order: `1 + CoralKidUpgBonus(10)/100`; `1 + min(0.25, SuperBitType(69))`; `1 + ArcadeBonus(73)/100`; `1 + 10*Ninja.EmporiumBonus(47)/100`; `1 + MenagerieBoost(1)*rank/100`; `1 + Research.Grid_Bonus(165,0)/100`; `1 + Have_ban_k`; `1 + 2*Have_ban_l`; `1 + 2*Have_ban_m`; then `1 + additivePool/100`. `additivePool` is `PinkJellyBonus(0) + 25*ClamWorkBonus(8) + 10*PetArenaCrucBonus(0,4) + 25*PetArenaCrucBonus(0,14) + ConstBuildBONUSES(3,0) + AtomBonuses(16) + ZenithMarketBonus(11) + DancingCoralBonus(6) + AlchVials["7lumiadd"] + Research.Grid_Bonus(164,0) + min(5*CardLv("w7b10"),50)`. Keep Menagerie bonus 1 inside its own `1 + bonus*rank/100` factor, never in `additivePool`. Include source-verified saved inputs, including Crucible, without implementing unrelated structural features or defaulting a missing modeled factor to zero. The menu displays rate per hour; offline accrual is unverified.
- ID 32, `PrimeKillroyTOT`, sums numeric `KRbest.h` entries whose keys do not contain `SummzTrz`, then rounds. This is a bounded transform of saved state, not a new mechanic.
- ID 16 native actor-local input is labeled “Tome Score” in the generated mission catalog. IE already computes the account high score with `Tome.getHighestScore()`; match exact semantics and parity before reuse.
- ID 5 `BoostQTY(5)` adds to native building caps in `ExtraMaxLvAtom` when `t == 100`, alongside Construction Mastery and the existing Sushi/Dancing Coral terms. Native callers compare building levels against base `TowerInfo` caps plus this result. IE applies the prepared Menagerie quantity to its existing Shrine `Building.maxLvl`; source rounds the complete cap.

Native mechanic citations: matching v1.23 `idleon1.23.txt:118689-118742,118907-118980,172892-172894,191587-191592,240387-240391,297040-297064,297327-297336,297388-297399,297401-297430,297436-297451,435637-435639,457343-457344`; catalog labels `MenagerieMissionRepo.ts:7-241`. Full mapping and IE citations: [coverage inventory](../research/menagerie-mission-coverage.md).


## Integration and dependency order

The pipeline is manual in `data/domain/idleonData.tsx` (`postProcessingMap`, lines 268 onward). Preserve `init` → `parse` → ordered calculate:

1. **Init:** Initialize Menagerie from generated catalogs and create owned models once.
2. **Parse:** Parse only Menagerie save fields and mission inputs that are raw save data. Store named values, not raw arrays or option indexes.
3. **Prepare saved effects:** After parsing, Menagerie derives bonus levels/effects from its owned state and catalog. This preparation needs no cross-domain reads and must precede the earliest recipient update, `minehead` at `data/domain/idleonData.tsx:282`.
4. **Update existing recipients:** Extend only the named owning domains and their already-registered post-processing stages. The catalog IDs identify target responsibility; generated descriptions are not proof of formula parity or approved display copy.

| Bonus ID(s) | Existing recipient domain/output | Current post-processing stage |
|---:|---|---|
| 2 | Gaming Palette Black Star resource | `gaming` |
| 3 | Research experience | `researchGrid` |
| 4 | Cooking speed | `cooking` |
| 5 | Construction Shrine maximum levels | `construction` |
| 6 | Farming Exotic Market Organic Labels | `farmingLevel` |
| 7 | Summoning upgrade costs | `summoningWinnerBonus` |
| 8 | Minehead upgrade-doubler resource | `minehead` |
| 9 | Sailing treasure value | `sailing` |
| 10 | Sushi Station upgrade-doubler resource | `sushiStation` |
| 11 | Forge speed | `forge` |
| 12 | Jelly Operator upgrade-doubler resource | `jellyOperator` |
| 13 | Shiny Critter value | `updateAllShinies`, then `breeding` |
| 14 | No existing Summoning Essence gain output | None; display-only, no new receiver |
| 15 | Worship Slow Roast Wiz | `worship` |
| 16 | Orion first-upgrade cost | `updateOrionGlobalBonus` |
| 17 | Atom Collider maximum levels | `collider` |
| 18 | Poppy first-upgrade cost | `updatePoppyGlobalBonus` |
| 19 | No existing Farming Land Rank EXP gain output | None; display-only, no new receiver |
| 20 | Bubba first-upgrade cost | `updateBubba` |
| 21 | No existing Cooking Mastery EXP gain output | None; display-only, no new receiver |
| 22 | Spelunking POW | `spelunkingChapterBonuses` |
| 23 | No existing class-experience gain output | None; display-only, no new receiver |
| 24 | Character Drop Rate | `playerDropRates` |

This table records existing output targets, not promises that every catalog effect has a modeled recipient. IDs 14, 19, 21, and 23 remain display-only; no matching gain output exists, and no receiver was added. All 25 catalog bonus values remain visible.

5. **Calculate Menagerie snapshots:** Run after `construction` (`data/domain/idleonData.tsx:395`), the latest currently identified input for mission and Lumi calculations. Include every source-verified saved Lumi factor, including incoming Crucible/other systems, without rebuilding their unrelated features. Earlier mission sources include `researchGrid` (291), `gaming` (304), `tomeScore` (344), and `hole` (346). Compute account snapshots only after their exact inputs are ready; never default a missing modeled factor to zero.

Prepare Menagerie-owned bonus levels/effects before the earliest recipient update, `minehead` (282); calculate final mission/Lumi snapshots after their dependencies. Keep the order manual, use existing stages, and keep updates idempotent. Parse never reads another domain.


## Verification plan

- **Public seams:** A normal imported account exposes typed `MenagerieMission` progression through `Menagerie.getMissions()`; Menagerie exposes Shell/threshold/rank/Lumi summary, unlock and bonus states, and usable resources. Verify existing recipient outputs through their current public APIs. Keep these public seams; do not test only internal helpers or a UI-shaped DTO.
- **Game-derived expected values:** Before changing domain code, obtain matching v1.23 native outputs and pair them with the same real saved account. Record save/version/active-character provenance. Do not synthesize save permutations or infer expectations from implementation. Source formulas alone do not establish personalized parity.
- **TDD sequence:** Add a failing normal-account comparison at public seams before domain code. Add native-derived parameter comparisons for each distinct formula/input and relevant state boundaries, then implement the smallest slice. Compare direct inputs and outputs with tolerance zero unless source establishes a semantic difference. Never test catalog copies or pipeline wiring as substitutes for behavior.
- **Required cases:** All 33 native mission values and thresholds; account-dependent availability; claims versus progress; current Shell threshold/readiness versus saved rank, without simulating rank-up; Lumi rate with all modeled factors, Purple/Yellow inputs, and rank zero; unlock ownership/rank availability; bonus level/effect/next cost/affordability; spendable resource balance; each approved recipient output. Pair every assertion with a real save that exercises it.
- **Verification path:** Use existing extraction configurations and parameter/core test conventions in `docs/TESTING_IMPLEMENTATION.md` and `tests/helpers/README.md`. Obtain matching-version expected values before implementation; no fixture refresh without a human request. After domain tests, run the full account-processing pipeline smoke with the paired real save. Later UI work must exercise the actual route; this backend plan does not approve UI implementation.

## Evidence limits

- The [coverage inventory](../research/menagerie-mission-coverage.md) maps all 33 native expressions to inspected IE state/calculations: C 10, C* 1, R 22, M 0, U 0. These classes describe source coverage, not numerical parity. ID 18's artifact findings use a different aggregate than Tome and cannot reuse it.
- Inspected menu-open paths show no rank or Research access gate. Native Shell threshold triggers delayed rank-up and Shell subtraction; IE reports imported state only and never simulates that transition.
- ID 32 is a resolved raw-save transform over `KRbest`; add named parsing/aggregation, then validate parity. ID 12 maps to `Hole.opalLedger.earned`; ID 16's Tome score semantics still need paired output confirmation.
- Lumi's factor operation order is source-backed; required imported inputs must be modeled. Crucible/Singularity structural feature work remains out of scope. No missing fixed static definition is currently identified; do not substitute zero for an unmodeled factor.
- No paired personalized runtime parity, tests, or route evidence exists yet. Previous native runtime queries returned HTTP 500, but matching-version local source establishes formulas. Do not treat request failure as evidence that runtime data is inaccessible.

## Design references

Apply only these aspects: repository-backed static records with handwritten domain behavior; parse-boundary translation; prepared cross-domain inputs and manual dependency ordering; rerun-safe calculations. See `docs/agents/implementation-patterns.md`, `docs/agents/backend-patterns.md:24-52`, `docs/CODEBASE_OVERVIEW.md:32-52`, and `CODING_STANDARDS.md` (VOCAB-01, MODEL-01, PARSE-01, DATA-01).
