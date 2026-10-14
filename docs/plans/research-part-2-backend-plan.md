# Research Part 2: backend delivery plan

**Outcome:** Players understand current Points, every real Grid upgrade, Research-owned linked unlocks, and actual Shape coverage and effects.

**Scope:** [Part 2 — #463](https://github.com/Sludging/idleon-efficiency/issues/463), under [Research — #461](https://github.com/Sludging/idleon-efficiency/issues/461). The [specification](research-spec-draft.md) and [approved delivery outcomes](research-delivery-parts-draft.md#2-grid-upgrades-points-and-shapes) define acceptance. The [current handoff](research-research-brief.md#current-handoff) holds approval state, execution authority, blockers, and evidence limits.

## Outcomes and public information

| Outcome | Backend information for the read-only UI |
|---|---|
| Point balance | Earned, spent, and available Points. Keep level, cumulative ten-level rewards, and supported outside contributions beside the balance. Each purchased rank costs one Point; no distant-target cost or purchase simulation is needed. |
| Complete Grid catalogue | All 60 real upgrades in game order, with static names and effect descriptions. Exclude 180 placeholder positions from the catalogue, while retaining indexed access for existing calculations. Names and effect text support search; the backend does not hide locked entries. |
| Current upgrades | Purchased level, static cap, current primary and relevant secondary effects, active Shape modifier, shared Grid modifier, reachability, and additional prerequisites. Keep these facts separate from effective linked unlocks. |
| Linked unlocks | Research-owned grant state and conditions, using only required external inputs. Include Eclectic Sigils, Masterius Cookerius, Revival of the Undead Battalion, crown scaling, Glimbo scaling, Masterclass Research, and Divine Design. |
| Shapes | All ten static definitions, ownership and supported sources, cap ten, actual saved positions and rotations, and rotation requirement at Research level 90. Keep milestone illustrations separate from actual ownership. |
| Effective coverage | Upgrades covered by each saved active Shape and one active owner per square. Expose code-backed modifiers beside affected upgrades. Overlap does not add multiple Shape bonuses. |

This part supplies flat catalogue and Shape information, not a spatial board, gameplay actions, recommendations, forecasts, or related activity panels.

## Responsibilities

Extend the existing [Research domain](../../data/domain/world-7/research.tsx). Keep `getBonusForId` and its existing callers.

- **ResearchGrid:** Own Point totals, the real-upgrade catalogue, account-level requirements, shared modifiers, and links between upgrades and Shapes. Reuse the established account Research-level selection.
- **ResearchGridBonus:** Own purchased state, cap, effect values, reachability inputs, prerequisite state, and static-description substitution. Preserve current specialized classes for distinct bonus rules. Do not create a class per upgrade.
- **ResearchShape:** Wrap each generated Shape definition. Own saved position, rotation, ownership, active covered-upgrade references, and its numeric modifier. Derive effective coverage from saved square ownership, not a new polygon hit-test.
- **External owners:** Gaming owns reclaimed crowns. Glimbo owns its aggregate saved trade count; add a minimal Glimbo domain object because no existing trade-total owner was found. Tasks, Sailing, Spelunking, Rift, companions, Sushi, Jelly, and Equinox retain their inputs and calculations. Research consumes narrow public values, not their raw save arrays or progression panels.
- **Contributor records:** Reuse Research's existing named value records. Build totals and contributor values from the same inputs. Expose separate additive values, multipliers, caps, and conditions. Use static identities and descriptions for source text.

Applicable [backend patterns](../agents/backend-patterns.md): repository-backed wrappers from Friends and Cooking; shared and exceptional behavior from Lab; named saved relationships from Sushi; producer preparation from Worship Totalizer. These aspects fit the existing Research classes. No new framework, endpoint, persistence layer, or calculation engine is needed.

## Required data and rules

### Static data and descriptions

Reuse [ResearchGridBonusRepo](../../data/domain/data/ResearchGridBonusRepo.ts), [ResearchShapeRepo](../../data/domain/data/ResearchShapeRepo.ts), [ResearchMetadataRepo](../../data/domain/data/ResearchMetadataRepo.ts), and [ResearchPostyNoteRepo](../../data/domain/data/ResearchPostyNoteRepo.ts). Use existing producer metadata for contributor identities.

The Grid repository contains 240 indexed positions. The game excludes entries named `Name`; 60 entries remain. Preserve all positions internally for numeric lookups and spending. Uninterpreted `x3` and `x4` fields are not needed by the inspected cap, bonus, or selection rules.

Expose descriptions from static data, except for the two Divine Design sentences below. Substitute verified numeric values into static templates; do not compose explanatory sentences or copy any other prose from game source into handwritten backend code. The game substitutes primary bonus, primary multiplier, secondary bonus, secondary multiplier, accumulated cost reduction, and purchased level. Keep the resulting numeric values available separately. Source: `../IdleonWikiBot/codefiles/idleon1.22.txt:285040–285057`.

**Divine Design description selection:** Its exported template remains `<. Also, +{% Drop Rate.` Keep exactly these two source-authored strings hardcoded beside Divine Design's owning `ResearchGridBonus` description-selection behavior:

| Source-backed condition | Exact replacement for `<` |
|---|---|
| King Doot companion helper 0 equals `1` | `Arctis_nods_in_approval..._all_Research_Grid_bonuses_are_1.05x_higher` |
| Otherwise | `You_are_now_permanently_linked_to_Arctis_on_all_characters.` |

Limit this replacement to Divine Design, Grid index 173. Use the companion owner's value corresponding to the source condition, not a character's selected Divinity god. Preserve the strings' underscores and punctuation through template substitution and use the existing description display formatting. Substitute the separately calculated Drop Rate into `{`. Keep text selection separate from the Arctis grant and conditional shared Grid multiplier calculations. Source: `../IdleonWikiBot/codefiles/idleon1.22.txt:285054–285057`.

Only these two sentences bypass static export. No WikiBot export is required for them. Other descriptions and static data retain their existing sources. This does not authorize formula changes, generated edits, a general conditional-description framework, or WikiBot work. The [handoff](research-research-brief.md#part-2-selected-text-clarification--2026-10-14) records the human's bounded exception.

Keep Cyan Hexagon and Maroon Triangle's existing static descriptions separate from calculated effects. Their descriptions mention Research EXP, but the current bonus path applies generic 20% and 25% modifiers. Do not generate rewritten descriptions or invent extra EXP production. Numeric current effects follow game code.

### Saved state

| Input | Translation at the owning boundary |
|---|---|
| `Research[0]` | Purchased levels for every indexed position. Keep the full list for spent-Point calculation. |
| `Research[1]` | Active Shape index for each square. Translate `-1` to no owner and retain identity, not only its percentage. |
| `Research[6][4i..4i+2]` | Shape image position `x`, `y`, and angle in degrees. Keep pixel coordinates distinct from Grid square coordinates. The fourth field is not needed by requested presentation. |
| Player Research skill copies | Reuse the current highest-level account context. Do not sum character levels or introduce a new EXP-copy policy. |
| `Research[11]` | Gaming's reclaimed crown records. Consume the owner result after parsing; remove Research's duplicate raw mapping. |
| `Research[12]` | Glimbo's per-trade counts. Its minimal owner parses and sums them; Research receives the total. |
| `TaskZZ2[6][3]` | Tasks owns world-7 Research Point merit index 51 and its purchased level. |
| `Sailing[3][37]` | Sailing owns artifact 37's status. Use its numeric status, not `Artifact.getBonus()`. |

Shape positions use the game image coordinates. The caller changes rotation in five-degree steps and displays the angle modulo 360. Source: `../IdleonWikiBot/codefiles/idleon1.22.txt:284524–284553,284925–284939,285111–285118`. An absent saved placement remains absent; ownership does not fabricate coordinates.

### Points and effects

The [Research helper](../game-snippets/research/ResearchStuff.1.22.js):220–241 defines Point arithmetic:

- Earned Points are the floored sum of account Research level, outside contributions, and cumulative ten-level rewards.
- Ten-level rewards use `floor(level / 10) × round(1 + level-60 reward + purchased Pts Every Ten level)`. Reuse Part 1's existing milestone rule instead of maintaining a second formula.
- Outside contributions are active companion 153's ten Points and level-two five Points, Sushi rewards 3/13, Jelly rewards 4/57, the world-7 Research Point merit, and artifact 37 status rounded and capped at ten.
- Spent Points follow the game's running rounded sum of all purchased ranks. Available Points are rounded earned minus spent. Do not clamp away a discrepancy.

Ordinary Grid effects use static bonus per level, purchased level, one active Shape factor, and the shared Grid multiplier. Preserve primary and secondary values where the static description or a linked condition uses both. Special rules include Smart Eye's cap, crown-scaled bonuses, total Insight levels, found Observations, saved cumulative reductions, and complete 100-trade Glimbo blocks. Shared modifiers retain the existing companion, conditional Divine Design/Doot, Equinox, and Sushi inputs. Source: helper:242–274.

Reachability uses the twenty-column Grid, owned orthogonal neighbors, existing purchases, and the game's central starting positions. It does not use the eight-column Observation board. Keep reachability separate from Point affordability, cap, and linked prerequisites. Source: helper:318–330.

### Linked conditions and owner inputs

| Research effect | Required condition and boundary |
|---|---|
| Eclectic Sigils | Research grant plus Lore Boss 7. The helper checks Spelunking Lore index 6, Mister Jazzie; Shape ownership separately checks index 7, Bah Dazzul. Consume matching tunnel identities, not array positions or the displayed boss number as an index. |
| Masterius Cookerius | Keep its Research effect and unchanged static Rift 61 description separate from Cooking Mastery's actual unlock. Derive effective unlocked state from game code, not description text. Current source unlocks mastery when raw Rift progress exceeds 58 or active companion 87 exceeds 0.1. Cooking owns this predicate; no current public getter exists. A narrow getter can consume Rift and companion owners without adding mastery progression. Do not impose an additional hard Rift 61 gate. |
| Revival of the Undead Battalion | Purchasing the upgrade grants the conditional boat effect. A boat qualifies at combined loot and speed upgrade level 400. Sailing owns that per-boat condition; Research needs only the condition summary, not boat progression. |
| Crown upgrades | Consume Gaming's reclaimed crown count. Early Research needs the parsed count, not the later Gaming update that itself consumes Research. |
| Glimbo Insider Trading Secrets | Consume Glimbo's total trades and apply complete 100-trade blocks. Keep the trade catalogue and trade actions outside this part. |
| Masterclass Research | Retain current daily and accumulated reductions for Deathbringer, Windwalker, and Arcane Cultist. Do not apply or imply the reduction for Royal Guardian. |
| Divine Design | Keep Drop Rate, the Arctis grant, and the conditional Doot contribution distinct. The source grants Arctis through the effective Grid bonus and adds up to five percentage points to the shared Grid multiplier through purchased level and Doot. Do not multiply every bonus by an unconditional 1.05. |

Source references: Research helper:249–274,331–347; [Sailing](../game-snippets/sailing/Sailing.1.22.js):9–26,249–261; [Divinity](../game-snippets/divinity/Divinity.1.22.js):73–82,125–133; [Spelunking](../game-snippets/spelunking/Spelunk.1.22.js), `DoWeHaveLoreN1`; static upgrade descriptions. Related activities continue to own their full bonus calculations.

## Integration

Use the existing init → parse → calculate pipeline in [idleonData.tsx](../../data/domain/idleonData.tsx).

1. **Init:** Reuse indexed bonus wrappers and initialize Shape wrappers from current exports. Register the minimal Glimbo trade-total owner through the normal domain flow.
2. **Parse:** Replace named levels, active-owner references, and saved Shape placements. Each external owner parses its own declared save inputs. Parsing performs no cross-domain reads or derived bonus calculations.
3. **Early calculation:** Preserve `researchGrid` before Farming, Gaming, and other numerical consumers. Prepare its crown and Glimbo inputs from parsed owners before existing bonus calculations. Preserve the current shared multiplier and specialized effects.
4. **Late presentation calculation:** Extend the existing late Research preparation with Point balance and contributors, real catalogue requirements, and Shape ownership/coverage results. Consume settled producers and reuse current Part 1 ownership results. Do not rerun the pipeline or move early Grid behind its consumers.

Repeated preparation replaces totals and relationships instead of stacking them. Required initialized domains use direct access. Only genuinely absent saved fields or placements need missing-data handling. Existing Part 1 behavior and numerical consumers remain unchanged unless a scoped, evidenced defect requires a separate decision.

## Prerequisites and verification

Delivery needs original-game comparisons paired with the retained real save. Divine Design's two local source-authored sentences remove the external text-export prerequisite without reducing any of the six outcomes. Cooking Mastery's effective unlocked state follows the source predicate while its static description remains unchanged. Other available metadata and stable source-backed rules need no automatic export. Generated directories remain read-only.

Raw Rift progress is not its displayed number. `Rift.level` retains `Rift[0]`; the game displays `round(Rift[0] + 1)`. Its Cooking Mastery predicate uses `Rift[0] > 58`, so raw progress 59 displays Rift 60 and already satisfies that branch. Companion 87 supplies a separate bypass. Source: `../IdleonWikiBot/codefiles/idleon1.22.txt:195140–195146,238384,209216–209217`; [Rift parsing](../../data/domain/world-4/rift.tsx):433–444. This is not a proven Rift 61 hard gate. Retain exported prose unchanged; effective state must not be inferred from that prose.

Follow [domain testing guidance](../TESTING_IMPLEMENTATION.md) and the [extraction helper guide](../../tests/helpers/README.md). Reuse the save loader and existing extraction harness.

- Extend Grid core and direct-parameter tests. Compare populated public effects for all 60 catalogue entries, relevant secondary rules, shared modifiers, and observed linked conditions with original-game values. Include every directly used calculated parameter; do not retest a passing producer's internal formulas.
- Add Point core and parameter comparisons for earned/spent/available results and every calculated outside contribution. Check artifact status conversion, merit index 51, cumulative milestones, and running spending rounding against the same save.
- Compare Shape ownership, real saved placements/rotations, per-square owner, and reverse effective coverage. Cover all ten definitions documentarily and the Shapes actually present in the real save numerically. Do not claim geometric overlap or all-source obtainability proof.
- Check the complete catalogue, placeholder exclusion, static-template substitutions, separate prerequisites, orthogonal row boundaries, and repeat preparation. Record which boundaries the real save observes. Do not synthesize saves or expected game values.
- Check Divine Design's two exact replacement strings and source-backed King Doot selection. Keep Drop Rate substitution, Arctis grant, and shared Grid multiplier checks separate. Record any branch not observed in the real save; do not claim both runtime branches from documentary checks.
- Keep configured matcher tolerance `0` and the shared baseline. Reuse Research Grid and Spelunking core/parameter patterns. Run affected Research and consumer regressions, TypeScript, and scoped lint once after integration under the execution phase's authority.
- Later UI delivery compares rendered Points, all upgrades, search by name/effect, all Shape definitions, ownership, actual coverage, contributors, and requirements with populated backend state. All entries remain visible by default. Verify read-only behavior and any approved optional filter then; no UI layout is decided here.

Historical selected Grid tests and warmed offline outputs do not establish complete Part 2 parity. Report paired state, observed branches, unresolved coverage, and connected-version limits separately from passing comparisons.
