# Spelunking Part 2: Journal, pages, and characters

## Player outcomes

Refine [Part 2 (#436)](https://github.com/Sludging/idleon-efficiency/issues/436) on `/world-7/spelunking`:

- Read daily page allowance, shared stamina recharge, and team refill before choosing a view.
- Compare every character's skill level, EXP progress, and saved / maximum stamina without redundant tooltips.
- Inspect known recharge contributors through a Research-style breakdown.
- Read Journal effects, levels, requirements, progress, and soft caps in aligned Outposts-style table rows.

This is an **Operate** surface in IE's current visual style. Present account progression and stats, not a planning calculator.

## Page composition

Keep the ordinary Spelunking heading, shared outer wrapper, Rubik, charcoal surfaces, and blue meters.
Use this order in both views:

1. Spelunking heading, without soft-cap help alongside it.
2. Compact Daily page reads and grouped Stamina summary.
3. Persistent compact character grid, without a Characters heading.
4. Existing `ContentTabs`: Tunnels and Journal & Pages.
5. Selected content. Journal alone includes About soft caps above its chapter grid.

Tunnels starts selected. Preserve Part 1 cards, artwork, totals, Show locked, and Collection status.
Keep both filter states when changing views. Add no tabs, selectors, or Part 3 content.
Keep existing small section gaps. Do not add another page-content width or horizontal inset.

### Summary and recharge detail

Keep compact dark-1 `ShadowBox` sections, small padding, and existing summary labels.

| Field | Visible value | Detail |
|---|---|---|
| Daily page reads | Remaining / limit, including the existing small label | No tooltip or information icon. |
| Recharge | Existing shared rate to two decimals, with stamina/h | Research-style contributor tooltip on the value. |
| Team refill | Backend duration, or Full at zero | Every named character's individual duration. No assumption paragraph. |

Remove the exact rejected paragraph: “Uses saved stamina with unchanged recharge and no spending. All characters recharge together. This is not a live timer.”
Do not replace it with another disclaimer. Retain all individual refill rows and their `playerID` associations.
Keep the backend account estimate: maximum individual duration, not a sum.
Do not extrapolate elapsed time, alter recharge, or roll daily reads forward.

Use Research Current gains as the recharge-tooltip composition reference:

- Attach `TipDisplay` to the dotted-underlined value, with a 4px underline offset and help cursor.
- Keep the existing 16px summary value. Use xsmall contributor text and bold group labels.
- Use heading **Stamina recharge**, maximum width 620px, and bounded 40vh content with vertical overflow.
- Show **Base** first with `baseHourlyRecharge` and stamina/h units.
- Put **Additive bonuses** and **Multipliers** in two equal columns, separated by a medium gap.
- Show all six additive entries as signed percentages and all four applied multipliers as ×factors.
- Keep prepared collection order. Retain zero and neutral contributors with opacity 0.6, as Research does.
- Use `notateNumber(value, 'Smaller')` for contributor amounts. Keep percentages distinct from multiplier factors.

Use intrinsic backend `source` strings. Remove underscore and `@` presentation separators only.
For the generated Meritocracy `}x` placeholder, insert the prepared multiplier factor in the UI.
The applied amount remains a ×factor. This substitution formats generated text; it does not recalculate recharge.
Keep both chapter page names, including Chapter Three and Chapter Six, so identical recharge effects remain distinguishable.
Do not import Research's reward framework, author source descriptions, or add producer APIs.

### Compact characters

Keep all actual characters in source order and the shared `CharacterBox` shell unchanged.
Retain class portrait, 12px name, neutral grey-1 border, inline authentic skill/stamina icons, and 11px values.
Keep the current fill-sized small cells and xsmall gaps. Remove only the Characters heading.

- Retain Spelunking-level hover on the skill group.
- Remove the stamina `TipDisplay` entirely. Keep its icon and saved / maximum text directly visible.
- Preserve saved stamina above maximum. Do not clamp or substitute the cap.
- Keep one rounded bottom 4px EXP bar, without visible EXP text.
- EXP hover retains **Spelunking EXP**, but uses `notateNumber(currentXP) / notateNumber(xpReq)` instead of `commaNotation`.

The EXP ratio still uses the parsed current-level EXP and requirement. Formatting does not change geometry.
Do not add stamina bars, individual recharge columns, activity claims, or character selection.

### Journal-local help

Show one **About soft caps** trigger inside Journal & Pages, above the chapter grid, aligned to its right edge.
Do not render it beside the global heading, in Tunnels, or outside the Journal conditional content.
Keep its existing two paragraphs unchanged:

> Each new level adds less to these bonuses. Soft caps show their upper limit at your current Sailing artifact strength.
>
> Bars show progress from levels, starting at 0%. They do not reach 100%.

### Journal rows: actual Outposts style

Keep six source-order dark-1 chapter cards in two columns, with existing small padding and gaps.
Preserve page artwork, full generated page names, named gathering caves, Owned pages totals, and location tooltips.
Retain separate nonempty Storage and named inventory stacks. Do not pool them into a readable stack.
Keep generated page descriptions on artwork, with only `@` separators removed.

Replace the current main-row grid plus supporting bar grid with one five-column HTML table per chapter.
Copy the actual Outposts rank table's recognizable mechanics from `components/account/royalArmoryDisplay.tsx:339–353,495–517`:

- `width: 100%`, `border-collapse: collapse`, and `table-layout: fixed`.
- Tabular numerals, 12px table text, and 20px line-height.
- Normal-weight muted headers, left aligned except Level and final Soft cap.
- Cell padding exactly `0 6px 0 0`; final cell padding 0.
- `vertical-align: middle` for every header and body cell.
- Center Level. Right-align the final Soft cap column.
- Place each 6px Meter directly in its row's Progress cell, beside that effect's other values.
- Use `brand`, `grey-1`, `size="full"`, `max={100}`, and `round` exactly as Outposts does.
- Remove the old stacked supporting line, xsmall vertical row padding, 12px grid gaps, and per-row divider.

The five Journal columns are **Earned bonus**, **Level**, **Min. pages / stack**, **Progress**, and **Soft cap**.
Use one shared colgroup for headers and all rows:

| Column | Width | Content-driven comparison with Outposts |
|---|---|---|
| Earned bonus | Remaining width | Generated effects need more space than Outposts' 62px Rank labels. Keep readable text. |
| Level | 35px | Exact Outposts Level width. |
| Min. pages / stack | 94px | Exact Outposts XP width, with Journal-specific contents. |
| Progress | 128px | Fixed space for inline Meter and a 40px right-aligned percentage. Outposts uses remaining space here. |
| Soft cap | 80px | Journal effect units need more space than Outposts' 58px ETA values. |

These width changes follow Journal content, not a different style. Do not force long effects into the Rank label width.
Rows retain Outposts' 20px line-height and zero vertical padding. Wrapped effects can make a row 40px high.
All cells remain middle-aligned within that same row. Do not impose artificial fixed heights or truncate effects.
The Min. pages / stack heading can wrap within its 94px column; values do not truncate.

For bounded bonuses, retain domain limit and earned-progress getters. Place percentage beside the inline Meter.
Show Soft cap amount with the effect's existing numeric unit. Keep progress to one decimal; use `<100%` when rounding implies 100%.
Keep fill below complete. Never add Complete, Maxed, reachable levels, timers, or Outpost rank mechanics.
For both unbounded bonuses, omit bar, percentage, and cap content. Keep blank table cells for column alignment only.
Do not add No soft cap or a supporting placeholder row.

Keep every real bonus, including zero levels. Exclude FILLER.
At level zero, show zero additive/percentage effects and neutral `1.00x` for `decayMulti`.
Dim the whole row to opacity 0.65. Keep empty tracks and `0.0%` for bounded zero-level rows.
Retain exact grouped minimum page requirements on hover.

## Data and integration

Use the accepted [Part 2 backend and recharge contributor contract](spelunking-part-2-backend-plan.md).
No backend or imagery-owner changes are needed.

| Existing data | UI responsibility |
|---|---|
| `baseHourlyRecharge`, `additiveRechargeContributors`, `rechargeMultiplierContributors` | Base, six percentages, four applied factors, and intrinsic source labels. |
| `hourlyRecharge`, `getHoursUntilAllFull()` | Unchanged summary rate and concurrent snapshot estimate. |
| `stamina` joined by `playerID`, individual refill getter | Saved / maximum and named refill rows. |
| Player skill level, currentXP, xpReq | Inline level and existing EXP geometry; canonical formatted hover counts. |
| Chapter bonus metadata, level, effect/limit/progress getters | Earned effect, minimum pages, cap, and earned progress. |
| Chapter page/cave metadata and separate owned stacks | Existing artwork, identities, counts, and named location details. |
| `dailyReadsRemaining`, `dailyReadLimit` | Visible remaining / limit, without tooltip. |

Use existing owner image metadata with `IconImage`: class portraits, `ClassIcons60` skill art, `CaveShopUpg4` stamina art, and six page images.
Do not construct new URLs, put images in public, add static tables, or modify generated data.

The route owns Journal-only help, persistent summary/characters, tabs, and Tunnels state.
The existing Part 2 component owns the tooltip changes and chapter table composition.
Keep `useShallow`, mutable Map `lastUpdated`, hydration-safe snapshot effect, and empty-Players guard.
Do not add stores, new shared components, calculation hooks, caches, or missing-object fallback branches.

## References and delivery verification

- [Royal Armory Outposts](../../components/account/royalArmoryDisplay.tsx#L339): exact table and cell mechanics plus inline Meter placement.
- [Research Current gains](../../components/world-7/research/researchContent.tsx#L41): dotted value tooltip and grouped contributor presentation.
- [Toolbox public Spelunking → Lore → Chapters](https://idleontoolbox.com/account/world-7/spelunking?profile=liiiiiiiiiiiig&t=Lore&nt=Chapters): chapter-local game imagery, effects, levels, and requirements. Reference only; keep IE's style.
- [Wiki Spelunking](https://idleon.wiki/wiki/Spelunking): Journal/page/cave vocabulary, not calculation authority.

After separate production authorization, verify the actual route at 1440×1000:

1. Confirm all eight requested outcomes, including absent stamina/read tooltips and deleted paragraph/heading.
2. Open and dismiss EXP tooltips for all eleven characters; compare with canonical `notateNumber` output.
3. Open recharge detail; compare base, six additive values, four factors, and intrinsic labels with accepted backend collections.
4. Confirm refill retains every correctly named individual row.
5. Confirm help appears only in Journal and opens/dismisses there.
6. Compare Outposts and Journal table/cell geometry, row alignment, headers, and inline 6px Meter style.
7. Keep six chapters, twenty bonuses, eighteen bounded bars, eleven compact characters, and 4px EXP bars.
8. Preserve neutral/zero rows, two unbounded rows, page locations, saved above-cap stamina, and filter persistence.
9. Preserve the real save; record runtime errors without suppression or waiver.

Preview evidence is design evidence, not production acceptance or connected-game parity.
Approval history, fresh comparisons, preview references, observations, and known failures belong in the [current handoff](spelunking-research-brief.md#current-handoff).
