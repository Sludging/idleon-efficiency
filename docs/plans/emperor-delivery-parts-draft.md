# Emperor: delivery parts draft

**Status:** Part 1 and the selected UI revision are implemented. Current verification and limits are recorded in the [research brief](emperor-research-brief.md#current-handoff).

**Scope:** [Product specification draft](emperor-spec-draft.md) and [approved research brief](emperor-research-brief.md). Issue #268 is closed as too old; no active dedicated Emperor issue is known. Do not publish an issue before approval.

The feature is delivered as one part. It includes corrected domain outputs, account route/navigation, and the scoped read-only Emperor UI.

## Part 1 — Emperor showdown and bonuses

**Outcome:** Players can inspect current Showdown, remaining/maximum attempts, Boss HP, the combined bonus multiplier and its contributors, plus all 12 scheduled bonuses in a compact shared-table panel.

**Blocked by:** None.

### Backend and data mapping

| Player information | Existing source/data | Required public result |
|---|---|---|
| Current Showdown | Parsed `OptionsListAccount[369]` | Game menu's current Showdown is field 369 + 1. Do not call it “highest.” |
| Attempts left and maximum | Parsed `OptionsListAccount[370]` and attempt stack | Show `round(1 - field370)` and stack + 1. Keep daily tries in the domain but omit them from the UI. |
| Boss HP | Field 369 and existing boss HP output | Match version 1.23 `135e12 * 1.52^field369`. |
| Bonus records | Existing 12 `EmperorBonusRepo` entries and 48-position schedule | Preserve all source entries and duplicate descriptions. |
| Next award and total | Bonus level mappings, base values, Arcane 48, Arcade 51, Jelly RoG 28 | `getNextAwardShowdown(index)` returns the next displayed Showdown, including current when eligible. `getNextEffectiveBonus(index)` applies the full unrounded multiplier before flooring the cumulative total. |
| Bonus text | Static source strings and current effective values | Domain-owned display name, full current description, and numeric/unit-only next total. Keep all token formatting on the domain. |
| Row images | Existing skill, class, item, Equinox, and Emperor enemy image APIs | Use proven subsystem/class imagery where mapped; use the Emperor enemy image for remaining unmapped records. Do not invent sprite IDs or filenames. |
| Combined multiplier | Arcane Upg 48, Arcade Bonus 51, Jelly RoG 28 | Read the public combined multiplier and contribution values from the Emperor domain. Show contributions only in the tooltip. |

### Established patterns

- Keep Emperor state and calculations on the registered account domain. UI calls public domain APIs and does not recreate award schedule, effective values, or flooring.
- Use the shared account store and existing World 6 route/navigation. The summary follows Sushi's baseline-aligned hierarchy with Showdown and Other groups.
- Reuse `UpgradeTable` with the `panel` variant. Its four columns are Name (image and display name), Bonus (full current description), Awarded at next, and Next bonus (numeric/unit part only).
- Offer exactly `Order by next bonus` and `In-game order`. Default to ascending next-award Showdown; keep source index as the stable tie-breaker. Hide search and locked/maxed controls.

### UI information needs

- Show current Showdown, attempts left / maximum, and Boss HP under Showdown. Do not show daily tries or a separate top-level next-award field.
- Show the combined multiplier under Other; expose contribution labels and source percentages through its tooltip.
- Include all 12 bonuses with image/name, current source description, next awarded Showdown, and resulting effective total with units.
- Preserve all static source entries, the 48-showdown schedule, and duplicate World 7 descriptions. Use the current-Showdown-eligible award when the schedule assigns one.
- Use only existing verified images; retain Emperor generic artwork for unmapped records.

### Internal delivery tasks

1. **Domain and correctness:** Cover current Showdown, schedule lookup, effective values, and next cumulative total with paired regular-save public-output assertions. Keep source-derived future expectations separate from native transition observations.
2. **Parameter consumers:** Match public direct producers and user-facing next-award outputs through the existing extraction workflow.
3. **Page and integration:** Bind domain outputs to the summary, contribution tooltip, and four-column UpgradeTable. Keep controls limited to the two approved sort options.
4. **Scoped verification:** Exercise the populated regular-save page, image loads, tooltip, both sort orders, and Sushi summary comparison. Record runtime errors and evidence limits.

### Acceptance outcomes

- [x] The page shows current Showdown, attempts left / maximum, Boss HP, and the domain-provided combined multiplier. Daily tries and top-level next-award fields are absent.
- [x] The Other multiplier tooltip identifies all three source contributions and their percentages.
- [x] The shared UpgradeTable shows all 12 source records in four columns: image/name, full current Bonus description, next awarded Showdown, and numeric/unit-only next total.
- [x] All row images use verified subsystem/class/entity imagery or the verified generic Emperor enemy icon; all images decode.
- [x] Sort works for next-award Showdown (default ascending) and In-game order, with stable source-index ties and no search or lock controls.
- [x] Public domain outputs match version 1.23 regular-save evidence. Source-derived future expectations are not observed transitions.
- [x] The rendered summary follows Sushi's baseline-aligned Showdown/Other hierarchy. Populated-page checks and unrelated runtime errors are recorded without claiming broader game parity.

### Repository test approach

Follow `skills/testing/SKILL.md`, `docs/TESTING_IMPLEMENTATION.md`, and `tests/helpers/README.md`. Use the regular-save offline game server with readiness and game version confirmed. Write core regressions before implementation; compare parsed public state and public calculations against the sourced version 1.23 outputs. Keep static source-record assertions distinct from runtime-derived values. Match parameter tests to values displayed on the page and extend relevant Emperor-dependent consumers only if current core tests do not cover them. Do not use public accounts for ordinary validation. No checks ran during this planning phase.

### Explicit exclusions

No efficiency or upgrade calculator; no reset action/control; no purchase, shop, cost, or extra audit field; no new WikiBot schema request or generated-data edit; no invented descriptions or interpretation of duplicated World 7 text. No Minehead work. No broad UI matrix, build, lint, or formatter requirement is introduced by this part.
