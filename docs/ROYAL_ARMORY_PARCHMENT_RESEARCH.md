# Royal Statue parchment acquisition and palace damage research

## Delivered domain interface

The current domain exposes `RoyalArmory.getParchmentDropChance()` and `RoyalArmory.getRoyalCastleMaximumDamage()`. The existing late updater prepares Companion 172 and Jelly Operation 40 inputs. The source research below predates that implementation; its missing-API statements describe the earlier checkpoint.

The current [Stage 5 handoff](https://github.com/Sludging/idleon-efficiency/issues/426) records paired offline game evidence, exercised production UI, and remaining combat-context limits. Offline aggregate parity does not prove an actual palace attack, rat defeat, or pickup behavior.

## Outcome and evidence limits

A small acquisition summary could help players understand where statue upgrade material comes from. Source research supports two candidate values: **Parchment chance per Verminous Rat defeat as a Royal Guardian** and **Maximum damage in the Royal Castle**. The accepted backend does not expose either combined result. Do not calculate them in the UI or show invented values in the temporary preview.

This note uses the official Wiki, supplied domain data, the captured game-1.22 formula, and full game-1.22 callers. It records source semantics, not live game parity. No live extraction, paired runtime verification, production UI, or backend expansion was performed. The source file exists and its callers were inspected; it is not a missing prerequisite.

## Player-facing names and location

- **The Royal Castle** is World 1 map 43, internal map name `GrasslandsH`. The [supplied map catalog](../data/domain/data/MapDataRepo.ts#L354-L361) identifies the map and records no ordinary map enemy.
- **Verminous Rats** live in the Royal Castle's cellar dungeon. This wording comes from [Rat Breeding Protocol I](../data/domain/data/RoyalArmoryUpgradeRepo.ts#L471-L497) and the [official Royal Guardian Wiki](https://idleon.wiki/wiki/Royal_Guardian#The_Royal_Armory). These are not the ordinary Rat enemy at Rats Nest.
- **Parchment of Enchantment** upgrades restored Royal Statues. Matching marbles restore covered statues. The [Wiki's Royal Statues section](https://idleon.wiki/wiki/Royal_Guardian#Royal_Statues) and [supplied statue catalog](../data/domain/data/RoyalStatueRepo.ts) distinguish these materials.

A safe acquisition explanation is: “Royal Guardians can obtain Parchment of Enchantment from Verminous Rats in the Royal Castle's cellar dungeon.” This does not state a current rate, guaranteed yield, or unlock-state formula.

## Source semantics and units

### Parchment chance

The [captured game-1.22 formula](game-snippets/equinox/RoyalG.1.22.js#L83-L95) returns a probability fraction. With Armory upgrade 37's bonus at least 1, the result is:

```text
0.001 * (1 + (
    Armory upgrade 38 bonus
    + Orblet Market bonus 9
    + Companion 172 bonus
    + Jelly Operation bonus 40
) / 100)
```

Otherwise, the function returns `0.001`, not zero. Game 1.20's [older formula](game-snippets/equinox/RoyalG.1.20.js#L78-L86) omits the Jelly Operation contribution. Use the source version selected for any future verification; do not silently mix versions.

The full source declares `_customBlock_MonsterKill` at [game-1.22 line 105365](../../IdleonWikiBot/codefiles/idleon1.22.txt#L105365). Its [lines 105756–105780](../../IdleonWikiBot/codefiles/idleon1.22.txt#L105756-L105780) check the defeated monster's type `fm_rat`. For current character class 16, the handler compares `randomFloat()` with `ParchmentDrop` and creates the `RGenh` item on success. The existing [class mapping](../data/domain/talents.tsx#L166) identifies class 16 as Royal Guardian. Other classes take a different branch that creates `RGenhB`; do not describe their result as the same parchment chance.

This establishes a roll in the Verminous Rat defeat handler for a Royal Guardian. It is not generic character Drop Rate, a restoration chance, an upgrade success chance, a drop quantity, or parchment per hour. The game's [Armory display caller, lines 290301–290306](../../IdleonWikiBot/codefiles/idleon1.22.txt#L290301-L290306), presents the reciprocal of `ParchmentDrop` in upgrade 37's description.

**Unlock discrepancy:** the [catalog](../data/domain/data/RoyalArmoryUpgradeRepo.ts#L527-L553) and [Wiki](https://idleon.wiki/wiki/Royal_Guardian#The_Royal_Armory) describe upgrade 37 as enabling parchment drops. The function returns the base probability before that upgrade. The inspected rat branch has no explicit upgrade-37 gate. Do not invent a zero-chance locked state. Verify the actual pre-unlock interaction and any surrounding access constraints before shipping unlock-sensitive values or wording.

### Palace damage

The [game-1.22 formula](game-snippets/equinox/RoyalG.1.22.js#L83-L85) defines:

```text
RatDMG = (10 + Armory upgrade 35 bonus)
         * (1 + Armory upgrade 36 bonus / 100)
```

The [full damage caller, lines 96850–96883](../../IdleonWikiBot/codefiles/idleon1.22.txt#L96850-L96883), establishes the meaning. In map 43, `DamageDealed("Max")` returns `RatDMG`, while `DamageDealed("Mastery")` returns `0.2`. The `Min` branch returns maximum damage times mastery. The damage roll uses the range rather than always dealing the maximum. The dungeon branch appears before the map-43 branch.

Use **Maximum damage in the Royal Castle**, not constant damage per hit, ordinary character damage, DPS, or damage to every rat. The formula uses Armory bonuses, not the selected character's normal damage stats. The current map and preceding dungeon branch supply combat context. No new character selector follows from these inputs alone. Live verification must confirm the normal palace attack path before displaying this result as verified account information.

[Anti-Rodent Power Move I and II](../data/domain/data/RoyalArmoryUpgradeRepo.ts#L499-L526) increase base palace damage by 5 per level and total palace damage by 2% per level. Their [Wiki descriptions](https://idleon.wiki/wiki/Royal_Guardian#The_Royal_Armory) match those meanings.

### Separate supply and preservation effects

- **Parchment Surplus** contributes to the probability formula through Armory upgrade 38. It is not Royal Statue success chance. See [catalog](../data/domain/data/RoyalArmoryUpgradeRepo.ts#L541-L554) and [formula](game-snippets/equinox/RoyalG.1.22.js#L86-L93).
- **Parchment Doubleprint** is separate from the chance roll. The [catalog](../data/domain/data/RoyalArmoryUpgradeRepo.ts#L555-L568) describes a chance to double on pickup. The [inspected defeat caller](../../IdleonWikiBot/codefiles/idleon1.22.txt#L105756-L105780) supplies `floor(1 + ParchmentDouble)` as the created quantity. That caller alone does not verify the advertised random pickup behavior. Do not reinterpret Doubleprint as a drop-chance boost or include a verified pickup-double metric in this proposal.
- **Parchment Recycling** can preserve parchment during a statue upgrade attempt. Its [source fraction](game-snippets/equinox/RoyalG.1.22.js#L94-L95) is capped at `0.75`; its [catalog description](../data/domain/data/RoyalArmoryUpgradeRepo.ts#L569-L582) concerns material use, not attempt success.
- **Rat respawn** is another separate calculation. [RatResp](game-snippets/equinox/RoyalG.1.22.js#L84-L85) uses upgrades 33 and 34. No respawn, kill-rate, or farming-rate metric is proposed here.

## Existing domain availability

| Information | Current API and limit |
| --- | --- |
| Statue attempt requirements, chance, and stored materials | [RoyalStatue](../data/domain/world-6/royalArmory/statues.ts#L52-L73) already exposes these results. Leave accepted calculations unchanged. |
| Shared stored parchment balance | [RoyalArmory.updateStatueMaterialInputs](../data/domain/world-6/royalArmory/royalArmory.ts#L255-L259) reads Storage and prepares each statue's material inputs. This is inventory, not acquisition rate. |
| Armory damage, unlock, supply, and recycling inputs | [RoyalArmory.getUpgradeBonus](../data/domain/world-6/royalArmory/royalArmory.ts#L203-L205) exposes catalog-index bonuses. [Catalog entries 35–40](../data/domain/data/RoyalArmoryUpgradeRepo.ts#L499-L582) supply their meanings. |
| Orblet contribution | [RoyalArmory.getOrbletMarketBonus](../data/domain/world-6/royalArmory/royalArmory.ts#L228-L230) exposes bonus 9. |
| Companion contribution | [getCompanionActiveBonus](../data/domain/companions.tsx#L48-L52) reads an owned companion's active-level bonus. The game formula uses companion 172. Its exact game-to-domain parity still needs verification. |
| Jelly Operation contribution | The existing account `JellyOperator` exposes obstruction bonuses. [Armory orchestration](../data/domain/world-6/royalArmory/royalArmory.ts#L444-L450) uses `obstructions.find(...).getBonus()` for other inputs. The game parchment formula uses bonus 40; no parchment-specific orchestration prepares it today. |
| Combined acquisition chance and palace maximum damage | No prepared RoyalArmory getter exposes these results in the accepted backend. UI must not assemble game formulas from the component APIs. |
| Rat counters and acquisition history | No rat-specific defeat, pickup, or acquisition counter is exposed by the inspected RoyalArmory domain. These are not required for the narrow proposal. |

## Missing delivery prerequisites

1. Approve a separate backend extension before adding calculated acquisition or damage values to the UI.
2. Select the game version and verify the complete source inputs against the running game. Include Orblet 9, Companion 172, and Jelly Operation 40 for game 1.22.
3. Capture paired game/domain results for the Royal Guardian rat-defeat chance and the map-43 maximum damage path. Cover actual zero and positive bonus branches where available.
4. Resolve upgrade 37's advertised unlock versus base-probability fallback. Do not encode an unsupported locked-zero rule.
5. Confirm the palace combat context, damage units, and actual attack range. Do not convert maximum damage into fixed per-hit damage.
6. Preserve unavailable-branch qualifications. Source inspection does not prove a positive branch, every Royal Guardian selection, or a live pickup behavior.

The full game source and relevant callers are available. The remaining prerequisites are approval and game/domain verification, not source access. Doubleprint's separate pickup behavior remains unresolved and outside the proposed values.

## Narrow proposal

If separately approved and verified, prepare both results in the existing RoyalArmory owner and account calculation phase. Reuse the current upgrade, Orblet, Companion, and Jelly APIs. Do not create a UI formula or change generated catalogs.

Expose a probability fraction with the explicit meaning **Parchment chance per Verminous Rat defeat as a Royal Guardian**. Expose a numeric **Maximum damage in the Royal Castle** with its verified combat context. Keep unlock handling evidence-led; do not assume a boolean means zero probability.

Place a compact acquisition explanation beside the once-above-grid parchment block. If verified values are later approved, display the chance as **1 out of N**, using an approximate denominator when needed. Show palace maximum damage as a separate labeled value. Do not add a character picker unless verification identifies a relevant character-specific input.

Keep the current Statues plan and temporary preview limited to accepted getters and three presentation corrections. No efficiency target, expected parchment cost, expected attempts, optimizer, kill-rate estimate, simulation, counter, new action, or backend expansion is part of this research deliverable.
