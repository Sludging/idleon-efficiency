# Research Part 2: UI plan

## Player outcome and scope

Players see available Points relative to earned Points. They can scan all 60 real Grid upgrades and all ten Shapes. Current effects, linked conditions, and saved active coverage explain their account's benefits.

This plan covers [Part 2 — #463](https://github.com/Sludging/idleon-efficiency/issues/463) through the accepted backend. The [specification](research-spec-draft.md), [delivery outcomes](research-delivery-parts-draft.md#2-grid-upgrades-points-and-shapes), and [backend plan](research-part-2-backend-plan.md) define scope. The [current handoff](research-research-brief.md#current-handoff) owns selection, approvals, preview references, evidence, and limits.

Refine Grid and Shapes within `/world-7/research`. Preserve Part 1's three summary groups, artwork, tabs, initial Observations selection, searches, sorts, and source tooltips. Keep Grid and Shapes in the same `ContentTabs`. Render only the selected content.

No board, invented categories, view switch, planner, purchase control, placement control, activity panel, or related-activity navigation is included. Search, filters, tabs, and tooltips remain read-only.

## Visual direction and composition

Use Impeccable Operate mode within the existing Game Ledger world. Preserve Rubik, charcoal surfaces, pale text, brand blue, shared tabs, and the ordinary Research heading. Inherit the shared page width and outer padding.

Use dense `dark-1` cards in a flat catalogue. At 1440×1000, use four equal columns with small card padding and small gaps. Keep complete effect text visible without truncation. Cards may grow for longer descriptions; do not force clipping or a fixed height. Keep name, Level ratio, and effect together. Do not add card borders, new colors, or upgrade sprites.

The Sneaking card reference supplies identity/detail grouping and dark surfaces. The human-selected density is smaller than Sneaking's medium padding. Part 1 Observation cards supply the relevant three-state opacity analogy. These are scoped choices, not new site-wide defaults.

```
Research
[Unchanged Part 1 summary groups]
Observations | Lenses | Posty Notes | Papers | Grid | Shapes

Grid
Points  0/115 available [source tooltip]     Shared Grid factor ×[prepared value]
Search [names or effects]  State [All]  [checked] Show maxed  [Clear filters when changed]
[Name                         active Shape art]
[Level 1/5]
[Complete current effect]
[Linked details tooltip, only when relevant]
...60 cards in game order...

Shapes
Owned Shapes 5/10 [source tooltip]     Rotation requires Research level 90
Search [names or effects]  State [All]  [Clear filters when changed]
[Game art + name]
[Complete static description]
[Grid bonus ×prepared factor]
[Saved position in px; rotation in degrees, when owned]
[Active coverage (count) tooltip with every saved-owner upgrade]
...ten cards in game order...
```

Use `IconImage` with the existing domain image metadata and CDN. Shape artwork belongs beside Shape names and at the top-right of upgrades with an active Shape. Preserve aspect ratio. Bound active-owner artwork to 36px; use a compact display size that does not compete with the name. Do not fabricate artwork for upgrades without game sprites. Do not add images to `public`.

## Information and interactions

### Points and shared factor

Show one **Points** value: **0/115 available** for the retained save. The numerator is `points.available`; the denominator is `points.earned`. This is available/earned, not an earned or spent summary. Do not render separate earned or spent fields. Preserve a negative available value if supplied.

Attach the existing value-source `TipDisplay` pattern to Points. Match the four Part 1 examples: Research EXP, offline percentage, Insight, and lens ownership. Keep source names, intrinsic rewards, applied values, supported caps, and conditions readable. Use inactive source opacity without an inactive suffix. Preserve cumulative ten-level reward context and **Each purchased level costs 1 Point.** within this tooltip. Do not add a visible source catalogue or a spending forecast.

Long source tooltips scroll within the viewport. Keep each source's text and conditions together without shrinking or overlapping blocks. The scrollable body remains focusable so players can reach every source by keyboard.

Show the prepared **Shared Grid factor** once above the catalogue. It remains separate from each active Shape's factor. Do not repeat it on every card or invent a constituent breakdown.

### Grid cards and state

Keep all 60 `research.upgrades` records in game order. Exclude placeholder positions. Each card shows:

- Generated name.
- **Level** with purchased level/cap from `getLevel()` and `maxLevel`.
- Complete populated `getDescription()`, using the existing underscore and `@` formatting.
- A small top-right active Shape image, only when an owner exists.
- Relevant linked conditions and secondary context through a focusable details tooltip.

Do not use **Level / cap**, **Maxed**, **Grid Access**, or **No active Shape** labels. The ratio already communicates the cap. No Grid access column or tooltip is included.

Classify display state in this order:

1. `getLevel() > 0`: **Leveled**, opacity **1**.
2. Not leveled and prepared `reachable`: **Reachable**, opacity **0.65**.
3. Not leveled and not prepared `reachable`: **Unreachable**, opacity **0.35**.

Purchased state wins the presentation classification. Preserve the independent prepared reachability fact unchanged. Do not infer reachability from Point balance, external prerequisites, or opacity. These opacities express catalogue state, not linked-unlock state.

The active Shape artwork has a hover/focus tooltip with its generated name and prepared bonus factor. Do not repeat its name or factor visibly within the card. An owner-free upgrade has no artwork or empty tooltip. Saved single-owner state remains authoritative; do not add overlapping factors.

### Grid controls

Retain persistent **Search** labeling and **Search names or effects**. Match generated names and populated displayed effects case-insensitively.

Add **State** with exactly **All**, **Leveled**, **Reachable**, and **Unreachable**. The categories are mutually exclusive. Reachable means not leveled but reachable. Start at **All**.

Add **Show maxed**, initially checked. When unchecked, exclude records whose purchased level reaches their cap. Apply search, State, and Show maxed together. The defaults show all 60 entries, including maxed and unreachable entries. Do not add sorting or an unlocked checkbox.

A no-match result says **No Grid upgrades match these filters.** Keep Point context and controls visible. **Clear search** clears only search text. **Clear filters** resets search, State to All, and Show maxed to checked. Show the reset action when any control differs from its default.

Classification, filtering, and maxed comparison are view-owned display logic. They do not change backend state or recalculate game arithmetic.

### Linked conditions and source descriptions

Keep complete static descriptions visible. A linked details tooltip remains beside its owning card. Do not create another activity catalogue. Keep these supported facts complete:

| Upgrade or family | Required details |
|---|---|
| Eclectic Sigils | Research grant, Lore Boss 7 requirement, prepared tunnel identity `Bizarrio`, and effective unlocked state. The tunnel is not the boss name. |
| Masterius Cookerius | Unchanged Rift 61 source description, code-backed Cooking Mastery unlocked state, Research grant, current EXP multiplier, and effective active state. Do not derive the gate from prose. |
| Revival of the Undead Battalion | Combined boat loot/speed level 400 condition, qualifying boat count, Research grant, and affected-boat count. |
| Crown upgrades | Reclaimed Gaming crowns, prepared bonus per crown, and total. |
| Glimbo Insider Trading Secrets | Total trades, complete 100-trade blocks, bonus per block, and total. |
| Masterclass Research | Deathbringer, Windwalker, Arcane Cultist, daily reduction, and accumulated current reduction. Exclude Royal Guardian. |
| Divine Design | Separate Drop Rate, Arctis grant, King Doot condition, and prepared shared Grid contribution. Preserve the selected source-authored description. |

Do not duplicate numbers already explained by the populated effect. Tooltip relocation reduces card height without deleting conditions or confusing them with catalogue reachability.

### Shapes and coverage

Show all ten definitions in game order. Keep one **Owned Shapes 5/10** summary for the retained save. Attach supported ownership sources to this value through the same focusable source tooltip pattern. Do not show a visible source catalogue. Explain within the tooltip that supported sources do not establish complete all-source obtainability. Preserve milestone context without promising the next pictured Shape.

Use dense illustrated cards. Owned Shapes have opacity **1**; unowned Shapes have opacity **0.35**. Do not repeat **Owned** or **Not owned** labels on cards. Show one **State** dropdown with **All**, **Owned**, and **Not owned**, initially All. Keep name/effect search and the same clear/no-results behavior. Search matches generated names and populated descriptions. **No Shapes match these filters.** remains separate from actual ownership.

The analogy stops at ownership. Shapes have no level/cap or maxed concept. Do not add Level, Reachable, Unreachable, Show maxed, or invented access state. Keep the ownership summary stable while filtering.

Keep complete source descriptions visible. Show each Shape's prepared **Grid bonus** factor once. Preserve Cyan Hexagon and Maroon Triangle's EXP prose separately from their code-backed Grid factors. Do not invent extra EXP production or rewrite the descriptions.

Show the Research level 90 rotation requirement once above the catalogue. Owned Shapes retain actual saved position in pixels and modulo rotation in degrees. Genuine absent placement remains **No saved placement**. Unowned definitions receive no hypothetical position, rotation, or active coverage.

A focusable **Active coverage (N)** tooltip lists every `coveredUpgrades` name in game order. This is saved single-owner coverage, not polygon intersection. Owned Shapes with no active real upgrades show **No active upgrade coverage**. Upgrade artwork tooltips provide the reverse reference. Preserve all names; do not replace them with a sample, ellipsis, or geometric estimate.

Keep linked-detail and coverage tooltips within the viewport. Preserve readable block heights and allow scrolling instead of clipping or overlapping long lists.

## Data, integration, and states

The existing client surface owns tabs and catalogue controls. Grid and Shape renderers consume the accepted `ResearchGrid`. Preserve grouped store selection, `lastUpdated`, completed-load guarding, metadata, and normal account provider behavior.

Reuse `points`, `pointMilestone`, `upgrades`, `shapeOwnership`, and `shapes`. Reuse existing `ResearchShape.getImageData()` for artwork. Reuse prepared descriptions, level, cap, reachability, shared factor, active owner, prerequisites, linked state, saved placement, display rotation, modifier, and reverse coverage. Format with existing `notateNumber` and `commaNotation` helpers. Add no backend fields, formulas, endpoints, exports, or generated changes.

Loading uses existing account status and local missing-domain guarding. Default controls preserve 60 upgrades and ten definitions even when no upgrades or Shapes are owned. Filtering does not remove account context or rewrite ownership. Preserve zero effects and genuine missing placement. Do not synthesize saves to demonstrate branches.

## Preview and delivery verification

Use a disposable route, existing theme/components, and the retained real save through the normal provider. Render actual prepared values. Production files remain read-only during planning. Never set store state, mutate the fixture, copy backend formulas, or rerun accepted backend tests.

Capture Grid and Shapes at 1440×1000. Inspect catalogue density, full descriptions, three Grid opacities, active-owner artwork, source tooltips, linked details, saved placement, rotation, and complete coverage. Exercise defaults, every State option, Show maxed, name/effect searches, combined filters, no-results, and both clear actions. Check source/owner/detail tooltips by hover and focus. Preserve Part 1's initial selection, tabs, searches, sorts, and tooltips.

Compare visible information with prepared domain results. Record exact screenshots, exercised controls, observed states, fixture preservation, errors, and cleanup in the current handoff. Separate inherited errors from Research failures. Unobserved real-save branches remain unobserved. Preview proof does not establish fresh original-game parity, geometry, gameplay actions, or all-source obtainability.

Remove disposable routes/scenarios after capture. Preserve private evidence and the real save.

## References

- [UI work guide](../agents/ui-patterns.md) and [UI verification](../agents/ui-verification.md).
- [Accepted Part 1 UI plan](research-part-1-ui-plan.md), Observation card state treatment, four value-source tooltip examples, shared ContentTabs, and Sneaking identity/detail grouping.
- [IdleonToolbox Research public profile](https://idleontoolbox.com/account/world-7/research?profile=liiiiiiiiiiiig): Grid names, ratios, effects, and Shape relationships. Reference only; preserve this website's typography, layout, surfaces, and controls.
- [Official Research Wiki](https://idleon.wiki/wiki/Research): established player terminology and adjacency/Shape context. Accepted source rules and human decisions govern conflicts.
