# Spelunking part 2: backend plan

## Outcomes

Provide the backend information for [#436 — gathering, Journal, and character progression](https://github.com/Sludging/idleon-efficiency/issues/436):

- Show gathering caves, their Spelunky Pages, page uses, and quantities in shared storage and each character's inventory.
- Show shared Journal chapters, each bonus's owned level and current effect, minimum page-stack requirements, and account-wide daily reads: limit, used, and remaining.
- Show each character's name, Spelunking level and EXP, saved current stamina, calculated maximum stamina, hourly recharge, and estimated hours until full.

Use descriptions from generated game data only. Expose calculated amounts separately from intrinsic descriptions. Do not create explanatory sentences, copied description tables, or frontend-specific display records in the backend.

## Responsibilities

Extend [Spelunking](../../data/domain/world-7/spelunking.tsx), not a second account domain.

- **Spelunking** coordinates initialization, aspect parsing, shared reading allowance, and account modifier preparation. It owns the shared hourly recharge rate and the Trackometer level needed by maximum stamina.
- **Chapter** retains generated chapter metadata, its page item and gathering source, and its bonus objects. Its cohesive parser translates the flattened saved bonus levels.
- **ChapterBonus** wraps one generated bonus and owns its saved level and current effect. Use `lavaFunc` with the generated formula and parameters. Apply the Sailing artifact multiplier only where generated `x3` permits it. Keep minimum page-stack requirements directly accessible from metadata.
- **SpelunkingStamina** owns one character's saved amount, calculated cap, and refill-duration behavior. Replace the unused public numeric stamina array with these indexed aspects. Keep character names, levels, and EXP on `Player`; join by `playerID`, not display name.
- **Storage** remains the owner of chest and character inventory items. Expose page quantities by those locations. Retain individual stack amounts where page requirements need them. Do not treat storage totals or pooled stacks as pages already available for an in-game read.
- **RoyalArmory** supplies the missing stamina-recharge Outpost multiplier through a small owner method, parallel to its existing Research Outpost method. Spelunking must not reimplement Royal Outpost selection and scaling.

Selected [backend pattern](../agents/backend-patterns.md) aspects: FriendBonus/Meal supply generated-data wrappers and owner calculations; Hole aspects supply cohesive parsing; Storage supplies item ownership; Master Classes supplies saved daily-counter parsing; Player health supplies preparation of character maxima. Reuse [utility `lavaFunc`](../../data/utility.tsx) after matching its relevant branches to the game. These patterns do not require a new framework or purchase-planning API.

## Required data

### Save boundary

| Input | Meaning and use |
|---|---|
| `Spelunk[8][4 * chapterIndex + bonusIndex]` | Shared owned level for that chapter bonus. Chapters with three bonuses still use four-slot strides. |
| `OptionsListAccount[410]` | Account reads already used in the saved daily period. Parse through Spelunking's account raw-key declaration. |
| `Spelunk[3][playerID]` | That character's saved current stamina. Preserve the recorded amount; do not add time since the save. |
| `Spelunk[4][8]` | Trackometer level, used only for the maximum-stamina dependency in this part. |
| Existing parsed upgrades and `Player.skills` | Stamina upgrade levels and character Spelunking level/EXP. Do not parse them again. |
| Existing `Storage.chest` and `Storage.playerStorage[playerID]` | Page identities, quantities, and locations. Do not parse inventory keys again. |

Parsing must replace prior owned levels, usage, stamina, and Trackometer state. Missing optional save fields use their established initial state. Parsing must not read other domains or calculate bonuses.

### Static information

- [Chapter metadata](../../data/domain/data/SpelunkingChapterRepo.ts) provides names, bonus descriptions, `func`, `x1`, `x2`, artifact applicability in `x3`, and `requiredPages`.
- [Page item metadata](../../data/domain/data/ItemRepo.ts) provides `Spelunking0`–`Spelunking5`, page names, intrinsic use descriptions, artwork identities, and named gathering sources.
- [Enemy metadata](../../data/domain/data/EnemyRepo.ts) provides the six gathering nodes with Spelunking AFK type. Match each page's exported source name to the node's exported name. These gathering caves are not Part 1 delve tunnels.
- Associate chapter index with its source-verified page item identity during initialization. Reuse existing item and enemy owners; do not copy the six associations into a handwritten table.

The requested cave/page information can use these exports. Area-map data is not required for these outcomes. No missing static extraction prerequisite has been demonstrated for this plan.

### Calculated inputs

| Result | Required direct inputs |
|---|---|
| Current chapter effect | Owned bonus level, generated formula/parameters/applicability, and Sailing artifact 35's current bonus. |
| Daily read limit | Five base reads plus Rift Skill Mastery's Spelunking daily-read bonus. The existing mastery API returns the complete extra allowance, not a Boolean. |
| Maximum stamina | Character skill level; upgrades 4, 5, and 61; World 7 stamina merit; companion 148; chapter bonuses `(2,0)` and `(3,0)`; Spelunking mastery maximum-stamina reward; highest account Spelunking Specialty talent effect; Big Fish's Advice on Being Tired; Trackometer level. |
| Hourly recharge | Meritocracy bonus 17; Legend Talent 30; Royal Outpost category 2 multiplier; Sushi bonus 11; upgrade 5; Alchemy bubble `Y11`; chapter bonuses `(2,1)` and `(5,2)`; Spelunking mastery recharge reward; native card level for `w7a10`. |

Use each existing producer's public API. Rift mastery already supplies the complete `15`, `3`, and `10` effects for the relevant unlocked rewards; do not apply those factors twice. The card term is `min(2 * nativeLevel, 20)`, not its equipment-boosted bonus. Upgrade 61's effective stamina contribution multiplies its raw bonus by saved Trackometer level. Keep the existing raw upgrade-bonus API unchanged.

Preserve the original maximum formula's final floor and grouping. The Trackometer, merit, and additive companion terms sit outside the Big Fish and companion multipliers. Source adds the relevant chapter and talent terms inside the base sum; do not infer their operation from a `%` description.

Remaining reads are `max(0, limit - used)`. Estimated refill is `max(0, maximum - savedCurrent) / hourlyRecharge` hours. The source recharge formula has a positive base rate. The estimate describes the saved snapshot under unchanged recharge and no spending; it does not replay away time, predict readiness, or roll daily usage forward.

## Integration

- Retain existing `domainList` registration and initialization. Add only the account read-counter raw key and the aspect-owned saved mappings above.
- Initialize page/chapter/gathering relationships once from existing metadata. Keep static descriptions accessible without mutable presentation projections.
- Prepare the Sailing input for chapter effects in `postProcessingMap`, after artifact preparation. Chapter bonus getters then serve stamina and future existing-domain callers without UI arithmetic.
- Prepare the Part 2 character display stats and page-location quantities in `postPostProcessingMap`, after `meritocraty`'s late preparation. This placement also follows settled Alchemy, Cards, Sushi, Player talent contexts, Royal Armory, and Storage. These results currently serve only the requested UI.
- Gather shared modifier values once, select the highest talent effect across actual characters, then calculate each character's cap. The current recharge formula uses shared inputs, so prepare its rate once and reuse it for all character rows.
- Add only Royal Armory's required recharge getter. Preserve existing Part 1 records, collection summaries, Amber formatting, and Cards/Gallery/Tome behavior. Do not restore Part 1's removed updater or add a Trackometer progression display.

## Prerequisites and verification

- Match current original-game helper and caller semantics to the supplied save. Map every direct input to the typed owner API before comparing composite results. Required source branches are `ChapterBonus`, `MaxDailyPageReads`, `StaminaMax`, `StaminaRegenRate`, and upgrade 61's effective scaling.
- Add focused extraction configs/results and core tests for chapter effects, shared read allowance, character maxima, recharge, and refill duration. Add parameter comparisons for every directly used calculation, including chapter effects and producer APIs. Follow [domain testing guidance](../TESTING_IMPLEMENTATION.md), use configured tolerance `0`, and retain actual originating-save pairing.
- Compare representative `add`, `decay`, and `decayMulti` chapter effects. Check levels per bonus, three-/four-entry chapters, minimum stack requirements, page/chapter/source identity, and chest versus character page quantities. Do not derive a read-success forecast from aggregate pages.
- Compare representative characters with distinct skill levels and stamina amounts. Check native card-level scaling, Trackometer-scaled upgrade 61, the best account talent contribution, and full/partial refill behavior only where the paired real save provides it. Record unobserved branches rather than inventing synthetic game evidence.
- Run focused Part 2 tests, existing Spelunking regressions, and TypeScript after implementation. Exercise two fresh normal-account-factory passes. Inspect populated chapter levels, page locations, shared allowance, and every character's stats; confirm repeated calculation does not stack bonuses.
- If a direct producer comparison fails, resolve its dependency or return the required scope decision. Do not substitute a guessed value, silently modify unrelated domains, or weaken the comparison.
- Verify page and character information through the real route in the later approved UI phase. Backend tests do not prove rendered UI or connected live-game parity.
