# Minehead game evidence

## Scope and provenance

This records research for sequential World 7 onboarding, not Emperor acceptance, correctness case #481, or implementation planning. Issue #481 explicitly limits its work to calculated outputs and excludes game actions, daily processing, and unrelated gameplay. Closed #390 accepted opponent bonuses and shop-upgrade calculations; it did not deliver a Minehead view or the daily game interface.

The current captured Minehead formula snippet is `docs/game-snippets/minehead/Minehead.1.23.js`, captured 2026-10-20 from `scripts.ActorEvents_579`, game 1.23 “Luminous_Menagerie”. Historical 1.21 and 1.20 snippets also exist; findings from them are version-bounded.

## Player-facing meaning

Player-facing name is **Mr. Minehead’s Depth Charge**. Wiki search returned secondary sources, not an Idleon Wiki page; results describe it as a World 7 tile-reveal minigame: clear sequential opponents, deal damage, avoid Depth Charges, and earn permanent opponent bonuses. Mine Currency buys shop upgrades. These summaries are not formula authority. Sources: [Idleon Toolbox Minehead upgrade wiki](https://idleontoolbox.com/wiki/minehead/upgrades), [Games Finder guide](https://gameslikefinder.com/article/idleon-minehead-guide/), [DigitalTQ Research guide](https://www.digitaltq.com/wiki/idleon/research-skill). No primary Wiki page was located in the search.

## Formula evidence (version 1.21 only)

All references below point to `docs/game-snippets/button/Minehead.1.21.js`.

- `UpgLvREQ` (lines 9-9) returns a Research-level requirement from upgrade index `t`: `1 + 3*t + floor(t/3) + floor(t/11)`.
- `UpgCost` (10-18) is next-level Mine Currency cost, derived from index, current upgrade discount, two Sushi reductions, server cost factor, and that upgrade's static cost multiplier raised to its current level. Formula order is multiplicative; Sushi reduction has a 0.1 floor. Current 1.23 cost behavior is unverified.
- `DailyTries` (19) is `round(3 + Research bonus 147)`; player-facing description “daily tries” is supported by its name and secondary sources. Exact recharge/reset timing was not inspected.
- `MaxHP_You` (20) gives player lives/health as `round(3 + upgrade quantity 6)`. `MaxHP_Opp` (21-28) computes opponent HP from progression index and server HP factor.
- `Mines_Opp` (29-40) computes opponent Depth Charges from progression index, reduced by Gaming superbit 66, Dream bonus 41, and Ninja emporium 45, with final range 1–40. Display includes fewer depth charges as beneficial.
- Upgrade purchase UI compares Mine Currency to `UpgCost` and player `Lv0[20]` Research skill to `UpgLvREQ` (`idleon1.23.txt:287896-287897`). The skill check is character-specific; purchase balance and level use shared `Research` account state, as established by repository raw-save mappings below.
- `BaseDMG` (59-65) combines additive upgrade effects, percentage effects, Research bonus, and Sailing input. `BonusDMGperTilePCT` (66) combines upgrade 9 and Research 146. `CurrentOutgoingDMG` (67-125) derives damage from revealed board tiles and multipliers, applies per-tile scaling, blue-crown multiplier, then the conditional upgrade 11 factor. It mutates transient `DNSM` fields during calculation; do not treat those fields as saved outputs.
- `BonusQTY` (127) is gated by a Research threshold for ordinary indices; special index 99 bypasses the gate. `UpgradeQTY` (155) is static per-level effect times saved Research upgrade level.
- `CurrencyGain` is a product of bonus factors. The 1.23 Minehead UI displays this output directly with `/hr` (local source lines 287903-287906); the currency update adds `CurrencyGain * elapsedSeconds / 3600` to `Research[7][5]` (294205-206). Thus displayed hourly Mine Currency gain is established, although source encodes it as a direct multiplier product.
- Opponent bonus behavior is documented in the 1.21 snippet after line 185; inspect the complete snippet before relying on specific indices. Historical #390 reports a strict defeated-count gate for earned bonuses and preview bypass, with 32 opponents.

Static upgrade descriptions, costs/caps, research requirements, opponent names/rewards, progression mapping, and currency labels come from game static lists/catalogs, not formula code. Existing local models/repositories are generated/static data; no missing WikiBot prerequisite is proven. Do not copy constants from snippets or secondary websites into static data.

## Current offline runtime

Canonical access policy: `tests/helpers/README.md#game-access`. Checked `GET /status` at `http://127.0.0.1:3101`: `source=offline`, `cdpConnected=true`, `injected=true`, `gameReady=true`, active character index 3, name Sludgev4, scene `uAquaB10`. `GET /game-version` returned 1.23, “Luminous_Menagerie”. No live server or public account used.

A previous compound `/exec` probe attempted saved Research/currency values and `DailyTries`; it returned HTTP 500. That probe did not validate expression syntax or function dispatch. Follow-up confirmed scalar expression access with `idleon.getGameVersion()` (HTTP 200); `1 + 1` alone returned HTTP 500 `SyntaxError: Unexpected number`, so this endpoint does not accept that bare expression form. `idleon.findFunction("Minehead")` returned exactly `["ActorEvents_579"]` (HTTP 200). The namespace key is `"scripts.ActorEvents_579"`; querying the bare `"ActorEvents_579"` key returned `undefined`. The function is a dispatcher, not an object of named methods: calling `.DailyTries()` returned HTTP 500 `...DailyTries is not a function`, while calling `_customBlock_Minehead("DailyTries",0,0)` succeeded. No save mutation occurred.
Serial read-only native calls on the ready offline server, active character index 3 (Sludgev4), scene `uAquaB10`, game 1.23 “Luminous_Menagerie”, returned these scalar results. Each expression was a separate `/exec` request and each returned HTTP 200:

| Exact expression arguments | Result | Meaning / limit |
|---|---:|---|
| `_customBlock_Minehead("DailyTries",0,0)` | `4` | Current dispatcher output; daily reset timing remains unobserved. |
| `_customBlock_Minehead("MaxHP_You",0,0)` | `5` | Player Minehead lives/health output. |
| `_customBlock_Minehead("BaseDMG",0,0)` | `9135.123725000001` | Base damage output in this save/runtime context. |
| `_customBlock_Minehead("CurrencyGain",0,0)` | `7980.438938137625` | Native Mine Currency gain rate; the game displays this value with `/hr`. |
| `_customBlock_Minehead("UpgLvREQ",20,0)` | `68` | Research requirement output for index 20. |
| `_customBlock_Minehead("MaxHP_Opp",13,0)` | `10975725.41828094` | Opponent HP output for index 13. |
| `_customBlock_Minehead("Mines_Opp",13,0)` | `4` | Depth Charge count output for index 13. |
| `_customBlock_Minehead("UpgCost",20,0)` | `43343407.80965871` | Cost output for index 20. |
| `_customBlock_Minehead("UpgradeQTY",6,0)` | `2` | Upgrade quantity/effect output for index 6. |

The repository's raw-save map resolves ownership for this project: `Minehead.getRawKeys()` and `ResearchGrid.getRawKeys()` declare `Research` with `perPlayer: false` (`data/domain/world-7/minehead.tsx:90-95`, `research.tsx:911-917`). `HandleRawDataKey` loads a non-player key once under its unchanged name; only `perPlayer: true` keys expand to suffixed character keys (`data/domain/base/domain.tsx:48-62`). Thus Mine Currency `Research[7][5]`, defeated count `[7][4]`, daily counter `[7][8]`, upgrade levels `[8]`, and Research grid levels `[0]` are account-scope inputs in repository parsing. Research skill levels instead live in each character's `Lv0_i` array; Minehead's existing account unlocks use player 0's Research skill (`minehead.tsx:92-95,111-124`). The game save capture registers one Research list (`idleon1.23.txt:145967`); it does not itself expose alternate per-character Research serialization.
Current source fixes DailyTries context: `ResearchStuff("Grid_Bonus",147,1)` dispatches mode 1 to rounded saved Research grid level `Research[0][147]` (`idleon1.23.txt:243984-243987`), not a selected character's Research skill or mode-0 bonus. Repository API `ResearchGrid.getBonusForId(147,1)` returns that level (`research.tsx:1004-1018`). Daily tries are `round(3 + that level)`. Saved daily count `Research[7][8]` is separately account-scoped; Minehead increments it up to the allowance (`idleon1.23.txt:294863`). Reset/recharge timing remains unobserved.
The 1.23 dispatcher confirms `UpgradeQTY` reads `Research[8][index]`; `CanWeBuyUpg` checks account Mine Currency `Research[7][5]` against cost and levels against the static cap. `BonusQTY` uses account defeated count `Research[7][4]` as a reward threshold gate, not currency. The Minehead UI displays beaten count (288041-288042), initializes progression from it (287560), gates selection against it (287741), and increments it after a win (294862). `BonusQTY` returns catalog reward quantity only when the gate passes (or special argument `i==99`; dispatcher snippet line 8).

Additional serial native queries on the same ready 1.23 offline character returned HTTP 200:

| Exact expression arguments | Result | Meaning / limit |
|---|---:|---|
| `_customBlock_Minehead("CurrentOutgoingDMG",0,0)` | `0` | No outgoing damage in the current non-minigame context; does not establish damage during an active turn. |
| `_customBlock_Minehead("BonusQTY",20,0)` | `0` | Reward quantity output for index 20 in this context; lock/defeat conditions not established. |

Current source maps Mine Currency balance to `Research[7][5]`. The update adds `_customBlock_Minehead("CurrencyGain",0,0) * Research[7][3] / 3600` to this balance (local source lines 294205-206). UI renders `CurrencyGain` directly with `/hr` (local source lines 287903-906). Runtime output `7980.438938137625` is the displayed rate for this offline save; the Research save values are account-scope in repository parsing, as detailed above. `Research[7][3]` is the elapsed-time factor used by accrual.

Historical paired extraction under #390 used live server 3100 and refreshed ordinary fixture/results in 2026-09-18; that is not provenance for the current offline character or 1.23. Its reported representative 1.21 observations: Research 68 unlocked upgrade 20 (requirement 68), not 21 (requirement 72); 13 opponents defeated; opponent reward quantity and upgrade costs were compared at tolerance zero. Historical findings do not transfer to current version/save.

## Save/API interpretation and candidate native outputs


## Mine Currency and saved-balance pairing

The current Minehead extraction result is not a valid paired native output for `latest.json`. Its saved Mine Currency is `Research[7][5] = 3118136.2921792953` (`tests/fixtures/saves/latest.json`; handoff `docs/plans/minehead-research-brief.md:17-21`). The extraction result `3118138.5089678895` comes from expression `idleon.getAttr("Research")[7][5]` in `tests/results/minehead-data.json`; it reflects the selected runtime save after currency accrual, not a native calculation output paired to the fixture.

Game source explains the distinction: Minehead accrual adds `CurrencyGain * Research[7][3] / 3600` to `Research[7][5]` (`idleon1.23.txt:294205-206`). `CurrencyGain` is the rate rendered with `/hr`, not the saved balance (`idleon1.23.txt:287903-906`; offline native result `7980.438938137625`, above). Therefore the advancing runtime balance cannot replace the genuine saved value or serve as its expected native result.

The canonical access policy requires offline runtime by default, requires readiness and version checks, and says result-only extraction does not establish fixture provenance (`tests/helpers/README.md:3-26`). It reserves `--refresh-save` for a human-requested refresh against a ready live server. No refresh or save mutation occurred for this investigation.

Read-only pairing was confirmed on `http://127.0.0.1:3101`: `/status` reported a ready offline source, active character 3, and the current evidence above records runtime version 1.23. The `/cloud-save` response and `tests/fixtures/saves/latest.json` have identical canonical JSON SHA-256 `46db7f55f521744a598130801fd9fab2c25669eb6b5031cfa88fc78d8e6440e9`. Both contain `Research[7][5] = 3118136.2921792953`. This identifies the full saved snapshot loaded by the runtime without using the accrued `3118138.5089678895` runtime extraction. No refresh or save mutation occurred.

The same full-snapshot hash and Mine Currency cell establish genuine save pairing for the core parser comparison. A result-only extraction is not pairing evidence by itself. No refresh or save mutation occurred.
Current 1.23 dispatcher attribution and native result shapes are confirmed. Candidate outputs queried include `DailyTries`, `MaxHP_You`, `MaxHP_Opp(13)`, `Mines_Opp(13)`, `BaseDMG`, `CurrencyGain`, `UpgLvREQ(20)`, `UpgCost(20)`, `UpgradeQTY(6)`, `CurrentOutgoingDMG`, and `BonusQTY(20)`. Numeric values apply only to the selected offline save and arguments. Active-turn damage and current reward-gate states remain unobserved. Persistent defeated-opponent count maps to account `Research[7][4]`; daily reset timing remains unknown.

## Static catalog and consumer evidence

Repository references found include `data/domain/data/MineheadOpponentRepo.ts` (generated opponent catalog) and numerous external systems that consume Minehead bonuses. Examples from search: `data/domain/data/AtomColliderRepo.ts` describes Silicon as boosting Minehead Currency; `ButtonBonusRepo.ts` names button bonus; `DreamChallengeRepo.ts` references Depth Charge achievements and fewer charges; `GamingSuperbitsRepo.ts` reduces opponent mines; `JadeUpgradeRepo.ts` reduces opponent Depth Charges; `MealRepo.ts` describes Mine Currency use in the shop; `MenagerieBonusRepo.ts` describes upgrade doublers; `MenagerieMissionRepo.ts` counts opponent wins; `ArtifactRepo.ts`, `LegendTalentsRepo.ts`, `CompanionRepo.ts`, `ArcadeBonusRepo.ts`, `EventShopBonusRepo.ts`, and `JellyObstructionRepo.ts` also reference its bonuses. Formula snippets show cross-domain consumption in Research, Sushi, Atom Collider, companions, Arcade, Royal G, Tasks, Meals, Gaming, Dream, Ninja, Sailing, and Thingies.
Current 1.23 native calls on the ready offline runtime (each separate `/exec`, HTTP 200; active character 3, Sludgev4): `_customBlock_Minehead("UpgCost",0,0)` returned `81234.90761812578`; `UpgLvREQ(0)` returned `1`; `UpgradeQTY(6)` returned `2`; `BonusQTY(0)` returned `10`. `data/domain/data/MineheadUpgradeRepo.ts:63-71` identifies upgrade 6 as Extra Lives, max 7, quantity per level 1, description “Start each game with +1 extra life!” The raw saved level was not queried; effect 2 is consistent with level 2 if no other modifier applies. `data/domain/data/MineheadOpponentRepo.ts:9-17` identifies opponent 0 Bronzehead and static bonus amount 10, with damage/drop-rate description. `BonusQTY(0)=10` matches that static amount but does not prove opponent defeat, earned progression, or reward-gating state. Cost is formula-derived; requirement and opponent base reward are static catalog values returned through dispatcher. Current repositories contain opponent names, reward descriptions/amounts, upgrade names, caps, per-level quantities and descriptions. Source uses `CustomLists.h.MineheadUPG` and `CustomLists.h.Research`; local data mirrors selected fields. No missing static catalog record or precise WikiBot prerequisite was proven.

Known production Minehead domain work from closed #390 provides `data/domain/world-7/minehead.tsx` opponent bonuses/upgrade quantities/requirements/costs and hook through `data/domain/idleonData.tsx`; no UI was delivered. Existing consumers include Tome opponent count and Gallery/Hat Rack bonus quantity. Exhaustive handwritten production consumer search is documented in `docs/research/minehead-pattern-evidence.md:24,47`; this game-evidence artifact does not repeat that inventory. The coverage audit `docs/audits/idleontoolbox-coverage.html:1517-1535` and JSON `docs/audits/idleontoolbox-coverage-data.json:1546-1563` identifies missing visible Mine Currency, daily tries, damage, lives, currency gain rate, upgrade levels/effects/costs/Research requirements, opponent progress/HP/Depth Charges/rewards. Audit says no Minehead view exists.

## Gaps and limits

1. The current-version dispatcher source was captured at `docs/game-snippets/minehead/Minehead.1.23.js:8`, attributed to `scripts.ActorEvents_579`. Local version 1.23 game source shows UI caller at `idleon1.23.txt:287903-906` and accrual caller at `idleon1.23.txt:294205-206`; other callers remain uninspected.
2. The offline native observations apply to the selected save. Repository raw-save mappings resolve Research ownership: Minehead currencies, progression, daily count, upgrade levels, and grid values come from the single account `Research` key; Research skill levels use per-character `Lv0_i` keys. This establishes the existing account `Minehead` API as owner, while player 0's Research skill controls shop unlocks.
3. Daily-try reset/replenishment timing is unobserved. Current source and UI establish that `CurrencyGain` is displayed as Mine Currency per hour and accrues into account `Research[7][5]` using `Research[7][3] / 3600`.
4. `CurrentOutgoingDMG` returned `0` outside an active turn, and `BonusQTY(20)` returned `0`; active-turn damage and reward gates remain unobserved.
5. The current Minehead row catalogs exist, but they do not export the source-owned static description lookups identified below. The specific missing WikiBot export prerequisite is detailed in “Exact static prerequisite for upgrade-description `$`.” Do not add those values to handwritten generated code or mistake runtime-computed outputs for missing static rows.
6. Wiki player semantics are supported by secondary sources only. No primary Idleon Wiki citation was found. Wiki statements do not establish formula or version.
## 1.23 native description substitution semantics

Source provenance: local delivered game source `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt`, matching offline runtime version 1.23 “Luminous_Menagerie” recorded above. Relevant UI caller is the Minehead actor’s `_event_3` at `287810-288025`; upgrade descriptions are drawn from `CustomLists.h.MineheadUPG[index][5]` at `287925-287977`. The opponent reward caller is `_event_3` at `287817-287855`. These are current local source facts, not claims about a later online release.

### Upgrade catalog `description`

For each visible upgrade row, native code starts with the catalog text in `MineheadUPG[index][5]` (line 287925). It then applies these substitutions, in order:

1. `{` receives comma-formatted `_customBlock_Minehead("UpgradeQTY", index, 0)` (287926).
2. `}` receives `_customBlock_NotateNumber(1 + UpgradeQTY(index)/100, "MultiplierInfo")` with `#` removed (287927-931). This is a multiplier quantity, not the raw percent quantity.
3. `$` is conditional and index-specific, as follows (287932-287978):
   - Index 1: maximum possible tile number, calculated from `UpgradeQTY(1)` as `round(1 + (qty + 1 + min(1, floor((qty + 1)/9))))`. When saved level is 17, native code replaces the whole description with its maximum-number sentence (287932-938).
   - Index 2: next grid size and total tiles, from the next/current entries in `CustomLists.h.Research[9]`. At saved level 16, native code replaces the whole description with its full-grid sentence (287939-955).
   - Index 12: one of the level-indexed multiplier strings, selected by `UpgradeQTY(12)`; at zero quantity, whole text becomes the unlock sentence (287956-958).
   - Index 14: `BluecrownMulti(0)` formatted as a multiplier with trailing `x` (287959-960).
   - Index 17: a level-indexed percentage string; at zero quantity, whole text becomes the unlock sentence (287961-963).
   - Index 23: ceiling of inverse `JackpotOdds(0)`; at zero quantity, whole text becomes the unlock sentence (287964-966).
   - Index 24: `JackpotTiles(0)` rounded up with `ceil` (287967).
   - Index 26: percentage reduction calculated as `round(10000 * (1 - 1/(1 + UpgradeQTY(26)/100))) / 100` (287968-969).
   - Index 28: constructed currency bonus sentence. It uses `UpgradeQTY(index)` and `UpgradeQTY(28) * getLOG(Research[7][6])`, formatting through comma and game number-format helpers (287970-978).

Those values are native player-state outputs, not stable constants. Do not substitute `bonusValue`, level, or `quantityPerLevel` indiscriminately for all tokens. Index-specific whole-string overrides supersede catalog text at the stated levels.

### Opponent reward `$` tokens

The current generated catalog has `$` tokens at progression indices **1 (Gemhead)**, **4 (Bleckhead)**, and **18 (Blindhead)**. Catalog records are `data/domain/data/MineheadOpponentRepo.ts:18-26,45-53,171-179`. Their texts respectively say “Current Research AFK rate: $%,” “you're getting $x Damage,” and “build things $x faster.” These catalog strings match the sampled native `Research[19]` texts after underscores become spaces (runtime samples for indices 1 and 4; index 18 was also queried; see runtime comparison below).

Native list pairing is by the same opponent index: `Research[15]` names, `[16]` titles, `[19]` reward descriptions, `[20]` reward amounts (`idleon1.23.txt:312526-312570`). Minehead’s preview reads `[19][opponentIndex]` and sends it to `_customBlock_linesofText`, then draws wrapped lines (`287817-28853`). The helper splits underscores, wraps lines, and recognizes `@` breaks; it has no `$` replacement (`148039-148047,148051-148065,148067-148132`). The inspected native path therefore produces no numeric `$` value.

No caller, producer, or input mapping was established for any of these three `$` tokens. The paired amount array `[20]` is catalog reward amount, not proven token input. `bonusValue` likewise cannot establish token semantics. Do not substitute a native value from a related domain merely because description mentions Research AFK, weapon damage, or trimmed construction speed.

The project has cross-domain values for related mechanics, but this evidence does not connect them to these tokens: Research AFK gain, Weapon Power/damage, and trimmed-slot build speed are not evidenced as `$` producers. Exact value formula, effect owner, inputs, conditions, units, formatting, and character/account scope remain unresolved for indices 1, 4, and 18. Source blocker: the current 1.23 native Minehead path inspected here only wraps and draws raw description text; no `$` substitution call exists in that path. Another producer or separate rendered-text path was not found or ruled out.

### Display-format compatibility

The inspected native calls use game-owned formatting helpers: `CommaNotation` for upgrade `{`, `NotateNumber(..., "MultiplierInfo")` for upgrade `}`, and the index-specific formatter expressions above for `$`. The code does not invoke the website’s existing player-text formatter in these callers. A website formatter may be reused only if its behavior matches each evidenced operation and its index-specific branches; no general `{`/`}`/`$` formatter is supported by this source.

### Reward text catalog mapping and runtime comparison

The 1.23 native `cb.Research()` data constructor defines Minehead names, titles, reward text, and reward amounts as aligned list entries: names at `Research` list index 15, titles at 16, descriptions at 19, and amounts at 20 (`idleon1.23.txt:312526-312570`; Minehead-specific declarations at `312551`, `312560`, `312567`, and `312570`). Initialization assigns `cb.Research()` to `CustomLists.h.Research` (`407469-407471`; repeated at `460758-460760`). The UI indexes these arrays by the same opponent progression index (`287817-821`, `287834`).

Current offline runtime comparison: readiness and version were rechecked at `127.0.0.1:3101` (`source=offline`, injected/ready, character 3 Sludgev4; version 1.23 “Luminous_Menagerie”). Query `idleon.getAttr("CustomLists").h.Research[19][i]` returned native strings for indices 0, 1, 4, 5, 6, 14, 17, 18, 22, and 23. Each matches the corresponding generated `MineheadOpponentRepo` `bonusDescription` after converting source underscores to spaces. Examples: index 0 runtime `}x_Total_Damage_and_}x_Drop_Rate!...` matches catalog index 0 `}x Total Damage and }x Drop Rate!...`; index 1 preserves `+{%` and `$%`; index 4 preserves `+{%` and `$x`; index 6 preserves `}x`; index 23 begins “Nothing... yet...” and matches its catalog entry. Catalog examples are at `data/domain/data/MineheadOpponentRepo.ts:9-17,18-26,45-53,63-71,135-143,162-179,198-224`.

This establishes shared per-index source text for sampled entries, not token-value semantics. The full runtime array JSON exceeded output limits; only the listed indices were compared directly. Source passes `Research[19]` to `linesofText` and draws the result (`287834-853`), with no replacement call at that site. No current Minehead token substitution path for opponent reward text was established. Do not infer values from `bonusValue` or reuse upgrade substitutions. Upgrade token behavior remains separately evidenced above.

### Reward formatter and runtime display limit

The called `_customBlock_linesofText` helper is a line-wrap helper, not a placeholder formatter. It splits incoming text on `_` (`idleon1.23.txt:148039-148047`), measures text width, inserts line breaks, and treats `@` as a line break (`148051-148065`, `148067-148132`). It has no replacement branches for `{`, `}`, or `$`. Minehead passes the untouched `Research[19]` string into this helper and draws returned lines (`287834-853`). Therefore the current inspected Minehead path does not derive numeric values for opponent-reward placeholders; it preserves them in the text passed for rendering. This is a source-supported distinction from upgrades, whose caller explicitly replaces tokens.

Runtime observation was read-only: status showed the offline game at scene `uAquaB10`, not the Minehead menu. No game action or UI interaction was used to open Minehead, so no screenshot or native rendered-text observation was available. Direct runtime catalog reads confirmed sampled raw `Research[19]` strings retain placeholders; the rendered glyph appearance in an open Minehead menu remains unobserved. Do not claim a visual-runtime result.

## Exact static prerequisite for upgrade-description `$`

This answers the independent review gap for native descriptions at indices 2, 12, and 17. Version scope: local game source `../IdleonWikiBot/codefiles/idleon1.23.txt` (1.23 “Luminous_Menagerie”); native Minehead UI description substitution is at lines 287925–287963. Runtime context is the ready offline 1.23 server and regular save described above; no live server or save mutation was used.

### Source contract and current saved levels

The UI selects description text from `CustomLists.h.MineheadUPG[index][5]` at line 287925, substitutes `{` and `}` first (287926–931), then applies index-specific `$` rules:

| Index | Player-facing upgrade | Source lookup and output shape | Native meaning / unit | Saved level and native case |
|---|---|---|---|---|
| 2 | Grid Expansion | `CustomLists.h.Research[9][Research[8][2]+1]` and `[Research[8][2]]`; each grid value is comma-separated width,height text. Source uses `+1` for next grid and current level for current grid (287939–955). | Description sentence states next width×height grid, total tiles (width × height), and current width×height grid. Dimensions are tile counts; total is tiles. | Save has `Research[8][2] = 8`. It takes ordinary lookup branch, not level-16 full-grid override. |
| 12 | Multiplier Madness | Native code indexes a level-specific damage-multiplier schedule by `UpgradeQTY(12)` and appends `x` (287956–958). | Damage multiplier, rendered as `x`; level-indexed lookup uses zero-based effect quantity. | Save has `Research[8][12] = 2`; ordinary lookup branch applies, not zero-level unlock text. |
| 17 | Awesome Additives | Native code indexes a level-specific additive percentage schedule by `UpgradeQTY(17)` and appends `%` (287961–963). | Additive tile damage bonus as a percentage. | Save has `Research[8][17] = 0`; native replaces entire text with source unlock text. No numeric lookup appears for this save. A future nonzero quantity uses the static level-indexed percentage schedule. |

The source's index 2 full-grid override applies only when `Research[8][2]` equals 16 (287939–941); index 12 and 17 replace their full text at zero quantity (287958, 287963). Saved values are account Research state: the local JSON stores `Research` as an encoded string; parsing it yields `[8][2]=8`, `[8][12]=2`, `[8][17]=0`. These are saved levels, not player skill levels. Existing generated records label indices 2 “Grid Expansion”, 12 “Multiplier Madness”, and 17 “Awesome Additives” (`data/domain/data/MineheadUpgradeRepo.ts:27-35,117-125,162-170`).

### Export presence and minimum missing data

The handwritten generated `MineheadUpgradeModel` has only `index`, `name`, `maxLevel`, `costExponent`, `quantityPerLevel`, `rawField4`, and `description` (`data/domain/model/mineheadUpgradeModel.ts:3-11`). Its repository contains those same source fields for these three rows. `../IdleonWikiBot/exported/ts/data/MineheadUpgradeRepo.ts` mirrors those rows and schema. Neither export supplies `Research[9]` grid-size lookup data nor either level-indexed description substitution schedule; static description strings alone leave `$` unresolved or incorrectly display the catalog template.

WikiBot's producer relation is confirmed: `definitions/misc/world7/minehead/MineheadUpgrade.py:5-12` models the upgrade row fields; `repositories/misc/world7/minehead/MineheadUpgradeRepo.py:14-22` parses `MineheadUpgrades` and builds indexed records; `helpers/CodeReader.py:247` registers `MineheadUPG = function ()` as `MineheadUpgrades`. `MineheadUpgradeRepo.ts` output therefore covers upgrade rows, not the other table needed by index 2. The actual exported TypeScript directory includes `MineheadUpgradeRepo.ts`; its model import resolves to the checked-in handwritten generated model. No Minehead grid lookup or the index-12/17 substitution schedules appear in that model/repository output.

Minimal additional exported static relationship: preserve a typed, indexed `MineheadDescriptionLookup` (name illustrative) with (a) `gridSizes: string[]` sourced from `Research[9]`, preserving ordered `"width,height"` pairs and index alignment, and (b) multiplier values for index 12 as ordered numeric or display-string entries, plus additive percentages for index 17 as ordered numeric or display-string entries. Each lookup must be indexed by `UpgradeQTY` exactly as the native source does. For index 2, the existing account save's level selects current and next grid entries; width and height permit the native total-tile product. Preserve source values and order without copying them into handwritten code. This shared lookup can be exported once, rather than duplicating it on each upgrade record. The three static schedules and their interpretation are confirmed by the source; no independent WikiBot static export was found for them. No missing save field or calculated effect output is required: current levels are already in `Research[8]`, and level-indexed effects are static lookup inputs.

This is a data-prerequisite finding, not an implementation authorization. It does not infer unobserved visual formatting beyond the source's underscore sentence and explicit `x`/`%` suffixes, nor assert player-facing wiki prose; no primary Idleon Wiki upgrade page was located in existing evidence.
