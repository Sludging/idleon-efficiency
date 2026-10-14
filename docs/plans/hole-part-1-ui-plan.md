# The Hole part 1: UI plan

## Player outcome and boundary

For [#441](https://github.com/Sludging/idleon-efficiency/issues/441), help players read saved villager progression, Opal investments, growth rates, Lantern resources, and owned Study benefits. Use the accepted backend without changing calculations or save state.

Keep exactly **Villagers → Upgrades → Caverns**. Upgrades keeps **Majik → Schematics → Studies → Measurements**. Caverns keeps all 18 numbered identities in game order. This part does not implement later-part tools. The new presentation has no deep links, URL selection, source destinations, return links, or automatic scroll/focus movement.

## Information hierarchy

### Villagers

Open on Villagers. Keep all five villagers visible together as aligned `DataRow` records. Each record shows name/role, level, invested Opals, stored EXP / next requirement, EXP/hour, and one concise next-unlock statement. Show rescue or claim-ready status only when it changes interpretation. Do not repeat “rescued”, “not ready”, ownership, or save instructions on every record. Use **Ready to claim in game** without increasing the saved level.

Keep numbers visually stronger than muted labels. Group stored EXP and its requirement in one field. Keep next unlock as plain text, not a link. Use **Next cavern**, **Next schematic**, **Next Measurement**, **Next Majik point**, or **Study speed** instead of “intrinsic unlock” or schema language. For availability rather than purchase, the label or tooltip states that distinction once. Say **All released caverns available** where appropriate.

Attach a conventional `TipDisplay` to the rate label/value. Keep useful nonzero modifiers, purchased multiplier, role multiplier, and the character-bound Villager Statue effect once. Use canonical helpers to round displayed non-count percentages and multipliers to meaningful precision. Explain equal imported rates in one short sentence. Keep exact arithmetic and game-parity limits in backend evidence, not this tooltip. Remove Growth details buttons, repeated contributor tables, owner columns, raw combination/unit metadata, neutral multipliers, and zero bonuses. Keep reasons for unavailable rates visible; a tooltip may supply further context. Shared modifiers need not be duplicated as a full breakdown under every villager.

Below the records:

- **Opals:** available, invested, and earned counts, with cavern/external attribution in the earned-count tooltip. Keep a local **Opal sources** disclosure for useful nonzero source counts and reconciliation adjustments. Names are text. Omit verified zero rows; retain missing attribution and incomplete-total warnings. Exact fractional counts remain available.
- **Investment bonuses:** Equal Spread's current bonus and minimum unlocked-villager investment. Put each villager's Opal Enthusiasm bonus beside its investment tooltip, rather than repeating five investments in another table.
- **Another Try:** one compact read-only summary of six-wish cost, owned wishes, and availability/affordability. A tooltip explains the four reset categories and what each retains. No reset button or instruction-manual section.
- **Blinding Lanterns:** total stock, uses today / 12, and **+2 hours**. A stock tooltip lists only nonzero locations, such as **Storage: 37**. No eleven zero-only inventory rows or disclosure button when only one location matters. Missing location inputs remain unavailable, not zero. A concise effect tooltip retains relevant exclusions.

### Character-dependent growth

Only the accepted **Villager Statue** contributor is character-bound here. Its backend owner is `statues:{playerId}:28`. Hole reads Statue index 28 through that same imported Player's statue record. The game multiplies villager EXP/hour by **1 + Villager Statue bonus / 100**. Shared Hole progression, Opal investment, and other prepared growth inputs do not change when inspecting a character.

Retained real-save evidence shows all 11 imported characters have the same Villager Statue bonus and five rates. Display rates at approximately **1.65T, 407B, 3.57T, 407B, 407B EXP/hour**. Keep unrounded Statue values and character-context parity limits in the [retained evidence](hole-research-brief.md#fifteen-finding-ui-revision-planning).

Compare complete backend numeric records, not rounded display strings. When all imported contexts are available and equal, show rates immediately with **Same rates for all 11 imported characters**. Remove the selector and identical comparisons. The tooltip shows the character-bound Villager Statue effect once and explains the imported equality once. Do not call this an account-wide rate or choose an arbitrary character's rate as one.

When contexts differ or one context is unavailable, show **Character rates differ** or **Some character rates unavailable**. Offer an optional, initially unselected named-character inspection control. Shared progression stays visible. Before selection show the truthful range of available rates, with the incomplete-context warning where needed; after selection show **Rates for [name]** and that character's matched tooltip. Never treat unavailable contexts as equal or silently omit them from an “all characters” claim.

### Upgrades → Studies

Use the players/obols composition: `ShadowBox`, a 25% left rail padded medium, and a dark-1 right panel. Use the unmodified `LeftNavButton` selected background, muted label, bold selection, and arrow. No detached blue side pills, extra borders, or competing selected colors. Select Studies on first entry; retain local selection while mounted.

Show current Study speed once, plus **Studying: Wisdom** and **Also studying: Evertree, Gambit** for the retained save. Explain neighbor participation in one tooltip. Do not repeat the full shared rate breakdown on every Study.

Keep **Search Studies** by name and effect, and **Show unlocked**, initially off. Show all 18 records in game order. Each shows cavern identity/artwork when verified, saved level, stored progress / next requirement, current rate or inactive status, and one useful owned-benefit presentation. Use **Studying**, **Also studying**, and **Inactive** for participation. Known inactive zero is not an unavailable rate. Claim-ready and lock states remain truthful.

Replace Study details tables with direct benefit language and justified tooltips. Do not show a generated description and a second complete copy of its effects. Display actual values with their unit embedded: **+22 daily wishes**, **1.21× credited Gloomie kills**, or **First 35 upgrades each day cost 15% less**, as applicable to imported values. For cross-skilling Studies, the main row shows only **Cheaper layers in other skilling caverns**. Its tooltip holds the per-completed-layer and current accumulated arithmetic. Explain once that completed layers, other Studies, and collectibles combine to lower resource costs. Do not present accumulated percentages as resource reductions. Use no divisor, unit, or scope terminology and add no reduction calculator.

Retain important conditions once: Jar preference is not guaranteed; Wisdom recovery needs normal-story Instamatch capacity; Fountain's owned repeat-marbleization rule does not prove upgrade eligibility; Cove limits discounted upgrades, not purchases. Keep missing-input reasons readable beside affected benefits. Remove **Unit: percent**, **Scope: owned study contribution**, **Effect type**, owner fields, raw keys, and repeated rule metadata.

Apply the same precision and repetition rules to surviving tooltips. Preserve exact resource counts, fractional grants, necessary conditions, and missing-input reasons.

### Caverns

Use the same players/obols rail and all 18 names. Each selected cavern shows its own identity, its earned Opal count where useful, and only its local owned Study benefit. Do not copy other Studies' complete effects into every cavern. Do not create contributor/source landing surfaces to replace removed links. Show one concise website-support notice for undelivered local tools; do not imply a game lock.

## Visual and integration contract

Preserve Rubik, ordinary medium/normal feature heading, inherited page width/inset, charcoal surfaces, and shared component typography. Use brand blue for ordinary selected content tabs, accent-2 labels, and accent-4 rail selection. Surviving local disclosure controls inherit established Grommet/SmallButton treatment. No deep-link anchors remain inside feature content. Do not import competitor color, layout, five-tab topology, drawers, cards, ETA sorting, or total villager-rate calculation.

Reuse `DataRow`, `ContentTabs`, `LeftNavButton`, `TextAndLabel`, `ComponentAndLabel`, `TipDisplay`, `IconImage`, and canonical number/resource formatters. Use selective medium values, short muted labels, and game imagery beside identity. Avoid a second page wrapper or new generic presentation framework.

Verified broader asset inventory supplies `HoleUIvillager0`–`HoleUIvillager4`, each **303×64**, visibly matching Polonai through Bolaia. All five loaded from this site's CDN with those native dimensions. Render each banner through `IconImage` with measured metadata, clipping its left **56×64** artwork region at an appropriate scale; do not show baked-in heading text or create replacement portraits. Reuse Bolaia's verified artwork for the Studies heading where useful. Opal and Lantern keep existing item metadata. This fixes the earlier narrow search's false claim that villager art was unavailable. The broader inventory includes Hole POI, Study-page, schematic, and local-resource art, but no verified identity-to-thumbnail mapping yet; do not guess that mapping or use unrelated images as cavern portraits.

Read accepted domain values through the existing store, with `lastUpdated` for mutable-domain refresh. Keep route wrapper and navigation entry intact. Local state owns tabs, rail selection, search/filter, and optional character inspection. Remove URL parser/writer, owner maps used only for navigation, source panels, destination effects, selected-Study pinning for deep links, and obsolete link-specific tests when implementing this plan. No new endpoint, store, engine, forecast, recommendation, or game action.

## Fifteen presentation decisions

1. Use concise game terms and player-facing labels; remove intrinsic/owner/scope/combination jargon.
2. Browser-inspect Toolbox for adjacent progression, recognizable imagery, rate tooltips, participation, and benefit clarity only.
3. Restore actual shared component colors; remove default-colored deep-link anchors rather than recoloring obsolete links.
4. Delete every deep link and link-only destination. Selection stays local.
5. Replace Growth details buttons with rate tooltips for useful advanced context.
6. Remove duplicated fields, descriptions/effects, zero rows, neutral modifiers, and repeated contributor inventories.
7. Strengthen value/label hierarchy and aligned grouping through established rows and labeled-value patterns.
8. Name Villager Statue (Statue28), prove imported equality, hide redundant selector only when complete numeric contexts agree.
9. Show truthful Lantern total/use; disclose only useful nonzero locations and missing-location reasons.
10. Keep only progression/effect context, normally in tooltips; remove manual-like prose.
11. Remove all automatic scrolling/focusing from tab and rail selection.
12. Match actual players/obols padded rail, selected arrow/background, and dark-1 content panel without changing ownership.
13. Use verified site/CDN metadata for relevant imagery; do not guess portraits, dimensions, or competitor URLs.
14. Keep cavern benefits local. Do not replicate the full Study catalogue or invent filler destinations.
15. Present numerical benefits with contextual units and one necessary condition; preserve unavailable state without engine schema.

## Verification

The disposable preview must render actual incumbent components/theme and imported backend values at 1440×1000. Exercise equal-context immediate rates, optional differing/unavailable context inspection as clearly labeled view fixtures, rate/benefit/resource tooltips, all tabs/rails, searches, missing-versus-zero states, nonzero Lantern locations, no feature anchors/URL changes, no owner scroll/focus, image loading, and local-only cavern benefits. Capture comparisons with players/obols navigation and relevant feature references. Save private screenshots/results, then remove temporary runnable routes/scenarios. Preview checks prove presentation only, not changed production behavior or new game parity. Production implementation requires a separate approved execution phase.

For the selected clarity revision, verify rounded non-count values, one Statue effect and equality explanation, and all four cross-skilling rows/tooltips. Check surviving tooltip conditions and missing-input reasons. Retain broader checks as prior evidence; do not imply new coverage.

## Sources

- [Current handoff and accepted evidence](hole-research-brief.md#current-handoff), [backend plan](hole-part-1-backend-plan.md#character-context-growth-mechanics).
- [UI guide](../agents/ui-patterns.md), [row contract](../agents/ui-rows.md), [verification](../agents/ui-verification.md), [DESIGN.md](../../DESIGN.md).
- Players `app/players/content.tsx:1217–1248`; Obols `app/account/obols/content.tsx:108–131`; `LeftNavButton.tsx:7–17`.
- `TextAndLabel.tsx:8–37`; `TipDisplay.tsx:25–59`; `ResourceDisplay.tsx:19–43`; Atom Collider `atomCollider.tsx:31–69`; Sneaking `sneakingUpgrades.tsx:19–36`; Legend Talents `content.tsx:30–59`.
- Accepted named contributor `data/domain/world-5/hole/villager.tsx:341–369`; effects `hole.tsx:372–451`.
- Retained imported equality: `.ui-verification/runs/2026-10-14T01-35-34-717Z-39415/hole-production-observations.json`, numeric `publishedRealSaveBaseline.villagers[].characterRates`.
- [Toolbox public Hole profile](https://idleontoolbox.com/account/world-5/hole?profile=liiiiiiiiiiiig), browser-inspected Explore and Study. Its literal percentage-reduction wording is not calculation authority.
- Broader source-art inventory: `data/icons/assets/data/HoleUIvillager0.png`–`HoleUIvillager4.png`, visually inspected and matched to accepted villager identities. Site CDN loaded all five at 303×64.

## Rendered preview references

The disposable preview uses actual IE components/theme and imported backend display values. Latest affected renders and final source: `.ui-verification/runs/2026-10-14T03-20-57-369Z-21418/`. The focused first run is `.ui-verification/runs/2026-10-14T03-15-31-921Z-5081/`. Unchanged broader references remain from `.ui-verification/runs/2026-10-14T03-04-25-025Z-73138/`.

- [Villagers and immediate equal-context rates](../../.ui-verification/runs/2026-10-14T03-04-25-025Z-73138/01-villagers-equal.png).
- [Rounded Statue effect and single equality explanation](../../.ui-verification/runs/2026-10-14T03-20-57-369Z-21418/baseline-rounded-rate.png).
- [Lantern stock with only its nonzero location](../../.ui-verification/runs/2026-10-14T03-04-25-025Z-73138/04-lantern-tooltip.png).
- [Studies with named skilling benefit and tooltip arithmetic](../../.ui-verification/runs/2026-10-14T03-20-57-369Z-21418/baseline-study-1-arithmetic.png).
- [All four revised skilling tooltips and missing-input displays](../../.ui-verification/runs/2026-10-14T03-20-57-369Z-21418/confirmation-contact-sheet.png).
- [Cove-local benefit without links or unrelated Studies](../../.ui-verification/runs/2026-10-14T03-04-25-025Z-73138/17-caverns-local.png).
- [Lantern exclusions without repeated allowance text](../../.ui-verification/runs/2026-10-14T03-20-57-369Z-21418/lantern-no-repeat.png).
- [Unavailable Statue once, with visible rate reason](../../.ui-verification/runs/2026-10-14T03-20-57-369Z-21418/unavailable-statue-once.png).

The prior broader directory retains all 18 Study captures, view fixtures, players/obols references, and interaction evidence. The focused and final directories record only their exercised clarity checks. These are presentation proofs, not production changes or new gameplay parity. Approval, exact commands, preservation, and check limits belong in the [current handoff](hole-research-brief.md#fifteen-finding-ui-revision-planning).
