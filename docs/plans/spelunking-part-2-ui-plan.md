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
Use `Grid` fill-sized small cells with an xsmall gap. Remove the previous grid padding and right/bottom cell margins.
Reuse [CharacterBox](../../components/base/CharacterBox.tsx#L6-L18): dark-2, compact vertical padding, small horizontal padding, class portrait beside a 12px name.
Use a neutral grey-1 border. Do not copy green active-state meaning from Sneaking/Lab.

Inside each card:

- Keep the class portrait and 12px character name in the shared shell.
- Put the authentic Spelunking skill icon beside **Lv N**. Put the authentic stamina lightning icon beside **saved / maximum**.
- Keep these two groups on one line. Use 11px values and approximately 14–15px icons. Remove the stacked word labels and vertical divider.
- Put one rounded, 4px brand/grey-1 EXP bar at the bottom. Show no EXP text outside its tooltip.
- Hover the skill group to identify Spelunking and show the named character's level. Hover stamina for its full label and above-maximum detail.
- Hover the EXP bar for **Spelunking EXP** and exact grouped **current / next-level requirement** counts.

Use parsed `currentXP / xpReq` for this ordinary skill EXP bar, not the Journal soft-cap ratio.
This is progress within the current level, not a stamina bar, forecast, or completion claim.
Keep the shared CharacterBox unchanged; the denser content belongs to Spelunking's caller.
At 1440×1000, the preview keeps all eleven source-order characters in two rows, six then five.
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

Use the same three grid tracks for each chapter's column header and every bonus main row: `minmax(0, 1fr)`, `48px`, `104px`.
The main row contains the generated earned-effect text, right-aligned level, and right-aligned **Min. pages / stack**.
Vertically center the level and requirement against their own effect text. Keep their placement independent of the bar's height.
Put bounded progress, Soft cap, and the 6px bar beneath the effect column only.
A thin grey-1 bottom divider and xsmall vertical padding group each effect, its values, and its bar as one record.
Do not reserve an empty cap/bar line for the two unbounded effects. Their main row and divider remain.
Keep 14px chapter names, 13px effect/level/requirement text, and 12px supporting text.
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
For both unbounded Base Spelunking Efficiency bonuses, omit the bar, progress percentage, and **No soft cap** label.

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

Use `IconImage` with owner-provided image metadata. Retain `Item.getImageData()` and `Player.getClassImageData()`.
Add only the missing `SkillsIndex.Spelunking` case in `Skilling.getSkillImageData()`: `ClassIcons60`, using the existing 38×36 skill frame.
This is an image-API mapping, not a game-data table or calculation change.
Expose the source-verified stamina lightning through `SpelunkingStamina.getImageData()`: `CaveShopUpg4`, with its native 34×34 frame.
This is the game's Big Time Stamina artwork, not a battery item, substitute skill icon, cropped bar, or guessed sprite.
The original character UI also draws its stamina mark through a game font. Do not claim the selected sprite is that extracted font glyph.
Keep gathering cave identity textual. Do not construct asset URLs or copy mechanics/static tables in the component.
Use existing `commaNotation`, canonical `notateNumber`, and `toTime` helpers unchanged.
Exact EXP means the site's grouped integer precision, not preservation of fractional EXP.

The route owns the one shared summary, persistent grid, and two-tab state.
The existing Part 2 component owns chapter and character rendering. Update only bonus-row composition and character child content.
Retain the store's `useShallow` selection, mutable Map `lastUpdated` dependency, hydration-safe snapshot effect, and empty-Players guard.
Do not show initialized empty data as a loaded full account. Keep initialized domain objects required.
Keep all accepted backend calculations unchanged. The two image-owner additions above need no new export, preparation hook, store, or framework.

## References and verification

- [Toolbox public Spelunking → Lore → Chapters](https://idleontoolbox.com/account/world-7/spelunking?profile=liiiiiiiiiiiig&t=Lore&nt=Chapters): compact chapter-local effects, artwork, levels, page requirements, and bars. Reference only; do not copy its dashboard, FILLER, formulas, account values, or visual theme.
- [Wiki Spelunking](https://idleon.wiki/wiki/Spelunking): Cave Nodes provide Spelunky Pages and skill EXP; pages improve the account-wide Lore Journal. This establishes player vocabulary, not formula parity.
- Sneaking/Lab code and comparative browser captures establish the narrow character-card composition. Outposts code and capture establish the Meter style.

After separate production authorization, exercise the actual route at 1440×1000 with the retained real save:

- Check main-row association and header-column alignment for all twenty bonuses. Include bounded, unbounded, and zero-level entries.
- Check absence of **No soft cap** and its empty placeholder line. Retain all eighteen bounded bars and their current meanings.
- Check all eleven compact CharacterBox cards, both icon identities, inline values, and bottom 4px EXP bars with no visible EXP text.
- Open and dismiss every character's skill, stamina, and exact-EXP tooltip. Confirm each EXP bar uses that character's parsed ratio.
- Retain six chapters, current effects and requirements, neutral/zero effects, named page locations, ordinary scrolling, and source-order playerID joins.
- Keep summary → characters → tabs, existing section gaps, heading/help, recharge/refill, and Tunnels filter persistence unchanged.
- Preserve saved amounts above maximum and the source save. Record runtime errors without suppressing or waiving them.

Planning previews do not prove production behavior, connected-game parity, recharge eligibility, daily rollover, or deployment.
Approval history, comparative captures, preview references, observations, errors, and current gate belong in the [handoff](spelunking-research-brief.md#current-handoff).
