# Royal Statues UI delivery plan

Status: Approved

## Player outcome and scope

In Royal Armory, players can read each real Royal Statue's saved level, current bonus, next successful-level bonus, and attempt requirements. They can compare stored materials with one attempt's requirement. This is a read-only account view, not an in-game action or a guarantee of success.

Add **Statues** to the existing `/master-classes/royal-armory` tab family. Keep the page title, outer wrapper, resource bar, tab composition, default tab, theme, and Rubik. Keep ordinary Statues and Statue Flair outside this feature.

Show the four real bonus categories in catalog order: `TOTAL DAMAGE`, `DROP RATE`, `EXTRA KILLS`, and `CLASS EXP`. Exclude records whose trimmed catalog description matches `/^\d+$/`. This removes numeric-only descriptions `4`–`7`, not covered statues. Do not filter by saved level, `getBonus()`, or `baseBonus`: covered real statues return zero bonus, while filler records have nonzero base bonuses. This is UI filtering, not a catalog or domain change.

No filter controls, sorting, level input, attempt button, efficiency view, or optimizer. The authorized backend extension is limited to the two acquisition-context values below.

## Material acquisition context

[Parchment acquisition and palace damage research](ROYAL_ARMORY_PARCHMENT_RESEARCH.md) establishes Verminous Rats in the Royal Castle's cellar dungeon as the parchment source for Royal Guardians. Put a compact acquisition explanation beside the shared parchment block.

Read `RoyalArmory.getParchmentDropChance()` for the probability per Verminous Rat defeat as a Royal Guardian. Present its reciprocal as **1 out of N**, with **approximately** for a rounded nonwhole denominator. Read `RoyalArmory.getRoyalCastleMaximumDamage()` for **Maximum damage in the Royal Castle**. Do not describe it as fixed per-hit damage or DPS. Keep these formulas and prepared Companion/Jelly inputs in the existing domain owner and late updater.

Preserve the source's pre-unlock probability fallback; do not invent a locked-zero state or unlock-sensitive wording. Pickup doubling, respawn, farming rates, and attack simulation remain outside scope. Paired offline game outputs verify the aggregate values and direct inputs; they do not establish live rat defeats or palace attacks. Record exercised evidence and unavailable contexts in the current Stage 5 handoff.

## Shared material and card hierarchy

Use a two-column, two-row grid at the 1440px desktop review width, with `medium` outer gaps. This is a choice for four Royal Statues, not a global grid convention. Reuse the named [Sneaking card traits](../components/world-6/sneaking/sneakingUpgrades.tsx): `dark-1`, `medium` padding, `small` internal gaps, and artwork beside identity and level. Inherit shared page width without another centering rule or horizontal inset.

When any real statue is restored, show one **Shared upgrade material** block before the grid. Show the canonical parchment image and name, **Owned**, and **Required per upgrade attempt** once. State: “Applies to every restored statue.” Required and owned counts show the shared balance; omit a shared availability or shortage sentence. The balance is not reserved for a statue.

Source the block from the first restored real statue's attempt getters. All four catalog entries use the same parchment and attempt requirement. Do not hardcode the observed requirement of one. If all real statues are covered, omit this upgrade-only block.

Reuse [OrbletBalance](../components/account/royalArmoryDisplay.tsx#L159-L175)'s once-above-grid resource placement and exact-count detail. [Compass](../components/account/compassDisplay.tsx#L67-L105) and [Grimoire](../components/account/grimoireDisplay.tsx#L267-L279) also group shared balances outside upgrade records. Use [ResourceDisplay](../components/account/shared/ResourceDisplay.tsx) for parchment artwork and compact Owned with its exact-count tooltip. Do not repeat the image for the requirement.

Read each card in this order:

1. Statue artwork, one category label, **Level**, and **Covered** or **Restored** state.
2. Numeric current-to-next progression, without repeating the category description.
3. For a restored statue, show only **Upgrade chance** below the progression. Shared parchment ownership and requirement remain in the block.
4. For a covered statue, show **Restoration attempt**, the matching marble image/name, **Required per attempt**, **Owned**, **Restoration chance**, and its own availability text.

Keep covered cards readable at full text opacity. Covered artwork and the state label distinguish them. The shared parchment block never replaces the matching marble requirement on a covered card. Affordability color may support the visible status text; it does not replace it.

## Current-to-next typography

Show the category once beside artwork. Obtain the current and next numeric segments from `getDescription()` and `getDescription(level + 1)`. Remove the known static category suffix and translate `千` to `x`. Keep the domain's formatting and precision. Do not derive multipliers from raw bonuses or introduce a game formula.

Compare two bounded treatments in private previews:

- **Inline progression:** `3.00x → 3.15x`, with current at 28px/700 in pale theme text. Show next at 16px/400 in `accent-2`, with an explicit **after success** label.
- **Two-line progression:** keep the same prominent current value on the first line. Put the smaller, muted next value and **after success** label below it.

Use inline progression as the main treatment. It makes the change easy to compare while keeping current account state dominant. The two-line treatment tests whether extra separation improves scanning. Keep the same hierarchy and data in both; do not change fonts, theme, or wording between variants. Reuse [OrbletCards](../components/account/royalArmoryDisplay.tsx#L194-L197)'s larger current value and smaller muted next value, not its repeated description.

## Chance guidance

Keep this short guidance visible above the cards: “Royal Reverence boosts statue bonuses; Parchment Recycling can save parchment. An attempt does not guarantee a level.”

Keep version qualification in source notes, not user-facing guidance. Game 1.22's [`StatueUpgOdds`](game-snippets/equinox/RoyalG.1.22.js#L9-L12) uses the statue category and saved level, with no upgrade bonus input. [`StatueBon`](game-snippets/equinox/RoyalG.1.22.js#L22-L27) applies Royal Reverence to bonuses. [`ParchmentRecycle`](game-snippets/equinox/RoyalG.1.22.js#L95) is a separate material-preservation rule; it does not improve attempt odds.

The [Official Wiki's Royal Armory section](https://idleon.wiki/wiki/Royal_Guardian#The_Royal_Armory) describes these effects consistently. Parchment Surplus and Parchment Doubleprint improve parchment supply, not success chance. Required material covers an attempt, not a promised material loss or successful level. Do not render a version-specific or universal no-booster sentence in the UI.

Show attempt odds as **1 out of N**, not a percentage. This means the probability of each attempt, not expected attempts or a guaranteed success after N attempts.

## Domain data and display mapping

Read `RoyalArmory.statues`. Keep the prepared Storage and Royal Reverence inputs, getters, and calculations in the existing [RoyalStatue API](../data/domain/world-6/royalArmory/statues.ts).

| Display | Domain source and presentation |
| --- | --- |
| Real entries and identity | Filter numeric-only `statue.data.description.trim()`. Remove the known leading `}千 ` from retained descriptions to obtain the category. Keep catalog order and key by `statue.index`. |
| Saved level and state | `statue.level`; show level 0 explicitly as **Covered**, with restoration requirements. Positive levels mean **Restored**, with upgrade requirements. |
| Statue artwork | `statue.getImageData()` through `IconImage`. Preserve metadata and covered/restored selection. |
| Current value | Numeric segment of `statue.getDescription()`, with `千` translated to `x` and static category removed. |
| Next value | Numeric segment of `statue.getDescription(statue.level + 1)`, with the same presentation. Label **after success**; this is not an editable simulation. |
| Material name and image | `statue.getAttemptMaterial().displayName`, with underscores replaced by spaces; `statue.getAttemptMaterialImageData()` through `IconImage`. Use the first restored real statue for the shared parchment block; each covered statue supplies its own marble. |
| Required per attempt | `statue.getAttemptQuantity()`, formatted with existing `nFormatter`. Show once for shared upgrades and separately for each restoration. |
| Owned | `statue.getOwnedMaterialQuantity()`, with compact `nFormatter` and an exact-count tooltip. `ResourceDisplay` already supplies both; use `commaNotation` if a separate exact-count detail is needed. |
| Success chance | `statue.getSuccessChance()` is a fraction. Use shared `formatOneInChance` from `data/utility.tsx` for `1 out of N`. It groups whole denominators, tolerates floating-point noise, and marks rounded nonwhole denominators **approximately**. It shows **No chance** for a zero probability. Use the same formatter for parchment acquisition chance. Do not reimplement the chance formula. |
| Restoration availability | On covered cards only, `statue.isAffordable()` selects **Materials available** or **Not enough material**. Never infer availability from formatted counts. Shared upgrade counts need no availability sentence. |

Do not recompute bonuses, Reverence, chance, cost, or ownership in the view. Do not add cards for saved-array values beyond the catalog. Retain existing loading/status behavior; unloaded data is not a zero balance or empty catalog.

## Representative states and evidence limits

The real-save preview must show restored Damage and covered Frosty in the first viewport. Damage uses `TOTAL DAMAGE`. Frosty refers to the matching marble for `EXTRA KILLS`, not an invented category name.

| Entry | Saved level | Current → after success | Attempt material | Owned | Chance |
| --- | --- | --- | --- | --- | --- |
| Index 0, TOTAL DAMAGE | 1 | `3.00x → 3.15x` | Parchment of Enchantment; requirement 1 in shared block | 0 | 1 out of 30 |
| Index 1, DROP RATE | 1 | `1.50x → 1.55x` | Same shared parchment block | 0 | 1 out of 40 |
| Index 2, EXTRA KILLS | 0 | `1.00x → 1.30x` | Frosty Marble; requirement 1 on card | 0 | 1 out of 100 |
| Index 3, CLASS EXP | 0 | `1.00x → 4.00x` | Sparkly Marble; requirement 1 on card | 0 | 1 out of 250 |

These examples come from accepted offline game-1.22 evidence, not production constants. Covered real statues remain visible despite zero `getBonus()`. Affordable attempts and positive Royal Reverence were not observed. A separately labeled synthetic affordability preview proves presentation only; it does not extend game verification.

## Integration and focused browser proof

- **Client view:** add the Statues branch to [RoyalArmoryDisplay](../components/account/royalArmoryDisplay.tsx). Select displayed store values with `useShallow`; retain the mutable-domain `lastUpdated` dependency. Reuse `ShadowBox`, `IconImage`, labeled-value primitives, `ResourceDisplay`, and existing number helpers. Leave other tabs unchanged.
- **Route wrapper:** keep metadata and Suspense in [page.tsx](../app/master-classes/royal-armory/page.tsx). Add Statues to its description when production content ships. Keep the heading and shared layout.
- **Domain:** leave statue formulas, generated catalogs, account ordering, and Storage ownership unchanged. Add only the two acquisition getters and prepared inputs to the existing RoyalArmory owner and late updater.
- **Planning proof:** use the private [UI verification workflow](agents/ui-verification.md) at 1440×1000. Render both typography treatments with the preserved real save. Check four cards in catalog order, one category per card, current hierarchy, explicit after-success meaning, and visible restored Damage and covered Frosty.
- **Material/state proof:** check parchment artwork/name/Owned/requirement appear once, with a clear association to every restored card. Check shared shortage and no-booster sentences stay absent. Check all four chance fields use **1 out of N**, without percentages. Check Frosty's marble requirement remains distinct. Check all four real entries stay visible, including covered entries with zero bonus, and descriptions `4`–`7` do not. Exercise synthetic affordability separately and inspect exact-count detail.
- **Production proof:** exercise Statues tab switching and account refresh. Confirm description previews do not alter saved levels or owned quantities. Inspect changed-path console/page errors without suppression. Record existing unrelated errors separately from new defects.

Keep preview sources, screenshots, logs, and saves private. Archive exact temporary verification sources before removing owned routes and scenarios. No fresh backend extraction or duplicate domain tests are required for unchanged statue calculations. The two new acquisition values require paired game extraction and focused core/direct-input comparisons. Mobile/tablet redesign and a broad app audit remain outside scope.

## Sources

- [Supplied catalog](../data/domain/data/RoyalStatueRepo.ts) defines real category templates, numeric-only filler descriptions, and shared upgrade material/requirement. [Royal Armory upgrade catalog](../data/domain/data/RoyalArmoryUpgradeRepo.ts#L544-L581) defines parchment-supply and recycling effects; [Royal Reverence](../data/domain/data/RoyalArmoryUpgradeRepo.ts#L639-L651) increases statue bonuses.
- [Official Wiki: Royal Statues](https://idleon.wiki/wiki/Royal_Guardian#Royal_Statues) identifies matching marbles, parchment, and the four multiplier categories.
- Game 1.22 display caller, `../IdleonWikiBot/codefiles/idleon1.22.txt:290447–290515`, distinguishes covered/restored attempts and owned materials. Lines 290475–290482 substitute `1 + StatueBon / 100`, formatted as `MultiplierInfo`, into `}`. Together with Wiki wording, this establishes `千` as multiplier suffix `x`, not a thousands unit.
- [Stage 5 scope](ROYAL_ARMORY_FEATURE_PLAN.md#stage-5--implement-royal-statues-and-release-their-cards), [UI work guide](agents/ui-patterns.md), [coding standards](../CODING_STANDARDS.md), [product context](../PRODUCT.md), and [visual context](../DESIGN.md) govern delivery and inherited presentation.
