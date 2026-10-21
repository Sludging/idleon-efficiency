# Clamworks Worker Class compensation — v1.23 source evidence

## Finding

Native v1.23 Clamworks UI has a Worker Class panel whose draw loop iterates exactly nine slots, `i = 0..8`, and shows a slot only when `OptionsListAccount[464] > i` (`idleon1.23.txt:280185–280197`). Each label comes from runtime `CustomLists.h.Spelunky[30][i]`, passed through `h.string` and drawn with font 472. A read-only query to the local offline v1.23 runtime returned twelve raw strings from that same list. Thus the native source bundle's nine-entry panel is paired with a twelve-entry runtime reward list: source code controls visible slots; runtime static data holds all twelve labels.

The twelve runtime strings, in native list order, are `["+1_Grade_for_2_Gallery_Slots", "+1_Legend_Talent_PTS", "+10_LV/day_for_Kattlekruk_bubbles", "+5%_Meritocracy_Multi_bonus", "+1_Legend_Talent_PTS", "+20%_extra_Daily_Coral", "+15_LV/day_from_Brain_Coral", "+3%_Gallery_Bonus_Multi", "+25%_Lumi_Gains_Rate", "1.25x_Research_EXP_gain", "10x_Cooking_Speed", "2x_Spelunking_POW"]`. Source confirms primitive strings pass through `Std.string` unchanged; underscores remain visible (`idleon1.23.txt:1435–1437, 34467–34471, 34508–34511`).

The local offline v1.23 runtime establishes research values, not a generated production artifact. Do not hand-copy these runtime strings into production code. Before implementation, obtain a generated source-owned compensation-record export from the WikiBot owner; consumer data needs only `index: number` and `description: string`. Compute the unlock threshold as `index + 1`; do not add a threshold field.

## Version and evidence boundary

Native source: local v1.23 `IdleonWikiBot/codefiles/idleon1.23.txt`, with references below. Runtime evidence: offline `Luminous_Menagerie` v1.23 server `127.0.0.1:3101`, `/status` ready and `/game-version` verified, character index 3 (`Sludgev4`). Read-only `/exec` query `idleon.getAttr("CustomLists").h.Spelunky[30]` returned the twelve raw strings above. No public profile, refresh, save mutation, or UI interaction occurred. These runtime static values are not paired to `latest.json`; font rendering was not visually captured.

## Native panel draw and data flow

- Panel draw is inside `_event_8` and gated by `wrapper.enabled` and `MenuType2 == 92` (`idleon1.23.txt:280143–280146`). Worker Class rewards are a subview gated by `_GenINFO[135] == 1` (`280185–280188`).
- Native draw loop has `t = 0; 9 > t`; each iteration assigns `i = t++`. It draws a reward only when `OptionsListAccount[464] > i` (`280186–280197`). Position uses three columns and three rows: x `225 + 260*floor(i/3) - 17*floor(i/6)`, y `381 + 22*(i - 3*floor(i/3))` (`280195–280197`).
- Visible reward string is `y.replace("" + h.string(CustomLists.h.Spelunky[30][i]), "}", computedPercentage)`; the replacement value is `Math.round(100 * (1 + (5 * (accountWorkerClassLevel - 8)) / 100)) / 100` (`280189–280197`). `h.string` is Haxe `Std.string`, implemented as `n.__string_rec(e, "")` (`1435–1437`). For primitive strings, `__string_rec` returns the same string unchanged (`34467–34471`, `34508–34511`). Thus `h.string` does not localize, replace underscores, or otherwise transform these reward strings. Source then replaces each `}` character with the computed percentage before `drawString`; no `{` appears in the twelve runtime raw strings. Therefore, for visible indices 0–8, source passes each raw string unchanged to `drawString`; underscores remain underscores. Actual rendered glyph appearance is not established by source alone.
- The Worker Class header reads account option 464 and draws `WORKER_CLASS` plus its value (`280203–280210`). Success chance uses `ClamPromochance` (`280224–280226`); underlying dispatcher computes `0.5 / (2 + OptionsListAccount[464])` (`239982`). Promotion mechanics and reset details remain as summarized below.
- For the separate ordinary-upgrade panel, source uses `CustomLists.h.Spelunky[27]` for upgrade descriptions and list-indexed values (`280311–280340`). Do not confuse that nine-per-category pearl upgrade metadata with Worker Class compensation labels from list 30.

## Fonts, glyphs, and images

The native reward strings are drawn using font 472 (`280189–280197`). The reward block names no images. Font 726 renders separate panel glyphs and title artwork; the checked repository descriptor maps glyph `하` (U+D558) to atlas `font-726.png` rectangle `(551,3,148,31)`, and `픽` (U+D53D) to `(551,34,148,31)` (`apk/assets/assets/graphics/1x/font-726.fnt:49,64`). Their glyph meanings are unverified. Font IDs 650–652 render the level-dependent Worker Class title (`280205–280210`); source does not map those IDs to files.

The broader Clam Work interface loads `ClamBG.png` and clam actors `Clam.png` / `ClamW.png` (`279534–279537`, `441841–441844`). Item definitions map `ClamPearl0` to `Clam_Pearl` and `ClamPearl1` to `Pure_Pearl` (`370229–370264`); drop handling awards those IDs (`189647–189657`). No source mapping establishes `Pearl1.png`–`Pearl6.png` as Clamworks reward art. Fonts 472/473 serve UI text/number rendering, not verified icon assets; no class/reward icon mapping is established.

No explicit image call appears in the reward draw block. Reward labels come from the runtime list, not text embedded in the cited images. Font 726 descriptor and atlas identify two glyph rectangles, but not their player-facing meanings.

## Native mechanics
## Exact Clam dispatcher runtime values

Read-only runtime query on the local offline v1.23 server:

```js
[idleon.callFunction("Thingies","Clam_BlackPearlValue",0,0), idleon.callFunction("Thingies","Clam_Cost",9,0), idleon.callFunction("Thingies","ClamPromochance",0,0), idleon.getAttr("CurrentMap"), idleon.getAttr("OptionsListAccount").slice(454,466)]
```

The exact result was `[1050, 10000000000, 0.07142857142857142, 324, [577093307.3126311,124,15,45,45,83,20,22,23,0,5,7]]`. In query order, black-pearl value is `1050`; Clam cost for selector 9 is `10000000000`; promotion chance is `0.07142857142857142`; current map is numeric ID `324`.

The server reported `/game-version` `{ "title": "Luminous_Menagerie", "version": "1.23" }`. `/status` reported `source: "offline"`, ready flags true, character index 3, player `Sludgev4`, and scene `uAquaB10` (`sceneID: 162`). Account options slice maps indices 454–465; its last two values are option 464 = 5 and option 465 = 7. Source identifies option 464 as Worker Class level (`239982`, `280203–280210`). No save mutation, refresh, or public account used.

The values are observations from the selected offline save/runtime, not universal constants. The combined expression ties all outputs and the map/options context to one `/exec` request. `MapNameRepo.ts:333` identifies map ID 324 as Molten Edge; this is not the Clamworks map (306).


- `ClamPromochance` returns `0.5 / (2 + OptionsListAccount[464])` (`239982`). Account option 464 is displayed as Worker Class level (`280203–280210`).
- `ClamWorkBonus` returns `1` iff `OptionsListAccount[464] > t`, else `0` (`240025`). This matches panel visibility condition `level > index` (`280188–280197`).
- On successful promotion, source increments option 464, resets pearl balance option 454, ordinary clam upgrade options 455–463, Menagerie row 5 columns 0–8, row 0 columns 7–8, and option 465 (`281357–281387`). The UI checks pearl balance against `Clam_Cost(9)` and shows success chance (`280215–280226`).
- `ScurgeUnlocked` is a distinct Menagerie predicate, not the Worker Class reward list (`118878`).

## Repository data and player-facing cross-check

Repository `data/domain/world-7/clamworks.tsx:6–15` has nine handwritten reward descriptions, mapped by index in `:42–49` and activated by promotion level in `:68–83`. These are website-owned text, not the native labels established by panel source.

Generated `data/domain/data/ClamworksBonusRepo.ts:7–71` holds pearl/work-upgrade records, not Worker Class rewards. Do not use its IDs or descriptions as promotion metadata.

The player-facing Wiki page [The Clamworks](https://idleon.wiki/wiki/The_Clamworks) lists twelve Worker Class rewards. Local offline v1.23 runtime also returns twelve entries. Native panel draws only indices 0–8, while unlock predicate covers later indices too. The matching count does not make Wiki authoritative; runtime list establishes exact raw labels and ordering.

`data/domain/world-7/clamworks.tsx:6–15` has nine handwritten strings, none exact native text: its spaces differ from underscores preserved by `Std.string`, its index 8 (`}x Class EXP multi`) conflicts with native `+25%_Lumi_Gains_Rate`, and it omits indices 9–11. This resolves count and index ownership; it does not authorize recreating individual upgrades or calculators.

## Remaining evidence boundary

- Native `h.string` calls `Std.string` on primitive reward values, preserving their exact characters. The panel replaces `}` with the Worker Class bonus percentage, but none of twelve raw labels contain that placeholder. Thus visible slots 0–8 pass the literal runtime strings to `drawString` unchanged (`280189–280197`; string conversion source `1435–1437, 34467–34471, 34508–34511`). Final font shaping/clipping remains unobserved.
Font/icon art remains separate: decoding unverified glyph artwork requires actual font sources. No worker-class or per-reward image mapping is established.

Static source establishes panel conditions, nine-slot rendering, data owner, label lookup, unchanged primitive-string conversion, placeholder substitution, and font IDs. Local offline v1.23 runtime establishes all twelve raw reward strings and order as research evidence only. It is not a generated source-owned production artifact; implementation requires WikiBot owner to export source-owned records with `index` and `description`. Compute threshold as `index + 1`. No live or public-account validation occurred. The displayed current panel has nine slots despite twelve list entries.


