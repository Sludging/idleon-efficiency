# Minehead: proposed delivery parts

- **Status:** Approved; the single end-to-end part below is selected for implementation. The 2026-10-20 approval revises only the existing Daily tries field to show remaining/daily allowance. No implementation has started.
- **Scope sources:** [Approved research brief](minehead-research-brief.md) and [approved specification](minehead-spec-draft.md).
- **Related issue:** Open #481 remains separate Minehead calculation-correctness work. Closed #390 is historical. No Minehead UI feature issue exists; this local plan is unpublished.

Minehead remains one cohesive read-only page. One end-to-end part is sufficient: backend state and cost data, the page presentation, and focused tests form one complete player experience. Research, data mapping, implementation, and testing are internal tasks within this part, not separate tickets or agent workstreams.

## 1. Minehead summary, upgrades, and opponents

**Outcome:** Players can understand Mine Currency and Minehead progress, compare upgrade state and actionable costs, and inspect current and future opponent rewards in a dense, readable page.

**Blocked by:** No other delivery part or unresolved asset decision. Use source-verified opponent mappings `MineH${data.displayId}` for all 32 progression entries and index-based `MineUpg` artwork for upgrades. Implementation must check all 32 opponent and 30 relevant upgrade assets using actual image headers and rendering. Show the standard repository UI currency symbol/glyph beside an explicit Mine Currency label; this is not native game artwork, and no dedicated native sprite has been verified.

### Backend and UI information needs

| Player outcome | Backend information | UI information and behavior |
|---|---|---|
| Understand current account state | Existing account-owned Minehead overview results, including saved currency, native hourly gain, account remaining attempts from `Research[7][8]`, native daily allowance, opponents beaten, maximum lives, and base damage. Preserve current producer ordering and existing allowance API/callers. | Group Mine Currency with hourly gain in a compact summary. Show saved remaining attempts over native daily allowance in the existing Daily tries field, preserving exact saved count without deriving from used attempts or clamping. Remove the redundant Overview heading. Follow Sushi and Spelunking summary hierarchy and typography. |
| Decide which upgrades are available and affordable | Existing level, native maximum semantics, effect description, unlock state, requirement, and next cost. Add Minehead-owned cost-to-max and next-ten quotes from the existing cost formula with an explicit target level, without changing saved level or existing cost callers. Hold all current saved modifiers constant across each quote, including upgrade 26's discount. | Use `UpgradeTable`'s opt-in `panel` variant, following the actual Sushi caller. Keep current and bulk affordability colors; show Research requirement only while locked. Show cost-to-max for natively capped upgrades and next-ten cost for uncapped upgrades. Native maxima below 999 are capped; 999 or greater are uncapped markers, not player-facing maximums. Do not duplicate numeric prefixes in effect descriptions. |
| Understand opponent progress and rewards | Existing opponent order, progression index, defeated state, HP, Depth Charges, reward descriptions, and the current/next earned bonus summaries. Keep base preview rewards distinct from progression-gated earned rewards. | Use dense grey-header cards following Jelly Operator obstructions. Omit “Status” text and communicate earned/future state with established opacity. Keep the current opponent readable and apply the existing gold treatment. Show current and next bonuses locally. Filter only “Nothing... yet...” descriptions from the rendered reward list; retain all source identities, IDs, ordering, and consumer semantics. |
| Recognize game entities | Source-verified opponent mappings `MineH${data.displayId}` and index-based upgrade `MineUpg` artwork. Implementation checks all 32 opponent and 30 relevant upgrade assets using actual image headers and rendering. | Display actual opponent and upgrade images. Pair the standard repository UI currency symbol/glyph with an explicit Mine Currency label; do not claim the glyph is native artwork or invent a Mine Currency asset. |

The shared table owns its panel shell and toolbar layout; Minehead owns its columns, rows, and data. Reuse Spelunking's cost presentation conventions only: its currency formatter and domain cost APIs do not apply to Minehead.

Exact pattern anchors: Sushi's `sushiUpgrades` passes `variant="panel"` to `UpgradeTable`; columns and Minehead data remain feature-owned. Shared props are `tableName`, `columns`, `data`, `primaryKey`, `filters`, `onFiltersChange`, and `sortOptions`. The panel variant changes the table shell and toolbar arrangement; do not add Minehead-specific search, sorting, or controls. Preserve Minehead entry order. Spelunking's cost component is a display precedent only; its Amber formatting and cost APIs do not apply.

Sushi's overview places currency balance and hourly rate together above tabs, using `xxlarge` balance and `large` `/hr` rate. Spelunking provides a compact wrapping metric strip, but not the direct currency/rate grouping.

Jelly Operator obstruction cards use a grey header, `0.76` opacity for upcoming entries, and gold border/tint for the current obstruction. Reuse only this earned/future emphasis and grouping; do not copy Jelly's labels or equate its state model with Minehead progression. Its overview groups current and next obstruction rewards locally; Minehead supplies its own current/next bonuses.

### Acceptance outcomes

1. [ ] Overview groups Mine Currency and hourly gain, removes the redundant heading, and retains all approved summary values.
2. [ ] Upgrade rows use the opt-in table panel variant; existing default table consumers remain visually unchanged.
3. [ ] Requirements appear only for locked upgrades. Unlocked upgrades show cost-to-max when natively capped and next-ten otherwise.
4. [ ] Next and bulk prices use the existing affordability treatment, with existing Minehead costs and discounts preserved.
5. [ ] Effects show descriptions without duplicate numeric prefixes.
6. [ ] Uncapped maximums follow native semantics rather than formatted/rounded maximum values.
7. [ ] Opponents use the established dense card composition with grey header bands.
8. [ ] Opponent state has no “Status” copy; opacity distinguishes future/earned state while current remains readable.
9. [ ] Current opponent uses the established gold treatment without changing original progression indexing.
10. [ ] Current and next opponent bonuses appear locally in the Opponents section.
11. [ ] UI filters only “Nothing... yet...” reward entries. Source data, identities, order, rewards, and all consumers remain unchanged.
12. [ ] Show Mine Currency with the standard UI currency graphic and explicit label; show opponents and upgrades with verified existing CDN images, checking all 32 opponent and 30 relevant upgrade assets using actual image headers and rendering.
13. [ ] Existing Daily tries field displays account `Research[7][8]` remaining attempts over native daily allowance, preserving exact saved value without derivation from used attempts or clamping.

### Dependencies and implementation boundary

- Preserve all existing Minehead APIs, parsed state, update order, and downstream consumers. Keep displayed calculations in the registered Minehead domain; filtering and formatting remain view concerns.
- Parse account `Research[7][8]` at the existing Minehead boundary and expose remaining state through existing domain public-state/getter conventions. Keep the existing allowance API and callers unchanged. Render one ratio in the existing Daily tries field.
- Use the existing Minehead single-level formula with explicit target-level input. For each quote, hold current saved modifiers fixed, including upgrade 26's current discount; do not simulate hypothetical purchases or mutate saved state.
- Follow native cap semantics: maximums below 999 are capped, while 999 or greater denote uncapped upgrades. Do not use generated `9999` as a separate threshold or show rounded uncapped maximums.
- Keep paired current-save checks for native next-level cost and direct cost inputs. Test bulk arithmetic and cap boundaries with independently worked literal examples from source/spec, not totals produced by the production cost helper. Pure class input variation is valid; do not fabricate saves or claim a native bulk transaction.
- Keep source-owned effect descriptions. Generated Minehead metadata currently supplies Grid Expansion, Multiplier Madness, and Awesome Additives data; do not copy generated tables.
- The reward-placeholder filter must not mutate or renumber domain records. Leave base opponent reward display and earned reward consumers unchanged.
- Asset decisions are settled: opponent image mapping is `MineH${data.displayId}` for all 32 progression entries; upgrades use index-based `MineUpg` art. Implementation must check all 32 opponent and 30 relevant upgrade assets using actual image headers and rendering. No dedicated native Mine Currency sprite is confirmed; use the existing standard repository UI currency symbol/glyph beside an explicit label, and do not represent it as native game artwork.

### Repository verification

- Follow `skills/testing/SKILL.md` and `docs/TESTING_IMPLEMENTATION.md`.
- Keep Minehead core assertions for public results backed by game values and direct parameter comparisons for current native next-level cost inputs, including same-domain calculations. Do not invent a game-extraction result for website-only bulk totals.
- Verify cost-to-max, next-ten, cap boundaries, and upgrade-26's fixed current discount with source-derived literal examples. Keep current-save core/parameter checks for the native next-level cost and direct inputs; do not compute test expectations by summing the production helper.
- Add core assertions and matching parameter/extraction comparisons for parsed remaining attempts and the existing allowance. Cover zero preservation, reparsing, and no clamping when saved remaining exceeds allowance. Use honest offline UI evidence; the failed compound query provides no numeric runtime pair.
- Reuse current Minehead core and parameter-test conventions, configured tolerance `0`, and repository matchers. Keep existing Minehead and downstream consumer coverage intact; do not duplicate #481 correctness scope.
- Use focused private Docker Playwright verification with the populated local save on `/world-7/minehead`. Check the summary, all upgrade states/prices, affordability, opponent states/rewards/current-next bonuses, placeholder filtering, tabs, and changed-path runtime errors. Inspect verified images only if mappings are established.
- Record focused checks and limits in the handoff. UI rendering does not prove calculation correctness; do not claim public-account testing, broad responsive coverage, or unrelated full-suite checks.

## Approval gate

This one-part vertical slice, including the approved 2026-10-20 Daily tries ratio revision, is selected for implementation. No implementation has started. No Minehead UI issue exists, so no external ticket publication is needed. Historical approval and verification for the previous page revision remain in the [current handoff](minehead-research-brief.md#current-handoff); this approval records the ratio revision without changing the one-part contract.
