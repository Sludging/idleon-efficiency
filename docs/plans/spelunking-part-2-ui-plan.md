# Spelunking Part 2: Journal, pages, and characters

## Player outcomes

Extend `/world-7/spelunking` for [Part 2 (#436)](https://github.com/Sludging/idleon-efficiency/issues/436):

- Inspect shared Journal levels and earned bonuses beside each bonus's minimum page-stack requirement.
- Find the gathering cave for each Spelunky Page and see individual stacks in storage or character inventories.
- Inspect the account-wide daily reading allowance, with used, remaining, and limit values.
- Compare each character's Spelunking level, EXP, saved stamina, maximum stamina, hourly recharge, and saved-snapshot refill estimate.

This is an **Operate** surface within the existing website design. It presents current progression and stats, not a calculator.

## Page structure

Keep the existing route, server metadata, shared wrapper, Rubik typography, and ordinary Spelunking heading.
Use one `ContentTabs` selector: **Tunnels**, **Journal & Pages**, **Characters**.
**Tunnels** starts selected and retains the accepted Part 1 cards, summaries, artwork, and controls.
Keep its Show locked and Collection status state when switching views. Do not add Part 3 tabs.
Keep one stable heading above the selector in every view, including Tunnels. The caller owns selected view and external spacing.

### Journal & Pages

Place a compact **Daily page reads** strip above six source-order chapter cards.
Show **Remaining**, **Used**, and **Limit** explicitly, with **Account-wide · Saved daily period**.
Do not label the saved counter as refreshed today or add a reset countdown.
Keep this short instruction visible: **Read pages from one character inventory stack. Storage pages must be moved first.**

Use two card columns at the established 1440px review viewport.
Use dark-1 `ShadowBox` cards with medium padding, small inner gaps, and medium grid gaps.
Follow the named [Sneaking card traits](../../components/world-6/sneaking/sneakingUpgrades.tsx), not its purchase controls.
Each card contains:

1. The page item's full game name, including chapter number, beside its game artwork.
2. Its named gathering cave as source text.
3. All real bonus entries, with **Earned bonus**, **Level**, and **Minimum pages per stack** aligned within the card.
4. Separate **Storage** and **Character inventory** stack groups below the bonuses.

Keep the six gathering caves distinct from Part 1's delve tunnels. Exclude the generated FILLER chapter.
Use the page item description in a `TipDisplay` on its artwork. Remove only the game's `@` padding separators.
Keep bonus descriptions from generated metadata. Substitute the backend amount into its placeholder or multiplier position.
Show effect quantities to two decimals where needed, without changing their units or game wording.

At level zero, show **Not earned** and the intrinsic effect name. Do not present the formula's baseline as an earned bonus.
Show every real bonus, including unearned entries. Do not infer a chapter lock from absent pages or zero levels.
Do not add maximum-effect bars, future effects, read-success chances, or a readiness marker.

List each stack's exact grouped quantity. Do not pool storage and inventory or combine separate stacks.
Name each inventory owner through `playerID`, not array position or display-name matching.
Use **No pages in storage** and **No pages in character inventories** for empty locations.
No location selector or page filter is needed for six cards.

### Characters

Show all actual characters in source order as aligned [DataRow](../agents/ui-rows.md) records.
Use the existing identity field with `name` for the character name and `artwork` for class artwork. Stack rows with a small gap.
Let `DataRow` own its shell, small padding, shared Name label, and typography.
The caller supplies these columns with minmax fractional tracks:

| Field | Display |
|---|---|
| Name | Name and existing class artwork |
| Spelunking level | Parsed skill level |
| EXP | Current EXP / EXP required for the next level; compact values with exact counts in a tooltip |
| Saved stamina | Exact saved current amount |
| Maximum stamina | Calculated maximum, shown separately |
| Recharge per hour | Shared backend rate repeated per character, with stamina/h units |
| Estimated refill | Backend duration, or Full at saved snapshot at zero |

Keep the saved amount even when it exceeds the calculated maximum.
Add **Saved amount exceeds maximum** beside an above-cap record. Do not clamp the displayed amount.
Show this explanation once: **Estimate uses saved stamina, unchanged recharge, and no spending. It is not a live timer.**
Use the existing duration formatter on the backend estimate. Do not add time since the save.
No character selector, stamina meter, team advice, or greater-than-half readiness claim is needed.

## Data and integration

The accepted [backend plan](spelunking-part-2-backend-plan.md) supplies the required information.
Keep calculations in the existing [Spelunking domain](../../data/domain/world-7/spelunking.tsx).

- `Spelunking.chapters` supplies real chapters, `pageItem`, `gatheringSource`, and bonus objects.
- `ChapterBonus.level`, `getBonus()`, `data.bonus`, and `data.requiredPages` supply owned progress, effect, intrinsic text, and minimum stack size.
- `chestPageStacks` and `playerPageStacks` retain individual stacks from Storage. The UI formats them without a read forecast.
- `dailyReadLimit`, `dailyReadsUsed`, and `dailyReadsRemaining` supply account-wide allowance.
- `Player.skills.get(SkillsIndex.Spelunking)` supplies level, currentXP, and xpReq.
- Join `Spelunking.stamina` to each Player by `playerID`. Read `current`, `maximum`, and `getHoursUntilFull(hourlyRecharge)`.
- Use `Item.getImageData()` and `Player.getClassImageData()` with `IconImage`. Do not create asset URLs or handwritten image mappings.
- Keep cave identity textual. The existing gathering-image API returns the unusable `Mface0` asset for these sources.
- Use `commaNotation`, canonical `notateNumber`, and the existing `toTime` helper where appropriate. Do not change shared formatting behavior.

Keep the established `useAppDataStore(useShallow(...))` selection of the mutable domain Map and `lastUpdated`.
Retain the hydration-safe effect before displaying account state. Guard genuinely missing loaded data locally.
Keep view state and formatting in client content/components. Add no presentation store or processing hook.
Keep initialized backend objects required. Preserve all accepted Part 1 and backend code.

## References and verification

The equivalent Toolbox feature is [Spelunking → Lore → Chapters](https://idleontoolbox.com/account/world-7/spelunking?profile=liiiiiiiiiiiig&t=Lore&nt=Chapters).
The supplied miscellaneous URL currently returns 404; the equivalent World 7 page loads the public profile.
Reuse its chapter-local grouping of artwork, effects, levels, and page requirements only.
Keep IE's shell, shared spacing, charcoal surfaces, typography, and ContentTabs.
Do not adopt Toolbox's global-stat dashboard, effect percentages, FILLER entries, or calculations.
The [Wiki](https://idleon.wiki/wiki/Spelunking) establishes player vocabulary and cave/page use, not accepted calculation parity.

For later production verification, use the unchanged retained save at 1440×1000.
Check all six chapters and 20 bonuses, explicit allowance ownership, separate page locations, and all eleven matched character records.
Confirm level-zero effects are not marked earned and above-cap saved stamina remains visible.
Check tab persistence, page-use and exact-EXP tooltips, image loading, missing data, and empty page locations.
Compare positive refill presentation with clearly marked illustrative data only when the real save has no positive estimate.
Record runtime errors separately. Preview evidence cannot accept production UI or prove connected game parity.

Approval history, preview paths, observed values, and evidence limits belong in the [current handoff](spelunking-research-brief.md#current-handoff).
