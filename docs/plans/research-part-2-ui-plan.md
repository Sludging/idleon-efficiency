# Research Part 2: UI plan

## Player outcome and scope

Players can distinguish earned, spent, and available Points. They can inspect all 60 real Grid upgrades and all ten Shapes. Current effects, separate conditions, and actual saved coverage explain what their account receives now.

This plan delivers [Part 2 — #463](https://github.com/Sludging/idleon-efficiency/issues/463) through the accepted backend. The [specification](research-spec-draft.md), [delivery outcomes](research-delivery-parts-draft.md#2-grid-upgrades-points-and-shapes), and [backend plan](research-part-2-backend-plan.md) define scope. The [current handoff](research-research-brief.md#current-handoff) owns approval state, preview references, supplied evidence, and limits.

Extend `/world-7/research`. Preserve Part 1's three summary groups, four tabs, initial Observations selection, searches, sorts, illustrations, and source tooltips. Append **Grid** and **Shapes** to the same `ContentTabs`. Render only the selected content. Points belong above the Grid catalogue, not in another page-wide summary.

No board, invented upgrade categories, view switch, optional unlocked filter, planner, purchase control, Shape placement control, activity panel, or related-activity navigation is needed. Search and tab selection remain read-only.

## Visual direction and composition

Use Impeccable Operate mode inside the existing Game Ledger world. Preserve Rubik, `dark-1` (#1E2127), `dark-2` (#1B1D24), pale text (#efefef), brand blue (#0376E3), and supporting grey (#BEC2CC). Keep the ordinary Research heading and shared outer wrapper. Add no new page width, font, palette, or horizontal inset.

Use full-width **DataRow** records for upgrades. The player compares identity, purchased level, current effect, and reachability across many records. Aligned rows make these differences easier to scan than 60 variable-height cards. Preserve DataRow's shell, small padding, compact typography, field gaps, and details composition. Stack rows with `gap="small"`.

Use DataRow records for Shapes too. Each record keeps recognizable game artwork beside its generated name. Fields show ownership, the code-backed bonus factor, actual position, and rotation. Visible details show the static description and complete covered-upgrade names. Do not draw a second game board.

```
Research
[Accepted Part 1 summary groups]
Observations | Lenses | Posty Notes | Papers | Grid | Shapes

Grid
Points: available | earned | spent     Point sources: name + applied Points
Each purchased level costs 1 Point.
Search [names or effects]  [Clear search]
Name       Level / cap       Current effect                 Grid access
           Shared Grid factor; active Shape; linked conditions when relevant
...all 60 upgrades in game order...

Shapes
Owned Shapes / 10 | Rotation requirement     Supported ownership sources
Name + art   Owned / Not owned   Bonus factor   Position (px)   Rotation
             Static description; complete active covered-upgrade names
...all ten definitions in game order...
```

Use existing game imagery where the game provides it. Keep the accepted Research skill artwork in the summary. Shape artwork belongs beside Shape names and beside active Shape references in upgrade details. Do not invent one upgrade sprite per entry when the game identifies upgrades with text. Route all images through `IconImage` with verified metadata and the existing CDN. Never add images to `public`.

## Information and interactions

### Points and sources

Keep available, earned, and spent Points together in one dark-1 section. Put all prepared Point contributor names and applied values beside these totals. Use a compact two-column source list within the same section. Keep zero contributions readable with the existing inactive source opacity; do not imply they are acquired rewards. A capped contributor may show its prepared cap and condition in a value-attached `TipDisplay`.

Show the prepared cumulative ten-level reward and its Points-per-ten-level context. Do not infer the next award or recompute totals. State **Each purchased level costs 1 Point.** Do not add target costs, affordability forecasts, or a purchase button. Preserve a negative available balance if the backend supplies one.

### Complete upgrade catalogue

An empty search shows all 60 `research.upgrades` records in game order, including unpurchased and maxed upgrades. Exclude the 180 placeholder positions. A persistent **Search** label and **Search names or effects** placeholder match Part 1's control treatment. Case-insensitive search matches generated names and the displayed populated effect descriptions. Clear search restores all entries. No match shows **No Grid upgrades match this search.**

Each row shows:

- Generated name.
- Purchased level and cap from `getLevel()` and `maxLevel`; identify a reached cap without hiding the record.
- The complete populated `getDescription()` as **Current effect**. Render the existing underscore and `@` separators through the normal display convention. Do not rewrite static prose.
- **Grid access:** reachable, or requires a purchased adjacent square. Explain adjacent as directly left, right, above, or below. Do not imply Point balance or an outside prerequisite determines reachability.
- Visible details for the shared Grid factor, one active Shape name and factor, and relevant linked inputs or requirements. A square without an owner shows **No active Shape**. Do not add together overlapping Shapes.

Keep purchased rows at full opacity and unpurchased rows at 0.6, following the selected upgrade-row reference. Keep textual reachability separate from this purchase-state treatment. Each populated description already includes its current numeric effects. Do not add an unlabeled second number for every primary or secondary backend value. Show a separate secondary result only when it clarifies a linked effect that the description does not fully establish.

### Linked effects and separate conditions

Keep these details beside their owning upgrade, not in another activity catalogue:

| Upgrade or family | Visible state and condition |
|---|---|
| Eclectic Sigils | Research grant, Lore Boss 7 requirement, owning tunnel identity from the prepared prerequisite (`Bizarrio`), and effective unlocked state. The tunnel name is not the boss name. |
| Masterius Cookerius | Unchanged static Rift 61 description, Cooking Mastery unlocked state, Research grant, current EXP multiplier, and effective active state. Use the accepted code-based state. Do not infer a hard Rift 61 gate from prose. |
| Revival of the Undead Battalion | Combined boat loot and speed level 400 condition, qualifying boat count, Research grant, and effective affected-boat count. No boat progression list. |
| Crown upgrades | Reclaimed Gaming crowns, prepared bonus per crown, and prepared total. No Gaming inventory. |
| Glimbo Insider Trading Secrets | Total trades, complete 100-trade blocks, prepared bonus per block, and prepared total. No trade catalogue. |
| Masterclass Research | Deathbringer, Windwalker, and Arcane Cultist; daily reduction and accumulated current reduction. Do not include Royal Guardian. |
| Divine Design | Drop Rate, Arctis grant, King Doot condition, and prepared shared Grid contribution remain separate. Use the backend's selected source-authored description. Do not impose an unconditional ×1.05 factor. |

### Shapes and active coverage

Show all ten definitions in game order. Ownership already follows an ordered prefix, so no ownership sort is needed. Show one **Owned Shapes: count / 10** summary. Its adjacent sources use `shapeOwnership.contributors`; explain that supported sources are not a complete obtainability promise. Do not repeat the cap in every row.

Show the prepared rotation requirement once: Research level 90. An owned Shape shows its actual saved x/y position in **pixels** and `rotationModuloDegrees` in **degrees**. A genuinely absent placement shows **No saved placement**. Unowned definitions show no hypothetical coordinates or implied active coverage. No drag, rotate, or placement controls appear.

Each Shape shows its prepared `bonusMultiplier` as **Grid bonus factor**. Show its unchanged populated static description separately. This preserves Cyan Hexagon and Maroon Triangle's source text without claiming extra Research EXP; the numeric Grid factor follows game code.

List every `coveredUpgrades` name beside its Shape. These are upgrades for which that Shape is the saved active owner, not a reconstructed polygon intersection. An owned Shape with no active real upgrades shows **No active upgrade coverage**. Each upgrade row names its own active Shape, providing the reverse reference. No geometric-overlap or strongest-Shape rule is inferred.

## Data, integration, and states

The existing Research client component owns selected tab state. Separate Grid and Shape renderers consume `ResearchGrid` without moving backend logic into React. Preserve `useShallow`, `lastUpdated`, the completed-load guard, route metadata, and Part 1's normal account provider.

Use prepared `points`, `pointMilestone`, `upgrades`, `shapeOwnership`, and `shapes`. Upgrades own populated descriptions, cap, reachability, shared factor, active owner, prerequisites, and `linkedState`. Shapes own saved placement, display rotation, modifier, and reverse coverage. Format numbers with `notateNumber` and `commaNotation`; search and formatting are view work. Do not derive Point formulas, game gates, coverage, or special effects in the UI.

The accepted backend supplies all requested numerical and condition state. Shape sprite identities are source-backed: `../IdleonWikiBot/codefiles/idleon1.22.txt:284483` creates `ResShape{index}.png`. All ten actual CDN images loaded in Chromium; their natural dimensions match generated Shape width/height. Production needs only a narrow `ResearchShape.getImageData()` accessor using those existing fields, not a new static catalogue or generated edit. The disposable preview supplies this metadata locally. No backend edit is made during planning. Show the prepared shared Grid factor without inventing a constituent breakdown the backend does not expose.

Loading uses the existing account status and local missing-domain guard. A zero-owned account still shows ten definitions. Zero purchased upgrades still shows 60 entries. No-match search does not remove Point context. Preserve genuine missing placements and valid zero effects. Do not synthesize save states to demonstrate these cases.

## Verification

Use the private Docker real-save fixture and existing UI runner. A disposable preview uses the accepted provider, theme, shared tabs, DataRow, and game CDN assets. Compare rendered labels and values with public prepared backend results. Never set store state, mutate the save, rerun accepted backend tests, or present mock data as game evidence.

For UI delivery, exercise six shared tabs, 60 default upgrades, ten Shape definitions, Point totals and source values, purchased levels/caps, full effect text, reachability, linked conditions, active owner references, ownership, saved positions, display rotations, and complete reverse coverage. Check name search, effect search, clear search, no-match state, and loaded game artwork. Confirm no new backend arithmetic or gameplay controls. Preserve the real fixture and all Part 1 behavior.

Inspect the 1440×1000 desktop preview and scoped console/page errors. Record inherited errors separately from Research failures. Keep screenshots and runtime evidence private. Unobserved real-save branches remain unobserved; rendering does not establish new original-game parity, rotation actions, geometry, all-source obtainability, or current connected-release parity.

## References

- [UI work guide](../agents/ui-patterns.md), [Data rows](../agents/ui-rows.md), and [UI verification](../agents/ui-verification.md).
- [Accepted Part 1 UI plan](research-part-1-ui-plan.md), shared ContentTabs, Research summary, Stamps search, Atom DataRow fields, and Sneaking artwork/name grouping.
- [Official Research Wiki](https://idleon.wiki/wiki/Research): player terminology, Points spent on adjacent Grid tiles, Shape recognition, and single-owner coverage context. Accepted code and human decisions govern conflicting prose.
- [IdleonToolbox Research public profile](https://idleontoolbox.com/account/world-7/research?profile=liiiiiiiiiiiig): observed Grid card names, level/cap, populated effects, and Shape multiplier context. Retain those useful information relationships, not its dashboard, timers, view switch, card borders, spatial board, sidebar, or colors.
