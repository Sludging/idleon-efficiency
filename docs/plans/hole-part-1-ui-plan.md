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
| 3. Compact top summary | Put shared resources after the heading and before the tabs. Use small 14px name/value text, 0.75-scale resource art, and 12px information glyphs. Show exactly one Opal ratio: **109 / 363 available**, meaning available / earned. Keep useful Opal sources and allocation in one constrained summary tooltip. Lanterns show **37** and **0 / 12 today**, with useful nonzero location details only. No Stock label, **+2 hours**, or effect tooltip remains. Incomplete totals retain visible reasons. |
| 4. Natural next unlock | Use **Nothing right now** when no next unlock exists. Remove “Released maximum reached” and source/version terminology. Keep actual future unlock names and required levels. |
| 5. Upgrades shell | Preserve `ShadowBox`, the 25% medium-padded rail, `LeftNavButton` arrow/accent-4 selection, and dark-1 content panel. Studies remains the initial local selection. |
| 6. Study hierarchy | Use two-column cards within the existing right panel. Make identity, saved level, and useful numeric benefit prominent. Replace “Stored” with **Progress to next level**, followed by current / required progress and an 8px bar. The bar measures saved Study progress toward the next level, not elapsed time or benefit strength. |
| 7. Participation | Remove the Participation column and repeated hourly rates. Keep all Study bodies and artwork at opacity 1. A 1px `green-1` border marks known participating target/neighbors only when cavern access is known and true. Do not invent participation labels or infer participation from website selection. Locked, unknown-access/participation, unavailable, and claim-ready reasons remain visible. |
| 8. Study descriptions | Remove authored teaching, instructions, interpretation prose, and caveats from both cards and tooltips. Keep only the six useful generated tooltip descriptions listed below, materialized from saved values. Omit secondary conditional rules that need further explanation to be honest; do not strengthen them. Keep unavailable reasons visible. |
| 9. Study summary | Show **Study speed: 105K progress/hour** once. Remove “Studying” / “Also studying” groups and the invented participation tooltip. Visual card state shows which Studies gain progress. |
| 10. Cavern names | Remove numeric prefixes from rails, headings, Study names, and relevant upgrade/schematic references. Preserve internal indices, ordering, IDs, and existing later-part support boundaries. |
| 11. Cavern imagery | Use verified `HolePOI` artwork for all 18 identities. Use contained artwork beside Study names, in cavern navigation, and beside the selected cavern heading. Use existing CDN assets and measured metadata, not competitor assets or guessed IDs. |

### Card and resource composition

Use `ShadowBox` dark-1 cards with medium padding and small inner gaps. Keep ordinary text at incumbent sizes; promote saved levels and current benefits rather than every label. Use muted accent-2 labels and a grey-1 progress track with brand-blue fill. Clamp the visible fill at completion; keep the actual saved number and **Ready to claim in game** visible. Missing progress or requirements show unavailable text, not an empty or complete bar.

Villager headers retain the verified 56×64 crop from `HoleUIvillager0`–`HoleUIvillager4`. Pair name/role with the saved level. Put invested Opals and EXP/hour together below, then labeled EXP progress, bar, and next unlock. Useful rate modifiers and Opal Enthusiasm remain conventional details; remove all import/session-response prose. Preserve useful shared growth sources once in their existing compact tooltip, without adding a repeated contributor table or a Study-summary tooltip.

Keep useful nonzero Opal attribution, exact fractional adjustments, Equal Spread, and minimum allocation together in the top-summary tooltip. Constrain the whole tooltip body to 400px height with `overflow: auto`; hover into it must keep it open, and wheel scrolling must reach allocation. Remove the separate below-villager Opal disclosure. Keep Another Try's wish cost compact and its availability, affordability, and all four reset categories in one small constrained tooltip. Shared growth uses separate small name/value rows in its own whole-body scroller, without contributor duplication.

Studies keep name/effect search, no-results/clear behavior, and **Show unlocked**, initially off. Keep all 18 records in game order. Do not dim locked or inactive bodies/artwork. Keep lock, unavailable progress/benefit, and claim-ready notices legible. Website selection never changes participation.

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
| [Tome](../../app/account/tome/content.tsx), lines 29–46 | 0.75-scale compact art, small text, conventional information glyph. | Larger summary tiles or repeated resource totals. |
| [Stamps compact counts](../../app/world-1/stamps/content.tsx), lines 196–213 | Small counts beside reduced artwork. | Copying its 0.4 artwork scale without considering Hole art dimensions. |
| [Research tooltip rows](../../components/world-7/research/researchContent.tsx), lines 41–63 | `xsmall` rows, small tooltip, 620px width cap, 40vh height cap, `overflow: auto`. | Large uninterrupted source prose or clipping only an inner section. |
| [ItemSourceDisplay](../../components/base/ItemSourceDisplay.tsx), lines 20–32; [TipDisplay](../../components/base/TipDisplay.tsx), lines 25–58 | Small source rows; caller owns tooltip scrolling. | Changing shared tooltip primitives for this feature. |
| [Alchemy](../../app/world-2/alchemy/content.tsx), lines 261–268; [Lab](../../app/world-4/lab/content.tsx), lines 76–79 | Separate active-card border and unlock artwork. Select Alchemy's 1px green border. | Lab's 2px border, whole-card dimming, or invented participation badges. |

The first six guide card density, progress, rates, summaries, hierarchy, and state. Stamps guides tooltip attachment. Players/Obols remains navigation authority. Shared primitives alone are not counted as separate examples.

Toolbox remains content/art reference only. Its earlier inspected Hole profile establishes adjacent progression, recognizable game art, and direct benefits. Its layout, cards, colors, drawers, five-tab IA, sorting, and percentage-reduction claims are not adopted.

## Study tooltip provenance

Every surviving Study tooltip uses `Study.getDescription().replace(/_/g, " ")`, not authored explanation. Generated templates live in [StudyRepo](../../data/domain/data/StudyRepo.ts). Accepted [materialization](../../data/domain/world-5/hole/hole.tsx), lines 456–460, inserts the saved-level bonus; multiplier templates use the accepted multiplier branch. Only known saved levels of at least one may display these owned-rule descriptions. Do not show unresolved tokens or default-level text when saved level is missing.

| Identity | Decision and provenance |
|---|---|
| Well | Retain generated description, `StudyRepo.ts:9–14`. Materialize bucket fill from the saved level and retain the genuine sediment rule. |
| Motherlode | No tooltip. Generated wording could imply a literal resource reduction. Show the concise cheaper-layer benefit, without secondary arithmetic. |
| Dawg Den | Retain, `StudyRepo.ts:21–26`. Materialize golden-hound score from the saved level and retain its owned respawn rule. |
| Bravery | Retain, `StudyRepo.ts:27–32`. Materialize capped minimum damage from the saved level and retain the owned trivial-fight skip. |
| Bell | Retain, `StudyRepo.ts:33–38`. Materialize random bonus levels from the saved level and retain the every-twentieth-ring rule. |
| Harp | No tooltip. Show accepted direct effects. Do not change or explain the backend description/effect discrepancy during UI delivery. |
| Lamp | No tooltip; the generated description adds no needed detail beyond the direct daily-wish benefit. |
| Undying Hive | No tooltip; avoid literal-reduction wording. |
| Gloomie Mushroom Grotto | No tooltip; generated wording repeats the direct credited-kill benefit. |
| Justice | Retain, `StudyRepo.ts:63–68`. Materialize Opal chance from the saved level and retain the genuine additional fourteen reward days. |
| Jars | No tooltip. Generated “Double click” is an in-game instruction, not a website action. Keep enchantment chance only; omit target preference and its caveat. |
| Evertree | No tooltip; avoid literal-reduction wording. |
| Wisdom | No tooltip. Generated unconditional recovery wording omits the accepted normal-story capacity condition. Keep starting attempts only; omit the recovery rule and explanation. |
| Gambit | Retain, `StudyRepo.ts:87–92`. Materialize points from the saved level and retain the genuine **50%** attempt-preservation rule. |
| Temple | No tooltip; generated description duplicates the direct double-torch benefit. |
| Fountain | No tooltip. Generated repeat-marbleization wording does not establish individual upgrade eligibility. Keep marble production only; omit secondary rule, exclusions, and disclaimer. |
| Bottomless Trench | No tooltip; avoid literal-reduction wording. |
| Crystal Glunko Cove | No tooltip; generated description repeats the direct discounted-upgrade limit and cost. |

Remove old authored Study detail bodies, the top participation tooltip, and equivalent teaching/caveat text in smaller card text. Unavailable effect reasons remain visible beside affected benefits. Apply the same concise benefit renderer to cavern-local views.

## Verified cavern image map

Original game-art caller: `../IdleonWikiBot/codefiles/idleon1.22.txt:266057–266075`. The selected cavern index `_DN1` selects `HolePOI{index}.png`. Jars uses `HolePOI10_{JarAesthetic}.png`; use existing `HolePOI10_0` as neutral identity artwork, not a claim about the saved aesthetic. Generated `StudyRepo.ts:9–115` and the accepted name array establish the same identity order.

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

Pass measured metadata through `IconImage`; its established accessor resolves `https://cdn2.idleonefficiency.com/images/{location}.png`. Preserve aspect ratio inside a 64×56 Study slot, 32×28 navigation slot, and larger selected-cavern slot. Do not stretch, crop away the object, add images to `public`, or run WikiBot.

## Integration and verification

Read existing Hole and Player objects through `useAppDataStore`, retaining `lastUpdated`. Keep route metadata, shared navigation, calculations, and parsing unchanged. Local state owns tab/rail selection, search/filter, and optional useful character inspection. No endpoint, engine, recommendation, forecast, persistence, or game action is added.

Verify the actual `/world-5/hole` production surface at 1440×1000 with one real save. Focus on compact summary sizes, whole-body tooltip clipping and hover continuity, wheel access to allocation and final shared sources, compact Another Try facts, Lantern locations, and full-opacity Study bodies/artwork with truthful participation borders.

Use clearly labeled provider-clone display fixtures for negative/fractional adjustments; missing totals, sources, allocation, and reset inputs; locked/unaffordable resets; alternate/missing Lantern locations; unknown access/participation; claim readiness; and missing Study progress, level, or benefit. These fixtures prove presentation, not gameplay or fresh calculation parity.

Preserve the 3+2 villager grid, all 18 Study/art/navigation identities, 8px progress bars, all six exact generated descriptions, local navigation, and unchanged URL. Retain scenario and production source, errors, and before/after preservation records in private artifacts. Record completed commands, captures, numerical observations, failures, and check limits only in the [current handoff](hole-research-brief.md#current-handoff).

