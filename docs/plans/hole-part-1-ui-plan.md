# The Hole part 1: UI plan

## Player outcome and boundary

For [#441](https://github.com/Sludging/idleon-efficiency/issues/441), show saved villager progression, investments, useful growth rates, shared resources, and owned Study benefits. Use accepted backend values without changing calculations or save state.

Keep **Villagers → Upgrades → Caverns**, and **Majik → Schematics → Studies → Measurements** inside Upgrades. Keep all five villagers and 18 cavern identities in game order. Names have no numeric prefixes; stable internal IDs remain unchanged. Keep the improved Players/Obols navigation shell. No deep links, URL selection, source destinations, automatic scroll/focus, or later-part tools.

This is an Operate surface within the existing site identity. Preserve Rubik, ordinary medium/normal page heading, inherited width/inset, charcoal surfaces, blue controls, and game artwork. Cards organize progression; they do not introduce a new visual system.

## Eleven selected decisions

| Finding | Revised decision |
|---|---|
| 1. Villager composition | Replace DataRows with dense cards. Use three columns at the 1440px review viewport, with five cards in game order. Keep identity, saved level, invested Opals, EXP/hour, EXP bar, and next unlock together. |
| 2. Rate context | Remove import-audit statements and redundant equal-character controls. Equal complete numeric contexts show rates immediately. Keep the character-bound Villager Statue modifier in useful rate details. Differing contexts offer optional named inspection and a truthful range before selection. Missing rates retain visible reasons. Do not call a character rate account-wide. |
| 3. Compact top summary | Put shared resources after the page heading and before the three tabs. Show exactly one Opal ratio: **109 / 363 available**, meaning available / earned. Do not add separate available, invested, or earned totals. Condense Lanterns to **37**, **0 / 12 today**, and **+2 hours**. Stock details show useful nonzero locations, such as **Storage: 37**. Incomplete totals remain unavailable with visible reasons. |
| 4. Natural next unlock | Use **Nothing right now** when no next unlock exists. Remove “Released maximum reached” and source/version terminology. Keep actual future unlock names and required levels. |
| 5. Upgrades shell | Preserve `ShadowBox`, the 25% medium-padded rail, `LeftNavButton` arrow/accent-4 selection, and dark-1 content panel. Studies remains the initial local selection. |
| 6. Study hierarchy | Use two-column cards within the existing right panel. Make identity, saved level, and useful numeric benefit prominent. Replace “Stored” with **Progress to next level**, followed by current / required progress and an 8px bar. The bar measures saved Study progress toward the next level, not elapsed time or benefit strength. |
| 7. Participation | Remove the Participation column and repeated hourly rates. Use opacity 1 for accepted target/neighbor participation and 0.6 for known inactivity. Locked cards retain **Locked**. Unknown participation remains readable with its unavailable reason. Readiness remains explicit and does not advance saved level. |
| 8. Study descriptions | Remove authored teaching, instructions, interpretation prose, and caveats from both cards and tooltips. Keep only the six useful generated tooltip descriptions listed below, materialized from saved values. Omit secondary conditional rules that need further explanation to be honest; do not strengthen them. Keep unavailable reasons visible. |
| 9. Study summary | Show **Study speed: 105K progress/hour** once. Remove “Studying” / “Also studying” groups and the invented participation tooltip. Visual card state shows which Studies gain progress. |
| 10. Cavern names | Remove numeric prefixes from rails, headings, Study names, and relevant upgrade/schematic references. Preserve internal indices, ordering, IDs, and existing later-part support boundaries. |
| 11. Cavern imagery | Use verified `HolePOI` artwork for all 18 identities. Use contained artwork beside Study names, in cavern navigation, and beside the selected cavern heading. Use existing CDN assets and measured metadata, not competitor assets or guessed IDs. |

### Card and resource composition

Use `ShadowBox` dark-1 cards with medium padding and small inner gaps. Keep ordinary text at incumbent sizes; promote saved levels and current benefits rather than every label. Use muted accent-2 labels and a grey-1 progress track with brand-blue fill. Clamp the visible fill at completion; keep the actual saved number and **Ready to claim in game** visible. Missing progress or requirements show unavailable text, not an empty or complete bar.

Villager headers retain the verified 56×64 crop from `HoleUIvillager0`–`HoleUIvillager4`. Pair name/role with the saved level. Put invested Opals and EXP/hour together below, then labeled EXP progress, bar, and next unlock. Useful rate modifiers and Opal Enthusiasm remain conventional details; remove all import/session-response prose. Preserve useful shared growth sources once in their existing compact tooltip, without adding a repeated contributor table or a Study-summary tooltip.

Below the villagers, retain one local Opal-source disclosure, Equal Spread, and read-only Another Try facts. Keep useful nonzero attribution and fractional adjustments without repeating the three aggregate Opal totals. Lantern stock/use moves to the shared top summary; do not repeat an inventory panel below.

Studies keep name/effect search, no-results/clear behavior, and **Show unlocked**, initially off. Keep all 18 records in game order. Dim only accepted inactivity or explicit locks, not missing participation. Keep lock, unavailable progress/benefit, and claim-ready notices legible. Website selection never changes participation.

Keep the card's main numeric benefit and useful saved progression. Retain Lamp **+22 daily wishes**, Gloomie **1.21×** credited kills, Jar enchantment chance, Wisdom starting attempts, Fountain marble production, and Cove’s first **35** discounted upgrades. Harp keeps its direct string EXP and exceptional EXP chance/multiplier. Cove keeps saved purchases today, but removes the duplicate current cost factor.

Cross-skilling cards show only **Cheaper layers in other skilling caverns**. Remove per-layer and accumulated arithmetic, divisor terminology, and literal percentage-reduction claims. Do not add an explanatory paragraph or move removed content into another disclosure.

Omit Jar target preference, Wisdom Instamatch recovery, and Fountain repeat-marbleization/eligibility rules from this UI. Those secondary rules need caveats that do not serve the card's main task. Keep their verified numeric main benefits without an unconditional replacement claim. Remove authored respawn, fight-skip, and attempt-preservation text from Dawg Den, Bravery, and Gambit cards; their approved genuine tooltips retain those game descriptions. Do not hide missing-input reasons.

Caverns show only their own earned Opals and owned Study benefit. One concise website-support notice distinguishes undelivered tools from game locks. No extra owner surfaces or later-part upgrade tools are added.

## Incumbent pattern evidence

These are distinct feature surfaces, not six instances of one shared component. Named traits are selected; unrelated behavior is rejected.

| Surface and exact source | Selected traits | Rejected traits |
|---|---|---|
| [Anvil](../../app/world-1/anvil/content.tsx), lines 25–49 and 232–247 | Compact identity/progress groups, progress bar next to current capacity, hourly rate near the relevant product. | Forecasted production, future-capacity semantics, per-character repetition, outlined card styling. |
| [Cooking](../../app/world-4/cooking/content.tsx), lines 45–75 and 115–130 | Small dark summary, adjacent hourly rates, explicit current / required progress, recognizable art. | ETA/countdown, recipe controls, copied ingredient columns. |
| [Research observations](../../components/world-7/research/researchContent.tsx), lines 88–124 | Identity/art, level, current / required EXP, 8px grey-1/brand progress bar, nearby hourly values. | Discovery/reveal rules, lens controls, 0.35 opacity, unrelated new Research behavior. |
| [Sneaking upgrades](../../components/world-6/sneaking/sneakingUpgrades.tsx), lines 19–35 | Dark-1 cards, medium padding, small inner groups, image beside name/level, 0.6 state opacity. | Purchase costs, affordability colors, upgrade actions, unconditional three-column layout. |
| [Atom Collider](../../components/world-3/construction/atomCollider.tsx), lines 31–69 | Concise image/value grouping, muted labels, resource summary, 0.6 inactive treatment. | DataRow composition for this revision, max-cost fields, construction’s large outer inset. |
| [Legend Talents](../../app/world-7/legendTalents/content.tsx), lines 32–61 and 68–85 | Small top summary surfaces, strong name/level relationship, direct generated benefit text. | Duplicate total/available tiles, WIP warning, gold max-level color, five-column talent grid. |
| [Stamps](../../app/world-1/stamps/content.tsx), lines 77–82 and 196–213 | Recognizable game images and art-attached `TipDisplay` for useful real bonus detail. | 0.2 opacity, carry-capacity tables, broad hover manuals. |
| Players `app/players/content.tsx:1217–1248`; Obols `app/account/obols/content.tsx:108–131`; `LeftNavButton.tsx:7–17` | Existing padded rail, selected arrow/accent-4 background, dark-1 content panel. | No replacement navigation, drawers, new tab topology, or automatic owner scrolling. |

The first six guide card density, progress, rates, summaries, hierarchy, and state. Stamps guides tooltip attachment. Players/Obols remains navigation authority. Shared primitives alone are not counted as separate examples.

Toolbox remains content/art reference only. Its earlier inspected Hole profile establishes adjacent progression, recognizable game art, and direct benefits. Its layout, cards, colors, drawers, five-tab IA, sorting, and percentage-reduction claims are not adopted.

## Study tooltip provenance

Every surviving Study tooltip uses `Study.getDescription().replace(/_/g, " ")`, not authored explanation. Generated templates live in [StudyRepo](../../data/domain/data/StudyRepo.ts). Accepted [materialization](../../data/domain/world-5/hole/hole.tsx), lines 456–460, inserts the saved-level bonus; multiplier templates use the accepted multiplier branch. Only known saved levels of at least one may display these owned-rule descriptions. Do not show unresolved tokens or default-level text when saved level is missing.

| Identity | Decision and provenance |
|---|---|
| Well | Retain generated description, `StudyRepo.ts:9–14`. Saved level 16 materializes **160.00%** bucket fill and the genuine sediment rule. |
| Motherlode | No tooltip. Generated wording could imply a literal resource reduction. Show the concise cheaper-layer benefit, without secondary arithmetic. |
| Dawg Den | Retain, `StudyRepo.ts:21–26`. Saved level 22 materializes **2.10x** golden-hound score and its owned respawn rule. |
| Bravery | Retain, `StudyRepo.ts:27–32`. Saved level 26 materializes capped **32.00%** minimum damage and the owned trivial-fight skip. |
| Bell | Retain, `StudyRepo.ts:33–38`. Saved level 21 materializes **420.00** random bonus levels every twentieth ring. |
| Harp | No tooltip. Retained accepted evidence has description **1800.00x**, but the prepared exceptional-effect value is **1801×**. Do not fix or explain this backend discrepancy during UI planning. Show accepted effects directly. |
| Lamp | No tooltip; the generated description adds no needed detail beyond the direct daily-wish benefit. |
| Undying Hive | No tooltip; avoid literal-reduction wording. |
| Gloomie Mushroom Grotto | No tooltip; generated wording repeats the direct credited-kill benefit. |
| Justice | Retain, `StudyRepo.ts:63–68`. Saved level 18 materializes **10.50x** Opal chance and the genuine additional fourteen reward days. |
| Jars | No tooltip. Generated “Double click” is an in-game instruction, not a website action. Keep enchantment chance only; omit target preference and its caveat. |
| Evertree | No tooltip; avoid literal-reduction wording. |
| Wisdom | No tooltip. Generated unconditional recovery wording omits the accepted normal-story capacity condition. Keep starting attempts only; omit the recovery rule and explanation. |
| Gambit | Retain, `StudyRepo.ts:87–92`. Saved level 36 materializes **180.00%** points and the genuine **50%** attempt-preservation rule. |
| Temple | No tooltip; generated description duplicates the direct double-torch benefit. |
| Fountain | No tooltip. Generated repeat-marbleization wording does not establish individual upgrade eligibility. Keep marble production only; omit secondary rule, exclusions, and disclaimer. |
| Bottomless Trench | No tooltip; avoid literal-reduction wording. |
| Crystal Glunko Cove | No tooltip; generated description repeats the direct discounted-upgrade limit and cost. |

These decisions use the accepted descriptions/effects retained in `.ui-verification/runs/2026-10-14T01-35-34-717Z-39415/hole-production-observations.json`, `publishedRealSaveBaseline.studies`. They are not fresh game-calculation research. Remove old authored Study detail bodies, the top participation tooltip, and equivalent teaching/caveat text in smaller card text. Unavailable effect reasons remain visible beside affected benefits. Apply the same concise benefit renderer to cavern-local views.

## Verified cavern image map

Original game-art caller: `../IdleonWikiBot/codefiles/idleon1.22.txt:266057–266075`. The selected cavern index `_DN1` selects `HolePOI{index}.png`. Jars uses `HolePOI10_{JarAesthetic}.png`; use existing `HolePOI10_0` as neutral identity artwork, not a claim about the saved aesthetic. Generated `StudyRepo.ts:9–115` and the accepted name array establish the same identity order. All 18 local images were visually inspected together; natural dimensions were read from the actual PNGs.

| Internal index | Visible name | CDN image location | Natural size |
|---:|---|---|---|
| 0 | Well | `HolePOI0` | 287×61 |
| 1 | Motherlode | `HolePOI1` | 125×104 |
| 2 | Dawg Den | `HolePOI2` | 187×93 |
| 3 | Bravery | `HolePOI3` | 141×161 |
| 4 | Bell | `HolePOI4` | 260×166 |
| 5 | Harp | `HolePOI5` | 106×116 |
| 6 | Lamp | `HolePOI6` | 183×103 |
| 7 | Undying Hive | `HolePOI7` | 100×105 |
| 8 | Gloomie Mushroom Grotto | `HolePOI8` | 195×124 |
| 9 | Justice | `HolePOI9` | 141×161 |
| 10 | Jars | `HolePOI10_0` | 93×108 |
| 11 | Evertree | `HolePOI11` | 177×123 |
| 12 | Wisdom | `HolePOI12` | 141×161 |
| 13 | Gambit | `HolePOI13` | 374×125 |
| 14 | Temple | `HolePOI14` | 167×149 |
| 15 | Fountain | `HolePOI15` | 186×161 |
| 16 | Bottomless Trench | `HolePOI16` | 186×161 |
| 17 | Crystal Glunko Cove | `HolePOI17` | 186×161 |

Pass measured metadata through `IconImage`; its established accessor resolves `https://cdn2.idleonefficiency.com/images/{location}.png`. Preserve aspect ratio inside a 64×56 Study slot, 32×28 navigation slot, and larger selected-cavern slot. Do not stretch, crop away the object, add images to `public`, or run WikiBot. The visual source sheet and private metadata are under `.ui-verification/hole-dense-plan-20261014/`.

## Integration and verification

Read existing Hole and Player objects through `useAppDataStore`, retaining `lastUpdated`. Keep route metadata, shared navigation, calculations, and parsing unchanged. Local state owns tab/rail selection, search/filter, and optional useful character inspection. No endpoint, engine, recommendation, forecast, persistence, or game action is added.

The disposable preview must render actual theme/components and accepted real-save display values at 1440×1000. Exercise all eleven decisions; missing totals/progress/rates; locked, unknown, inactive, and claim-ready states; useful named inspection; search/no-results/clear; unlocked filtering; all navigation identities; generated tooltip provenance; CDN loading; and unchanged URL/scroll/focus behavior. Clearly labeled display fixtures prove presentation, not gameplay or new calculation parity.

For the selected copy/culling revision, exercise all 18 Study cards and cavern-local benefits. Verify that removed conditional rules, authored caveats, and secondary arithmetic are absent. Check retained Jar, Wisdom, Fountain, Harp, and Cove benefits; all six exact generated tooltips; visible unavailable reasons; and preservation of card density, bars, art, opacity, the single Opal ratio, search/filter, and local navigation. Earlier reference renders and broader checks remain prior evidence, not fresh passes.

Capture actual incumbent surfaces where reachable and report reference-loading failures without repairing unrelated work. Preserve production/source/save hashes and the exact disposable source in private run artifacts. Remove the runnable throwaways after checks. This preview does not prove changed production behavior. Fresh human approval must precede production execution. Approval history and exercised-check limits belong in the [current handoff](hole-research-brief.md#current-handoff).

## Rendered preview references

Latest selected copy/culling preview: `.ui-verification/runs/2026-10-14T05-32-49-810Z-84398/`.

- [Dense Villagers and compact resource summary](../../.ui-verification/runs/2026-10-14T05-32-49-810Z-84398/01-villagers-and-resources.png).
- [Studies: concise benefits, progress bars, names, and verified art](../../.ui-verification/runs/2026-10-14T05-32-49-810Z-84398/02-study-top.png).
- [Jar chance, concise cross-skilling, and Wisdom attempts](../../.ui-verification/runs/2026-10-14T05-32-49-810Z-84398/03-study-middle.png).
- [Wisdom, Fountain production, and useful Cove progression](../../.ui-verification/runs/2026-10-14T05-32-49-810Z-84398/04-study-bottom.png).
- [Cavern-local Jar benefit](../../.ui-verification/runs/2026-10-14T05-32-49-810Z-84398/09-cavern-10-jars.png), [Wisdom benefit](../../.ui-verification/runs/2026-10-14T05-32-49-810Z-84398/09-cavern-12-wisdom.png), and [Fountain benefit](../../.ui-verification/runs/2026-10-14T05-32-49-810Z-84398/09-cavern-15-fountain.png).
- [Visible missing-input reason with concise cross-skilling](../../.ui-verification/runs/2026-10-14T05-32-49-810Z-84398/13-missing-benefit-cavern-1.png).
- [Genuine materialized Bell description](../../.ui-verification/runs/2026-10-14T05-09-42-371Z-23098/07-genuine-study-tooltip-4.png).
- [Name-only cavern rail and neutral Jars art](../../.ui-verification/runs/2026-10-14T05-09-42-371Z-23098/15-jars-neutral-art.png).
- Incumbent captures: [Anvil](../../.ui-verification/runs/2026-10-14T05-09-42-371Z-23098/reference-anvil.png), [Cooking](../../.ui-verification/runs/2026-10-14T05-09-42-371Z-23098/reference-cooking.png), [Research](../../.ui-verification/runs/2026-10-14T05-09-42-371Z-23098/reference-research.png), [Sneaking](../../.ui-verification/runs/2026-10-14T05-09-42-371Z-23098/reference-sneaking-upgrades.png), [Legend Talents](../../.ui-verification/runs/2026-10-14T05-09-42-371Z-23098/reference-legend-talents.png), and [Stamps](../../.ui-verification/runs/2026-10-14T05-09-42-371Z-23098/reference-stamps.png).

The latest [focused evidence](../../.ui-verification/runs/2026-10-14T05-32-49-810Z-84398/hole-study-copy-focused-evidence.json) passes **145 check groups**, with **35 captures**, all 18 CDN image records, and five native scroll transitions. It checks all 18 Study and cavern-local benefits, all six exact generated tooltip bodies, and visible unavailable reasons. Two earlier failed attempts remain recorded; only private harness assumptions changed afterward. Tooltip captures do not reliably show the popup; exact visible-body assertions and the earlier Bell render supply the tooltip evidence. The missing-level catalogue locator capture is scroll-clipped, not a full visual catalogue.

Earlier composition/reference evidence remains under `.ui-verification/runs/2026-10-14T05-09-42-371Z-23098/`: 41 captures, 22 passing groups, and two hidden-checkbox harness failures. The [visible-label confirmation](../../.ui-verification/runs/2026-10-14T05-13-54-775Z-36323/hole-dense-filter-confirm-evidence.json) passed six checks. Reference captures establish styling, not settled account values; these older checks were not rerun as new reference verification.

Latest exact disposable source is preserved in `disposable-preview.tar.gz` and `sources/` in the latest focused run. Original source, verified image map, source-art contact sheet, and earlier combined evidence remain under `.ui-verification/hole-dense-plan-20261014/`. Runnable previews/scenarios were removed. Production and real-save bytes remain unchanged. See the [selected copy/culling handoff](hole-research-brief.md#selected-study-copy-and-arithmetic-revision) for commands, runtime errors, retained failures, approval gate, and check limits.
