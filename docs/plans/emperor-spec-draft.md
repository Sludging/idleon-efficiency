# Emperor (World 6): product specification draft

**Status:** Approved Part 1 is implemented. Current UI scope and verification are recorded in the [research brief](emperor-research-brief.md#current-handoff).

**Scope source:** [Approved research brief](emperor-research-brief.md). **Delivery detail:** [One delivery part](emperor-delivery-parts-draft.md).

**Issue:** [#268 — Handle Emperor Update](https://github.com/Sludging/idleon-efficiency/issues/268) is closed as too old. The brief found no active dedicated Emperor feature issue. Do not publish issues before approval.

## Problem

Players need one trustworthy view of Emperor showdown progression, attempts, boss health, and scheduled bonuses. Existing account-domain outputs conflict with version-matched game formulas, and the account page does not expose this feature.

## Solution

Add a read-only Emperor page using parsed account state and verified public domain outputs. Group current Showdown, attempts left / maximum, and Boss HP under Showdown; group the combined bonus multiplier and source contributions under Other. Do not display daily attempts or a separate top-level next-award field.

Show all 12 bonus records in the shared UpgradeTable panel. Each row has a source-owned display name with verified artwork, the full current source description, the next awarded Showdown, and the resulting cumulative effective amount with units. Default to ascending next awarded Showdown; also support In-game order.

## User story

As a player, I want to inspect my Emperor progression, available attempts, boss HP, and every scheduled bonus, so I can understand current progress and the rewards I have earned or will receive next.

## Product decisions

- Use the game menu's current Showdown value, `OptionsListAccount[369] + 1`; do not call it “highest.”
- Display attempts left as `round(1 - OptionsListAccount[370])` and maximum attempts as `MaxEmperorAttemptStack + 1`. Keep daily tries in the domain, but omit them from this page.
- Show the combined bonus multiplier from the public domain method. Its contribution tooltip uses the domain's Arcane 48, Arcade 51, and Jelly RoG 28 values.
- Show each source-owned display name and full current description. Format next-total values through the domain API; the UI does not reproduce the 48-slot schedule, multipliers, or flooring.
- Preserve all 12 original records and the 48-showdown award cycle. Keep both duplicate World 7 source descriptions unchanged and do not infer their meaning.
- Use existing verified class/subsystem icons when established. Use the existing Emperor image for records without a mapped icon; do not guess sprite IDs or asset filenames.
- Use the project's normal account page layout, shared app-data store, ordinary World 6 navigation, and shared UpgradeTable panel.
- Keep this page read-only. Do not add reset controls, attempt purchases, costs, shop fields, search, hide-locked/maxed controls, or other fields.

## Verification

Use regular-save offline domain tests and version-matched source evidence. Core and parameter tests cover public Emperor outputs, including next awarded Showdown and resulting cumulative effective values. Do not fabricate progression transitions or synthetic saves.

Exercise the populated regular-save page. Check summary hierarchy and removed fields, contributor tooltip, all four bonus columns, image loading, and both sort orders. Compare the summary directly with Sushi's rendered baseline-aligned summary. Record unrelated runtime errors separately.

## Out of scope

- Efficiency, upgrade, cost, forecasting, or optimization calculators.
- Reset actions or reset controls, shop or purchase information, and any field absent from the accepted audit inventory.
- New game-data fields, WikiBot requests, invented descriptions, or interpretations of duplicate World 7 source strings.
- Minehead work before explicit human review of the completed Emperor delivery.

## Delivery

Part 1 and the selected UI revision are delivered. Focused Emperor tests passed (2 suites, 15 tests), and the regular-save UI smoke passed; see the [current handoff](emperor-research-brief.md#current-handoff) for exact commands, evidence paths, unrelated runtime errors, and source-derived limits.

## Evidence and boundaries

The [research brief](emperor-research-brief.md) records regular-save runtime values, source citations, competitor audit inventory, test seams, and evidence limits. Game display mappings are sourced from version 1.23 menu code `idleon1.23.txt:275884–275989`; reward multipliers from `Thingies.1.23.js:8` and `idleon1.23.txt:240225–240243`. Existing backend and UI pattern references are listed in the delivery part. The competitor page did not freshly load populated account data; this plan does not claim current competitor rendering or exact localized game text.
