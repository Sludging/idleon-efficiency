# Spelunking Part 2: Journal, pages, and characters

## Player outcomes

Extend [Part 2 (#436)](https://github.com/Sludging/idleon-efficiency/issues/436) on `/world-7/spelunking`:

- Read the account's daily page allowance and shared stamina recharge/refill summary before choosing a view.
- Compare all characters' Spelunking level, EXP, and saved / maximum stamina without switching tabs.
- Inspect six Journal chapters and all 20 bonus levels, earned effects, page requirements, and soft-cap progress.
- Find each page's gathering cave and owned quantity, with exact named storage and inventory stacks on hover.

This is an **Operate** surface in IE's existing visual style. Show current progression and stats, not a planning calculator.

## Page composition

Keep the ordinary heading, route metadata, shared outer wrapper, Rubik typography, and existing charcoal/blue theme.
Use this order in both views:

1. **Spelunking** heading, with one **About soft caps** tooltip trigger alongside it.
2. A compact summary: **Daily page reads** and **Stamina**.
3. A persistent **Characters** grid containing every actual character in source order.
4. `ContentTabs` with **Tunnels** and **Journal & Pages** only.
5. The selected content.

Tunnels starts selected. Remove the Characters tab; do not replace it with a collapsible panel or character selector.
Keep Part 1's cards, artwork, totals, Show locked, and Collection status controls unchanged within Tunnels.
Keep those controls' state when switching views. Add no Part 3 content.

### Summary

Use compact dark-1 `ShadowBox` sections with small padding and gaps, sized to their content rather than full-width dashboard tiles.

| Section | Visible information | Hover detail |
|---|---|---|
| Daily page reads | `remaining / limit`, with the small **Remaining / limit** label | Account-wide allowance in the saved daily period. |
| Stamina | **Recharge** with `stamina/h` units; **Team refill** with a duration, or **Full** at zero | Saved-snapshot assumptions and every named character's individual duration. |

Recharge and Team refill are adjacent values inside one Stamina section, not separate summary cards.
Use the accepted backend's maximum individual duration. Characters recharge concurrently; do not sum their durations.
The refill tooltip says: **Uses saved stamina with unchanged recharge and no spending. All characters recharge together. This is not a live timer.**
Keep snapshot semantics in this tooltip, not a visible sentence beneath the summary.
Do not extrapolate elapsed time or reset daily reads.

### Persistent character grid

Follow the actual compact composition in [Sneaking Player Activity](../../components/world-6/sneaking/playerActivitySection.tsx#L30-L55) and [Lab players in tubes](../../app/world-4/lab/content.tsx#L35-L59), not only their component name.
Use `Grid` fill-sized small cells, with the references' small top/bottom padding and right/bottom cell margins.
Reuse [CharacterBox](../../components/base/CharacterBox.tsx#L6-L18): dark-2, compact vertical padding, small horizontal padding, class portrait beside a 12px name.
Use a neutral grey-1 border. Do not copy green active-state meaning from Sneaking/Lab.

Inside each card:

- Put **Spelunking / Lv N** beside **Stamina / saved / maximum**, separated by the reference's thin grey vertical divider.
- Put compact **EXP current / next-level requirement** underneath, with exact grouped integer counts on hover.
- Keep the skill and stamina values at small text sizes. Let the shared shell own portrait/name spacing.

This preserves the horizontal child-stat approach and narrow repeated cards, instead of three wide vertical forms.
Spelunking adds one EXP line because the selected outcome requires it; the source references do not provide that field.
All eleven retained-save characters fit in two rows at 1440×1000 in the preview.
Keep the saved stamina value unchanged when it exceeds maximum.
Show the above-maximum explanation on stamina hover, not an extra card-height sentence.
Do not repeat recharge/refill in character cards or imply activity, eligibility, or a dive recommendation.

### Journal chapters

Keep six source-order dark-1 chapter cards in two columns, with small padding and gaps.
Keep page artwork beside the full game page name, including its chapter number. Show its named gathering cave below.
Keep the existing compact **Owned pages** total at the header's right edge.
Its hover lists each nonempty stack separately under **Storage** or **[character name] inventory**.
Owned pages includes chest and inventories; never label this pooled count Storage or imply one readable stack.
Keep zero quantities visible without empty-location messages.
Page artwork retains the generated item description tooltip; remove only game `@` padding separators.

Align earned effect, level, and minimum pages per stack as in the existing dense chapter cards.
Keep 14px names, 13px effects, and 12px support text. Use generated wording and numeric units.
Keep exact grouped page requirements on hover. Exclude FILLER, not real zero-level entries.

At level zero, remove **Not earned**. Show zero for additive/percentage effects and a neutral `1.00x` for a `decayMulti` multiplier.
Do not show the artifact-scaled formula baseline as an earned level bonus.
Keep level zero and zero earned-progress visible; dim the complete row to opacity `0.65`, following Outposts' inactive-row treatment.
A multiplier-worded `decay` effect still shows its zero result; wording alone does not choose a formula.
Nonzero levels retain the accepted `getBonus()` effect.

### Soft caps and bars

Place one **About soft caps** tooltip beside the page heading. Use simple text:

> Each new level adds less to these bonuses. Soft caps show their upper limit at your current Sailing artifact strength.
> Bars show progress from levels, starting at 0%. They do not reach 100%.

Remove both old visible explanatory notes and all repeated per-bar formula lectures.
Show **Soft cap [effect value and unit]** and the earned-progress percentage beside each bounded bar.
Use the existing domain getters; the percentage is earned progress, not current effect divided by its limit.
Show **No soft cap** without a bar for both unbounded Base Spelunking Efficiency bonuses.

Match [Royal Armory Outposts](../../components/account/royalArmoryDisplay.tsx#L495-L516): Grommet `Meter`, brand fill, grey-1 track, `thickness="6px"`, `size="full"`, `round`, and small supporting text.
Reuse only the bar styling and inactive opacity. Outpost rank thresholds, timers, columns, and reachable completion do not apply here.
Keep all 18 bounded bars. Level-zero entries have empty tracks and `0.0%`.
Use one decimal place for progress; display `<100%` if rounding would produce 100%.
Keep fill below full width. Do not add Complete, Maxed, checkmarks, maximum levels, or forecasts.

## Data and integration

Use the accepted [Part 2 backend plan](spelunking-part-2-backend-plan.md) and its existing owner APIs unchanged.

| Existing data | Display responsibility |
|---|---|
| `Spelunking.chapters`, `pageItem`, `gatheringSource` | Six chapter/page/cave identities and artwork. |
| `ChapterBonus.level`, `getBonus()`, `data.bonus`, `data.requiredPages` | Current owned effect, source wording, level, and minimum stack requirement. |
| `getEffectLimit()`, `getProgressToEffectLimit()` | Soft-cap value and earned-progress ratio; undefined means no soft cap. |
| `chestPageStacks`, `playerPageStacks[playerID]` | Display subtotal and exact individual named stacks. |
| `dailyReadsRemaining`, `dailyReadLimit` | Account-wide remaining / limit; leave usage and parsing unchanged. |
| `Player.skills.get(SkillsIndex.Spelunking)` | Level, current EXP, and next-level requirement. |
| `Spelunking.stamina`, joined by `playerID` | Saved current, maximum, and individual refill detail. |
| `hourlyRecharge`, `getHoursUntilAllFull()` | Shared recharge and concurrent team-refill summary. |

Use `IconImage` with `Item.getImageData()` and `Player.getClassImageData()`.
Do not guess optional skill/cave artwork or construct asset URLs. Keep gathering cave identity textual.
Use existing `commaNotation`, canonical `notateNumber`, and `toTime` helpers unchanged.
Exact EXP means the site's grouped integer precision, not preservation of fractional EXP.

The route owns the one shared summary, persistent grid, and two-tab state.
The existing Part 2 component owns chapter/character rendering; remove tab-local summary calls and obsolete repeated tooltip copy.
Retain the store's `useShallow` selection, mutable Map `lastUpdated` dependency, hydration-safe snapshot effect, and empty-Players guard.
Do not show initialized empty data as a loaded full account. Keep initialized domain objects required.
Add no backend changes, data exports, preparation hooks, presentation store, generic framework, or new feature controls.

## References and verification

- [Toolbox public Spelunking → Lore → Chapters](https://idleontoolbox.com/account/world-7/spelunking?profile=liiiiiiiiiiiig&t=Lore&nt=Chapters): compact chapter-local effects, artwork, levels, page requirements, and bars. Reference only; do not copy its dashboard, FILLER, formulas, account values, or visual theme.
- [Wiki Spelunking](https://idleon.wiki/wiki/Spelunking): Cave Nodes provide Spelunky Pages and skill EXP; pages improve the account-wide Lore Journal. This establishes player vocabulary, not formula parity.
- Sneaking/Lab code and comparative browser captures establish the narrow character-card composition. Outposts code and capture establish the Meter style.

After separate production authorization, exercise the actual route at 1440×1000 with the retained real save:

- Check all ten feedback outcomes: summary order/grouping, clearer refill wording, removed notes, No soft cap, centralized help, dim zero-level rows, Outpost bars, persistent characters, and reference-matched character composition.
- Check six chapters, 20 bonuses, 18 bounded bars, two unbounded bonuses, all actual characters, correct playerID joins, and zero-level neutral/zero effects.
- Check exact named page stacks, page-use/requirement/EXP/stamina/refill/help tooltips, image loading, saved amounts above maximum, ordinary scrolling, and Tunnels filter persistence.
- Keep a positive-refill illustration separate if the real save has only zero estimates. Preserve the save and record runtime errors without suppressing them.

Planning previews do not prove production behavior, connected-game parity, recharge eligibility, daily rollover, or deployment.
Approval history, comparative captures, preview references, observations, errors, and current gate belong in the [handoff](spelunking-research-brief.md#current-handoff).
