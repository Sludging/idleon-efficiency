# Spelunking Part 3 UI plan

## Player outcome

Keep Spelunking's existing Tunnels and Journal & Pages views, filters, scroll position, and character context. Present owned Amber and only essential Elixir/Manic/Overstim/Trackometer state in the shared top summary. Keep detailed progress and effects behind existing-style information-icon tooltips. Provide one Shop data table and a dense Elixir card grid. Remove Tools, automatic tool use, and the entire Advanced view.

## Composition

- **Shared summary:** Make owned Amber the prominent primary value with its verified Amber icon. Show memorization slots and Elixir consumption reduction as readable numbers. Show Manic mode state, Overstim level, and Trackometer level as compact essentials. Use the Wiki-labeled `Overstim Meter` and `Stamina Trackometer` game images; do not claim these are the original meter-screen draw calls. Attach existing-style info-icon tooltips for nonessential saved progress and source-backed bonus detail. Do not reproduce the old Advanced panels in the summary.
- **Shop:** Reuse Sushi's actual `UpgradeTable`/Grommet `DataTable` composition (`components/world-7/sushi/sushiUpgrades.tsx`, `components/account/shared/UpgradeTable.tsx`), not a custom lookalike table. Keep feature-owned columns for upgrade identity, level/prerequisite state, and one effect description. Do not add a prerequisite column or a separate owned-bonus line. Show unlocked level alone for the `99,999` unlimited-cap sentinel. In a locked row, show only its prerequisite upgrade name in the level cell; never show level `0`. Render one source-bound intrinsic description in the effect cell, with owned/effective values substituted at their original positions. For indices 27/28, place visible adjacent info detail or visible column context explicitly labeling the displayed `1 in $` denominator as saved-account chance, excluding current-delve actor modifiers; retain the intrinsic description unchanged. At index 43 only, omit the exact source-bound numeric substring `1 in $ ` because source odds require current-character and Hole2 values absent from the account contract; retain the surrounding source wording as `there is a chance of making a Grand Discovery` and preserve final-object condition, 10 discoveries per tunnel, and each additional discovery being 2x rarer. Do not invent a replacement number or current-character selector. Keep existing locked-row filtering, show locked rows by default, and omit dynamic next prices.
- **Elixirs:** Use a dense twelve-card grid with the twelve Wiki-labeled game icons and original effect descriptions. Use Wiki's slot numbering, not invented elixir names. Show memorized state with a distinct border, color, and visible `Memorized` cue. Show the shared memorization-slot and consumption-reduction values only in the top summary. Do not show equipment-slot or duplicate-limit counts. Never display unresolved markers or export notation.
- **Navigation:** Keep Tunnels, Journal & Pages, Shop, and Elixirs as local views. Remove Tools, automatic tool use, and Advanced completely. Preserve existing Tunnels/Journal filtering and per-view scroll behavior.

## Source-backed display data

The original game source is available at `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.22.txt` (48,776,338 bytes). Runtime status returned HTTP 200 with `source: offline` and readiness fields true. `GET /game-version` returned HTTP 404 because the local asset lacks that route; the documented `POST /exec` fallback `idleon.getGameVersion()` returned HTTP 200 with `{ "title": "Jelly_Operator", "version": "1.22" }`. `idleon.findFunction("Spelunk")` resolved exactly to `ActorEvents_579`.

### Elixir descriptions

The v1.22 Elixir UI caller at source lines 277122–127 reads `CustomLists.Spelunky[16][index]` and replaces `{` with `ElixirEffectQTY(index)`. The helper at line 241659 returns `CustomLists.Spelunky[17][index]`. A read-only offline call to the original `ActorEvents_579._customBlock_Spelunk("ElixirEffectQTY", index, 0)` returned:

| Repo index | Wiki slot | Effect quantity | Verified token display |
|---:|---:|---:|---|
| 0 | 1 | 25 | `25%` stamina refund |
| 1 | 2 | 1 | No quantity marker |
| 2 | 3 | 30 | `30% Stamina` |
| 3 | 4 | 1 | `+1%` per 10 stamina used |
| 4 | 5 | 20 | `20% POW` lost per descent |
| 5 | 6 | 60 | `60%` chance |
| 6 | 7 | 25 | `+25%` chance |
| 7 | 8 | 30 | `+30%` higher chance |
| 8 | 9 | 1 | No quantity marker |
| 9 | 10 | 1 | No quantity marker |
| 10 | 11 | 1 | No quantity marker |
| 11 | 12 | 0 | No quantity marker |

The original caller replaces `{` with the indexed quantity and leaves literal `%` and `@` in place; `%` supplies the unit and `@` separates lines. The human authorizes one handwritten, index-aligned quantity table owned by the Elixir domain: `[25, 1, 30, 1, 20, 60, 25, 30, 1, 1, 1, 0]`. Resolve each existing repo description by substituting its indexed value, without changing intrinsic wording or creating descriptions. Do not modify generated data, run WikiBot, or add quantity/unit/condition schema. These twelve source values are the only new handwritten static-value exception.

### Shop descriptions and saved values

The original Shop UI caller at source lines 276800–876 establishes marker bindings and branch conditions. `ShopUpgBonus(index, 1)` returns `SpelunkUpg[index][4] × max(0, Spelunk[5][index])` (lines 241559–560). `{` uses this owned value; `}` formats `1 + owned/100`. `^` is branch-specific: it sums saved Spelunk levels for upgrades 2/9, calculated discovery totals for 3, all players' saved Spelunking skill levels for 8, discovered-object count for 1/10, and Manic-depth count for 54–56. `$` binds to stamina regeneration at 5, Overstim per-level bonus at 6, saved/next-level upgrade values at 19/21/25, reciprocal drop chance at 27/28, best tool name at 40, and `ShopUpgBonus(index, 0)` otherwise. The caller also calculates actor-local `AmberGain` for index 7, but that description has no `$` marker; do not expose it. The account-only UI omits the current-character chance substring at index 43 only; it retains the source description's static chance wording and per-tunnel rarity. `#` binds to saved drop-depth counters at 27/28 and the best tool's power at 40. `~` is upgrade 7's `ShopUpgBonus(7, 0)` rounded down to one decimal. `@` separates lines.

Read-only source/runtime examples distinguish values already represented by the domain from values that need their source-bound output:

| Upgrade | Saved state | Original v1.22 value | Existing domain coverage |
|---|---:|---:|---|
| `Learning the POW` (index 0) | Level 175; base bonus +175 POW | `ShopUpgBonus(0, 0) = 453250`; description uses `+175` and `+453,250` | `Upgrade.getBonus()` covers +175. The all-player total +453,250 is not exposed by that property; derive it from the original caller's all-player skill-level input before production display. |
| `Big Time Stamina` (index 4) | Level 50/50 | Owned and description value 50 | `Upgrade.getBonus()` covers +50. |
| `Overstim` (upgrade 6) | Saved upgrade bonus 167 | `OverstimBonus_PerLV = 197` | `SpelunkingOverstim.bonusPerLevel` covers 30 + upgrade bonus. |
| `Manic POW` (index 54) | Level 17; Manic depths sum to 73 | Owned +17%; effective +79.05% | `getEffectiveBonus(73, trackometerLevel)` covers `17 × (1 + 5 × 73/100)`. |
| Trackometer upgrades 59–61 | Saved Trackometer level 8 | Effective values scale by level | `Upgrade.getEffectiveBonus()` covers Trackometer scaling. |

Static Elixir quantities are indexed game data; Shop tokens are account-derived. For example, Elixir 1 says `25%` stamina refund and Elixir 3 says `30% Stamina` regeneration. `Learning the POW` level 175 has owned `+175 POW`, while its source-rendered effective total is the sum of all players' Spelunking skill levels. Preserve both Shop values in their original description positions. The quantity table is a narrow human-authorized exception to the no-copied-static-values rule; it grants no broader permission.
### Shop description rendering

Bind the existing `SpelunkingUpgradeRepo.description` for each of all 68 upgrades in the UI. Keep its original wording, literal units, punctuation, and marker positions. Apply only the substitutions used by the v1.22 Shop caller; do not add an `Owned bonus` line, parse effect meaning from prose, append units, or show export markers. Keep the branch mapping explicit in the Shop renderer. Do not introduce a general description schema, generic marker engine, or fallback text for an unknown marker.

| Caller marker | Source-bound value |
|---|---|
| `@` | Render caller's line separator as a line break; never display `@`. |
| `{` | `Upgrade.getBonus()` for that row, formatted with comma notation. |
| `}` | `1 + Upgrade.getBonus() / 100`, using the game's multiplier notation and removing its internal `#` marker. |
| `^` at indices 1 and 10 | Length of saved discovered-object list `Spelunk[6]`. |
| `^` at indices 2 and 9 | Rounded sum of saved tunnel best depths `Spelunk[1]`. |
| `^` at index 3 | Rounded sum of `ceil(getLOG(biggestHaul))` for tunnel records `Spelunk[2]`. |
| `^` at index 8 | Sum of `max(0, each player's Spelunking skill level)`. |
| `^` at indices 54–56 | Rounded sum of saved Manic depths `Spelunk[47]`. |
| `$` at indices 0 and 8 | Source mode-0 bonus: owned bonus multiplied by all-player skill-level total for index 0, and by `1 + skill total / 100` for index 8. |
| `$` at indices 1, 2, 3, 9, and 10 | Source mode-0 bonus: owned bonus scaled by discovery count, summed best depths, or biggest-haul digit total as specified in the backend plan. |
| `$` at index 5 | Stamina regeneration rate rounded to one decimal. |
| `$` at index 6 | `SpelunkingOverstim.bonusPerLevel`, rounded to an integer. |
| `$` and `~` at index 7 | No `$` appears in this row's existing description. `~` is source mode-0 bonus (`15 + owned / (250 + owned) × 45`), floored to one decimal. Do not compute or display actor-local `AmberGain` for this row. |
| `$` at index 19 | Source mode-0 bonus `max(10, 50 - owned)`, rounded to an integer. |
| `$` at index 21 | `Spelunking.deepPocketsMultiplier` (`1 + 7 × owned bonus / 100`), using multiplier notation without `#`. |
| `$` at index 25 | `1 + owned bonus`, rounded to an integer. |
| `$` at index 38 | Source mode-0 bonus `20 + owned`. |
| `$` and `#` at indices 27 and 28 | `$` is the displayed reciprocal denominator, not probability. Original helper probability is `(1 + owned bonus / 100) / (base × factor^savedDepth)`; display its reciprocal `base × factor^savedDepth / (1 + owned bonus / 100)`: Exalt uses base 60/factor 8; Prisma uses base 100/factor 1.5. `savedDepth` is the account's respective saved drop-depth counter; the source exponent also adds actor-local `_GENINFO[88]/[89]`, which account-only output omits. `#` is that corresponding saved “found so far” counter, rounded to an integer. Show nearby context stating “Saved-account chance; current-delve modifiers excluded.” Source comparisons with session addend zero: Exalt depth 1/owned bonus 100% gives `1/240`, rendered `1 in 240`; Prisma depth 2/owned bonus 50% gives `1/150`, rendered `1 in 150`. Do not claim current-run chance parity.
| `$` and `#` at index 40 | Best unlocked tool name in `$`; its source tool-power value in `#`. |
| Index 43 chance text | Omit only source substring `1 in $ `; preserve its source wording as `there is a chance of making a Grand Discovery`, final-object condition, and per-tunnel 10-use / 2x-rarity details. Original numeric chance is current-character-dependent and requires a Hole2 producer unavailable in account data; do not show a guessed, neutral, or current-character value. |
| `$` at indices 44–46 | Owned bonus multiplied by Grand Discovery total. |
| `$` at indices 54–56 | Owned bonus multiplied by `1 + 5 × Manic depth / 100`. |
| `$` at indices 59–61 | Owned bonus multiplied by Trackometer level. |
| Other `$` markers | `Spelunking.getUpgradeBonus(index)`, formatted with comma notation. |

The source also replaces the whole description when saved level is `-1` with its locked-bonus message. Preserve this source-owned lock branch only for that sentinel; never use it as a fallback for an unmapped marker. Keep the selected UI's level-cell rule separate: locked rows show only their prerequisite name there, with no level `0`.

`Upgrade.getBonus()` supplies owned values; `Upgrade.sourceBonus`, `Upgrade.getEffectiveBonus()`, and `Spelunking.getEffectiveUpgradeBonus()` supply source mode-0, Manic, and Trackometer values. Existing `Spelunking.deepPocketsMultiplier`, `getTotalDiscoveries()`, `manic.totalDepth`, `hourlyRecharge`, `overstim.bonusPerLevel`, and each tunnel's `bestDepth` and `biggestHaul` supply source inputs. The backend prepares named source-derived account values, including all-player skill total, source-scaled bonuses, saved-account drop chances, and best tool output. Index 43's numeric chance is excluded as a current-character result, not a missing static-data API. Reuse producer APIs; never use observed account constants or calculate game values in the UI.

Prepare these values after Player skills, tunnels, Manic, Trackometer, and discoveries finish updating, before Shop display data is consumed. Keep parse free of cross-domain reads. Compare each prepared value independently with its original v1.22 helper and caller branch, including repeated account processing. The retained intrinsic index-43 description is not exact game-rendered text because its live numeric substring is intentionally omitted.

Once `SpelunkingElixirs` exposes resolved existing descriptions, check the revised actual route with a normal account save. Compare all 68 Shop rows with the corresponding source strings and caller branches. Confirm literal units remain intact, values occupy original marker positions, and no unresolved/export markers or separate owned-bonus lines appear. Verify the `-1` lock branch. Inspect the revised summary, Shop table, twelve Elixir cards, and summary/detail tooltips. Compare layout with the corrected preview and retain screenshots plus runtime errors.

## Verified game artwork

The Wiki's [Spelunking page](https://idleon.wiki/wiki/Spelunking) is revision 104206, modified 2026-10-13. Its rendered Elixir rows place each CDN image beside the matching effect description. These descriptions match the indexed repo records in order, establishing indices 0–11 to Wiki slots 1–12 without inventing item names. All twelve original CDN images returned HTTP 200 as `image/png` and were visually inspected:

| Repo index | Wiki slot | Verified CDN image |
|---:|---:|---|
| 0 | 1 | [Elixir 1](https://idleon.wiki/images/4/48/Spelunking_Elixir_1.png) |
| 1 | 2 | [Elixir 2](https://idleon.wiki/images/9/90/Spelunking_Elixir_2.png) |
| 2 | 3 | [Elixir 3](https://idleon.wiki/images/6/65/Spelunking_Elixir_3.png) |
| 3 | 4 | [Elixir 4](https://idleon.wiki/images/6/6d/Spelunking_Elixir_4.png) |
| 4 | 5 | [Elixir 5](https://idleon.wiki/images/c/cf/Spelunking_Elixir_5.png) |
| 5 | 6 | [Elixir 6](https://idleon.wiki/images/8/81/Spelunking_Elixir_6.png) |
| 6 | 7 | [Elixir 7](https://idleon.wiki/images/f/f8/Spelunking_Elixir_7.png) |
| 7 | 8 | [Elixir 8](https://idleon.wiki/images/6/68/Spelunking_Elixir_8.png) |
| 8 | 9 | [Elixir 9](https://idleon.wiki/images/a/a6/Spelunking_Elixir_9.png) |
| 9 | 10 | [Elixir 10](https://idleon.wiki/images/e/e3/Spelunking_Elixir_10.png) |
| 10 | 11 | [Elixir 11](https://idleon.wiki/images/4/42/Spelunking_Elixir_11.png) |
| 11 | 12 | [Elixir 12](https://idleon.wiki/images/b/b9/Spelunking_Elixir_12.png) |

The same Wiki Shop rows label [SpelunkingShop7.png](https://idleon.wiki/images/4/49/SpelunkingShop7.png) `Overstim Meter` and [SpelunkingShop60.png](https://idleon.wiki/images/a/ab/SpelunkingShop60.png) `Stamina Trackometer`. Both CDN images returned HTTP 200 and were visually inspected. Use these labeled game icons in the summary; they are the Shop illustrations, not a claim about the original meter-screen draw calls. The summary needs recognizable game artwork, not an unverified draw-call identity.

## Preview and verification

The corrected disposable browser preview uses source-backed Shop values and actual CDN artwork. It renders one intrinsic description per effect cell, with owned/effective values in their original positions and no separate owned-bonus text. It retains the three-column Sushi-style table, unlimited `175`, finite `50 / 50`, locked `Amber-Track` level cell, filtering, summary, and complete Elixir grid. These are representative source values, not resolved generated Elixir export descriptions or production integration.

- [Corrected summary and Shop](../../.ui-verification/runs/2026-10-16T03-15-18-019Z-35111/summary-shop.png)
- [Corrected summary tooltip](../../.ui-verification/runs/2026-10-16T03-15-18-019Z-35111/summary-tooltip.png)
- [Corrected twelve-card Elixir grid](../../.ui-verification/runs/2026-10-16T03-15-18-019Z-35111/elixirs-grid.png)
- [Corrected scenario source](../../.ui-verification/runs/2026-10-16T03-09-58-435Z-20534/scenario.cjs.source)

No production change, generated-data edit, WikiBot run, test, build, lint, formatter, or commit is authorized.
