# Spelunking Part 2: Journal, pages, and characters

## Player outcomes

Extend `/world-7/spelunking` for [Part 2 (#436)](https://github.com/Sludging/idleon-efficiency/issues/436):

- Inspect all six Journal chapters and 20 bonus levels, earned effects, and minimum page-stack requirements.
- See diminishing returns through finite-limit values and earned-progress bars. Distinguish bonuses without finite limits.
- Find each page's gathering cave, owned quantity, and named storage or character inventory locations.
- See account-wide daily reads as remaining / limit.
- Compare every character's Spelunking level, EXP, and saved / maximum stamina.
- See shared recharge once and the concurrent all-full snapshot estimate, with individual estimates in a tooltip.

This is an **Operate** surface within IE's existing design. It presents current progression and stats, not a calculator.

## Page structure

Keep the route metadata, shared outer wrapper, Rubik typography, ordinary Spelunking heading, and existing `ContentTabs`.
Keep **Tunnels**, **Journal & Pages**, and **Characters**. Tunnels starts selected.
Retain Part 1 cards, artwork, and controls unchanged. Keep Show locked and Collection status state across view changes.
Use one stable heading above the selector. Add no Part 3 content or new controls.

### Shared Part 2 summary

Show the same compact three-card summary above Journal or Characters content, below the selector.
Do not duplicate it inside each chapter or character card. Keep it out of the unchanged Tunnels view.
Use dark-1 `ShadowBox` cards with small padding and small gaps. Each card groups one label and its value.

| Summary | Visible value | Detail |
|---|---|---|
| Daily page reads | `remaining / limit`; retained save shows `8 / 8` | Small visible `Remaining / limit` label. Tooltip identifies the account-wide saved daily period. |
| Recharge | Shared rate with `stamina/h` units | Show once; retained save shows `22.22 stamina/h`. |
| All full in | Backend account duration, or `Full at saved snapshot` at zero | Tooltip lists every named character's individual estimate. |

Show one concise note: **Saved snapshot · Assumes unchanged recharge and no spending.**
The all-full tooltip states that estimates assume concurrent recharge and are not a live timer.
Do not extrapolate elapsed time, roll reads forward, or add reset timing.
The account duration comes from the maximum individual estimate, not their sum.

### Dense Journal & Pages cards

Keep two columns at the established 1440×1000 review viewport.
Use dark-1 `ShadowBox` cards with **small** padding and gaps.
This deliberately reduces the earlier medium padding. It preserves IE's surfaces and chapter grouping while making room for limit information.
Use 14px chapter names, 13px bonus text, and 12px supporting text.
Keep full page names and game artwork beside one another. Keep the named gathering cave below the identity.

Each card shows:

1. Page artwork and full page name, including its chapter number.
2. Gathering cave name, distinct from the delve tunnel names.
3. One compact **Owned pages** total. Hover reveals exact individual stacks and named locations.
4. All real bonus entries, with earned effect, **Level**, and **Min. pages / stack** aligned.
5. Finite effect limits and earned-progress bars where the backend supplies them.

**Owned pages** adds chest and character inventory quantities for that page only.
Do not label this pooled owned total **Storage** or treat it as one readable stack.
In the tooltip, label chest stacks **Storage** and character stacks with the actual player's name and **inventory**.
Retain separate stack counts. Hide empty location groups and empty-inventory sentences.
Keep a zero owned total when no pages exist; do not invent a location or infer a chapter lock.
Use compact quantities in the cards and exact grouped counts in `TipDisplay` details.
Page art retains its intrinsic description tooltip with only the game's `@` padding removed.
Remove the previous instruction about moving storage pages and reading one inventory stack.

Use generated bonus wording and the current backend effect. Do not author replacement effect descriptions.
At level zero, show **Not earned** and the intrinsic effect name, never the formula baseline as an earned bonus.
Show all 20 real bonuses, including unearned ones. Exclude FILLER.
Keep minimum page requirements beside the corresponding bonus, with exact counts available on hover.

#### Finite-limit presentation

Use `getEffectLimit()` and `getProgressToEffectLimit()` directly.
Display a slim horizontal bar, an earned-progress percentage, and **Limit** with the effect's original numeric unit.
Show one short visible note: **Finite limits are approached, not reached.**
The detail tooltip explains that the limit uses the current Sailing artifact strength and is not a reachable hard cap.
For `decayMulti`, explain that the bar excludes the multiplier baseline.
The percentage is earned progress, not current effect divided by its limit.

Show one decimal place for progress. If rounding would show 100%, show **<100%** instead.
Keep the visible fill below a full track. Never show Complete, Maxed, a checkmark, or a reachable maximum level.
Zero-level bounded entries retain zero progress. They can show their finite limit without claiming an earned effect.
For the two unbounded Base Spelunking Efficiency bonuses, show **No finite limit** and no bar.
Do not add future-level effects, read forecasts, success chances, or readiness states.

### Character cards

Use the actual [Sneaking activity](../../components/world-6/sneaking/playerActivitySection.tsx) and [Lab character](../../app/world-4/lab/content.tsx) composition family.
Reuse [CharacterBox](../../components/base/CharacterBox.tsx), not the earlier seven-column DataRow layout.
Keep its dark-2 surface, class portrait beside the name, xsmall vertical padding, and small horizontal padding.
Use three equal columns at the review viewport, with small gaps. Keep all actual characters in source order.
Use a neutral grey-1 border. Do not copy Sneaking/Lab's green active-state meaning onto Spelunking.

Each card contains:

- Character name and existing class artwork.
- **Spelunking level** as compact text. Keep class artwork as the character identity image.
- **EXP** as compact current / next-level requirement, with exact grouped integer counts in a tooltip.
- **Stamina** as exact saved / maximum values under one label.

Keep the saved amount even when it exceeds the calculated maximum.
Keep **Saved amount exceeds maximum** beside the affected record.
The retained SludgeMan record remains **2,635 / 2,550**.
Do not add character selection, activity claims, stamina meters, or repeated recharge/refill columns.

## Data and integration

Use the accepted revised [backend delivery plan](spelunking-part-2-backend-plan.md).
Keep game calculations on existing domain owners.

| Data | UI use |
|---|---|
| `Spelunking.chapters`, `Chapter.pageItem`, `gatheringSource` | Real chapter, page, cave, and artwork identity. |
| `ChapterBonus.level`, `getBonus()`, `data.bonus`, `data.requiredPages` | Saved level, earned effect, intrinsic wording, and required stack size. |
| `getEffectLimit()`, `getProgressToEffectLimit()` | Account-scaled asymptote and earned progress. `undefined` means an unbounded bonus. |
| `chestPageStacks`, `playerPageStacks[playerID]` | UI-owned display subtotal and exact named stack details. |
| `dailyReadsRemaining`, `dailyReadLimit` | Compact account-wide reading allowance. Keep backend usage unchanged. |
| `Player.skills.get(SkillsIndex.Spelunking)` | Skill level, current EXP, and next-level requirement. |
| `Spelunking.stamina` joined by `playerID` | Saved current, maximum, and individual `getHoursUntilFull(hourlyRecharge)`. |
| `hourlyRecharge`, `getHoursUntilAllFull()` | Shared summary rate and maximum concurrent snapshot duration. |

Use `IconImage` with `Item.getImageData()` and `Player.getClassImageData()`.
The current `Skilling.getSkillImageData()` has no Spelunking mapping. Omit optional skill artwork rather than render a blank slot or guess an asset.
Keep cave identity textual; its current image API supplies the unusable `Mface0` asset.
Use `commaNotation`, canonical `notateNumber`, and existing `toTime` where appropriate.
Keep shared number and duration formatting behavior unchanged.

Retain the `useAppDataStore(useShallow(...))` selection of the mutable Map and `lastUpdated`.
Retain the hydration-safe snapshot effect and the actual empty-Players guard.
Keep initialized domains and per-player arrays required. Do not invent missing-object fallback branches.
Keep view state, formatting, subtotals, and location disclosure in client content/components.
Add no backend changes, preparation hook, presentation store, static-data mapping, or generic cap framework.

## References and delivery verification

- [Public Toolbox Lore → Chapters](https://idleontoolbox.com/account/world-7/spelunking?profile=liiiiiiiiiiiig&t=Lore&nt=Chapters) informs compact chapter-local bars, levels, and page requirements.
- [Wiki Spelunking](https://idleon.wiki/wiki/Spelunking) establishes Journal, page, and cave vocabulary. It does not prove calculation parity.
- Sneaking and Lab supply the character-card family. Their character grids do not currently supply the requested EXP pair; retain Part 2's exact-count tooltip treatment inside the cards.
- Keep IE's existing shell, colors, typography, shared components, and artwork metadata. Do not copy Toolbox's global dashboard, FILLER, account values, formulas, or reachable-cap wording.

After separate implementation authorization, verify the actual route with the unchanged retained save at 1440×1000.
Check all six chapters, 20 bonuses, 18 finite bars, two unbounded entries, seven zero-progress entries, and eleven matched character cards.
Check finite-limit units, multiplier-baseline progress, and no rounded completion states.
Check named page-location, exact requirement, exact EXP, finite-limit, and individual-refill tooltips opening and dismissing.
Check `8 / 8` remaining/limit, shared recharge shown once, and concurrent all-full summary.
Check above-maximum stamina, ordinary scrolling, image loading, tab/filter persistence, and the supported empty-character guard.
If the save has no positive refill, show positive durations only as a clearly labeled in-memory illustration, separate from real-save evidence.
Record runtime errors and limits separately. Preview evidence is not production acceptance or connected-game parity.

Approval history, preview references, observed data, source receipts, and limits belong in the [current handoff](spelunking-research-brief.md#current-handoff).
